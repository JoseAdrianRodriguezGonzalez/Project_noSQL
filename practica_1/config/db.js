import mongoose  from "mongoose";
//import 'dotenv/config'
export const connect = async () => {
  try {
    let url = process.env.MONGODB_URI;

    if (!url) {
      const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
      url = `mongodb://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
      await mongoose.connect(url );
      console.log("LO logrooooo")
    }else{
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        await mongoose.connect(url, clientOptions);        
        console.log("Conectando a:", url);
        console.log("✅ Conectado a MongoDB");
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);  // imprime error completo
  }
};

export const disconnect=async()=>{
    await mongoose.disconnect();
    console.log("Se desconecto")
}