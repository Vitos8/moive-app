import { useEffect } from "react";
import "./Home.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from '../../firebase'
import {useDispatch, useSelector } from 'react-redux'
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


     
     useEffect(() => {
          dispatch(fetchTrending());
          dispatch(fetchPopular());
          dispatch(fetchPeople());
          dispatch(fetchNew());
     },[])

     return (
          <div className="home">
               <Header px={100}/>
               <MainSlider/>               
               <CardSlider title="Featured Movie" type="movie" data={popularMovies} /> 
               <CardSlider title="New Arrival" type="movie" data={newMovies} /> 
               <CardSlider title="Featured actors" type="people" data={people}  /> 
               <Footer/>
          </div>
     )
}

export default Home