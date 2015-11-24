$(document).ready(function() {
	// slider on welcome page
	$(".js-data-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		dots: true,
		arrows: false,
		adaptiveHeight: true
	});
	
	// upload file on service
	$('.js-upload').on('click', function() {
		$('#file-photo').trigger('click');
	});

	// // active cover
	// (function() {
	// 	if($(window).width() < 768) {
	// 		$('.js-show-cover').on('click', function() {
	// 			$('.js-cover').addClass('is-active');
	// 		});
	// 		$('.js-hide-cover').on('click', function() {
	// 			$('.js-cover').removeClass('is-active');
	// 		});
	// 	}
	// })();

});