import React, {FC, useState, useEffect} from 'react'
import "./CardSlider.scss";
import Slider from 'react-slick';
import { CardSliderSettings } from '../../utils/SlickOptions';
import FilmService from '../../services/FilmService';

interface CardProps {
	title: string
	type: string
}

const CardSlider:FC<CardProps> = ({title}) => {
	const [data, setData] = useState<any>([]);
	let newService = new FilmService();

	let loadData =async () => {
		let result = await newService.getPopular();		
		setData(result);
	}
	
	useEffect(() => {
		loadData();
	},[])


	return (
		<>
			<div className="card-slider container">
				<h3 className='card-slider__title'>{title}</h3>
				<span className='card-slider__more'>See more</span>
			</div>
			<Slider {...CardSliderSettings} className='card-slick-slider container'>
				{data && data.map((item:any) => (
					<div className='card'>
					<div className="card__poster">
						<img src={item?.poster} className='card__poster-img' alt="poster" />
						<img src="heart.png" className='card__poster-heart' alt="poster" />
					</div>
					<div className="card__info">
						<h5 className="card__title">{item?.title}</h5>
						<div className="card__info-row">
							<img src="IMDB.png" alt="IMDB" className='card__imdb'/>
							<div className="card__rate">{item?.rate}</div>
						</div>
					</div>
				</div>
				))}
			</Slider>
		</>
	)
}

export default CardSlider