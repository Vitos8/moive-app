import React, {FC, useState, useEffect, useRef} from 'react'
import "./CardSlider.scss";
import Slider from 'react-slick';
import { CardSliderSettings } from '../../utils/SlickOptions';
import FilmService from '../../services/FilmService';
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store';

interface CardProps {
	title: string
	type: string
	data: any
}

const CardSlider:FC<CardProps> = ({title, type, data}) => {
	let newService = new FilmService();
	let SliderRef = useRef<any>();


	return (
		<>
			<div className="card-slider container">
				<h3 className='card-slider__title'>{title}</h3>
				<div className="card-slider__more-row">
					<span className='card-slider__more'>See more</span>
					<img className='card-slider__more-img' src="seeMoreArrow.png" alt="arrow" />
				</div>
			</div>

			<div className="card-slick-slider container">
				<img src="LeftArrow.png" alt="Arrow" className="card-slider__prev-arrow" onClick={() => SliderRef.current.slickPrev()} />
				<img src="RightArrow.png" alt="Arrow" className="card-slider__next-arrow" onClick={() => SliderRef.current.slickNext()} />
				<Slider ref={SliderRef} {...CardSliderSettings} className=' container'>
				{data && data.map((item:any) => (
					<div className='card' key={item?.id}>
					<div className="card__poster">
						<img src={item?.poster} className='card__poster-img' alt="poster" />
						{type === 'movie' &&  <img src="heart.png" className='card__poster-heart' alt="poster" />}
					</div>
					{type === 'movie' ?
							<div className="card__info">
							<h5 className="card__title">{item?.title}</h5>
							<div className="card__info-row">
								<img src="IMDB.png" alt="IMDB" className='card__imdb'/>
								<div className="card__rate">{item?.rate}</div>
							</div>
						</div>
					:
					<h5 className="card__title">{item?.title}</h5>
					}
					</div>
					))}
				</Slider>
			</div>
		</>
	)
}

export default CardSlider
