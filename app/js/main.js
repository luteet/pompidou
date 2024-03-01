import Popup from "./popup.js"
import click from "./click.js"
import resize from "./resize.js"
import scroll from "./scroll.js"
import filter from "./filter.js"
import sliders from "./sliders.js"
import calcCart from './calc-cart.js'
//import dropDown from "./drop-down.js"
import inputTel from "./input-tel.js"
import rangeSlider from "./range-slider.js"
import getDeviceType from './get-device-type.js'
import imageAspectRatio from "./image-aspect-ratio.js"
import filterCheckSearch from "./filter-check-search.js"


const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	main = document.querySelector("main"),
	menu = document.querySelectorAll('.header__burger, .header, body'),
	banner = document.querySelector(".banner"),
	header = document.querySelector('.header');



// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

imageAspectRatio();

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + window.scrollY,
		right: box.right + window.scrollX,
		bottom: box.bottom + window.scrollY,
		left: box.left + window.scrollX
	};
}

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

const popup = new Popup({
	//saveID: true, // false
	onOpen: () => {
		const cart = document.querySelectorAll(".cart_popup__body");
		cart.forEach(cart => {
			const content = cart.querySelector(".cart_popup__list_container");
			if(cart.closest(".popup.is-open")) {
				console.log(content.querySelector(".simplebar-content"))
				if(content.querySelector(".simplebar-content")) content.style.setProperty('--height', cart.offsetHeight - content.querySelector(".simplebar-content").scrollHeight + 'px');
			}
		})
	}
});

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=

const navPopups = document.querySelectorAll(".nav_popup, .nav_popup_2");
let closeTimeout;
function closeNavPopup() {
	document.querySelectorAll(".header__nav_list > li > a.is-open").forEach(link => {
		link.classList.remove("is-open");
		const popupElement = document.querySelector(`#${link.dataset.for}`);
		if(popupElement) {
			popupElement.classList.remove("is-active");
			clearTimeout(closeTimeout);
			closeTimeout = setTimeout(() => {if(!popupElement.classList.contains("is-active")) popupElement.classList.remove("is-active-2")}, 400)
			body.classList.remove("is-popup-active");
		}
	})
}

document.querySelectorAll(".nav_popup, .nav_popup_2").forEach(popupBlock => {
	popupBlock.addEventListener("mouseleave", (event) => {
		if(getDeviceType() == "desktop") {

			if(!event.toElement.classList.contains("is-open")) {
				closeNavPopup();
			}
			
		}
	})
})

