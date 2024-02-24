export default function filterCheckSearch() {
	function search(query, elements) {
		query = query.toLowerCase();
		const results = [];
	
		Array.from(elements).forEach(element => {
			const text = element[0].toLowerCase();
			if (text.includes(query)) {
				results.push(element);
			}
		});
	
		return results;
	}
	
	document.querySelectorAll(".filter__check_search").forEach(searchWrapper => {
	
		const input = searchWrapper.querySelector("input"),
			  list = searchWrapper.closest(".filter__check").querySelector(".filter__check_list");
	
		let searchItems = [];
	
		list.querySelectorAll(".checkbox").forEach(checkbox => {
	
			const textElement = checkbox.querySelector(".checkbox__text");
			searchItems.push([textElement.textContent, checkbox]);
	
		})
	
		input.addEventListener("input", (event) => {
	
			const result = search(input.value, searchItems);
	
			if(result) {
	
				searchItems.map(item => item[1].classList.add("is-hidden"))
				result.map(item => item[1].classList.remove("is-hidden"))
	
			} else searchItems.map(item => item[1].classList.remove("is-hidden"))
			
		})
	
	})
}