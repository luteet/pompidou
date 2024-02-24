import Popup from"./popup.js";import click from"./click.js";import resize from"./resize.js";import scroll from"./scroll.js";import filter from"./filter.js";import sliders from"./sliders.js";import calcCart from"./calc-cart.js";import rangeSlider from"./range-slider.js";import getDeviceType from"./get-device-type.js";import imageAspectRatio from"./image-aspect-ratio.js";import filterCheckSearch from"./filter-check-search.js";const body=document.querySelector("body"),html=document.querySelector("html"),menu=document.querySelectorAll(".header__burger, .header, body"),header=document.querySelector(".header");imageAspectRatio();const popup=new Popup({saveID:!0});popup.init();const resultList=document.querySelector(".filter_checked_list"),filterFooter=document.querySelector(".filter__footer"),filterLength=document.querySelector(".filter_open__length"),closeIcon='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L4 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 4L12 12" fill="none" stroke="#808080" stroke-linecap="round" stroke-linejoin="round"/></svg>';function countCheckboxes(){resultList.querySelectorAll("li").forEach(e=>e.remove()),document.querySelectorAll(".filter__item").forEach(e=>{const t=e.querySelector(".filter__item_block"),r=t.querySelectorAll('input[type="checkbox"], input[type="radio"]'),o=t.querySelectorAll("input[data-is-min], input[data-is-max]"),s=e.querySelector(".filter__item_target");let l=0,i=s.querySelector(".filter__item_length");r.forEach(t=>{if(t.checked){l++;const r=t.dataset.text;resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-key="${t.dataset.key}"><span>${e.dataset.label}</span><b>${r}</b>${closeIcon}`)}}),o.forEach(t=>{const r=t.closest(".filter__price_range").querySelector(".range__element").dataset.min,o=t.closest(".filter__price_range").querySelector(".range__element").dataset.max;""==t.getAttribute("data-is-min")&&t.value!=r&&resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-type="min"><span>${t.dataset.checkedMessage}</span><b>${t.value}</b>${closeIcon}`),""==t.getAttribute("data-is-max")&&t.value!=o&&resultList.insertAdjacentHTML("beforeend",`<li data-item="${e.dataset.name}" data-type="max"><span>${t.dataset.checkedMessage}</span><b>${t.value}</b>${closeIcon}`)}),l?(i.textContent=l,i.classList.add("is-active")):i.classList.remove("is-active")}),resultList.querySelector("li")?(filterFooter.classList.add("is-active"),resultList.parentElement.style.removeProperty("display"),filterLength.textContent=resultList.querySelectorAll("li").length,filterLength.classList.add("is-active")):(resultList.parentElement.style.display="none",filterFooter.classList.remove("is-active"),filterLength.textContent=0,filterLength.classList.remove("is-active"))}function toggleDisabledButtons(e){document.querySelectorAll(".toggle-disabled").forEach(t=>{t.disabled=!e})}document.querySelectorAll(".filter__item").forEach(e=>{e.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((e,t)=>{e.setAttribute("data-key",t)})}),click({menu:menu,countCheckboxes:()=>{countCheckboxes()}}),document.querySelectorAll(".cart_item__length_value").forEach(e=>e.addEventListener("blur",()=>{e.value=e.value.replace(/[^-\d]/g,"");const t=Number(e.value),r=!!e.dataset.max&&Number(e.dataset.max);r?t<=0?e.value=1:t>=r&&(e.value=r):t<=0&&(e.value=1),calcCart()}));const checkoutFormInputs=document.querySelectorAll(".checkout__form input:required");checkoutFormInputs.forEach(e=>{let t=!0;checkoutFormInputs.forEach(e=>{e.value||(t=!1)}),toggleDisabledButtons(t),e.addEventListener("blur",e=>{let t=!0;checkoutFormInputs.forEach(e=>{e.value||(t=!1)}),toggleDisabledButtons(t)})}),resize({html:html,header:header,popup:popup}),sliders(),filter({resultList:resultList,countCheckboxes:()=>{countCheckboxes()}}),rangeSlider((function(){resultList&&countCheckboxes()})),filterCheckSearch(),AOS.init({disable:"mobile",once:!0}),scroll(),calcCart(),document.querySelectorAll(".index_hero__nav_name, .index_hero__nav_block").forEach(e=>{const t=e.closest(".index_hero__nav_item");e.addEventListener("mouseenter",e=>{"desktop"==getDeviceType()&&t.classList.add("is-hover")}),e.addEventListener("mouseleave",e=>{"desktop"==getDeviceType()&&t.classList.remove("is-hover")})}),document.querySelectorAll(".index_hero__nav_item").forEach(e=>{e.addEventListener("click",()=>{"desktop"!=getDeviceType()&&(e.classList.contains("is-hover")?e.classList.toggle("is-hover"):(document.querySelectorAll(".index_hero__nav_item.is-hover").forEach(e=>e.classList.remove("is-hover")),e.classList.add("is-hover")))})});const productBuy=document.querySelector(".product__buy"),productFixedPanel=document.querySelector(".product__fixed_panel");if(productBuy&&productFixedPanel){new IntersectionObserver((function(e){e.forEach(e=>{e.isIntersecting?productFixedPanel.classList.remove("is-visible"):productFixedPanel.classList.add("is-visible")})})).observe(productBuy)}