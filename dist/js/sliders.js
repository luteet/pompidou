export default function sliders(){document.querySelectorAll(".carousel__slider").forEach(e=>{new Splide(e,{type:"loop",autoWidth:!0,perMove:1,gap:"1.25rem",speed:700,pagination:!1,arrows:!1,autoScroll:{speed:1},intersection:{inView:{autoScroll:{speed:1}},outView:{autoScroll:{speed:0}}},breakpoints:{992:{destroy:!e.closest(".carousel__wrapper_block.is-min"),gap:7}}}).mount(window.splide.Extensions)}),document.querySelectorAll(".best_brands__block").forEach(e=>{new Splide(e,{type:"loop",perPage:4,perMove:1,gap:0,pagination:!1,arrows:!1,autoScroll:{speed:1},intersection:{inView:{autoScroll:{speed:1}},outView:{autoScroll:{speed:0}}},breakpoints:{992:{destroy:!0}}}).mount(window.splide.Extensions)}),document.querySelectorAll(".product__gallery").forEach(e=>{const o=new Splide(e.parentElement.querySelector(".product__gallery_nav"),{perPage:1,isNavigation:!0,pagination:!1,arrows:!1,direction:"ttb",height:"50rem",autoHeight:!0}),t=new Splide(e,{type:"fade",rewind:!0,perPage:1,pagination:!1,arrows:!1,breakpoints:{550:{pagination:!0}}});t.sync(o),t.mount(),o.mount()}),document.querySelectorAll(".cart_popup__slider").forEach(e=>{new Splide(e,{autoWidth:!0,gap:"1.25rem",speed:700,arrows:!1,pagination:!1,breakpoints:{550:{gap:"0.4375rem"}}}).mount()})}