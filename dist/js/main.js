import Popup from"./popup.js?v=1";import click from"./click.js?v=1";import resize from"./resize.js";import scroll from"./scroll.js";import filter from"./filter.js";import sliders from"./sliders.js";import calcCart from"./calc-cart.js";import inputTel from"./input-tel.js";import rangeSlider from"./range-slider.js";import getDeviceType from"./get-device-type.js";import imageAspectRatio from"./image-aspect-ratio.js";import filterCheckSearch from"./filter-check-search.js";const body=document.querySelector("body"),html=document.querySelector("html"),main=document.querySelector("main"),menu=document.querySelectorAll(".header__burger, .header, body"),banner=document.querySelector(".banner"),header=document.querySelector(".header");function updateCartContainer(){document.querySelectorAll(".cart_popup__body").forEach(e=>{const t=e.querySelector(".cart_popup__list_container");if(e.classList.contains("cart_popup__body")){if(e.closest(".popup.is-active")){t.style.setProperty("--height","auto");const o=e.querySelector(".cart_popup__container").scrollHeight-window.innerHeight;t.style.setProperty("--height",t.scrollHeight-o+"px")}}else if(t){const o=e.scrollHeight+35-window.innerHeight;t.style.setProperty("--height",t.scrollHeight-o+"px")}})}function getCoords(e){let t=e.getBoundingClientRect();return{top:t.top+window.scrollY,right:t.right+window.scrollX,bottom:t.bottom+window.scrollY,left:t.left+window.scrollX}}imageAspectRatio(),window.updateCartContainer=updateCartContainer;const popup=new Popup({onOpen:()=>{document.querySelectorAll(".cart_popup__body").forEach(e=>{const t=e.querySelector(".cart_popup__list_container");if(e.closest(".popup.is-open")){t.style.setProperty("--height","auto");const o=e.querySelector(".cart_popup__container").scrollHeight-window.innerHeight;t.style.setProperty("--height",t.scrollHeight-o+"px")}})}});popup.init();const navPopups=document.querySelectorAll(".nav_popup, .nav_popup_2");let closeTimeout;function closeNavPopup(){document.querySelectorAll(".header__nav_list > li > button.is-open").forEach(e=>{e.classList.remove("is-open");const t=document.querySelector("#"+e.dataset.for);t&&(t.classList.remove("is-active"),clearTimeout(closeTimeout),closeTimeout=setTimeout(()=>{t.classList.contains("is-active")||t.classList.remove("is-active-2")},400),body.classList.remove("is-popup-active"))})}document.querySelectorAll(".nav_popup, .nav_popup_2").forEach(e=>{e.addEventListener("mouseleave",e=>{"desktop"==getDeviceType()&&(e.toElement.classList.contains("is-open")||closeNavPopup())})}),document.querySelectorAll(".header__nav_list > li > button[data-for]").forEach(e=>{e.addEventListener("mouseenter",()=>{if("desktop"==getDeviceType()&&e.dataset.for&&!e.classList.contains("is-open")){closeNavPopup(),e.classList.add("is-open");const t=document.querySelector("#"+e.dataset.for);t&&(header&&(banner?(html.style.setProperty("--height-banner-2",header.getBoundingClientRect().top+"px"),html.style.setProperty("--header-y",getCoords(header).top+"px")):html.style.setProperty("--header-y",getCoords(header).top+"px")),t.classList.add("is-active-2"),t.classList.add("is-active"),body.classList.add("is-popup-active"))}}),e.addEventListener("click",t=>{if("desktop"!=getDeviceType()&&e.dataset.for)if(e.classList.contains("is-open"))closeNavPopup();else{closeNavPopup();const t=document.querySelector("#"+e.dataset.for);t&&(header&&(banner?(html.style.setProperty("--height-banner-2",header.getBoundingClientRect().top+"px"),html.style.setProperty("--header-y",getCoords(header).top+"px")):html.style.setProperty("--header-y",getCoords(header).top+"px")),t.classList.add("is-active"),t.classList.add("is-active-2"),body.classList.add("is-popup-active")),e.classList.add("is-open")}}),e.addEventListener("mouseleave",e=>{"desktop"==getDeviceType()&&e.toElement&&(e.toElement.closest(".popup")||closeNavPopup())})});const resultList=document.querySelector(".filter_checked_list"),filterFooter=document.querySelector(".filter__footer"),filterLength=document.querySelector(".filter_open__length"),closeIcon='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4L12 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/></svg>';function countCheckboxes(){resultList.querySelectorAll("li").forEach(e=>e.remove()),document.querySelectorAll(".filter__item").forEach(e=>{const t=e.querySelector(".filter__item_block"),o=t.querySelectorAll('input[type="checkbox"], input[type="radio"]'),r=t.querySelectorAll("input[data-is-min], input[data-is-max]"),s=e.querySelector(".filter__item_target");let i=0,l=s.querySelector(".filter__item_length");o.forEach(t=>{if(t.checked){i++;const o=t.dataset.text;resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-key="${t.dataset.key}"><span>${e.dataset.label}</span><b>${o}</b>${closeIcon}`)}}),r.forEach(t=>{const o=t.closest(".filter__price_range").querySelector(".range__element").dataset.min,r=t.closest(".filter__price_range").querySelector(".range__element").dataset.max;""==t.getAttribute("data-is-min")&&t.value!=o&&resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-type="min"><span>${t.dataset.checkedMessage}</span><b>${t.value}</b>${closeIcon}`),""==t.getAttribute("data-is-max")&&t.value!=r&&resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-type="max"><span>${t.dataset.checkedMessage}</span><b>${t.value}</b>${closeIcon}`)}),i?(l.textContent=i,l.classList.add("is-active")):l.classList.remove("is-active")}),resultList.querySelector("li")?(filterFooter.classList.add("is-active"),resultList.parentElement.style.removeProperty("display"),filterLength.textContent=resultList.querySelectorAll("li").length,filterLength.classList.add("is-active")):(resultList.parentElement.style.display="none",filterFooter.classList.remove("is-active"),filterLength.textContent=0,filterLength.classList.remove("is-active"))}function toggleDisabledButtons(e){document.querySelectorAll(".toggle-disabled").forEach(t=>{t.disabled=!e})}document.querySelectorAll(".filter__item").forEach(e=>{e.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((e,t)=>{e.setAttribute("data-key",t)})}),click({menu:menu,countCheckboxes:()=>{countCheckboxes()},closeNavPopup:()=>{closeNavPopup()}}),document.querySelectorAll(".cart_item__length_value").forEach(e=>e.addEventListener("blur",()=>{e.value=e.value.replace(/[^-\d]/g,"");const t=Number(e.value),o=!!e.dataset.max&&Number(e.dataset.max);o?t<=0?e.value=1:t>=o&&(e.value=o):t<=0&&(e.value=1),calcCart()}));const checkoutFormInputs=document.querySelectorAll(".checkout__form input:required");checkoutFormInputs.forEach(e=>{let t=!0;checkoutFormInputs.forEach(e=>{e.value||(t=!1)}),toggleDisabledButtons(t),e.addEventListener("blur",e=>{let t=!0;checkoutFormInputs.forEach(e=>{e.value||(t=!1)}),toggleDisabledButtons(t)})}),resize({html:html,header:header,popup:popup}),sliders(),filter({resultList:resultList,main:main,countCheckboxes:()=>{countCheckboxes()},onChange:()=>{setTimeout(()=>main.classList.remove("is-loading"),1e3)}}),inputTel(),rangeSlider((function(){resultList&&(countCheckboxes(),main.classList.add("is-loading"),setTimeout(()=>main.classList.remove("is-loading"),1e3))})),filterCheckSearch(),AOS.init({disable:"mobile",once:!0}),scroll(),calcCart(),document.querySelectorAll(".index_hero__nav_item").forEach(e=>{const t=e.closest(".index_hero__nav_item");e.addEventListener("mouseenter",e=>{"desktop"==getDeviceType()&&t.classList.add("is-hover")}),e.addEventListener("mouseleave",e=>{"desktop"==getDeviceType()&&t.classList.remove("is-hover")})}),document.querySelectorAll(".index_hero__nav_item").forEach(e=>{e.addEventListener("click",()=>{"desktop"!=getDeviceType()&&(e.classList.contains("is-hover")?e.classList.toggle("is-hover"):(document.querySelectorAll(".index_hero__nav_item.is-hover").forEach(e=>e.classList.remove("is-hover")),e.classList.add("is-hover")))})});const productBuy=document.querySelector(".product__buy"),productFixedPanel=document.querySelector(".product__fixed_panel");if(productBuy&&productFixedPanel){new IntersectionObserver((function(e){e.forEach(e=>{e.isIntersecting?productFixedPanel.classList.remove("is-visible"):productFixedPanel.classList.add("is-visible")})})).observe(productBuy)}document.querySelectorAll(".product_card").forEach(e=>{let t;e.addEventListener("mouseenter",o=>{"desktop"==getDeviceType()&&(clearTimeout(t),e.style.height=e.offsetHeight+"px",e.style.zIndex=2)}),e.addEventListener("mouseleave",o=>{"desktop"==getDeviceType()&&(t=setTimeout(()=>{e.style.removeProperty("z-index"),e.style.removeProperty("height")},400))})});