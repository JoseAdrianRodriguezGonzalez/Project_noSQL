import { get } from "./student.service.js";

export const getStudents =async(req,res)=>{
    try{
        console.log("SI llegue")
        const student =await get();
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({
            message:"error al obtener estudiantes",
            error:error.message
        });
    }
}