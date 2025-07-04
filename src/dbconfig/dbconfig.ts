
import mongoose, { connection } from "mongoose";
export async function connect(){
    try {
      await mongoose.connect(process.env.MONGO_URL!)  
      const connection=mongoose.connection
      connection.on('connected',()=>{
        console.log("DB connected succesfully");
      })
      connection.on('error',(error)=>{
        console.log("hey there is an error",error);
        process.exit()
      })
    } catch (error) {
        console.log("something went wrong error: ",error);
        
    }
}