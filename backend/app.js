let Dotenv=require("dotenv")
Dotenv.config()

let Express=require("express")

let App=Express()
App.use(Express.json())

let Cors=require("cors")
App.use(Cors())

let DbConnect=require("./DbConnect/Db")
DbConnect()

let SignUpModel=require("./Model/Model")
let Bcrypt=require("bcrypt")

//SIGNUP DATA

App.post('/SignUpData',async (req,res) => {
    let {SignUpUserName,SignUpPass,SignUpEmail,SignUpPhNo,SignUpGender,SignUpImage,SignUpAddress}=req.body
    try{
    let AlreadyExistsName=await SignUpModel.findOne({SignUpUserName})
    let AlreadyExistsEmail=await SignUpModel.findOne({SignUpEmail})
    
    if(!SignUpUserName || !SignUpPass || !SignUpEmail){
        return res.status(404).json({
            success:false,
            message:"Please Provide Valuable Input"
        })
    }

    if(AlreadyExistsName || AlreadyExistsEmail ){
        return res.status(404).json({
        success:false,
        message:"User Already Exists"
            })
        }

        let SaltRound=12
        let  GenSalt=await Bcrypt.genSalt(SaltRound)

        let HashPassword= await Bcrypt.hash(SignUpPass,GenSalt)

        let SignUpData=new SignUpModel({SignUpUserName,SignUpPass:HashPassword,SignUpEmail,SignUpPhNo,SignUpGender,SignUpImage,SignUpAddress})
        await SignUpData.save()
        res.status(200).json({
            success:true,
            message:"Data Added SuccessFully"
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`ErrorName ${err.name} ErroeMessage: ${err.message}`
        })
    }
})

//LOGIN DATAS
App.post('/LoginData',async (req,res) => {
    let { LoginUserName,LoginPass}=req.body
    try{
        let UserNameFind=await SignUpModel.findOne({SignUpUserName:LoginUserName})
        if(!UserNameFind){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        let PaswwordCompare=await Bcrypt.compare(LoginPass,UserNameFind.SignUpPass)
        if(!PaswwordCompare){
            return res.status(404).json({
                success:false,
                message:"Invalid Password"
            })
        }
        else{
        return res.status(200).json({
        success:true,
        message:"User Founded - Login Successfully",
        UserId:UserNameFind._id,
         })
        }
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`ErrorName:${err.name} Error Message: ${err.message}`
        })
    }
})

App.get('/Profile/:id',async (req,res) => {
    let ProfileDatas=await SignUpModel.findById(req.params.id).select("-SignUpPass")
    res.status(200).json({
        success:true,
        data:ProfileDatas
    })
})

//TASKS
let TasksModel=require('./Model/Task')

App.post("/Tasks",async (req,res) => {
    let {TaskName,TaskDetails,TaskDate,TaskPriority,TaskId}=req.body
    try{
        let SaveTasks= new TasksModel({TaskName,TaskDetails,TaskDate,TaskPriority,TaskId})
        await SaveTasks.save()
        res.status(200).json({
            success:true,
            message:"Task Added"
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`ErrorName :${err.name} ErrorMessage: ${err.message}`
        })
    }
})

App.get('/GetTasks/:id',async (req,res) => {
    try{
    let GettingTasks=await TasksModel.find({ TaskId: req.params.id })
    res.status(200).json({
        success:true,
        data:GettingTasks
    })
    }
    catch(err){

    }
})

App.delete('/DeleteTask/:id',async (req,res) => {
    try{
        await TasksModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Data Deleted Successfully"
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`Error Name:${err.name} ErrorMessage:${err.message}`
        })
    }
})

App.listen(process.env.PORT,()=>{
    console.log("Server Running SuccessFully");
    
})