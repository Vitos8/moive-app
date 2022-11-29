import React, { useEffect, useState, useRef} from 'react'
import "./MainSlider.scss";
import Slider from "react-slick";
import { MainSliderSettings } from '../../utils/SlickOptions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';


const MainSlider = () => {
	let trending = useSelector((state:RootState) => state.movie?.trending);
	let navigate = useNavigate();

	return (
		<div className='main-slider '>
			<Slider {...MainSliderSettings} className='slider'  > 
			{trending?.map((item:any) => (
				<div key={item.id} className='main-slider__row' >
					<img src={item.backdrop} alt="Poster" className="main-slider__image" />
					<div className="main-slider__container">
						<div className="main-slider__content" >
							<h3 className='main-slider__title'>{item?.title}</h3>
							<span className='main-slider__rate' >{item?.rate.toFixed(1)}</span>
							<p className="main-slider__subtitle">{item?.description}</p>
							<button className='main-slider__btn' onClick={() => navigate('/Movie/' + item.id)} >Watch trailer</button>
						</div>	
					</div>
				</div>
			))}
			</Slider>
		</div>
	)
}

export default MainSlider