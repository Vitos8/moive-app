import { FC, useState } from "react";
import "./Favourites.scss";
import Card from "../../components/CardSlider/Card";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Favourites: FC = () => {
	const favourites = useSelector((state:RootState) => state.movie.favourites); 
	const navigate = useNavigate();
	
	let onClickCard = (e:any, id:number) => {
		navigate('/Movie/' + id);
	}

     return (
          <div>
               <Header px={0} />
			<div className="favourites">
				<div className="container">
					<div className="favourites__row">
						{favourites && favourites.map((item:any) => (
							<Card item={item} type='movie' onClickCard={onClickCard} />
						))}
					</div>
				</div>
			</div>
               <Footer />
          </div>
     );
};

export default Favourites;
