import mongoose from "mongoose"


    const connectDb = async ()=>{
        try{
        
            const db =  await mongoose.connect(process.env.MONGODB_URI);

                console.log("db connected")
            return db
            
        }   catch(err){
            console.log(err)
            process.exit(1)
        } 
    }

    export default connectDb
