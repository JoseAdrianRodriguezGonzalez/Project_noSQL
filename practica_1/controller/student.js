import { get,create,update,deletes} from "../student.service.js";

export const getStudents =async(req,res)=>{
    try{

        const student =await get();
        res.status(200).json(student);
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
        res.status(200).json({message:"Estudiante actualizado",result})
    }catch(Error){
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
        res.status(204).json({message:"Estudiante eliminado",result})
    } catch (error) {
         res.status(500).json({ message: "Error al eliminar", error: error.message });
     
    }
}