export default function filter(params) {

	if(params.resultList) params.countCheckboxes()

	document.querySelectorAll(".filter__item").forEach(filterItem => {

		const 
		block = filterItem.querySelector(".filter__item_block"), 
		inputs = block.querySelectorAll(`input[type="checkbox"], input[type="radio"]`);

		inputs.forEach(input => {
			input.addEventListener("change", () => {
				params.countCheckboxes()
			})
		})

	})

	document.querySelectorAll(".categories_filter__item_block").forEach(block => {

		const 
		name = block.dataset.name,
		target = block.closest(".categories_filter__item").querySelector(`.categories_filter__item_target`);

		block.querySelectorAll(".categories_filter__item_list input").forEach((input, index) => {

			input.addEventListener("change", () => {
				if(input.checked) {

					document.querySelectorAll(".categories_filter__item_element.is-active").forEach(element => element.classList.remove("is-active"))
					input.closest(".categories_filter__item_element").classList.add("is-active");

					let currentText;
					currentText = input.closest("label").querySelector("span").textContent;
					currentText = currentText[0].toUpperCase() + currentText.slice(1);
					
					target.setAttribute("aria-label", currentText)
					target.querySelector(".categories_filter__item_checked").textContent = currentText;
		
				} else {
		
					document.querySelectorAll(".categories_filter__item_block").forEach(block => {

						if(block.dataset.name == name) {
							const input = block.querySelectorAll(".categories_filter__item_list input")[index];
							input.closest(".categories_filter__item_element").classList.remove("is-active");
						}

					})
		
				}
			})

		})
	})

	document.querySelectorAll(".sort__block").forEach(block => {

		const 
		name = block.dataset.name,
		target = block.closest(".sort").querySelector(`.sort__target`);

		block.querySelectorAll(".sort__list input").forEach((input, index) => {

			input.addEventListener("change", () => {
				if(input.checked) {

					document.querySelectorAll(".sort__element.is-active").forEach(element => element.classList.remove("is-active"))
					input.closest(".sort__element").classList.add("is-active");

					let currentText;
					currentText = input.closest("label").querySelector("span").textContent;
					currentText = currentText[0].toUpperCase() + currentText.slice(1);
					
					target.setAttribute("aria-label", currentText)
					target.querySelector(".sort__target_checked").textContent = currentText;
		
				} else {
		
					document.querySelectorAll(".sort__block").forEach(block => {

						if(block.dataset.name == name) {
							const input = block.querySelectorAll(".sort__list input")[index];
							input.closest(".sort__element").classList.remove("is-active");
						}

					})
		
				}
			})

		})
	})

}