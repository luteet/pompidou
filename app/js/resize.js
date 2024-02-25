export default function resize(params) {

	let resizeCheck = {}, windowSize;

	const appendToOnTablet = document.querySelectorAll("[data-append-to]"),
		  appendToOnTabletArray = [];
	
	appendToOnTablet.forEach(appendToOnTablet => {
		appendToOnTablet.style.display = "none";
		appendToOnTabletArray.push({
			element: appendToOnTablet,
			parent: appendToOnTablet.parentElement,
			appendAddress: document.querySelector("#" + appendToOnTablet.dataset.appendTo),
		})
	})
	
	function resizeCheckFunc(size, minWidth, maxWidth) {
		if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
			resizeCheck[String(size)] = false;
			maxWidth(); // < size
		}
	
		if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
			resizeCheck[String(size)] = true;
			minWidth(); // > size
		}
	}
	
	function resizeFunc() {
	
		if(params.header) params.html.style.setProperty("--height-header", params.header.offsetHeight + "px");
		params.html.style.setProperty("--vh", Number.parseFloat(window.innerHeight * 0.01).toFixed(2) + "px");
		if(windowSize != window.innerWidth) {
			params.html.style.setProperty("--svh", Number.parseFloat(window.innerHeight * 0.01).toFixed(2) + "px");
		}
		
		windowSize = window.innerWidth;
	
		resizeCheckFunc(992,
			function () {  // screen > 992px
	
				Array.from(appendToOnTabletArray).forEach(appendElement => {
					appendElement["element"].style.display = "none";
					appendElement["parent"].append(appendElement["element"]);
					appendElement["element"].style.removeProperty('display');
				})
	
			},
			function () {  // screen < 992px
	
				document.querySelectorAll(".nav_popup.is-active, .nav_popup_2.is-active").forEach(popupElement => {
					params.popup.close(`#${popupElement.getAttribute("id")}`);
				})
	
				Array.from(appendToOnTabletArray).forEach(appendElement => {
					appendElement["element"].style.display = "none";
					appendElement["appendAddress"].append(appendElement["element"]);
					appendElement["element"].style.removeProperty('display');
				})
	
			}
		);
	
	}
	
	resizeFunc();
	
	window.addEventListener("resize", resizeFunc);
	
}