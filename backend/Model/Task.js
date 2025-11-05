let Mongoose=require("mongoose")

let TaskSchema=new Mongoose.Schema({
    TaskName:{
        type:String,
        required:true
    },
     TaskDetails:{
        type:String,
        required:true
    },
    TaskDate:{
        type:String,
        required:true
    },
    TaskPriority:{
        type:String,
        required:true
    },
    TaskId:{
        type:Mongoose.Schema.Types.ObjectId,ref:"SignUpDetails"
    }
})
let TaskModel=Mongoose.model("Task",TaskSchema)

module.exports=TaskModel