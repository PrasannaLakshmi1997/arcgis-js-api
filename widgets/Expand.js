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

define(["require","exports","tslib","../core/accessorSupport/decorators","./Widget","./Expand/ExpandViewModel","./support/widget"],(function(e,t,n,o,r,a,s){var d="esri-expand esri-widget",i="esri-expand--auto",p="esri-expand--drawer",l="esri-expand--floating",c="esri-expand__container",u="esri-expand__container--expanded",_="esri-expand__panel",x="esri-widget--button",h="esri-icon-font-fallback-text",y="esri-collapse__icon",v="esri-expand__icon--expanded",b="esri-expand__icon-number",g="esri-expand__icon-number--expanded",f="esri-icon-expand",m="esri-icon-collapse",C="esri-expand__content",w="esri-expand__content--expanded",T="esri-expand__mask",O="esri-expand__mask--expanded";return function(e){function t(t,n){var o=e.call(this,t,n)||this;return o.autoCollapse=null,o.collapseTooltip="",o.content="",o.expanded=null,o.expandTooltip="",o.group=null,o.iconNumber=0,o.label=void 0,o.messages=null,o.messagesCommon=null,o.mode="auto",o.view=null,o.viewModel=new a,o}return n.__extends(t,e),Object.defineProperty(t.prototype,"contentId",{get:function(){return this.id+"_controls_content"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expandTitle",{get:function(){var e=this.expanded,t=this.messagesCommon,n=this.collapseTooltip,o=this.expandTooltip;return e?n||t.collapse:o||t.expand},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"collapseIconClass",{get:function(){return m},set:function(e){e?this._override("collapseIconClass",e):this._clearOverride("collapseIconClass")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expandIconClass",{get:function(){return s.isWidget(this.content)?this.content.iconClass:f},set:function(e){e?this._override("expandIconClass",e):this._clearOverride("expandIconClass")},enumerable:!0,configurable:!0}),t.prototype.expand=function(){this.viewModel.expanded=!0},t.prototype.collapse=function(){this.viewModel.expanded=!1},t.prototype.toggle=function(){this.viewModel.expanded=!this.viewModel.expanded},t.prototype.render=function(){var e,t=this.mode,n=((e={})[i]="auto"===t,e[p]="drawer"===t,e[l]="floating"===t,e);return s.tsx("div",{class:this.classes(d,n)},this.renderMask(),this.renderContainer())},t.prototype.renderContainer=function(){var e,t=this.expanded,n=((e={})[u]=t,e);return s.tsx("div",{class:this.classes(c,n)},this.renderPanel(),this.renderContent())},t.prototype.renderMask=function(){var e,t=this.expanded,n=((e={})[O]=t,e);return s.tsx("div",{bind:this,onclick:this._toggle,class:this.classes(T,n)})},t.prototype.renderBadgeNumber=function(){var e=this.expanded,t=this.iconNumber;return t&&!e?s.tsx("span",{key:"expand__icon-number",class:b},t):null},t.prototype.renderPanelNumber=function(){var e=this.iconNumber,t=this.expanded;return e&&t?s.tsx("span",{key:"expand__expand-icon-number",class:this.classes(b,g)},e):null},t.prototype.renderIcon=function(){var e,t=this.collapseIconClass,n=this.expandIconClass,o=this.expanded,r=((e={})[v]=o,e[t]=o,e[n]=!o,e);return t===n&&(r[t]=!0),s.tsx("span",{"aria-hidden":"true",class:this.classes(y,r)})},t.prototype.renderTitle=function(){return s.tsx("span",{class:h},this.expandTitle)},t.prototype.renderExpandButton=function(){var e=this.expanded,t=this.expandTitle,n=this.contentId;return s.tsx("div",{bind:this,onclick:this._toggle,onkeydown:this._toggle,"aria-controls":n,"aria-expanded":e?"true":"false",title:t,role:"button",tabindex:"0",class:x},this.renderBadgeNumber(),this.renderIcon(),this.renderTitle())},t.prototype.renderPanel=function(){return s.tsx("div",{class:_},this.renderExpandButton(),this.renderPanelNumber())},t.prototype.renderContent=function(){var e,t=this.expanded,n=this.contentId,o=((e={})[w]=t,e);return s.tsx("div",{id:n,role:"region",class:this.classes(C,o)},this.renderContentContainer())},t.prototype.renderContentContainer=function(){var e=this.content;return"string"==typeof e?s.tsx("div",{innerHTML:e}):s.isWidget(e)?e.render():e instanceof HTMLElement?s.tsx("div",{bind:e,afterCreate:this._attachToNode}):s.hasDomNode(e)?s.tsx("div",{bind:e.domNode,afterCreate:this._attachToNode}):null},t.prototype._toggle=function(){this.toggle()},t.prototype._attachToNode=function(e){e.appendChild(this)},n.__decorate([o.property({readOnly:!0,dependsOn:["id"]}),s.renderable()],t.prototype,"contentId",null),n.__decorate([o.property({readOnly:!0,dependsOn:["expanded","messagesCommon","collapseTooltip","expandTooltip"]}),s.renderable()],t.prototype,"expandTitle",null),n.__decorate([o.aliasOf("viewModel.autoCollapse")],t.prototype,"autoCollapse",void 0),n.__decorate([o.property({dependsOn:["content"]}),s.renderable()],t.prototype,"collapseIconClass",null),n.__decorate([o.property(),s.renderable()],t.prototype,"collapseTooltip",void 0),n.__decorate([o.property(),s.renderable()],t.prototype,"content",void 0),n.__decorate([o.aliasOf("viewModel.expanded"),s.renderable()],t.prototype,"expanded",void 0),n.__decorate([o.property({dependsOn:["content"]}),s.renderable()],t.prototype,"expandIconClass",null),n.__decorate([o.property(),s.renderable()],t.prototype,"expandTooltip",void 0),n.__decorate([o.aliasOf("viewModel.group")],t.prototype,"group",void 0),n.__decorate([o.property(),s.renderable()],t.prototype,"iconNumber",void 0),n.__decorate([o.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],t.prototype,"label",void 0),n.__decorate([o.property(),s.renderable(),s.messageBundle("esri/widgets/Expand/t9n/Expand")],t.prototype,"messages",void 0),n.__decorate([o.property(),s.renderable(),s.messageBundle("esri/t9n/common")],t.prototype,"messagesCommon",void 0),n.__decorate([o.property(),s.renderable()],t.prototype,"mode",void 0),n.__decorate([o.aliasOf("viewModel.view"),s.renderable()],t.prototype,"view",void 0),n.__decorate([o.property({type:a}),s.renderable("viewModel.state")],t.prototype,"viewModel",void 0),n.__decorate([s.accessibleHandler()],t.prototype,"_toggle",null),t=n.__decorate([o.subclass("esri.widgets.Expand")],t)}(r)}));