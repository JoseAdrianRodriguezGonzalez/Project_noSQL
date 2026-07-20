import {redisA,redisB,redisA1,redisA2,redisB1,redisB2} from '../config/redis.js';
export let cacheStats={hits:0,misses:0}
export const cacheMiddleware =async (req,res,next)=>{
    if(req.method !=='GET') return next();
    const key=req.originalUrl;
    console.log(key);
    try{
        let cached=null;
        for (const client of req.cacheRead) {
            try{
                cached =await client.get(key);
                if(cached)break;
            }catch(err){
                console.warn(`Redis node failed: ${err.message}`);
            }
        }
        if(cached){
            console.log(`cache hist ${key}`);
            cacheStats.hits++
            return res.json(JSON.parse(cached));
        }else{
            console.log(`Cache Miss ${key}`);
            cacheStats.misses++;
            req.skipCache=true;
            next();
        }
    }catch(err){
        console.error("Redis cache error:", err);
        next();
    }
}
const pickRandom =(arr)=>arr[Math.floor(Math.random()*arr.length)];
export const logicalRouter =(req,res,next)=>{
    if(req.method==='GET'){
        req.cacheRead=[pickRandom([redisA1,redisA2]),redisA];
    }else{
        req.cacheWrite=pickRandom([redisB,redisB1,redisB2]);
    }
    next();
}

export const invalidateCache=async(keys=null)=>{
    try{
        const readNodes = [redisA, redisA1, redisA2];
        const writeNodes = [redisB, redisB1, redisB2]; 
        if(keys&&keys.length){
            await Promise.all(
                keys.map(k=>
                    Promise.all([...readNodes,...writeNodes].map(client=>client.del(k)))
                )
            )
            console.log("CCache invalidad")
        }else{
            await Promise.all(
                [...readNodes,...writeNodes].map(client=>client.flushAll())
            )
            console.log("Cache invalidad completamente");
        }
    }catch(err){
        console.error('Error invaldiadno caches',err);
    }
}