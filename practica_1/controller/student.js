import { get,create,update,deletes,getTotalCount} from "../student.service.js";
import { redisA,redisB} from "../config/redis.js";
import { invalidateCache } from "../middleware/cache.js";
const preloadStudentsCache = async () => {
    const students = await get();
    await redisA.set('/students', JSON.stringify(students), 'EX', 300);
};

export const getStudents =async(req,res)=>{
    try{
        const page=parseInt(req.query.page) ||1;
        const limit=parseInt(req.query.limit)||50;
        const key=`/students?page=${page}&limit=${limit}`
        let data=null;
        for (const client of req.cacheRead) {
            try{
                const student =await client.get(key);
                if(student){
                    data=JSON.parse(student);
                    break;
                }
            }catch(err){
                console.warn(`Nodo Redis falló (${client.options?.host}): ${err.message}`);
                continue;
            }
        }
        if(!data){
            const skip=(page-1)*limit;
            const [students,total]=await Promise.all([
                get({skip,limit}),
                getTotalCount()
            ])
            data = {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: students
            };
            try{
                const ttl=data.data.length>100?1800:300;
                await req.cacheRead[req.cacheRead.length-1].set(key,JSON.stringify(data),'EX',ttl)
            }catch{
                console.log("Redis cayo");
            }
        }
        res.status(200).json(data);

    }catch(error){
        res.status(500).json({
            message:"error al obtener estudiantes",
            error:error.message
        });
    }
}
export const createStudents =async(req,res)=>{
    try{
        const {name, birthDate, email}=req.body;
        if(!name ||!birthDate || ! email){
            return res.status(400).json({message:"Faltan campos"})
        }
        const student= await create({name,birthDate,email})
          await req.cacheWrite.set(`/students`, JSON.stringify(await get()), 'EX', 300);
        await invalidateCache([`/students`,`/students/${student.email || student._id}`])
        res.status(201).json(student);
    }catch(error){  
        res.status(500).json({
            message:"Error al crear al estudiante",
            error:error.message
        })
    }
}
export const updateStudent=async(req,res)=>{
    try{
        const {filter,student}=req.body;
        if(!filter || ! student){
            return res.status(400).json({message:"Faltan parametros"});
        }
        const result=await update(filter,student)
        if(result.modifiedCount===0){
            return res.status(404).json({message:"No se encontro ese estudiante"});
        }
        await preloadStudentsCache();
        await invalidateCache([`/students`,`/students/${filter.email || filter._id}`])
        res.status(200).json({message:"Estudiante actualizado",result})
    }catch(error){
        res.status(500).json({ message: "Error al actualizar", error: error.message });
    }
}
export const deleteStudent=async(req,res)=>{
    try {
        const {student}=req.body;
        if(! student){
            return res.status(400).json({message:"Faltan parametros"});
        }
        const result=await deletes(student);
        if(result.deletedCount===0){
            return res.status(404).json({message:"No se encontro ese estudiante"});
        }
        await preloadStudentsCache();
        await invalidateCache([`/students`, `/students/${student.email || student._id}`]);
        res.status(204).json({message:"Estudiante eliminado",result})
    } catch (error) {
         res.status(500).json({ message: "Error al eliminar", error: error.message });
     
    }
}