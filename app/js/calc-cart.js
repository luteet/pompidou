export default function calcCart() {
	const cart = document.querySelectorAll(".cart_popup__table");
	
	function getNoun(number, one, two, five) {
		let n = Math.abs(number);
		n %= 100;
		if (n >= 5 && n <= 20) {
			return five;
		}
		n %= 10;
		if (n === 1) {
			return one;
		}
		if (n >= 2 && n <= 4) {
			return two;
		}
		return five;
	}

	cart.forEach(cart => {
		const items = cart.querySelectorAll(".cart_item"),
		currency = cart.dataset.currency;

		let totalPrice = 0, sumPrice = 0, discount = 0;

		items.forEach(item => {
			const priceInput = item.querySelector(".cart_item__length_value"),
			price = Number(priceInput.dataset.price.replaceAll(" ", "")) * Number(priceInput.value);

			if(priceInput.dataset.priceWithoutDiscount) {
				const priceWithoutDiscount = priceInput.dataset.priceWithoutDiscount.replaceAll(" ", "");
				sumPrice += Number(priceWithoutDiscount) * Number(priceInput.value);
				discount += Number(priceWithoutDiscount) * Number(priceInput.value) - price;
			} else {
				sumPrice += price;
			}

			item.querySelector("[data-cart-current-price]").textContent = `${price.toLocaleString()} ${currency}`;
		})

		totalPrice = sumPrice - discount;

		cart.querySelectorAll("[data-cart-sum]").forEach(sumElement => {
			sumElement.textContent = `${sumPrice.toLocaleString()} ${currency}`;
		})

		cart.querySelectorAll("[data-cart-discount]").forEach(discountElement => {
			discountElement.textContent = `${discount.toLocaleString()} ${currency}`;
		});
		
		cart.querySelectorAll("[data-cart-total]").forEach(totalElement => {
			totalElement.textContent = `${totalPrice.toLocaleString()} ${currency}`;
		});

		cart.querySelectorAll("[data-cart-products-length").forEach(productsLength => {
			productsLength.textContent = items.length + " " + getNoun(items.length, productsLength.dataset.one, productsLength.dataset.two, productsLength.dataset.five);
		});

		if(!items.length) {
			cart.classList.add("is-null");
		} else {
			cart.classList.remove("is-null");
		}
		
	})
}