
import {connect,getClient ,close} from "./redisClient.js";

async function main(){
    await connect();
    const client= await getClient();
    try{
        const key="mi_clave";
        const value="Hola redis, desde nodejs!";
        await client.set(key,value);
        const redisValue=await client.get(key);
        console.log(`Valor recuperado ${redisValue}`);
    }
    catch(error){
    }
    finally{
        await close();
    }
}
main();
