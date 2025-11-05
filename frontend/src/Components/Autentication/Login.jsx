import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { My_Context } from '../ContextFile/Context'

function Login() {
  let {LoginDatas,LoginToggler,setLoginToggler,LoginError,SetLoginError,LoginPass,setLoginPass,LoginUserName,setLoginUserName,LoginModal,LoginMessage}=useContext(My_Context)
  return (
    <>
    <section className='container-fluid' id='LoginCF'>
    <div className="container">
    <div className="row">
    
    <div className="col-lg-5 mx-auto">
    <div className="card">
    <h4 className='mx-auto d-block mt-3'>LOGIN HERE</h4>
    <div className="card-body">
    <form id='LoginForm' onSubmit={(e)=>LoginDatas(e)}>
    
    <div id='LoginUsername'>
    <label>ENTER YOUR NAME</label>
    <input type="text" className='form-control mt-3' onChange={(e)=>setLoginUserName(e.target.value)} />
    </div>

    <div id='LoginPassword'>
    <label>ENTER YOUR PASSWORD</label>
    <div className='input-group mt-3'>
    <input type={
      LoginToggler
      ?
      "text"
      :
      "password"
    } className='form-control' onChange={(e)=>setLoginPass(e.target.value)} />
    <span className='input-group-text'>
      {
        LoginToggler
        ?
        <i class="fa-solid fa-eye-slash"  onClick={()=>setLoginToggler(false)} ></i>
      :
       <i class="fa-solid fa-eye" onClick={()=>setLoginToggler(true)}></i> 
      }
    </span>
    </div>
    </div>

    <div className='text-center'>
    <p style={{color:"red", fontStyle:"italic"}}>{LoginError}</p>
    </div>
  
    <div>
    <input type="submit" className='btn btn-success d-block mx-auto'  value={"LOGIN"}/>
    </div>

    <div className='text-center'>
    <h6>DONT HAVE AN ACCOUNT ? <Link to={'/SignUp'}>CREATE A ACCOUNT</Link></h6>
    </div>

    </form>
    </div>
    </div>
    </div>

    </div>
    </div>
    </section>


     {/* LOGIN MODAL */}
  <div className="modal fade" ref={LoginModal}>
  <div className="modal-dialog">
  <div className="modal-content">
  <div className="modal-header">
  <h5  className="modal-title"></h5>
  <button type="button" className="btn-close" data-bs-dismiss="modal" ></button>
  </div>
  <div className="modal-body">
  <p className='d-block text-center' style={{color:"blue",fontStyle:"italic"}}>{`"${LoginMessage}"`}</p>
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

export default Login