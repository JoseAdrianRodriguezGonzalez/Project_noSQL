import {connect,disconnect} from "./config/db.js";
import { getStudents,createStudents, updateStudent,deleteStudent } from "./controller/student.js";
import {redisA,redisB,connectRedis} from "./config/redis.js";
import { cacheMiddleware,logicalRouter,cacheStats } from "./middleware/cache.js";
import express from 'express'
const app=express()
app.use(express.json())
const PORT=3000;
//ruta
app.use(logicalRouter)
app.use(cacheMiddleware)
app.get('/cache/stats',(req,res)=>{
    res.json({
        hits:cacheStats.hits,
        misses:cacheStats.misses,
        ratio:cacheStats.hits+cacheStats.misses>0?
        cacheStats.hits/(cacheStats.hits+cacheStats.misses):
        0
    });
});
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
    await connectRedis();
    await connect();
    console.log("SI");
    }
run()
app.listen(PORT,()=>{
    console.log(`Servidor escuando en http://localhost:${PORT}`);
});
