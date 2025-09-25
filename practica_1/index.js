import {connect,disconnect} from "./config/db.js";
import { getStudents,createStudents, updateStudent,deleteStudent } from "./controller/student.js";
import express from 'express'
const app=express()
app.use(express.json())
const PORT=3000;
//ruta
app.get("/",(request,response)=>{
    response.send({
        message:"Hola"
    })
});
app.get("/students",getStudents);
app.post("/insert",createStudents);
app.put("/update",updateStudent);
app.delete("/delete",deleteStudent);
const run=async()=>{
    await connect();
}
run()
app.listen(PORT,()=>{
    console.log(`Servidor escuando en http://localhost:${PORT}`);
});
