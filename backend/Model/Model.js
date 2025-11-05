let Mongoose=require("mongoose")

let Schema=new Mongoose.Schema({
   SignUpUserName:{
    type:String,
    required:true
   },
    SignUpPass:{
    type:String,
    required:true
   },
    SignUpEmail:{
    type:String,
    required:true
   } ,
    SignUpImage:{
    type:String,
    required:true
   },
    SignUpPhNo:{
    type:Number,
    required:true
   },
    SignUpGender:{
    type:String,
    required:true
   },
   SignUpAddress:{
    type:String,
    required:true
   },
})

let Model=Mongoose.model("SignUpDetails",Schema)

module.exports=Model