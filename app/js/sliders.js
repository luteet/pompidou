export default function sliders() {
	document.querySelectorAll('.carousel__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "loop",
			
			autoWidth: true,
			perMove: 1,
			gap: "1.25rem",
			speed: 700,

			pagination: false,
			arrows: false,

			autoScroll: {
				speed: 1,
				pauseOnHover: true,
			},

			intersection: {
				inView: {
					autoScroll: {
						speed: 1,
					},
				},
				outView: {
					autoScroll: {
						speed: 0,
					},
				},
			},
	
			breakpoints: {
				992: {
					destroy: sliderElement.closest(".carousel__wrapper_block.is-min") ? false : true,
					gap: 7,
				},
			}
	
		});
	
		slider.mount(window.splide.Extensions);
	
	})

	document.querySelectorAll('.best_brands__block').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "loop",
			
			//autoWidth: true,
			perPage: 4,
			perMove: 1,
			gap: 0,

			pagination: false,
			arrows: false,

			autoScroll: {
				speed: 1,
			},

			intersection: {
				inView: {
					autoScroll: {
						speed: 1,
					},
				},
				outView: {
					autoScroll: {
						speed: 0,
					},
				},
			},
	
			breakpoints: {
				992: {
					destroy: true,
				},
			}
	
		});
	
		slider.mount(window.splide.Extensions);
	
	})

	document.querySelectorAll('.product__gallery').forEach(sliderElement => {

		const navSlider = new Splide(sliderElement.parentElement.querySelector(".product__gallery_nav"), {
	
			perPage: 1,
			isNavigation: true,

			pagination: false,
			arrows: false,

			direction: 'ttb',
			height: "50rem",
			autoHeight: true,
	
		});
	
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			perPage: 1,

			pagination: false,
			arrows: false,
	
			breakpoints: {
	
				550: {
					pagination: true,
				}
			}
	
		});
	
		slider.sync(navSlider);
		slider.mount();
		navSlider.mount();
	
	})

	document.querySelectorAll('.cart_popup__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			autoWidth: true,
			gap: "1.25rem",
			speed: 700,

			arrows: false,
			pagination: false,
	
			breakpoints: {
	
				550: {
					gap: "0.4375rem",
				}
			}
	
		});
	
		slider.mount();
	
	})
}