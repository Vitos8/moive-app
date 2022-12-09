import React,{useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from "./pages/Home/Home"
import { ToastContainer} from 'react-toastify';
import CardPage from './pages/CardPage/CardPage';
import { query, collection, getDocs, where } from "firebase/firestore";
import {db} from "./firebase";
import { setUser } from "./store/userSlice/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from './firebase'
import { AppDispatch } from "./store/store";
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

let  App = () => {
     const [user] = useAuthState(auth);
     const dispatch = useDispatch<AppDispatch>()
     let navigate = useNavigate();

     const fetchUserName = async () => {
          try {
               const q = query(collection(db, "users"), where("uid", "==", user?.uid));
               const doc = await getDocs(q);
               const data = doc.docs[0].data();
               dispatch(setUser(data))          
          
          } catch (err) {
               console.error(err);
          }
     };

     useEffect(() => {
          if (!user) return navigate('/SignUp');
          fetchUserName();
     },[user])     

     return (
          <div className="App">
               <Routes>
                    <Route path='/'  element={<Home/>} />
                    <Route path='/SignUp'  element={<SignUp/>} />
                    <Route path='/Login'  element={<Login/>} />
                    <Route path='/Movie/:id'  element={<CardPage/>} />
               </Routes>
               <ToastContainer limit={1} />
          </div>     
     );   
}

export default App;
