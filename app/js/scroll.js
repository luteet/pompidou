export default function scroll() {

	const heroFooter = document.querySelector(".hero__footer.is-sticky"), heroFooterWrapper = document.querySelector(".hero__footer_wrapper");

	function scrollFunc() {

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

	window.addEventListener("scroll", scrollFunc);

}