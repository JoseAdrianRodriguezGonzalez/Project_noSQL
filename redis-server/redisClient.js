import {createClient} from 'redis';

const client=createClient();
client.on('error',(error)=>{
    //error
    console.log("Reids client error: ",error);
});

export async function connect(){
    if(!client.isReady){
        try{
            await client.connect();
            console.log("Conexion lista");
        }catch(error){
            console.log("Fallo al conectar!");
        }
    }
}

export function getClient(){
    return client;
}
export async function close(){
    if(client.isReady){
        try{
            await client.destroy();
        }
        catch(error){
            console.log("Error al cerrar la conexion",error);
        }
    }
}
