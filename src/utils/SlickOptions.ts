import SliderArrow from "../components/Arrow/SliderArrow"

export const MainSliderSettings:any = {
	dots: false,
	infinite: true,
	vertical: true,
	verticalSwiping: true,
	swipeToSlide: true,
	autoplay: true,
	fade: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
}

export const CardSliderSettings:any = {
	arrows: true,
	dots: true,
	infinite: false,
	speed: 400,
	swipetoSlide: true,
	adaptiveHeight: true,
	slidesToShow: 4,
	slidesToScroll: 4,
	autoPlay: true,
	responsive: [
	{
		breakpoint: 1090,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			dots: true
	}
	},
	{
		breakpoint: 812,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
			initialSlide: 2
	}
	},
	{
		breakpoint: 540,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1
	}
	}
	]

}






