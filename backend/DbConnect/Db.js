let Dotenv=require("dotenv")
Dotenv.config()

let Momgoose=require("mongoose")

function DbConnect(){
    Momgoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Db Connected");
        
    })
    .catch(()=>{
        console.log("Db Not Connected");
        
    })
}

module.exports=DbConnect