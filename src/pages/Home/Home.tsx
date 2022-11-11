import { useEffect } from "react";
import "./Home.scss";
import { query, collection, getDocs, where } from "firebase/firestore";
import {db} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'
import { setUser } from "../../store/userSlcie/userSlice";
import {useDispatch } from 'react-redux'
import { RootState } from "../../store/store";
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MainSlider from "../../components/MainSlider/MainSlider";

const Home = () => {
     const [user] = useAuthState(auth);
     const dispatch = useDispatch()
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
          //if (!user) return navigate('/SignUp');
          fetchUserName();
     },[user]);

     return (
          <div className="home">
               <Header/>
               <MainSlider/>               
               <Footer/>
          </div>
     )
}

export default Home