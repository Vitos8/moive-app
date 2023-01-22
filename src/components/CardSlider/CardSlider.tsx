import { FC, useEffect, useRef, useState } from "react";
import "./CardSlider.scss";
import Slider from "react-slick";
import { CardSliderSettings } from "../../utils/SlickOptions";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase";

interface CardProps {
     title: string;
     type: string;
     data: any;
}

const CardSlider: FC<CardProps> = ({ title, type, data }) => {
     const [favourites, setFavourites] = useState<any>([]);
     const [clickedLike, setClickedLike] = useState<number>(0);
     let SliderRef = useRef<any>();
     let navigate = useNavigate();

     let onClickCard = (e: any, id: number) => {
          if (type === "movie") {
               navigate("/Movie/" + id);
          }
     };

     let onClickedLike = () => {
          setClickedLike((like) => like  + 1)
     }

     const fetchUserFavourites = async () => {
          try {
               const q = query(collection(db, "favourites"));
               const doc = await getDocs(q);
               const data = doc.docs.map((item: any) => item.data());
               setFavourites(data);
          } catch (err) {
               console.error(err);
          }
     };

     const seeMoreRoute = title.includes("Movie")
          ? "/Movies/Featured"
          : title.includes("actors")
          ? "/Movies/People"
          : "/Movies/New-Arrival";

     useEffect(() => {
          fetchUserFavourites();
     }, []);

     useEffect(() => {
          fetchUserFavourites();
     }, [clickedLike]);

     return (
          <>
               <div className="card-slider container">
                    <h3 className="card-slider__title">{title}</h3>
                    <div
                         className="card-slider__more-row"
                         onClick={() => navigate(seeMoreRoute)}>
                         <span className="card-slider__more">See more</span>
                         <img
                              className="card-slider__more-img"
                              src={require("../../assets/seeMoreArrow.png")}
                              alt="arrow"
                         />
                    </div>
               </div>

               <div className="card-slick-slider container">
                    <img
                         src={require("../../assets/LeftArrow.png")}
                         alt="Arrow"
                         className="card-slider__prev-arrow"
                         onClick={() => SliderRef.current.slickPrev()}
                    />
                    <img
                         src={require("../../assets/RightArrow.png")}
                         alt="Arrow"
                         className="card-slider__next-arrow"
                         onClick={() => SliderRef.current.slickNext()}
                    />
                    <Slider
                         ref={SliderRef}
                         {...CardSliderSettings}
                         className=" container">
                         {data &&
                              data.map((item: any) => (
                                   <Card
                                        item={item}
                                        type={type}
                                        onClickCard={onClickCard}
                                        favourites={favourites}
                                        onClickedLike={onClickedLike}
                                   /> 
                              ))}
                    </Slider>
               </div>
          </>
     );
};

export default CardSlider;
