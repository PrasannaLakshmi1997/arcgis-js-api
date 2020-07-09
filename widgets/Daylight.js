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

define(["require","exports","tslib","../core/arrayUtils","../core/Logger","../core/maybe","../core/watchUtils","../core/accessorSupport/decorators","./Widget","./Daylight/daylightUtils","./Daylight/DaylightViewModel","./Daylight/support/SliderWithDropdown","./support/DatePicker","./support/widget"],(function(e,t,i,s,o,r,a,n,l,d,c,h,p,v){var u="esri-daylight",g="esri-button",w="esri-daylight__checkbox",y="esri-icon-checkbox-checked",_="esri-daylight__container esri-daylight__day-container",m="esri-daylight__container esri-daylight__date-container",b="esri-widget__heading",f="esri-interactive",S=" esri-widget__anchor",M="esri-daylight__container__labelled-tick",k="esri-icon-pause",x="esri-icon-play",O="esri-daylight__play-pause-button",P="esri-select",D="esri-daylight__season-picker",E="esri-daylight__shadow-container",T="esri-slider--shadow-off",C="esri-slider--shadow-on",V="esri-daylight__container__tick",B="esri-icon-checkbox-unchecked",L="esri-widget",z="esri-slider--date-on",F="esri-slider--date-off",I="esri-daylight__panel--error",U={playButtons:!0,shadowsToggle:!0,datePicker:!0,timezone:!0},N=o.getLogger("esri.widgets.Daylight");return function(e){function t(t,s){var o,r=e.call(this,t,s)||this;return r.playSpeedMultiplier=1,r.timeSliderSteps=5,r.view=null,r.viewModel=new c,r.visibleElements=i.__assign({},U),r.dateOrSeason="date",r._timeSlider=new h({viewModel:r.viewModel.timeSliderViewModel,labelFormatFunction:d.formatSliderLabel,inputFormatFunction:d.formatSliderLabel,min:0,max:1439,steps:null!==(o=r.timeSliderSteps)&&void 0!==o?o:5,values:[0],labelInputsEnabled:!1,visibleElements:{labels:!0},tickConfigs:[{mode:"position",values:[0,360,720,1080,1439],labelsVisible:!0,tickCreatedFunction:r._onPrimaryTickCreated.bind(r)},{mode:"position",values:[120,240,480,600,840,960,1200,1320],tickCreatedFunction:r._onSecondaryTickCreated.bind(r)}],items:[]}),r._datePicker=new p({viewModel:r.viewModel.datePickerViewModel,commitOnMonthChange:!0}),r}return i.__extends(t,e),Object.defineProperty(t.prototype,"gmtOffsets",{get:function(){return this.messages?d.getGMTOffsets(this.messages):null},enumerable:!0,configurable:!0}),t.prototype.castVisibleElements=function(e){return i.__assign(i.__assign({},U),e)},t.prototype.postInitialize=function(){var e=this;this.viewModel.isSupported&&this.own(a.init(this.viewModel,"datePickerViewModel",(function(t){e._datePicker.viewModel=t})),a.init(this.viewModel,"timeSliderViewModel",(function(t){e._timeSlider.viewModel=t})),a.init(this,"messages",(function(){e._timeSlider.buttonTooltip=e.messages.chooseTimezone})),a.init(this,"visibleElements",(function(){e._timeSlider.showDropDown=e.visibleElements.timezone})),a.init(this,"gmtOffsets",(function(t){r.isSome(t)&&(e._timeSlider.items=t)})),a.init(this,["viewModel.utcOffset","gmtOffsets"],(function(){return e._onUTCOffsetChange()})))},t.prototype.destroy=function(){this._datePicker.destroy(),this._timeSlider.destroy()},t.prototype.render=function(){return this.viewModel.isSupported?v.tsx("div",{class:this.classes(u,L)},v.tsx("h3",{class:b},this.messages.title),this.renderTimeOptions(),this.visibleElements.datePicker?"date"===this.dateOrSeason?this.renderDateOptions():this.renderSeasonOptions():null,this.visibleElements.shadowsToggle?this.renderShadowOptions():null):v.tsx("div",{class:this.classes(u,L)},v.tsx("div",{key:"daylight__unsupported",class:I},v.tsx("p",null,this.messages.unsupported)))},t.prototype.renderTimeOptions=function(){var e,t,i,s=((e={})[x]=!this.viewModel.dayPlaying,e[k]=this.viewModel.dayPlaying,e),o=((t={})[C]=this.viewModel.directShadowsEnabled,t[T]=!this.viewModel.directShadowsEnabled,t),r=((i={})[z]=this.visibleElements.datePicker,i[F]=!this.visibleElements.datePicker,i);return v.tsx("div",{class:this.classes(_,o,r),key:"daylight-time-options"},this._timeSlider.render(),this.visibleElements.playButtons?v.tsx("button",{bind:this.viewModel,onclick:this.viewModel.toggleDayPlaying,"aria-label":this.messages.playDay,title:this.messages.playDay,role:"button",class:this.classes(g,O,s)},v.tsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},v.tsx("path",{d:"M6 3.745L11.255 8 6 12.255z"}))):null)},t.prototype.renderDateOptions=function(){var e,t=((e={})[x]=!this.viewModel.yearPlaying,e[k]=this.viewModel.yearPlaying,e);return v.tsx("div",{class:m,key:"daylight-date-options"},this._datePicker.render(),this.visibleElements.playButtons?v.tsx("button",{bind:this.viewModel,onclick:this.viewModel.toggleYearPlaying,"aria-label":this.messages.playYear,title:this.messages.playYear,role:"button",class:this.classes(g,O,t)},v.tsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},v.tsx("path",{d:"M6 3.745L11.255 8 6 12.255z"}))):null)},t.prototype.renderShadowOptions=function(){var e,t=this.id+"__shadowButton",i=((e={})[y]=this.viewModel.directShadowsEnabled,e[B]=!this.viewModel.directShadowsEnabled,e);return v.tsx("div",{class:E,key:"daylight-shadow-options"},v.tsx("button",{bind:this.viewModel,onclick:this.viewModel.toggleDirectShadows,name:t,class:this.classes(g,w,i),"aria-label":this.messages.directShadow,title:this.messages.directShadow}),v.tsx("label",{bind:this.viewModel,onclick:this.viewModel.toggleDirectShadows,for:t,class:this.classes(S,f),"aria-label":this.messages.directShadow,title:this.messages.directShadow},this.messages.directShadow))},t.prototype.renderSeasonOptions=function(){var e=this;return v.tsx("select",{bind:this,onchange:this._onSeasonChange,class:this.classes(P,D),value:this.viewModel.currentSeason,"aria-label":this.messages.season},d.ORDERED_SEASONS.map((function(t){return v.tsx("option",{value:t},e.messages[t])})))},t.prototype._onSeasonChange=function(e){var t=e.target;this.viewModel.currentSeason=t.value},t.prototype._onUTCOffsetChange=function(){var e,t=this.viewModel.utcOffset,i=null===(e=this._timeSlider.currentItem)||void 0===e?void 0:e.abbr,o=this.gmtOffsets;if(r.isSome(o)&&i!==t){var a=s.findIndex(o,(function(e){return e.abbr===t}));a>-1&&(this._timeSlider.currentIndex=a)}},t.prototype._onPrimaryTickCreated=function(e,t,i){var s=this;t.className+=" esri-interactive esri-widget__anchor "+V+" "+M,i.className+=" esri-interactive esri-widget__anchor";var o=function(){s.viewModel.timeSliderPosition=e};t.onclick=o,i.onclick=o;var r=i.innerText;-1!==r.indexOf(" ")&&(i.innerHTML=r.replace(/(.*) (.*)/,'$1<br><div class="esri-label__ampm">$2</div>'))},t.prototype._onSecondaryTickCreated=function(e,t){var i=this;t.className+=" esri-interactive esri-widget__anchor "+V,t.onclick=function(){i.viewModel.timeSliderPosition=e}},i.__decorate([n.property({readOnly:!0,dependsOn:["messages"]})],t.prototype,"gmtOffsets",null),i.__decorate([n.property(),v.renderable(),v.messageBundle("esri/widgets/Daylight/t9n/Daylight")],t.prototype,"messages",void 0),i.__decorate([n.aliasOf("viewModel.playSpeedMultiplier")],t.prototype,"playSpeedMultiplier",void 0),i.__decorate([n.aliasOf("_timeSlider.steps")],t.prototype,"timeSliderSteps",void 0),i.__decorate([n.aliasOf("viewModel.view")],t.prototype,"view",void 0),i.__decorate([n.property({type:c}),v.renderable(["viewModel.directShadowsEnabled","viewModel.timeSliderPosition","viewModel.currentSeason","viewModel.localDate","viewModel.utcOffset"])],t.prototype,"viewModel",void 0),i.__decorate([n.property(),v.renderable()],t.prototype,"visibleElements",void 0),i.__decorate([n.cast("visibleElements")],t.prototype,"castVisibleElements",null),i.__decorate([n.property({cast:function(e){return"season"===e||"date"===e?e:(N.warn('"'+e+'" is not a valid option. Acceptable values are only "date" or "season". Defaulting to "date".'),"date")}}),v.renderable()],t.prototype,"dateOrSeason",void 0),i.__decorate([n.property(),v.renderable()],t.prototype,"_timeSlider",void 0),i.__decorate([n.property(),v.renderable()],t.prototype,"_datePicker",void 0),t=i.__decorate([n.subclass("esri.widgets.Daylight")],t)}(l)}));