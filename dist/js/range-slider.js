export default function rangeSlider(e,a){document.querySelector(".main");document.querySelectorAll(".range").forEach(a=>{const t=a.querySelector("[data-is-min]"),l=a.querySelector("[data-is-max]"),u=a.querySelector(".range__element"),n=(new Event("blur"),new window.JSR.JSR({modules:[new window.JSR.ModuleLimit({min:Number(u.dataset.min),max:Number(u.dataset.max)}),new window.JSR.ModuleRail,new window.JSR.ModuleSlider,new window.JSR.ModuleBar],config:{min:Number(u.dataset.min),max:Number(u.dataset.max),step:1,initialValues:[Number(u.dataset.minValue),Number(u.dataset.maxValue)],container:document.querySelector(".range__element div")}}));t.addEventListener("input",()=>{t.value=t.value.replace(/[\D]+/g,"")}),l.addEventListener("input",()=>{l.value=l.value.replace(/[\D]+/g,"")}),t.addEventListener("blur",()=>{n.setRealValue(0,Number(t.value.replace(/[\D]+/g,""))),e()}),l.addEventListener("blur",()=>{n.setRealValue(1,Number(l.value.replace(/[\D]+/g,""))),e()}),n.onValueChange((function(e){document.querySelectorAll(".filter_checked_list").forEach(e=>{}),0==e.index?t.value=e.real:1==e.index&&(l.value=e.real)})),document.querySelectorAll(".filter_reset").forEach(e=>{e.addEventListener("click",()=>{t.value=t.dataset.value,l.value=l.dataset.value,n.setRealValue(0,Number(t.dataset.value)),n.setRealValue(1,Number(l.dataset.value))})}),u.addEventListener("touchend",a=>e()),u.addEventListener("mouseup",a=>e())})}