import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import ImageCompression from 'browser-image-compression'

export let My_Context=createContext()
function Context({children}) {

  let Navigate=useNavigate()
  
  //SIGNUP
  let [SignUpUserName,setSignUpUserName]=useState("")
  let [SignUpPass,setSignUpPass]=useState("")
  let [SignUpEmail,setSignUpEmail]=useState("")
  let [SignUpImage,setSignUpImage]=useState('')
  let [SignUpPhNo,setSignUpPhNo]=useState('')
  let [SignUpGender,setSignUpGender]=useState('')
  let [SignUpAddress,setSignUpAddress]=useState('')
   
  let [Err,setError]=useState('')
  let ModelRef=useRef()
  let [SignModalMess,setSignModalMess]
  =useState('')
  let [SpassToggler,setSpassToggler]=useState(false)

  //IMAGE
  async function ProfileImageFn(e) {
    let ProfileImage=e.target.files[0]
    if(ProfileImage){
      try{
        let Compression={
          maxSizeMB:0.5,
          maxWidthOrheight:800
        }
        let CompressedFile=await ImageCompression(ProfileImage,Compression)

        let Reader=new FileReader()
        Reader.onload=()=>{
          setSignUpImage(Reader.result)
        }
        Reader.readAsDataURL(CompressedFile)
      }
      catch(err){

      }
    }
  }

  async function SignUpFn(e) {
    e.preventDefault()
    try{
      let SignData=await Axios.post('https://taskmanager-backend-eo90.onrender.com/SignUpData',{SignUpUserName,SignUpPass,SignUpEmail,SignUpPhNo,SignUpGender,SignUpImage,SignUpAddress})
      
      setSignModalMess(SignData.data.message)
      let ModalShow=new window.bootstrap.Modal(ModelRef.current)
      ModalShow.show()
      setSignUpUserName('')
      setSignUpPass('')
      setSignUpEmail('')
      setSignUpGender('')
      setSignUpAddress('')
      setSignUpPhNo('')
      Navigate('/')
    }
    catch(err){
       setError(err.response?.data?.message || err.message);
    }
  }

  //LOGIN FORM
  let [LoginUserName,setLoginUserName]=useState('')
  let [LoginPass,setLoginPass]=useState('')
  let [LoginError,SetLoginError]=useState('')
  let [LoginToggler,setLoginToggler]=useState(false)
  let [LoginMessage,setLoginMessage]=useState('')
  let LoginModal=useRef()

  async function LoginDatas(e) {
    e.preventDefault()
    try{
      let LoginData=await Axios.post('https://taskmanager-backend-eo90.onrender.com/LoginData',{
        LoginUserName,LoginPass
      })
    let LoginnModal=new window.bootstrap.Modal(LoginModal.current)
      LoginnModal.show()
      setLoginMessage(LoginData.data.message)
      Navigate('/Home')
      localStorage.setItem("UserName",LoginUserName)
      localStorage.setItem("Userid",LoginData.data.UserId)
      GettingProfileDetails()
    }
    catch(err){
      SetLoginError(err.response?.data?.message || err.message.data)
  }
  }

  function LogOut(){
    localStorage.removeItem("UserName")
    localStorage.removeItem("Userid")
    Navigate('/')
  }

  //PROFILE
  let UserId=localStorage.getItem("Userid")

  let [ProfileDats,setProfileDats]=useState({
    SignUpUserName:"",
    SignUpEmail:"",
    SignUpImage:"",
    SignUpPhNo:"",
    SignUpGender:"",
    SignUpAddress:"",
  })
  useEffect(()=>{
    async function GettingProfileDetails() {
      let ProfileDetails=await Axios.get(`https://taskmanager-backend-eo90.onrender.com/Profile/${UserId}`)
      setProfileDats(ProfileDetails.data.data)
    }
   if(UserId){
     GettingProfileDetails()
   }
  },[])
 

 

  //TASK
  let [Tasks,setTasks]=useState([])
  let [TaskName,setTaskName]=useState('')
  let [TaskDetails,setTaskDetails]=useState("")
  let [TaskDate,setTaskDate]=useState("")
  let [TaskPriority,setTaskPriority]=useState("")

  
  let UserID=localStorage.getItem("Userid")
  async function SendingTasks(e) {
    e.preventDefault()
   
    
    try{
      let SendingTaks=await Axios.post(`https://taskmanager-backend-eo90.onrender.com/Tasks/`,{TaskName,TaskDetails,TaskDate,TaskPriority,TaskId:UserID})
      alert(SendingTaks.data.message)
      GettingTasks()
      setTaskName('')
      setTaskDetails('')
      setTaskDate('')
      setTaskPriority('')
    }
    catch(err){
      console.log(err.response?.data?.message||err.name);
      
    }
  }
   async function GettingTasks() {
      let GettingTasks=await Axios.get(`https://taskmanager-backend-eo90.onrender.com/GetTasks/${UserID}`)
      setTasks(GettingTasks.data.data)
    }
   useEffect(()=>{
   
    GettingTasks()
  },[])

  let ToastAlert=useRef()
  async function DeleteTask(id) {
    try{
      let DeleteTask=await Axios.delete(`https://taskmanager-backend-eo90.onrender.com/DeleteTask/${id}`)
    alert(DeleteTask.data.message)
    let Alert=new window.bootstrap.Toast(ToastAlert.current)
    Alert.show()
    GettingTasks()
    }
    catch(err){

    }
  }
  return (
   <>
   <My_Context.Provider value={{setSignUpUserName,SignUpUserName,SignUpPass,setSignUpPass,SignUpEmail,setSignUpEmail,SignUpFn,ModelRef,SignModalMess,Err,SpassToggler,setSpassToggler,SignUpPhNo,setSignUpPhNo,SignUpGender,setSignUpGender,SignUpAddress,setSignUpAddress,SignUpImage,setSignUpImage,ProfileImageFn,

    LoginDatas,LoginToggler,setLoginToggler,LoginError,SetLoginError,LoginPass,setLoginPass,LoginUserName,setLoginUserName,LoginModal,LoginMessage,LogOut,ProfileDats,


    SendingTasks,Tasks,setTasks,TaskName,setTaskName,TaskDetails,setTaskDetails,TaskDate,setTaskDate,TaskPriority,setTaskPriority,DeleteTask
   }}>
    {children}
   </My_Context.Provider>

   <div className="toast align-items-center text-white bg-primary border-0 position-fixed top-0 start-50 translate-middle-x
" role="alert" ref={ToastAlert}>
  <div className="d-flex">
  <div className="toast-body text-center">
  <p>DELETED SUCCESSFULLY</p>
  </div>
  <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
  </div>
</div>
   </>
  )
}

export default Context