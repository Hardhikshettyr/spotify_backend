const mongoose=require("mongoose");

async function connectdb(){
    try{
        await mongoose.connect(process.env.mongo_uri);
        console.log("DB Connected");

    }
    catch(err){
        console.error("Database connection failed",err);
    }
}

module.exports=connectdb;