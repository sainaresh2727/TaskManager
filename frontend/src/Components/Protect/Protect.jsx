import React from 'react'
import { Navigate } from 'react-router-dom'

function Protect({children}) {
  let GettingRealUser=localStorage.getItem("UserName")
  if(!GettingRealUser){
    return <Navigate to={'/'}/>
  }
  else{
    return children
  }
  return (
    <>
    
    </>
  )
}

export default Protect