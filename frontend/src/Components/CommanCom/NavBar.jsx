import React, { useContext, useState } from 'react'
import { My_Context } from '../ContextFile/Context';
import { Images } from '../../assets/app.js';


function NavBar() {

 let {LogOut,ProfileDats}=useContext(My_Context)
 let DATE=new Date()
 let TodayDate=DATE.toLocaleDateString()
 let [CurrentTime,setCurrentTime]=useState('')

 setInterval(() => {
  let DateTimes=new Date()
  let CurrentTimes=DateTimes.toLocaleTimeString()
  setCurrentTime(CurrentTimes)
 }, 1000);


return (
<>
<section className='container-fluid p-3' id='NavbarCF'>
<div className="container" id='NavbarContainer'>

<div id='Brand'>
<h3 className='d-none d-lg-block'>TASK MANAGER</h3>

</div>

<div id='DateTime'>
<p>{TodayDate}</p>
<p>{CurrentTime}</p>
</div>

<div id='UserAccount' data-bs-toggle='modal' data-bs-target="#UserDetails">
<i class="fa-solid fa-user"></i>
</div>

<div id='LogoutBtn'>
<button className='btn btn-danger' onClick={LogOut}>LOG-OUT</button>
</div>

</div>
</section>

  <div className="modal fade" id='UserDetails'>
  <div className="modal-dialog">
  <div className="modal-content">
  <div className="modal-header">
  <h5  className="modal-title">YOUR PROFILE</h5>
  <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
  </div>
  <div className="modal-body d-flex flex-column gap-4" >
  
  <div id='ProfilePicInside'>
  <img src={ProfileDats.SignUpImage}/>
  </div>
 

  <div className='d-flex flex-column gap-2'>
  <label>USERNAME:</label>
  <h6>{ProfileDats.SignUpUserName.toUpperCase()}</h6>
  </div>

  <div className='d-flex flex-column gap-2'>
  <label>GMAIL:</label>
  <h6>{ProfileDats.SignUpEmail.toUpperCase()}</h6>
  </div>

  <div className='d-flex flex-column gap-2'>
  <label>PHNO:</label>
  <h6>{ProfileDats.SignUpPhNo}</h6>
  </div>

  <div className='d-flex flex-column gap-2'>
  <label>GENDER:</label>
  <h6>{ProfileDats.SignUpGender.toUpperCase()}</h6>
  </div>

  <div className='d-flex flex-column gap-2'>
  <label>ADDRESS:</label>
  <p>{ProfileDats.SignUpAddress.toUpperCase()}</p>
  </div>

  </div>
  <div className="modal-footer">
  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>



  </div>
  </div>
  </div>
  </div>
    </>
  )
}

export default NavBar