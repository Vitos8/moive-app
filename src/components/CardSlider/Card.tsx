import { FC, useEffect, useState } from "react";
import "./CardSlider.scss";
import { onSucces, onError, onSuccesFavourite } from "../../utils/toasts";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
     onLikeMovie,
     onAddToFavourite,
} from "../../store/movieSclice/movieSlice";
import firebase from '@firebase/app';


interface CardProps {
     item: any;
     type: string;
     favourites?: any;
     onClickCard: (e: any, id: number) => void;
     onClickedLike?: any;
}

const Card: FC<CardProps> = ({ item, type, onClickCard, favourites, onClickedLike }) => {
     const [liked, setLiked] = useState<boolean>(false);
     const dispatch = useDispatch<AppDispatch>();

     useEffect(() => {
          const checkLiked =favourites && favourites.find((movie: any) => item.id === movie.id);          
          setLiked(checkLiked  ? true : false);
     }, []);

     const onHandleLike = async (e: any) => {
          e.stopPropagation();
          onClickedLike()
          await deleteDoc(doc(db, "favourites", item.id));
          //if (liked) {
          //     setLiked(false);
          //}    
          //await addDoc(collection(db, "favourites"), item);
          //setLiked(true);
          //onSuccesFavourite("The movie added to Favourites !");
     };
//console.log(favourites);

     return (
          <div
               className="card"
               key={item?.id}
               onClick={(e: any) => onClickCard(e, item.id)}>
               <div className="card__poster">
                    <img
                         src={item?.poster}
                         className="card__poster-img"
                         alt="poster"
                    />
                    {type === "movie" && (
                         <img
                              src={require("../../assets/heart.png")}
                              className={`card__poster-heart  ${
                                   liked ? "card__poster-heart-active" : ""
                              }`}
                              alt="poster"
                              onClick={(e) => onHandleLike(e)}
                         />
                    )}
               </div>
               {type === "movie" ? (
                    <div className="card__info">
                         <h5 className="card__title">{item?.title}</h5>
                         <div className="card__info-row">
                              <img
                                   src={require("../../assets/IMDB.png")}
                                   alt="IMDB"
                                   className="card__imdb"
                              />
                              <div className="card__rate">{item?.rate}</div>
                         </div>
                    </div>
               ) : (
                    <h5 className="card__title">{item?.title}</h5>
               )}
          </div>
     );
};
export default Card;
