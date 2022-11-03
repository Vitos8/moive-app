import React,{useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Home/Home"
import { ToastContainer} from 'react-toastify';

let  App = () => {
     return (
          <div className="App">
               <Routes>
                    <Route path='/'  element={<Home/>} />
                    <Route path='/SignUp'  element={<SignUp/>} />
                    <Route path='/Login'  element={<Login/>} />
               </Routes>
               <ToastContainer/>
          </div>     
     );   
}

export default App;
