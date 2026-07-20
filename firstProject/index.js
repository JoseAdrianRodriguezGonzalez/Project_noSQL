import {connect,disconnect} from "./db.config.js";
import { getStudents } from "./student.controller.js";
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
const run=async()=>{
    await connect();
}
run()
app.listen(PORT,()=>{
    console.log(`Servidor escuando en http://localhost:${PORT}`);
});