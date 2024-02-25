export default function Popup(t){let e=document.querySelector("body"),i=document.querySelector("html"),o="object"==typeof t&&!!t.saveID,s=!0,n=!0;const c=function(t,n){if(s){s=!1;let c=document.querySelector(t);if(!c)return new Error(`Not found "${t}"`);c.classList.contains("popup")&&(c.style.display="flex",e.classList.remove("is-popup-active"),i.style.setProperty("--popup-padding",window.innerWidth-e.offsetWidth+"px"),e.classList.add("is-popup-active"),o&&history.pushState("","",t),c.classList.add("is-open"),setTimeout(()=>{n?(c.classList.add("is-transition-none"),c.classList.add("is-active"),s=!0):(c.classList.add("is-active"),setTimeout(()=>s=!0,400))},100))}else setTimeout(()=>s=!0,500)},p=function(t){if(n){let s;n=!1,s="string"==typeof t?document.querySelector(t):t.closest(".popup"),s.classList.contains("is-transition-none")&&s.classList.remove("is-transition-none"),setTimeout(()=>{s.classList.remove("is-active"),setTimeout((function(){const t=document.querySelectorAll(".popup.is-active");t.length<1&&(e.classList.remove("is-popup-active"),i.style.setProperty("--popup-padding","0px")),o&&(!function(){let t=window.location.toString();if(t.indexOf("#")>0){let e=t.substring(0,t.indexOf("#"));window.history.replaceState({},document.title,e)}}(),t[t.length-1]&&history.pushState("","","#"+t[t.length-1].getAttribute("id"))),n=!0,s.classList.remove("is-open"),s.style.display="none"}),400)},0)}};return{open:function(t){c(t)},close:function(t){p(t)},init:function(){let t;if(e.addEventListener("click",(function(e){t=e.target;let i=t.closest(".open-popup");i&&(e.preventDefault(),c(i.getAttribute("href")));let o=t.closest(".popup-close");o&&p(o)})),e.addEventListener("keyup",(function(t){"Escape"==t.key&&document.querySelector(".popup.is-active")&&p(document.querySelector(".popup.is-active"))})),window.addEventListener("popstate",(function(t){t.preventDefault();let e=window.location.hash;""===e&&document.body.classList.contains("is-popup-active")?p(document.querySelector(".popup.is-active")):""===e||document.body.classList.contains("is-popup-active")||c(e,!1)})),o){let t=new URL(window.location);t.hash&&c(t.hash,!0)}}}}