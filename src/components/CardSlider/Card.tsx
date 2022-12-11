import React, { FC } from "react";
import './CardSlider.scss'

interface CardProps {
     item: any;
     type: string;
     onClickCard: (e: any, id: number) => void;
}

const Card: FC<CardProps> = ({ item, type, onClickCard }) => (
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
                         className="card__poster-heart"
                         alt="poster"
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
export default Card;
