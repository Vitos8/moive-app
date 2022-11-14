import React,{useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Home/Home"
import { ToastContainer} from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";




let  App = () => {




     return (
          <div className="App">
               <Routes>
                    <Route path='/'  element={<Home/>} />
                    <Route path='/SignUp'  element={<SignUp/>} />
                    <Route path='/Login'  element={<Login/>} />
               </Routes>
               <ToastContainer limit={1} />
          </div>     
     );   
}

export default App;
