import { useEffect } from "react";
import "./Home.scss";
import { query, collection, getDocs, where } from "firebase/firestore";
import {db} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'
import { setUser } from "../../store/userSlice/userSlice";
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MainSlider from "../../components/MainSlider/MainSlider";
import CardSlider from "../../components/CardSlider/CardSlider";
import { fetchPopular } from "../../store/movieSclice/movieSlice";
import { fetchTrending } from "../../store/movieSclice/movieSlice";
import { fetchPeople } from "../../store/movieSclice/movieSlice";
import { fetchNew } from "../../store/movieSclice/movieSlice";
import { AppDispatch, RootState } from "../../store/store";

const Home = () => {
     const [user] = useAuthState(auth);
     let people = useSelector((state:RootState) => state.movie?.people)
     let newMovies = useSelector((state:RootState) => state.movie?.new)
     let popularMovies = useSelector((state:RootState) => state.movie?.popular)
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
          dispatch(fetchTrending());
          dispatch(fetchPopular());
          dispatch(fetchPeople());
          dispatch(fetchNew());
     },[])

     useEffect(() => {
               if (!user) return navigate('/SignUp');
               fetchUserName();
     },[user]);

     return (
          <div className="home">
               <Header/>
               <MainSlider/>               
               <CardSlider title="Featured Movie" type="movie" data={popularMovies} /> 
               <CardSlider title="New Arrival" type="movie" data={newMovies} /> 
               <CardSlider title="Featured actors" type="people" data={people}  /> 
               <Footer/>
          </div>
     )
}

export default Home