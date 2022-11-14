import React, { useEffect, useState} from 'react'
import "./MainSlider.scss";
import Slider from "react-slick";
import FilmService from '../../services/FilmService';
import { MainSliderSettings } from '../../utils/SlickOptions';

const MainSlider = () => {
	const [data, setData] = useState<any>([]);
	const newService = new FilmService();

	let fun = async () => {
		let results = await newService.getTrending();
		setData(results.slice(0,8))
	}

	useEffect(() => {
		fun();		
	},[]);	

	return (
		<div className='main-slider '>
			<Slider {...MainSliderSettings} className='slider'  > 
			{data?.map((item:any) => (
				<div key={item.id} className='main-slider__row'>
					<img src={item.backdrop} alt="Poster" className="main-slider__image" />
					<div className="main-slider__container">
						<div className="main-slider__content" >
							<h3 className='main-slider__title'>{item?.title}</h3>
							<span className='main-slider__rate' >{item?.rate}</span>
							<p className="main-slider__subtitle">{item?.description}</p>
							<button className='main-slider__btn'>Watch trailer</button>
						</div>	
					</div>
				</div>
			))}
			</Slider>
		</div>
	)
}

export default MainSlider