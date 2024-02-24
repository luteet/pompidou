import calcCart from './calc-cart.js'

export default function click(params) {

	document.body.addEventListener('click', function (event) {

		function $(elem) {
			return event.target.closest(elem)
		}

		// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const burger = $('.header__burger');

		if (burger) {
		
			params.menu.forEach(element => {
				element.classList.toggle('is-mobile-menu-active')
			})

			if(burger.classList.contains("is-mobile-menu-active")) {
				burger.setAttribute("aria-label", burger.dataset.forClose);
			} else {
				burger.setAttribute("aria-label", burger.dataset.forOpen);
			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <header-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const headerAccordionTarget = $(".header__accordion_target")
		if(headerAccordionTarget) {
		
			if(headerAccordionTarget.classList.contains("is-active")) {
				headerAccordionTarget.classList.remove("is-active");
			} else {
				document.querySelectorAll(".header__accordion_target.is-active").forEach(target => target.classList.remove("is-active"))
				headerAccordionTarget.classList.add("is-active");
			}
			
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </header-accordion> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <carousel-tab-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const carouselTabNavLink = $(".carousel__tab_nav a")
		if(carouselTabNavLink) {
		
			event.preventDefault();

			if(!carouselTabNavLink.classList.contains("is-active")) {
				document.querySelectorAll(".carousel__tab_nav a.is-active").forEach(link => {
					const block = document.querySelector(link.getAttribute("href"));
					link.classList.remove("is-active");
					block.classList.remove("is-active");
				});

				const block = document.querySelector(carouselTabNavLink.getAttribute("href"));
				block.classList.add("is-active");
				carouselTabNavLink.classList.add("is-active")
			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </carousel-tab-nav> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <seo-text-target> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const seoTextTarget = $(".seo_text__target")
		if(seoTextTarget) {
		
			seoTextTarget.classList.toggle("is-active")
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </seo-text-target> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const filterItemTarget = $(".filter__item_target")
		if(filterItemTarget) {
		
			if(filterItemTarget.parentElement.classList.contains("is-active")) {
				document.querySelectorAll(".filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
			} else {
				document.querySelectorAll(".filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
				filterItemTarget.parentElement.classList.add("is-active");
			}
		
		} else if(!$(".filter__item")) document.querySelectorAll(".filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));

		const categoriesFilterItemTarget = $(".categories_filter__item_target")
		if(categoriesFilterItemTarget) {
		
			if(categoriesFilterItemTarget.parentElement.classList.contains("is-active")) {
				document.querySelectorAll(".categories_filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
			} else {
				document.querySelectorAll(".categories_filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
				categoriesFilterItemTarget.parentElement.classList.add("is-active");
			}
		
		} else if(!$(".categories_filter__item")) document.querySelectorAll(".categories_filter__item.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));

		const sortTarget = $(".sort__target")
		if(sortTarget) {
		
			if(sortTarget.parentElement.classList.contains("is-active")) {
				document.querySelectorAll(".sort__wrapper.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
			} else {
				document.querySelectorAll(".sort__wrapper.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
				sortTarget.parentElement.classList.add("is-active");
			}
		
		} else if(!$(".sort__wrapper")) document.querySelectorAll(".sort__wrapper.is-active").forEach(activeItem => activeItem.classList.remove("is-active"));
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <filter-and-sort-open> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const filterOpen = $(".filter_open")
		if(filterOpen) {
		
			document.querySelectorAll(".filter").forEach(filter => filter.classList.add("is-active"));
		
		}

		const sortOpen = $(".sort_open")
		if(sortOpen) {
		
			document.querySelectorAll(".sort").forEach(sort => sort.classList.add("is-active"));
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </filter-and-sort-open> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <filter-and-sort-close> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const filterClose = $(".filter__close")
		if(filterClose) {
		
			document.querySelectorAll(".filter").forEach(filter => filter.classList.remove("is-active"));
		
		}

		const sortClose = $(".sort__close")
		if(sortClose) {
		
			document.querySelectorAll(".sort").forEach(sort => sort.classList.remove("is-active"));
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </filter-and-sort-close> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <filter-reset> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const filterReset = $(".filter_reset, .filter__footer_reset")
		if(filterReset) {
			
			document.querySelectorAll(".filter__check_list input").forEach(input => {
				input.checked = false;
			});

			document.querySelectorAll(".filter__round_check_list input").forEach(input => {
				input.checked = false;
			});

			document.querySelectorAll(".filter__price_range").forEach(range => {
				const minInput = range.querySelector("[data-is-min]"), maxInput = range.querySelector("[data-is-max]");

				minInput.value = minInput.dataset.value;
				maxInput.value = maxInput.dataset.value;

			})

			params.countCheckboxes()
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </filter-reset> -=-=-=-=-=-=-=-=-=-=-=-=


		// =-=-=-=-=-=-=-=-=-=-=-=- <filter-remove-checked-item> -=-=-=-=-=-=-=-=-=-=-=-=
		
		const filterCheckedListItem = $(".filter_checked_list li")
		if(filterCheckedListItem) {
		
			if(filterCheckedListItem.dataset.key) {
				document.querySelector(`.filter [data-name="${filterCheckedListItem.dataset.item}"] [data-key="${filterCheckedListItem.dataset.key}"]`).checked = false;
			} else if(filterCheckedListItem.dataset.type == "min" || filterCheckedListItem.dataset.type == "max") {
				const input = document.querySelector(`.filter [data-name="${filterCheckedListItem.dataset.item}"] [data-is-${filterCheckedListItem.dataset.type}]`);
				input.value = input.dataset.value;

				const blurEvent = new Event("blur");
				input.dispatchEvent(blurEvent);
			}

			params.countCheckboxes();
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </filter-remove-checked-item> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <product-info> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const productInfoTarget = $(".product__info_target")
		if(productInfoTarget) {
		
			const list = productInfoTarget.closest(".product__info");
			if(productInfoTarget.classList.contains("is-active")) {
				productInfoTarget.classList.remove("is-active");
			} else {
				list.querySelectorAll(".product__info_target.is-active").forEach(activeTarget => activeTarget.classList.remove("is-active"))
				productInfoTarget.classList.add("is-active");
			}
		
		}

		const productFavorite = $(".product__favorite");
		if(productFavorite) {
			productFavorite.classList.toggle("is-active")
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </product-info> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <cart> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const cartItemLengthMinus = $(".cart_item__length_minus")
		if(cartItemLengthMinus) {
		
			const parent = cartItemLengthMinus.parentElement, input = parent.querySelector("input");
			input.value = (input.value - 1) <= 0 ? 1 : input.value - 1;

			calcCart();
		
		}

		const cartItemLengthPlus = $(".cart_item__length_plus")
		if(cartItemLengthPlus) {
		
			const parent = cartItemLengthPlus.parentElement, input = parent.querySelector("input"),
			max = input.dataset.max ? Number(input.dataset.max) : false;

			if(max) {
				input.value = Number(input.value) + 1 >= max ? max : Number(input.value) + 1;
			} else {
				input.value = Number(input.value) + 1;
			}
			
			calcCart();
		}

		const cartItemRemove = $(".cart_item__remove");
		if(cartItemRemove) {
			const item = cartItemRemove.closest(".cart_item");
			item.classList.add("is-removing");

			setTimeout(() => {
				item.remove();
				calcCart();
			},400)
		}

		const cartPopupReset = $(".cart_popup__reset");
		if(cartPopupReset) {
			const items = cartPopupReset.closest(".cart_popup__table").querySelectorAll(".cart_item");
			items.forEach(item => {
				item.classList.add("is-removing");

				setTimeout(() => {
					item.remove();
					calcCart();
				},400)
			})
		}

		const cartPopupPromocodeTarget = $(".cart_popup__promocode_target");
		if(cartPopupPromocodeTarget) {
			cartPopupPromocodeTarget.parentElement.classList.add("is-active");
		}

		const cartPopupPromocodeClose = $(".cart_popup__promocode_close");
		if(cartPopupPromocodeClose) {
			cartPopupPromocodeClose.closest(".cart_popup__promocode").classList.remove("is-active");
		}

		const cartPopupListTarget = $(".cart_popup__list_target");
		if(cartPopupListTarget) {
			cartPopupListTarget.classList.toggle("is-active")
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </cart> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <checkout> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const checkoutDropDownOpen = $(".checkout__drop_down_open")
		if(checkoutDropDownOpen) {
			checkoutDropDownOpen.closest(".checkout__drop_down").classList.add("is-active");
		}

		const checkoutDropDownClose = $(".checkout__drop_down_close")
		if(checkoutDropDownClose) {
			checkoutDropDownClose.closest(".checkout__drop_down").classList.remove("is-active");
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </checkout> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <page-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const pageSectionNavTarget = $(".page_section__nav_target")
		if(pageSectionNavTarget) {
		
			if(pageSectionNavTarget.classList.contains("is-active")) {
				pageSectionNavTarget.classList.remove("is-active")
			} else {
				pageSectionNavTarget.classList.add("is-active")
			}
		
		} else if(!$(".page_section__nav")) document.querySelectorAll(".page_section__nav_target.is-active").forEach(target => target.classList.remove("is-active"))
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </page-nav> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <faq> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const faqQuestion = $(".faq__question")
		if(faqQuestion) {
		
			if(faqQuestion.classList.contains("is-active")) {
				faqQuestion.classList.remove("is-active");
			} else {
				document.querySelectorAll(".faq__question.is-active").forEach(activeTarget => activeTarget.classList.remove("is-active"))
				faqQuestion.classList.add("is-active");
			}
		
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </faq> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <hero-categories> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const heroCategoriesTarget = $(".hero_categories__target")
		if(heroCategoriesTarget) {
		
			heroCategoriesTarget.classList.toggle("is-active")
		
		} else if(!$(".hero_categories")) document.querySelectorAll(".hero_categories__target.is-active").forEach(activeTarget => activeTarget.classList.remove("is-active"))
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </hero-categories> -=-=-=-=-=-=-=-=-=-=-=-=



		// =-=-=-=-=-=-=-=-=-=-=-=- <header-open-block> -=-=-=-=-=-=-=-=-=-=-=-=
	
		const headerOpenBlock = $(".header-open-block")
		if(headerOpenBlock) {

			event.preventDefault();
		
			const parent = headerOpenBlock.closest(".header__mob_popup"),
			main = parent.querySelector(".header__mob_popup_main"),
			block = main.querySelector(`${headerOpenBlock.getAttribute("href")}`),
			activeBlock = main.querySelector(".header__mob_popup_block.is-active");

			main.classList.add("is-hidden");
			parent.classList.add("is-active-block");

			setTimeout(() => {
				activeBlock.classList.remove("is-active");
				block.classList.add("is-active");
				parent.scrollTop = 0;
				main.classList.remove("is-hidden");
			},300)
		
		}

		const headerMobPopupForward = $(".header__mob_popup_forward");
		if(headerMobPopupForward) {

			const parent = headerMobPopupForward.closest(".header__mob_popup"),
			main = parent.querySelector(".header__mob_popup_main"),
			defaultBlock = main.querySelector(`.header__mob_popup_block.is-default`),
			activeBlock = main.querySelector(".header__mob_popup_block.is-active");

			main.classList.add("is-hidden");
			parent.classList.remove("is-active-block");

			setTimeout(() => {
				activeBlock.classList.remove("is-active");
				defaultBlock.classList.add("is-active");
				main.classList.remove("is-hidden");
			},300)
		}
		
		// =-=-=-=-=-=-=-=-=-=-=-=- </header-open-block> -=-=-=-=-=-=-=-=-=-=-=-=

	})
}