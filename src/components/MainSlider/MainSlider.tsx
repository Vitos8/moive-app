import React, { useEffect, useState} from 'react'
import "./MainSlider.scss";
import axios from 'axios';
import Slider from "react-slick";

const MainSlider = () => {
	const [data, setData] = useState<any>([]);

	//436270
	https://api.themoviedb.org/3/movie/663712/videos?api_key=78344cc52075651890081958533e809c&language=en-US

	//https://api.themoviedb.org/3/trending/movie/week?api_key=f2806dca9da61eeec0705fa9fceccb1a
	//https://api.themoviedb.org/3/movie/ 436270/similar?api_key=f2806dca9da61eeec0705fa9fceccb1a&language=en-US&page=5
		useEffect(() => {
		axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=f2806dca9da61eeec0705fa9fceccb1a').then((res:any) => {
		let results = res?.data?.results.slice(0, 6);
		setData(results)
		})
	},[]);
	console.log(data);
	
		
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

	let imgPath ="https://image.tmdb.org/t/p/original/";

	return (
		<div className='main-slider '>
			<Slider {...settings} className='slider'  > 
			{data?.map((item:any) => (
				<div key={item.id} className='main-slider__row'>
					<img src={imgPath + item.backdrop_path} alt="Poster" className="main-slider__image" />
					<div className="main-slider__container">
						<div className="main-slider__content" >
							<h3 className='main-slider__title'>{item?.title}</h3>
							<span className='main-slider__rate' >4.7</span>
							<p className="main-slider__subtitle">{item?.overview}</p>
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