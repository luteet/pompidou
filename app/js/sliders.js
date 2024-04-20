export default function sliders() {

	
	// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-
	
	const getDeviceType = () => {
	
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			return "tablet";
		}
	
		if (
			/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
			)
		) {
			return "mobile";
		}
		return "desktop";
	
	};
	
	// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-
	

	document.querySelectorAll('.carousel__slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "loop",
			
			autoWidth: true,
			perMove: 1,
			gap: "1.25rem",
			speed: 700,
			//waitForTransition: true,
			

			pagination: false,
			arrows: false,

			autoScroll: {
				speed: 0,
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
					flickPower: 100,
					speed: 400,
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
				speed: 0,
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
			speed: 700,
	
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

	document.querySelectorAll('.product_card__gallery_main').forEach(sliderElement => {

		const navSliderElement = sliderElement.closest(".product_card__gallery").querySelector(".product_card__gallery_nav");
		let navSlider;
		if(navSliderElement) {
			navSlider = new Splide(sliderElement.closest(".product_card__gallery").querySelector(".product_card__gallery_nav"), {
				perPage: sliderElement.querySelectorAll(".splide__slide").length,
				gap: "0.25rem",
				isNavigation: true,
	
				arrows: false,
				pagination: false,
			})

			sliderElement.parentElement.addEventListener("mouseleave", () => {
				if(getDeviceType() == "desktop") {
					slider.go(0);
				}
			})
	
			sliderElement.closest(".product_card__gallery").querySelectorAll(".product_card__gallery_nav .splide__slide").forEach((slide, index) => {
				slide.addEventListener("mouseenter", () => {
					if(getDeviceType() == "desktop") {
						slider.go(index);
					}
				})
			})
		}
	
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			perPage: 1,
			speed: 500,
			arrows: false,
			pagination: false,
	
			/* breakpoints: {
				992: {
					// params
				},
	
				550: {
					// params
				}
			} */
	
		});
	
		if(navSlider) slider.sync(navSlider);
		slider.mount();
		if(navSlider) navSlider.mount();
	
	})
}