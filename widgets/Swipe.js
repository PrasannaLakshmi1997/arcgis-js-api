// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.16/esri/copyright.txt for details.

define(["require","exports","tslib","../core/events","../core/accessorSupport/decorators","../core/libs/pep/pep","./Widget","./support/widget","./Swipe/SwipeViewModel"],(function(e,t,i,r,o,n,a,s,l){var d="esri-swipe",p="esri-swipe--disabled",c="esri-swipe--vertical",v="esri-swipe--horizontal",u="esri-swipe__container",_="esri-swipe__divider",w="esri-swipe__handle",h="esri-swipe__handle--hidden",y="esri-icon-up-down-arrows",f="esri-swipe__handle-icon",g="esri-icon-drag-horizontal",b="esri-icon-drag-vertical",m="esri-widget",C="esri-disabled",P={handle:!0,divider:!0};return function(e){function t(t,i){var r=e.call(this,t,i)||this;return r.direction=null,r.disabled=!1,r.dragLabel=void 0,r.iconClass=y,r.label=void 0,r.leadingLayers=null,r.messages=null,r.position=null,r.trailingLayers=null,r.view=null,r.viewModel=new l,r._pointerOffset=null,r._container=null,r._onContainerPointerDown=r._onContainerPointerDown.bind(r),r._onContainerPointerMove=r._onContainerPointerMove.bind(r),r._onContainerPointerUp=r._onContainerPointerUp.bind(r),r}return i.__extends(t,e),Object.defineProperty(t.prototype,"visibleElements",{get:function(){return this._get("visibleElements")||P},set:function(e){this._set("visibleElements",i.__assign(i.__assign({},P),e))},enumerable:!0,configurable:!0}),t.prototype.render=function(){var e,t=this.viewModel,i=t.state,r=t.direction,o="disabled"===i||this.disabled,n=((e={})[C]=o,e[p]=o,e[c]="vertical"===r,e[v]="horizontal"===r,e);return s.tsx("div",{class:this.classes(d,m,n)},"disabled"===i?null:this.renderContainer())},t.prototype.renderHandle=function(){var e,t=this.viewModel.direction,i=this.visibleElements,r=((e={})[g]="vertical"===t,e[b]="horizontal"===t,e),o=this.classes(w,!i.handle&&h);return s.tsx("div",{key:"handle",role:"presentation",class:o},s.tsx("span",{"aria-hidden":"true",class:this.classes(f,r)}))},t.prototype.renderDivider=function(){var e=this.visibleElements;return e&&e.divider?s.tsx("div",{key:"divider",role:"presentation",class:_}):null},t.prototype.renderContent=function(){return[this.renderDivider(),this.renderHandle()]},t.prototype.renderContainer=function(){var e=this.disabled,t=this.dragLabel,i=this.viewModel,r=i.max,o=i.min,n=i.direction,a=i.position,l=a+"%",d={top:"vertical"===n?l:null,left:"vertical"===n?null:l},p=this.renderContent();return e?s.tsx("div",{key:"container",role:"presentation",styles:d,class:u},p):s.tsx("div",{tabIndex:0,key:"container",bind:this,afterCreate:this._afterContainerCreate,onkeydown:this._onContainerKeyDown,"touch-action":"none",role:"slider",title:t,"aria-label":t,"aria-orientation":n,"aria-valuemax":""+r,"aria-valuemin":""+o,"aria-valuenow":""+a,"aria-valuetext":l,styles:d,class:u},p)},t.prototype._afterContainerCreate=function(e){n.applyLocal(e),this._container=e,e.addEventListener("pointerdown",this._onContainerPointerDown)},t.prototype._calculatePointerOffset=function(e){var t=this.direction,i=e.target,r=("vertical"===t?i.clientHeight:i.clientWidth)/2,o=i.getBoundingClientRect(),n=e.clientX-o.left,a=e.clientY-o.top;this._pointerOffset="vertical"===t?a-r:n-r},t.prototype._onContainerPointerDown=function(e){e.preventDefault(),this._container&&document.activeElement!==this.container&&this._container.focus(),this._calculatePointerOffset(e),document.addEventListener("pointerup",this._onContainerPointerUp),document.addEventListener("pointermove",this._onContainerPointerMove)},t.prototype._onContainerPointerUp=function(e){e.preventDefault(),document.removeEventListener("pointerup",this._onContainerPointerUp),document.removeEventListener("pointermove",this._onContainerPointerMove)},t.prototype._onContainerPointerMove=function(e){e.preventDefault();var t=this._pointerOffset,i=this.container,r=this.direction,o=e.clientX,n=e.clientY,a=i.getBoundingClientRect(),s=a.top,l=a.left,d=a.width,p=a.height,c=("vertical"===r?n-s-t:o-l-t)/("vertical"===r?p:d)*100;this.position=c},t.prototype._getKeyPosition=function(e){var t=r.eventKey(e),i=this.position,o=this.viewModel,n=o.max,a=o.min,s=o.step,l=o.stepMultiplier,d=o.direction,p=s*l;return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown"].indexOf(t)>-1&&(e.preventDefault(),e.stopPropagation()),("vertical"===d?"ArrowDown"===t||"ArrowRight"===t:"ArrowUp"===t||"ArrowRight"===t)?i+(e.shiftKey?p:s):("vertical"===d?"ArrowUp"===t||"ArrowLeft"===t:"ArrowDown"===t||"ArrowLeft"===t)?i-(e.shiftKey?p:s):"Home"===t?a:"End"===t?n:("vertical"===d?"PageDown"===t:"PageUp"===t)?i+p:("vertical"===d?"PageUp"===t:"PageDown"===t)?i-p:null},t.prototype._onContainerKeyDown=function(e){var t=this._getKeyPosition(e);"number"==typeof t&&(this.position=t)},i.__decorate([o.aliasOf("viewModel.direction")],t.prototype,"direction",void 0),i.__decorate([o.property(),s.renderable()],t.prototype,"disabled",void 0),i.__decorate([o.property({aliasOf:{source:"messages.dragLabel",overridable:!0}}),s.renderable()],t.prototype,"dragLabel",void 0),i.__decorate([o.property()],t.prototype,"iconClass",void 0),i.__decorate([o.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),i.__decorate([o.aliasOf("viewModel.leadingLayers")],t.prototype,"leadingLayers",void 0),i.__decorate([o.property(),s.renderable(),s.messageBundle("esri/widgets/Swipe/t9n/Swipe")],t.prototype,"messages",void 0),i.__decorate([o.aliasOf("viewModel.position")],t.prototype,"position",void 0),i.__decorate([o.aliasOf("viewModel.trailingLayers")],t.prototype,"trailingLayers",void 0),i.__decorate([o.aliasOf("viewModel.view"),s.renderable()],t.prototype,"view",void 0),i.__decorate([o.property({type:l}),s.renderable(["viewModel.state","viewModel.position","viewModel.direction"])],t.prototype,"viewModel",void 0),i.__decorate([o.property(),s.renderable()],t.prototype,"visibleElements",null),t=i.__decorate([o.subclass("esri.widgets.Swipe")],t)}(a)}));