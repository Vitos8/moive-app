
export const MainSliderSettings:any = {
	dots: false,
	infinite: true,
	vertical: true,
	verticalSwiping: true,
	swipeToSlide: true,
	autoplay: true,
	fade: true,
	autoPlaySpeed: 5000,
	speed: 1500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	pauseOnHover: false
}

export const CardSliderSettings:any = {
	arrows: false,
	dots: true,
	infinite: true,
	speed: 700,
	swipetoSlide: true,
	adaptiveHeight: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
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






