(()=>{"use strict";({activeItem:null,ui:{container:"dashboard",item:"widget-item",dragStart:"drag-start",dragEnter:"drag-enter"},events:{dragstart:"onDragStart",dragend:"onDragEnd",dragover:"onDragOver",dragenter:"onDragEnter",dragleave:"onDragLeave",drop:"onDrop"},get container(){return document.querySelector(`.${this.ui.container}`)},get items(){return this.container.querySelectorAll(`.${this.ui.item}`)},removeClasses(){this.items.forEach((t=>{t.classList.remove(this.ui.dragStart,this.ui.dragEnter)}))},onDragStart(t,e){this.activeItem=e.srcElement,e.target.classList.add(this.ui.dragStart),e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/html",t.innerHTML)},onDragEnd(t,e){e.target.classList.remove(this.ui.dragStart)},onDragEnter(t,e){e.preventDefault&&e.preventDefault(),e.target.classList.add(this.ui.dragEnter)},onDragLeave(t,e){e.target.classList.remove(this.ui.dragEnter)},onDragOver:(t,e)=>(e.preventDefault&&e.preventDefault(),e.dataTransfer.dropEffect="move",!1),onDrop(t,e){return e.stopPropagation&&e.stopPropagation(),this.activeItem!==e.srcElement&&(this.activeItem.innerHTML=t.innerHTML,t.innerHTML=e.dataTransfer.getData("text/html")),this.removeClasses(),!1},init({container:t,item:e}){this.ui.container=t,this.ui.item=e;for(let[t,e]of Object.entries(this.events))this.items.forEach((r=>{r.addEventListener(t,(t=>{this[e](r,t)}))}))}}).init({container:"dashboard",item:"widget-item"})})();