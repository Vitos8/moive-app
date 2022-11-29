import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import "./CardPage.scss";
import "../../components/CardSlider/CardSlider.scss"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchById, fetchSimiliar, fetchVideo} from '../../store/movieSclice/movieSlice';
import { AppDispatch, RootState } from "../../store/store";
import CardSlider from '../../components/CardSlider/CardSlider';
import Trailer from './Trailer';

const CardPage = () => {
     const [genres, setGenres] = useState<any>([]);
     let card = useSelector((state:RootState) => state.movie.movieById);
     let similiar = useSelector((state:RootState) => state.movie.similiar);
     let video = useSelector((state:RootState) => state.movie.videos);
     const { pathname } = useLocation();
     const dispatch = useDispatch<AppDispatch>()
     let id = +pathname.slice(7);    

     console.log(video[0]?.src);
     
     useEffect(() => {
          dispatch(fetchById(id)) ;
          dispatch(fetchSimiliar(id));
          dispatch( fetchVideo(id));
          setGenres(card && card.genres)
          window.scrollTo({top: 0,});
     },[id]);     

     return (
          <div className='card-page'>
               <Header px={0}/> 
               <div className="">
                    <div className="container">
                         <div className="card-page__row">
                              <div className="card__poster">
                                   <img className='card__poster-img card-page__img'  src={card?.poster} alt="Poster" />
                                   <img className='card__poster-heart card-page__heart' src={require('../../assets/heart.png')} alt="heart" />
                              </div>
                              <div className="card-page__content">
                                   <h3 className='card-page__title'>{card?.title}</h3>
                                   <div className="card-page__text">{card?.description}</div>
                                   <div className="card-page__content-row">
                                        <div style={{display: 'flex', alignItems:'center', columnGap: '20px'}}>
                                             <img className='card-page__imdb' src={require('../../assets/IMDB.png')} alt="IMDB" />
                                             <span className='card-page__rate' >{card?.rate}</span>
                                        </div>
                                        <ul className='card-page__genres' >
                                             {genres && genres.map((item:any) => (
                                                  <span key={item?.id} className='card-page__genre' >{item?.name}, </span>
                                             ))}
                                        </ul>
                                   </div>
                              </div>
                         </div>
                         <Trailer src={video[0]?.src}/>
                    </div>
               </div>
               <div className="card-page__similar">
                    <CardSlider title='Similiar movies' type='movie' data={similiar} />
               </div>
               <Footer/>
          </div>
     )
}

export default CardPage