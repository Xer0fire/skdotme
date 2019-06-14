/*!

 *********************************************************
 * skdotme - CV / Portfolio One page template
 *********************************************************

 * Copyright (c) 2019 Steven Kidd | http://stevenkidd.me
 * The MIT License (MIT) - See LICENSE for more information

 *********************************************************

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var transparent = true;

var navbar_initialized,
	backgroundOrange = false,
	toggle_initialized = false;

var skdotme,
	$navbar,
	scroll_distance,
	oVal;

$(document).ready(function() {

	// Activate the image for the navbar-collapse
	skdotme.initNavbarImage();

	$navbar = $('.navbar[color-on-scroll]');
	scroll_distance = $navbar.attr('color-on-scroll') || 300;

	// Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

	if ($('.navbar[color-on-scroll]').length != 0) {
		skdotme.checkScrollForTransparentNavbar();
		$(window).on('scroll', skdotme.checkScrollForTransparentNavbar)
	}

	$('#mycarousel').carousel({
		interval: 10000
	})

	$('.carousel .carousel-item').each(function(){
		var next = $(this).next();
		if (!next.length) {
		next = $(this).siblings(':first');
		}
		next.children(':first-child').clone().appendTo($(this));
	});

	$('.card-body').matchHeight();

	particlesJS('particles-js',
		{
		"particles": {
			"number": {
			"value": 150,
			"density": {
				"enable": true,
				"value_area": 3000
			}
			},
			"color": {
			"value": ["#f96332", "#fdba16", "#ffc800", "#ee5f0d"]
			},
			"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#000000"
			},
			"polygon": {
				"nb_sides": 5
			}
			},
			"opacity": {
			"value": 0.5,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
			},
			"size": {
			"value": 8,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 40,
				"size_min": 1,
				"sync": false
			}
			},
			"line_linked": {
			"enable": true,
			"distance": 200,
			"color": "#fff",
			"opacity": 0.4,
			"width": 2
			},
			"move": {
			"enable": true,
			"speed": 4,
			"direction": "none",
			"random": true,
			"straight": false,
			"out_mode": "out",
			"attract": {
				"enable": true,
				"rotateX": 3000,
				"rotateY": 1500
			}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
			"onhover": {
				"enable": false,
				"mode": "repulse"
			},
			"onclick": {
				"enable": true,
				"mode": "push"
			},
			"resize": true
			},
			"modes": {
			"grab": {
				"distance": 400,
				"line_linked": {
				"opacity": 1
				}
			},
			"bubble": {
				"distance": 400,
				"size": 40,
				"duration": 2,
				"opacity": 8,
				"speed": 3
			},
			"repulse": {
				"distance": 200
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
			}
		},
		"retina_detect": true
		}
	);

	 $('.navbar-nav a, .header-scroll-down').click(function(){
			var href= $(this).attr('href');
			$.scrollTo( href, 800, {
					offset: -40 //use this to position the window exactly where you want
			});
			return false;
	 });

});

$(window).on('resize', function() {
	skdotme.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
	$toggle = $(this);

	if (skdotme.misc.navbar_menu_visible == 1) {
		$('html').removeClass('nav-open');
		skdotme.misc.navbar_menu_visible = 0;
		$('#bodyClick').remove();
		setTimeout(function() {
			$toggle.removeClass('toggled');
		}, 550);
	} else {
		setTimeout(function() {
			$toggle.addClass('toggled');
		}, 580);
		div = '<div id="bodyClick"></div>';
		$(div).appendTo('body').click(function() {
			$('html').removeClass('nav-open');
			skdotme.misc.navbar_menu_visible = 0;
			setTimeout(function() {
				$toggle.removeClass('toggled');
				$('#bodyClick').remove();
			}, 550);
		});

		$('html').addClass('nav-open');
		skdotme.misc.navbar_menu_visible = 1;
	}
});

skdotme = {
	misc: {
		navbar_menu_visible: 0
	},

	checkScrollForTransparentNavbar: debounce(function() {
		if ($(document).scrollTop() > scroll_distance) {
			if (transparent) {
				transparent = false;
				$('.navbar[color-on-scroll]').removeClass('navbar-transparent');
			}
		} else {
			if (!transparent) {
				transparent = true;
				$('.navbar[color-on-scroll]').addClass('navbar-transparent');
			}
		}
	}, 17),

	initNavbarImage: function() {
		var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
		var background_image = $navbar.data('nav-image');

		if (background_image != undefined) {
		$navbar.css('background', "")
			.attr('data-nav-image', '' + background_image + '')
			.css('background-size', "")
			.removeClass('has-image');
		}
	}
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};