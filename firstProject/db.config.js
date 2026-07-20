import mongoose  from "mongoose";
//import 'dotenv/config'
export const connect =async()=>{
    const {MONGO_USER,MONGO_PASS,MONGO_HOST,MONGO_PORT,MONGO_DB}=process.env;
    const url = `mongodb://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    console.log(url)
    try {
        await mongoose.connect(url);
        console.log(`Conectado: ${MONGO_USER}`);
    } catch (error) {
        console.log("Error, no se pudo conectar");
    }
}
export const disconnect=async()=>{
    await mongoose.disconnect();
    console.log("Se desconecto")
}