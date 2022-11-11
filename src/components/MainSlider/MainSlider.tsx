import React, { useEffect, useState} from 'react'
import "./MainSlider.scss";
import axios from 'axios';
import Slider from "react-slick";
import FilmService from '../../services/FilmService';

const MainSlider = () => {
	const [data, setData] = useState<any>([]);
  const newService = new FilmService();

  let fun = async () => {
    let results = await newService.getTrending();
    setData(results.slice(0,9))
  }

	useEffect(() => {
    fun()

	},[]);	
		
	const settings:any = {
		dots: false,
		infinite: true,
		vertical: true,
		verticalSwiping: true,
		swipeToSlide: true,
		autoplay: true,
		fade: true	,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	}

	return (
		<div className='main-slider '>
			<Slider {...settings} className='slider'  > 
			{data?.map((item:any) => (
				<div key={item.id} className='main-slider__row'>
					<img src={item.backdrop} alt="Poster" className="main-slider__image" />
					<div className="main-slider__container">
						<div className="main-slider__content" >
							<h3 className='main-slider__title'>{item?.title}</h3>
							<span className='main-slider__rate' >4.7</span>
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