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

define(["require","exports","tslib","../core/domUtils","../core/scheduling","../core/watchUtils","../core/accessorSupport/decorators","./overlay/ViewOverlay","../widgets/Popup"],(function(e,t,i,r,n,o,s,a,d){Object.defineProperty(t,"__esModule",{value:!0});var u=[0,0];function p(e){var t=(e.ownerDocument||window.document).defaultView,i=e.getBoundingClientRect();return u[0]=i.left+t.pageXOffset,u[1]=i.top+t.pageYOffset,u}function h(e){e&&(r.empty(e),e.parentNode&&e.parentNode.removeChild(e))}t.DOMContainer=function(e){return function(e){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var r=e.apply(this,t)||this;return r._freqInfo={freq:16,time:750},r._overlayRenderTaskHandle=null,r.height=0,r.position=null,r.resizing=!1,r.root=null,r.surface=null,r.suspended=!0,r.ui=null,r.userContent=null,r.width=0,r.widthBreakpoint=null,r.handles.add([r.watch("cursor",(function(e){var t=r.surface;t&&t.setAttribute("data-cursor",e)})),r.watch("interacting",(function(e){var t=r.surface;t&&t.setAttribute("data-interacting",e.toString())}))]),r}return i.__extends(t,e),t.prototype.initialize=function(){var e=this;this.handles.add(this.watch("ui",(function(t,i){return e._handleUIChange(t,i)}))),this._wireUI(this.ui),this.handles.add([this.on("focus",(function(){return e.notifyChange("focused")})),this.on("blur",(function(){return e.notifyChange("focused")}))])},t.prototype.destroy=function(){this.destroyed||(this.ui&&(this.ui.destroy(),this.ui=null),this.popup&&!this.popup.destroyed&&this.popup.destroy(),this.container=null)},Object.defineProperty(t.prototype,"container",{set:function(e){var t=this,i=this._get("container");if(i!==e){if(this.handles.remove("dom-size"),this._stopMeasuring(),i&&(i.classList.remove("esri-view"),this._overlayRenderTaskHandle&&(this._overlayRenderTaskHandle.remove(),this._overlayRenderTaskHandle=null),this.overlay.destroy(),this._set("overlay",null),h(this.root),this._set("root",null),r.reparent(this.userContent,i),h(this.userContent),this._set("userContent",null)),e){e.classList.add("esri-view");var s=document.createElement("div");s.className="esri-view-user-storage",r.reparent(e,s),e.appendChild(s),this._set("userContent",s);var d=document.createElement("div");d.className="esri-view-root",e.insertBefore(d,e.firstChild),this._set("root",d);var u=document.createElement("div");u.className="esri-view-surface",u.setAttribute("role","application"),u.tabIndex=0,d.appendChild(u),this._set("surface",u);var p=new a;d.appendChild(p.surface),this._set("overlay",p),p.watch("needsRender",(function(e){e&&!t._overlayRenderTaskHandle?t._overlayRenderTaskHandle=n.addFrameTask({render:function(){t.overlay.render()}}):t._overlayRenderTaskHandle&&(t._overlayRenderTaskHandle.remove(),t._overlayRenderTaskHandle=null)})),this.forceDOMReadyCycle(),this.handles.add(o.init(this,"size",(function(e){var t=e[0],i=e[1];t>=document.body.clientWidth||i>=document.body.clientHeight?u.classList.add("esri-view-surface--inset-outline"):u.classList.remove("esri-view-surface--inset-outline")})),"dom-size"),this._set("container",e),this._startMeasuring()}else this._set("width",0),this._set("height",0),this._set("position",null),this._set("suspended",!0),this._set("surface",null),this._set("container",null)}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"focused",{get:function(){var e=document.activeElement===this.surface;return document.hasFocus()&&e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"popup",{get:function(){return this._get("popup")||new d({view:this})},set:function(e){var t=this._get("popup");t&&t!==e&&t.destroy(),this._set("popup",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return[this.width,this.height]},enumerable:!0,configurable:!0}),t.prototype.blur=function(){this.surface&&this.surface.blur()},t.prototype.focus=function(){this.surface&&this.surface.focus()},t.prototype.pageToContainer=function(e,t,i){var r=this.position;return e-=r[0],t-=r[1],i?(i[0]=e,i[1]=t):i=[e,t],i},t.prototype.containerToPage=function(e,t,i){var r=this.position;return e+=r[0],t+=r[1],i?(i[0]=e,i[1]=t):i=[e,t],i},t.prototype._handleUIChange=function(e,t){t&&(this.handles.remove("ui"),t.destroy()),e&&this._wireUI(e),this._set("ui",e)},t.prototype._wireUI=function(e){this.handles.remove("ui"),e&&(e.view=this,this.handles.add([o.init(this,"root",(function(t){var i,r;e.container=t?(i=t,r=document.createElement("div"),i.appendChild(r),r):null})),o.init(this,"popup",(function(t,i){i&&e.remove(i,"popup"),t&&(t.view=e.view,e.add(t,{key:"popup",position:"manual"}))}))],"ui"))},t.prototype._stopMeasuring=function(){this.handles.remove("measuring"),this._get("resizing")&&this._set("resizing",!1)},t.prototype._startMeasuring=function(){var e,t=this,i=this._freqInfo;i.freq=16,i.time=750,this.handles.add([(e=function(){i.freq=16,i.time=750},window.addEventListener("resize",e),{remove:function(){window.removeEventListener("resize",e)}}),n.addFrameTask({prepare:function(e){var i=t._measure(),r=t._freqInfo;if(r.time+=e.deltaTime,i&&(r.freq=16,t._get("resizing")||t._set("resizing",!0)),!(r.time<r.freq)){r.time=0;var n=t._position();r.freq=n||i?16:Math.min(750,2*r.freq),!i&&r.freq>=512&&t._get("resizing")&&t._set("resizing",!1)}}})],"measuring"),this._measure(),this._position()},t.prototype._measure=function(){var e=this.container,t=e?e.clientWidth:0,i=e?e.clientHeight:0;if(0===t||0===i)return this.suspended||this._set("suspended",!0),!1;var r=this.width,n=this.height;return t===r&&i===n?(this.suspended&&this._set("suspended",!1),!1):(this._set("width",t),this._set("height",i),this.suspended&&this._set("suspended",!1),this.emit("resize",{oldWidth:r,oldHeight:n,width:t,height:i}),!0)},t.prototype._position=function(){var e=this.container,t=this.position,i=p(e);return(!t||i[0]!==t[0]||i[1]!==t[1])&&(this._set("position",[i[0],i[1]]),!0)},t.prototype.forceDOMReadyCycle=function(){},i.__decorate([s.property({value:null,cast:function(e){return r.byId(e)}})],t.prototype,"container",null),i.__decorate([s.property({readOnly:!0,dependsOn:["surface"]})],t.prototype,"focused",null),i.__decorate([s.property({readOnly:!0})],t.prototype,"height",void 0),i.__decorate([s.property({type:d})],t.prototype,"popup",null),i.__decorate([s.property({type:a})],t.prototype,"overlay",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"position",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"resizing",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"root",void 0),i.__decorate([s.property({value:null,dependsOn:["width","height"],readOnly:!0})],t.prototype,"size",null),i.__decorate([s.property({readOnly:!0})],t.prototype,"surface",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"suspended",void 0),i.__decorate([s.property()],t.prototype,"ui",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"userContent",void 0),i.__decorate([s.property({readOnly:!0})],t.prototype,"width",void 0),i.__decorate([s.property()],t.prototype,"widthBreakpoint",void 0),t=i.__decorate([s.subclass("esri.views.DOMContainer")],t)}(e)},t.isDOMContainer=function(e){return e&&"focus"in e}}));