document.querySelectorAll(".header__nav_list > li > a[data-for]").forEach(link => {

	link.addEventListener("mouseenter", () => {
		if(getDeviceType() == "desktop" && link.dataset.for) {
			if(!link.classList.contains("is-open")) {

				closeNavPopup();

				link.classList.add("is-open");

				const popupElement = document.querySelector(`#${link.dataset.for}`);

				if(popupElement) {
					
					if(header) {
						if(banner) {
							html.style.setProperty("--height-banner-2", header.getBoundingClientRect().top + "px")
							html.style.setProperty("--header-y", getCoords(header).top + 'px');
						} else {
							html.style.setProperty("--header-y", getCoords(header).top + 'px');
						}
					}

					popupElement.classList.add("is-active-2");
					popupElement.classList.add("is-active");
					body.classList.add("is-popup-active");
				}

			}
		}
	})

	link.addEventListener("click", (event) => {

		if(link.getAttribute("href").indexOf("#") == 0) event.preventDefault();

		if(getDeviceType() != "desktop" && link.dataset.for) {
			if(!link.classList.contains("is-open")) {

				closeNavPopup();
				
				const popupElement = document.querySelector(`#${link.dataset.for}`);

				if(popupElement) {

					if(header) {
						if(banner) {
							html.style.setProperty("--height-banner-2", header.getBoundingClientRect().top + "px")
							html.style.setProperty("--header-y", getCoords(header).top + 'px');
						} else {
							html.style.setProperty("--header-y", getCoords(header).top + 'px');
						}
					}
					
					popupElement.classList.add("is-active");
					popupElement.classList.add("is-active-2");
					body.classList.add("is-popup-active");
				}
				
				link.classList.add("is-open");

			} else {
				closeNavPopup();
			}
		}
	})

	link.addEventListener("mouseleave", (event) => {
		//console.log(event.toElement)
		if(getDeviceType() == "desktop" && event.toElement) {
			if(!event.toElement.closest(".popup")) {
				closeNavPopup();
			}
		}
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=

const resultList = document.querySelector(".filter_checked_list"),
filterFooter = document.querySelector(".filter__footer"),
filterLength = document.querySelector(".filter_open__length"),
closeIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4L12 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

document.querySelectorAll(".filter__item").forEach(filterItem => {
	filterItem.querySelectorAll(`input[type="checkbox"], input[type="radio"]`).forEach((input, index) => {
		input.setAttribute("data-key", index);
	})
})

function countCheckboxes() {

	resultList.querySelectorAll(`li`).forEach(item => item.remove());

	document.querySelectorAll(".filter__item").forEach(filterItem => {

		const 
		block = filterItem.querySelector(".filter__item_block"), 
		inputs = block.querySelectorAll(`input[type="checkbox"], input[type="radio"]`),
		priceInputs = block.querySelectorAll(`input[data-is-min], input[data-is-max]`),
		target = filterItem.querySelector(".filter__item_target");

		let lengthValue = 0, lengthElement = target.querySelector(".filter__item_length");

		inputs.forEach(input => {
			if(input.checked) {
				lengthValue++;

				const text = input.dataset.text;
			
				resultList.insertAdjacentHTML("beforeend", `<li data-item="${filterItem.dataset.name}" data-key="${input.dataset.key}"><span>${filterItem.dataset.label}</span><b>${text}</b>${closeIcon}`);
			}
		})

		priceInputs.forEach(input => {

			const minValue = input.closest(".filter__price_range").querySelector(".range__element").dataset.min,
			maxValue = input.closest(".filter__price_range").querySelector(".range__element").dataset.max;

			if(input.getAttribute("data-is-min") == "") {
				if(input.value != minValue) {
					resultList.insertAdjacentHTML("beforeend", `<li data-item="${filterItem.dataset.name}" data-type="min"><span>${input.dataset.checkedMessage}</span><b>${input.value}</b>${closeIcon}`);
				}
			}

			if(input.getAttribute("data-is-max") == "") {
				if(input.value != maxValue) {
					resultList.insertAdjacentHTML("beforeend", `<li data-item="${filterItem.dataset.name}" data-type="max"><span>${input.dataset.checkedMessage}</span><b>${input.value}</b>${closeIcon}`);
				}
			}

		})

		if(lengthValue) {
			lengthElement.textContent = lengthValue;
			lengthElement.classList.add("is-active");
		} else {
			lengthElement.classList.remove("is-active");
		}

	})

	if(!resultList.querySelector("li")) {
		resultList.parentElement.style.display = "none";
		filterFooter.classList.remove("is-active");
		filterLength.textContent = 0;
		filterLength.classList.remove("is-active");
	} else {
		filterFooter.classList.add("is-active");
		resultList.parentElement.style.removeProperty("display");
		filterLength.textContent = resultList.querySelectorAll("li").length;
		filterLength.classList.add("is-active");
	}
}

// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

click({
	menu,
	countCheckboxes: () => {countCheckboxes()},
	closeNavPopup: () => {closeNavPopup()},
});

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <cart> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".cart_item__length_value").forEach(input => input.addEventListener("blur", () => {

	input.value = input.value.replace(/[^-\d]/g, "");
	const value = Number(input.value);

	const max = input.dataset.max ? Number(input.dataset.max) : false;

	if(max) {

		if(value <= 0) {
			input.value = 1;
		} else if(value >= max) {
			input.value = max;
		}
		
	} else {
		if(value <= 0) {
			input.value = 1;
		}
	}

	calcCart()

}))

// =-=-=-=-=-=-=-=-=-=-=-=- </cart> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <checkout> -=-=-=-=-=-=-=-=-=-=-=-=

function toggleDisabledButtons(checkValue) {
	document.querySelectorAll(".toggle-disabled").forEach(element => {
		if(!checkValue) {
			element.disabled = true;
		} else {
			element.disabled = false;
		}
	})
}

const checkoutFormInputs = document.querySelectorAll(".checkout__form input:required");
checkoutFormInputs.forEach(input => {

	let checkValue = true;
	checkoutFormInputs.forEach(input => {
		if(!input.value) {
			checkValue = false;
		}
	})

	toggleDisabledButtons(checkValue);

	input.addEventListener("blur", (event) => {

		let checkValue = true;
		checkoutFormInputs.forEach(input => {
			if(!input.value) {
				checkValue = false;
			}
		})

		toggleDisabledButtons(checkValue);

	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </checkout> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

resize({
	html, header, popup
});

//document.querySelectorAll(".nav_popup, .nav_popup_2").forEach(popupElement => popupElement.style.setProperty("display", "flex"));

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

sliders()

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=

filter({
	resultList, main,
	countCheckboxes: () => {countCheckboxes()},
	onChange: () => {
		setTimeout(() => main.classList.remove("is-loading"), 1000)
	}
})

// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <input-tel-mask> -=-=-=-=-=-=-=-=-=-=-=-=

inputTel()

// =-=-=-=-=-=-=-=-=-=-=-=- </input-tel-mask> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <range-input> -=-=-=-=-=-=-=-=-=-=-=-=

rangeSlider(function() {
	if(resultList) {
		countCheckboxes();
		main.classList.add("is-loading");
		setTimeout(() => main.classList.remove("is-loading"), 1000)
	}
});

// =-=-=-=-=-=-=-=-=-=-=-=- </range-input> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <filter-check-search> -=-=-=-=-=-=-=-=-=-=-=-=

filterCheckSearch();

// =-=-=-=-=-=-=-=-=-=-=-=- </filter-check-search> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
	once: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=




// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

scroll();

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=


calcCart();


document.querySelectorAll(".index_hero__nav_item").forEach(indexNavItemElement => {

	const item = indexNavItemElement.closest(".index_hero__nav_item");

	indexNavItemElement.addEventListener("mouseenter", (event) => {
		if(getDeviceType() == "desktop") {
			item.classList.add("is-hover");
		}
	})

	indexNavItemElement.addEventListener("mouseleave", (event) => {
		if(getDeviceType() == "desktop") {
			item.classList.remove("is-hover");
		}
	})
})

document.querySelectorAll(".index_hero__nav_item").forEach(item => {
	item.addEventListener("click", () => {
		if(getDeviceType() != "desktop") {
			if(item.classList.contains("is-hover")) {
				item.classList.toggle("is-hover");
			} else {
				document.querySelectorAll(".index_hero__nav_item.is-hover").forEach(item => item.classList.remove("is-hover"));
				item.classList.add("is-hover");
			}
			
		}
	})
})

const productBuy = document.querySelector(".product__buy"), productFixedPanel = document.querySelector(".product__fixed_panel");
if(productBuy && productFixedPanel) {
	const cb = function(entries) {
		entries.forEach(entry => {
			(entry.isIntersecting) ? productFixedPanel.classList.remove("is-visible") : productFixedPanel.classList.add("is-visible");
		});
	}
	
	const io = new IntersectionObserver(cb);
	io.observe(productBuy);
}

document.querySelectorAll(".product_card").forEach(productCard => {

	let blurTimeout;

	productCard.addEventListener("mouseenter", (event) => {
		if(getDeviceType() == "desktop") {
			clearTimeout(blurTimeout);
			productCard.style.height = productCard.offsetHeight + "px";
			productCard.style.zIndex = 2;
		}
	})

	productCard.addEventListener("mouseleave", (event) => {
		if(getDeviceType() == "desktop") {
			blurTimeout = setTimeout(() => {
				productCard.style.removeProperty("z-index")
				productCard.style.removeProperty("height")
			},400)
		}
	})
})
