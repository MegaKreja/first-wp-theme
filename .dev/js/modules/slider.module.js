var sliderModule = (function($){
	var $heroSlider = $(".hero-slider"),
	$aboutSlider = $(".about-us-slider"),
	$committeeSlider = $(".acommittee_slider-wrap"),
	$hSlider = undefined,
	$aSlider = undefined,
	initHeroSlider = function(){
	  	$hSlider = $heroSlider.slick({
			infinite: true,
			slidesToShow: 1,
			arrows: false,
			dots: true,
			autoplay: true,
			autoplaySpeed: 5000,
			fade: true,
			speed: 2000,
			pauseOnHover: false
		});
	},
	initAboutSlider = function(){
		$aSlider = $aboutSlider.slick({
			infinite: true,
			slidesToShow: 1,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 3000,
			fade: true,
			speed: 2000,
		});
	},
	initCommitteeSlider = function(){
		$cSlider = $committeeSlider.slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			prevArrow: $('.acommittee_slider-prev'),
			nextArrow: $('.acommittee_slider-next'),
			arrows: true,
			autoplay: false,
			autoplaySpeed: 8000,
			speed: 2000,
			pauseOnHover: true,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						speed: 1000
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						speed: 500
					}
				}
			]
		});
	};

	if($heroSlider.length){
		initHeroSlider();
	}
	if($aboutSlider.length){
		initAboutSlider();
	}
	if($committeeSlider.length){

		// re-bind thumbnail click function after actionCommittee slider re-orders based on a new window width
		// must be declared before slider init functiom
		$committeeSlider.on('breakpoint', function(event, slick){
			actionCommitteeModule.bindThumbnailClick();
		});

		// init slider
		initCommitteeSlider();
	}

})(jQuery);