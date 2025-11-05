import React, { useContext } from 'react'
import { My_Context } from '../ContextFile/Context'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../assets/app'
function SignUp() {
  let {setSignUpUserName,SignUpUserName,SignUpPass,setSignUpPass,SignUpEmail,setSignUpEmail,SignUpFn,ModelRef,SignModalMess,Err,SpassToggler,setSpassToggler,SignUpPhNo,setSignUpPhNo,SignUpGender,setSignUpGender,SignUpAddress,setSignUpAddress,SignUpImage,ProfileImageFn}=useContext(My_Context)

  
  return (
    <>
    <section className='container-fluid' id='SignUpCF'>
    <div className="container" id='SignUpContainer'>
    <div className="row" id='SignUprow'>
    
    <div className="col-lg-6 col-12 mx-auto">
    <div className="card" id='SignUpCard'>
    <h4 className='mx-auto mt-4'>CREATE ACCOUNT</h4>
    <div className="card-body" >
    <form id='SignUpForm' onSubmit={(e)=>SignUpFn(e)}>
    
  <div id='ProfileImageParent' className='d-flex flex-column gap-2'>
  <label htmlFor="">CHOOSE YOUR IMAGE:</label>
  <input type="file" hidden id='Profileimage'  onChange={(e)=>ProfileImageFn(e)}/>
  <label htmlFor="Profileimage">
  <div id='ProfileImage'>
  <img src={
    SignUpImage.length===0
    ?
    Images.ProfileImageDefault
    :
    SignUpImage
  } alt="" />
  </div>
  </label>
  </div>

    <div>
    <label>ENTER YOUR USERNAME:</label>
    <input type="text" className='form-control mt-2' onChange={(e)=>setSignUpUserName(e.target.value)} value={SignUpUserName} />
    </div>

    <div>
    <label>ENTER YOUR PASSWORD:</label>
    <div className='input-group mt-2' id='SignPassWord'>
    <input type={
      SpassToggler 
      ?
      "text"
      :
      "password"
    }className='form-control' onChange={(e)=>setSignUpPass(e.target.value)} value={SignUpPass} />
    <span className='input-group-text'>
    {
      SpassToggler 
      ? 
     <i class="fa-solid fa-eye-slash"  onClick={()=>setSpassToggler(false)} ></i>
      :
    <i class="fa-solid fa-eye" onClick={()=>setSpassToggler(true)}></i> 
    }
    </span>
    </div>
    </div>

    <div>
    <label>ENTER YOUR EMAIL:</label>
    <input type="email" className='form-control mt-2' onChange={(e)=>setSignUpEmail(e.target.value)} value={SignUpEmail} />
    </div>

    <div>
    <label>ENTER YOUR PHNO:</label>
    <input type="number" className='form-control mt-2' onChange={(e)=>setSignUpPhNo(e.target.value)} value={SignUpPhNo} />
    </div>

    <div>
    <label>ENTER YOUR GENDER:</label>
    <select onChange={(e)=>setSignUpGender(e.target.value)} className='mt-2 form-control'>
    <option hidden>SELECT</option>
    <option value="MALE">MALE</option>
    <option value="FEMALE">FEMALE</option>
    </select>
    </div>

    <div>
    <label>ENTER YOUR ADDRESS:</label>
    <input type="text" className='form-control mt-2' onChange={(e)=>setSignUpAddress(e.target.value)} value={SignUpAddress} />
    </div>

    <div className='text-center text-danger'>
    <p style={{fontStyle:"italic", fontWeight:"bold"}}>{Err}</p>
    </div>

    <div>
    <input type="submit" className='btn btn-primary d-block mx-auto' />
    </div>

    <div className='text-center'>
    <h6>ALREADY HAVE AN ACCOUNT ? <Link to={'/'} id='DontHaveAccount'>CLICK HERE</Link></h6>
    </div>
    
    </form>
    </div>
    </div>
    </div>

    </div>
    </div>
    </section>


    {/* MODAL POPUP */}
  <div className="modal fade" ref={ModelRef}>
  <div className="modal-dialog">
  <div className="modal-content">
  <div className="modal-header">
  <h5  className="modal-title"></h5>
  <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
  </div>
  <div className="modal-body">
  <h5>{SignModalMess}</h5>
  </div>
  <div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

  </div>
  </div>
  </div>
  </div>
    </>
  )
}

export default SignUp