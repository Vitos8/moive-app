import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchNew, fetchPeople, fetchPopular } from "../../store/movieSclice/movieSlice";
import "./CardsPage.scss";
import { useLocation } from "react-router-dom";
import Card from "../../components/CardSlider/Card";
import "../../components/CardSlider/CardSlider.scss";
import { useNavigate } from "react-router-dom";
import path from "path";

const CardsPage = () => {
     const { pathname } = useLocation();
	const newMovies = useSelector((state:RootState) =>  state.movie.new);
	const popularMovies = useSelector((state:RootState) =>  state.movie.popular);
	const people = useSelector((state:RootState) => state.movie.people);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	useEffect(() => {
		pathname.includes('Featured') ?  dispatch(fetchPopular(1)) :  pathname.includes('People') ? dispatch(fetchPeople())  :  dispatch(fetchNew(1));
		window.scrollTo({ top: 0 });
	},[])
	
     let onClickCard = (e:any, id:number) => {
		if (pathname.includes('People')) {
			return;
		}
		navigate('/Movie/' + id);
	};

	

     return (
          <div className="cards">
               <Header px={0} />
               <div className="container">
                    <h2 className="cards__title">{pathname.slice(8) + ' Movies'}</h2>
                    <div className="cards__row">
					{pathname.includes('Featured') &&
					popularMovies?.map((item:any) => (
						<Card key={item.id} item={item} type={'movie'} onClickCard={onClickCard} />
					))}
					{pathname.includes('People') && 						
						people?.map((item:any) => (
						<Card key={item.id} item={item} type={'people'} onClickCard={onClickCard} />
					))}		
					{pathname.includes('New-Arrival') && 
					newMovies?.map((item:any) => (
						<Card key={item.id} item={item} type={'movie'} onClickCard={onClickCard} />
					))}
				</div>
               </div>
               <Footer />
          </div>
     );
};

export default CardsPage;
