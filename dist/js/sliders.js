export default function sliders(){const e=()=>{const e=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e)?"tablet":/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e)?"mobile":"desktop"};document.querySelectorAll(".carousel__slider").forEach(e=>{new Splide(e,{type:"loop",autoWidth:!0,perMove:1,gap:"1.25rem",speed:700,pagination:!1,arrows:!1,autoScroll:{speed:0,pauseOnHover:!0},intersection:{inView:{autoScroll:{speed:1}},outView:{autoScroll:{speed:0}}},breakpoints:{992:{destroy:!e.closest(".carousel__wrapper_block.is-min"),gap:7,flickPower:100,speed:400}}}).mount(window.splide.Extensions)}),document.querySelectorAll(".best_brands__block").forEach(e=>{new Splide(e,{type:"loop",perPage:4,perMove:1,gap:0,pagination:!1,arrows:!1,autoScroll:{speed:0},intersection:{inView:{autoScroll:{speed:1}},outView:{autoScroll:{speed:0}}},breakpoints:{992:{destroy:!0}}}).mount(window.splide.Extensions)}),document.querySelectorAll(".product__gallery").forEach(e=>{const o=new Splide(e.parentElement.querySelector(".product__gallery_nav"),{perPage:1,isNavigation:!0,pagination:!1,arrows:!1,direction:"ttb",height:"50rem",autoHeight:!0}),r=new Splide(e,{type:"fade",rewind:!0,perPage:1,pagination:!1,arrows:!1,speed:700,breakpoints:{550:{pagination:!0}}});r.sync(o),r.mount(),o.mount()}),document.querySelectorAll(".cart_popup__slider").forEach(e=>{new Splide(e,{autoWidth:!0,gap:"1.25rem",speed:700,arrows:!1,pagination:!1,breakpoints:{550:{gap:"0.4375rem"}}}).mount()}),document.querySelectorAll(".product_card__gallery_main").forEach(o=>{let r;o.closest(".product_card__gallery").querySelector(".product_card__gallery_nav")&&(r=new Splide(o.closest(".product_card__gallery").querySelector(".product_card__gallery_nav"),{perPage:o.querySelectorAll(".splide__slide").length,gap:"0.25rem",isNavigation:!0,arrows:!1,pagination:!1}),o.parentElement.addEventListener("mouseleave",()=>{"desktop"==e()&&t.go(0)}),o.closest(".product_card__gallery").querySelectorAll(".product_card__gallery_nav .splide__slide").forEach((o,r)=>{o.addEventListener("mouseenter",()=>{"desktop"==e()&&t.go(r)})}));const t=new Splide(o,{type:"fade",perPage:1,speed:500,arrows:!1,pagination:!1});r&&t.sync(r),t.mount(),r&&r.mount()})}