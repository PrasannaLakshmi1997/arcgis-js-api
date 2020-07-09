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

define(["require","exports","tslib","../../../core/maybe","../../../core/accessorSupport/decorators","../../Widget","../BuildingPhase","../../support/widget"],(function(e,t,r,s,i,o,a,n){var h={nextPhase:"nextPhase",previousPhase:"previousPhase",currentPhase:"{{value}}"},l="esri-building-phase-picker",d={container:""+l,phasesContainer:l+"__phases-container",phase:l+"__phase",phaseActive:l+"__phase--active",phaseCurrent:l+"__phase--current",divider:l+"__divider",dividerActive:l+"__divider--active",arrowLeft:l+"__arrow-left",arrowRight:l+"__arrow-right"};return function(e){function t(t,r){var s=e.call(this,t,r)||this;return s._defaultViewModel=new a,s.viewModel=s._defaultViewModel,s.messages=h,s._phasesContainer=null,s._shouldScrollCurrentPhaseIntoView=!0,s._shouldFocusCurrentPhase=!1,s}return r.__extends(t,e),t.prototype.initialize=function(){var e=this;this.own(this.watch(["_currentPhase","_container"],(function(){e._shouldScrollCurrentPhaseIntoView=!0})))},t.prototype.destroy=function(){this.viewModel!==this._defaultViewModel&&this._defaultViewModel.destroy()},Object.defineProperty(t.prototype,"_currentPhase",{get:function(){return this.viewModel.enabled?this.viewModel.value:null},enumerable:!0,configurable:!0}),t.prototype.render=function(){if(this._phases.length<2)return n.tsx("div",null);var e=n.isRTL(),t=this.messages.previousPhase,r=this.messages.nextPhase;return n.tsx("div",{bind:this,key:this,class:this.classes("esri-widget",d.container),onkeydown:this._onKeyDown},n.tsx("button",{bind:this,class:e?d.arrowRight:d.arrowLeft,disabled:!this.viewModel.hasPrevious,onclick:this._onArrowLeftClick,"aria-label":t,title:t}),n.tsx("div",{bind:this,class:d.phasesContainer,afterCreate:n.storeNode,"data-node-ref":"_phasesContainer",afterUpdate:this._onPhasesContainerAfterUpdate},this._renderPhaseButtons()),n.tsx("button",{bind:this,class:e?d.arrowLeft:d.arrowRight,disabled:!this.viewModel.hasNext,onclick:this._onArrowRightClick,"aria-label":r,title:r}))},t.prototype._renderPhaseButtons=function(){for(var e=this._phases,t=[],r=0;r<e.length;++r){var i=e[r],o={phase:i,active:!!s.isSome(this._currentPhase)&&i<=this._currentPhase,current:!!s.isSome(this._currentPhase)&&i===this._currentPhase};r>0&&t.push(this._renderDivider(o)),t.push(this._renderPhaseButton(o))}return t},t.prototype._renderPhaseButton=function(e){var t,r=this,i=e.phase,o=e.active,a=e.current,h=s.unwrap(this.viewModel.getValueLabel(i));return n.tsx("button",{key:"phase-"+i,class:this.classes(d.phase,(t={},t[d.phaseActive]=o,t[d.phaseCurrent]=a,t)),"aria-label":h,title:h,onclick:function(){return r.viewModel.select(i)}},i)},t.prototype._renderDivider=function(e){var t,r=e.phase,s=e.active;return n.tsx("div",{key:"phase-divider-"+r,class:this.classes(d.divider,(t={},t[d.dividerActive]=s,t))})},t.prototype._onKeyDown=function(e){switch(e.key){case"ArrowDown":case"ArrowLeft":e.stopPropagation(),e.preventDefault(),this.viewModel.previous(),this._shouldFocusCurrentPhase=!0;break;case"ArrowUp":case"ArrowRight":e.stopPropagation(),e.preventDefault(),this.viewModel.next(),this._shouldFocusCurrentPhase=!0}},t.prototype._onArrowLeftClick=function(){this.viewModel.previous()},t.prototype._onArrowRightClick=function(){this.viewModel.next()},t.prototype._onPhasesContainerAfterUpdate=function(){if(!s.isNone(this._phasesContainer)){var e=this._phasesContainer.querySelector("."+d.phaseCurrent);if(!s.isNone(e)){if(this._shouldScrollCurrentPhaseIntoView){var t=this._phasesContainer.offsetWidth,r=e.offsetLeft,i=e.offsetWidth;this._phasesContainer.scrollLeft=-t/2+r-i/2,this._shouldScrollCurrentPhaseIntoView=!1}this._shouldFocusCurrentPhase&&(e.focus(),this._shouldFocusCurrentPhase=!1)}}},r.__decorate([i.property({type:a}),n.renderable(["viewModel.layers.length","viewModel.hasNext","viewModel.hasPrevious"])],t.prototype,"viewModel",void 0),r.__decorate([i.property(),n.renderable()],t.prototype,"messages",void 0),r.__decorate([i.aliasOf("viewModel.allowedValues"),n.renderable()],t.prototype,"_phases",void 0),r.__decorate([i.property({readOnly:!0,dependsOn:["viewModel.enabled","viewModel.value"]}),n.renderable()],t.prototype,"_currentPhase",null),r.__decorate([i.property()],t.prototype,"_phasesContainer",void 0),t=r.__decorate([i.subclass("esri.widgets.BuildingExplorer.BuildingPhasePicker.BuildingPhasePicker")],t)}(o)}));