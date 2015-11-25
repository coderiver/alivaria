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

	// canvas
	(function(){
		if($(window).width() < 767) {
			var $block 	= 	$('#scene');
				pos 	=	$block.offset();

			$block.css('top',-(pos.top));
		}
	})();
	// make photo
	var video = document.querySelector("#videoElement");
	 
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
	 
	if (navigator.getUserMedia) {       
	    navigator.getUserMedia({video: true}, handleVideo, videoError);
	}
	 
	function handleVideo(stream) {
	    video.src = window.URL.createObjectURL(stream);
	}
	 
	function videoError(e) {
	    // do something
	}
});