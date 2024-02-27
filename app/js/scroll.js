export default function scroll() {

	const heroFooter = document.querySelector(".hero__footer.is-sticky"), heroFooterWrapper = document.querySelector(".hero__footer_wrapper");

	const html = document.querySelector("html"), header = document.querySelector(".header"), banner = document.querySelector(".banner");
	
	function getCoords(elem) {
		let box = elem.getBoundingClientRect();
	
		return {
			top: box.top + window.scrollY,
			right: box.right + window.scrollX,
			bottom: box.bottom + window.scrollY,
			left: box.left + window.scrollX
		};
	}

	function scrollFunc() {

		//if(header) html.style.setProperty("--header-y", getCoords(header).top + 'px');
		//if(banner) html.style.setProperty("--height-banner", header.getBoundingClientRect().top + "px");

		if(heroFooterWrapper && heroFooter) {
			
			if(heroFooter.getBoundingClientRect().top <= -400 && !heroFooter.classList.contains("is-active-sticky")) {
	
				heroFooter.classList.add("is-hidden");
				heroFooterWrapper.style.setProperty("--duration", "0s");
		
				setTimeout(() => {
		
					heroFooter.style.minHeight = heroFooter.offsetHeight + "px";
					heroFooter.classList.add("is-active-sticky");
		
					setTimeout(() => {
						heroFooterWrapper.style.setProperty("--duration", ".3s");
						heroFooter.classList.remove("is-hidden");
					}, 300)
					
				},0)
				
		
			} else if(heroFooter.getBoundingClientRect().top > -400 && heroFooter.classList.contains("is-active-sticky")) {
		
				heroFooter.classList.add("is-hidden");
				heroFooterWrapper.style.setProperty("--duration", ".3s");
		
				setTimeout(() => {
		
					heroFooter.style.minHeight = heroFooter.offsetHeight + "px";
					heroFooter.classList.remove("is-active-sticky");
		
					setTimeout(() => {
						heroFooterWrapper.style.setProperty("--duration", ".3s");
						heroFooter.classList.remove("is-hidden")
						heroFooter.style.removeProperty("min-height");
					}, 0)
		
				}, 300)
		
			}
		}
	}

	scrollFunc();

	/* if(header) {
		if(banner) {
			setInterval(() => {
				html.style.setProperty("--height-banner", header.getBoundingClientRect().top + "px")
				html.style.setProperty("--header-y", getCoords(header).top + 'px');
			},1000)
		} else {
			setInterval(() => {
				html.style.setProperty("--header-y", getCoords(header).top + 'px');
			},1000)
		}
	} */

	window.addEventListener("scroll", scrollFunc);

}