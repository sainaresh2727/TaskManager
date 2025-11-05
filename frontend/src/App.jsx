import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Components/Autentication/Login'
import SignUp from './Components/Autentication/SignUp'
import Context from './Components/ContextFile/Context'
import NavBar from './Components/CommanCom/NavBar'
import MainPage from './Pages/MainPage'
import Protect from './Components/Protect/Protect'
function App() {
  return (
  <>
  <BrowserRouter>
  <Context>
  <Routes>
  <Route path='/' element={ <Login/>}/>
  <Route path='/SignUp' element={<SignUp/>}/>
  <Route path='/Home' element={<Protect><MainPage/></Protect>}/>
  </Routes>
  </Context>
  </BrowserRouter>
  </>
  )
}

export default App