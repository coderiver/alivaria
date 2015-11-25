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
    (function() {
        if ($(window).width() < 767) {
            var $block = $('#scene');
            pos = $block.offset();

            $block.css('top', -(pos.top));
        }
    })();
    // make photo
    (function() {
        if ($('.js-make-photo').length) {
	        window.addEventListener("DOMContentLoaded", function() {
                $('.js-webcam').on('click', function() {
                    $('.js-make-photo').fadeIn('fast');
                    // Put event listeners into place
                    // Grab elements, create settings, etc.
                    var canvas = document.getElementById("canvas"),
                        // context = canvas.getContext("2d"),
                        video = document.getElementById("video-screen"),
                        videoObj = {
                            "video": true
                        },
                        errBack = function(error) {
                            console.log("Video capture error: ", error.code);
                        };

                    // Put video listeners into place
                    if (navigator.MediaStream) { // Standard
                        navigator.getUserMedia(videoObj, function(stream) {
                            video.src = stream;
                            video.play();
                        }, errBack);
                    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
                        navigator.webkitGetUserMedia(videoObj, function(stream) {
                            video.src = window.URL.createObjectURL(stream);
                            video.play();
                        }, errBack);
                    } else if (navigator.mozGetUserMedia) { // WebKit-prefixed
                        navigator.mozGetUserMedia(videoObj, function(stream) {
                            video.src = window.URL.createObjectURL(stream);
                            video.play();
                        }, errBack);
                    }

                    // Trigger photo take
                    document.querySelector(".js-make-photo").addEventListener("click", function() {
                        // context.drawImage(video, 0, 0, 640, 480);
                    });
                });
	        }, false);
        }
    })();
    // show webcam


    $('.js-photo').on('click', function() {
        $('.js-make-photo').fadeOut('fast');
    });
});
