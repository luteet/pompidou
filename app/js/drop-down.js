export default function dropDown() {

	const dropDown = document.querySelectorAll('.drop_down'),
	currentPage = document.querySelector(".wrapper");

	let dropDownArray = [];

	dropDown.forEach(dropDown => {

		const target = dropDown.querySelector('.drop_down__target'),
			  list = dropDown.querySelector('.drop_down__block');

		dropDownArray.push({wrapper: dropDown, target: target, block: list});
		document.body.append(list);

	})

	Array.from(dropDownArray).forEach(dropDownElement => {

		const target = dropDownElement["target"],
			  block = dropDownElement["block"],
			  wrapper = dropDownElement["wrapper"];

		target.addEventListener('click', function () {

			if(!target.classList.contains('is-animating')) {
				target.classList.add('is-animating');
			
				block.style.setProperty("--max-width", (target.offsetWidth * 2) + "px");

				let heightDropDownBlock = block.offsetHeight, 
				widthDropDownBlock = block.offsetWidth, 
				dropDownCoords = {y: wrapper.getBoundingClientRect().top + window.scrollY, x: wrapper.getBoundingClientRect().left + window.scrollX};
	
				if(!target.closest('.drop_down.is-active')) {
	
					Array.from(dropDownArray).forEach(dropDownElement => {

						const target = dropDownElement["target"],
							block = dropDownElement["block"],
							wrapper = dropDownElement["wrapper"];
				
						if(wrapper.classList.contains('is-active')) {

							block.classList.remove("fade-in");
							block.classList.add("fade-out");
							wrapper.classList.remove("is-active");
				
							setTimeout(() => {
								block.style.removeProperty("left");
								block.style.removeProperty("top");
								block.style.removeProperty("transform");
								block.classList.remove("fade-out");
								wrapper.classList.remove('is-animating');
							},300)

						}
				
					})
	
					block.style.display = "none";
	
					if(dropDownCoords.x >= widthDropDownBlock && dropDownCoords.x < (window.innerWidth - widthDropDownBlock)) {
	
						block.style.setProperty("--x", (dropDownCoords.x + target.offsetWidth / 2) + "px");
						block.style.setProperty("--transform", "translate3d(-50%,0,0)");
	
					} else if(dropDownCoords.x + 15 > window.innerWidth - widthDropDownBlock) {
						
						block.style.setProperty("--x", (dropDownCoords.x - window.innerWidth/14) + "px");
						block.style.setProperty("--transform", "translate3d(0,0,0)");
	
						
					} else if(dropDownCoords.x <= widthDropDownBlock) {
	
						block.style.setProperty("--x", dropDownCoords.x + "px");
						block.style.setProperty("--transform", "translate3d(0,0,0)");
	
					}
					
					if(target.getBoundingClientRect().bottom + heightDropDownBlock >= currentPage.offsetHeight)
					block.style.setProperty("--y", (dropDownCoords.y - heightDropDownBlock - 9) + "px");


					else if(target.getBoundingClientRect().bottom + heightDropDownBlock < currentPage.offsetHeight) 
					block.style.setProperty("--y", (dropDownCoords.y + target.offsetHeight + 9) + "px");
	
					block.style.removeProperty("display");
	
					wrapper.classList.add("is-active");
					block.classList.add("fade-in");
	
					target.classList.remove('is-animating');
	
				} else {
					
					block.classList.remove("fade-in");
					block.classList.add("fade-out");
					wrapper.classList.remove("is-active");
	
					setTimeout(() => {
						block.style.removeProperty("left");
						block.style.removeProperty("top");
						block.style.removeProperty("transform");
						block.classList.remove("fade-out");
						target.classList.remove('is-animating');
					},300)
	
				}
	
			}

		})

	})

	function updateDropDownBlocks() {
		Array.from(dropDownArray).forEach(dropDownElement => {

			const target = dropDownElement["target"],
				  block = dropDownElement["block"],
				  wrapper = dropDownElement["wrapper"];
				  
			if(wrapper.classList.contains('is-active')) {

				let heightDropDownBlock = block.offsetHeight, 
					widthDropDownBlock = block.offsetWidth, 
					dropDownCoords = {y: wrapper.getBoundingClientRect().top + window.scrollY, x: wrapper.getBoundingClientRect().left + window.scrollX};

				if(dropDownCoords.x >= widthDropDownBlock && dropDownCoords.x < (window.innerWidth - widthDropDownBlock)) {
	
					block.style.setProperty("--x", (dropDownCoords.x + target.offsetWidth / 2) + "px");
					block.style.setProperty("--transform", "translate3d(-50%,0,0)");

				} else if(dropDownCoords.x + 15 > window.innerWidth - widthDropDownBlock) {
					
					block.style.setProperty("--x", (dropDownCoords.x - window.innerWidth/14) + "px");
					block.style.setProperty("--transform", "translate3d(0,0,0)");
					
				} else if(dropDownCoords.x <= widthDropDownBlock) {

					block.style.setProperty("--x", dropDownCoords.x + "px");
					block.style.setProperty("--transform", "translate3d(0,0,0)");

				}
				
				if(target.getBoundingClientRect().bottom + heightDropDownBlock >= currentPage.offsetHeight)
				block.style.setProperty("--y", (dropDownCoords.y - heightDropDownBlock - 9) + "px");
					
				else if(target.getBoundingClientRect().bottom + heightDropDownBlock < currentPage.offsetHeight)
				block.style.setProperty("--y", (dropDownCoords.y + target.offsetHeight + 9) + "px");
			}
	
		})
	}

	window.addEventListener('resize', updateDropDownBlocks)
	window.addEventListener('scroll', updateDropDownBlocks)

	document.body.addEventListener('mousedown', function(event) {

		if(!event.target.closest('.drop_down.is-active') && !event.target.closest('.drop_down__block')) {

			Array.from(dropDownArray).forEach(dropDownElement => {

				const target = dropDownElement["target"],
					  wrapper = dropDownElement["wrapper"],
					  block = dropDownElement["block"];
		
				if(wrapper.classList.contains('is-active')) {

					block.classList.remove("fade-in");
					block.classList.add("fade-out");
					wrapper.classList.remove("is-active");
		
					setTimeout(() => {
						block.style.removeProperty("--x");
						block.style.removeProperty("--y");
						block.style.removeProperty("--transform");
						block.classList.remove("fade-out");
						target.classList.remove('is-animating');
					},300)

				}
		
			})

		}
	})

}