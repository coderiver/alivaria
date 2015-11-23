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
		var $parent = $(this).parents('.js-file'),
			$input = $parent.find("input[type='file']");
		$('#file-photo').trigger('click');
	});

});