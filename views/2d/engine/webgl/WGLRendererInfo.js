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

define(["require","exports","../../../../Color","../../../../core/has","../../../../core/maybe","../../../../core/screenUtils","../../../../core/unitUtils","../../../../core/libs/gl-matrix-2/mat4f32","../../../../renderers/support/utils","./definitions","./Utils"],(function(e,t,i,s,a,o,r,n,l,u,v){function d(e,t){var i=t.length;if(e<t[0].value||1===i)return t[0].size;for(var s=1;s<i;s++)if(e<t[s].value){var a=(e-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+a*(t[s].size-t[s-1].size)}return t[i-1].size}function f(e,t,i){if(void 0===i&&(i=0),a.isNone(t))return e[i+0]=0,e[i+1]=0,e[i+2]=0,void(e[i+3]=0);var s=t.r,o=t.g,r=t.b,n=t.a;e[i+0]=s*n/255,e[i+1]=o*n/255,e[i+2]=r*n/255,e[i+3]=n}Object.defineProperty(t,"__esModule",{value:!0});var c=function(e,t,i){for(var s=16*i,a=s,o=0;a<Math.min(s+16,e.length);a++,o++)e[a]=t[o]},p=n.mat4f32.create(),h=function(){function e(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this.ddColors=new Float32Array(32),this.ddBackgroundColor=new Float32Array(4),this.ddActiveDots=new Float32Array(8),this.insideEffect=new Float32Array(16*u.MAX_FILTERS),this.insideOpacity=1,this.outsideEffect=new Float32Array(16*u.MAX_FILTERS),this.outsideOpacity=1,this.effectCount=0,this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1},this._buf0=new Float32Array(2),this._buf1=new Float32Array(2),this.symbolLevels.push(0);for(var e=0;e<u.MAX_FILTERS;e++)c(this.insideEffect,p,e),c(this.outsideEffect,p,e)}return Object.defineProperty(e.prototype,"insideOpacities",{get:function(){return this._buf0[0]=1,this._buf0[1]=this.insideOpacity,this._buf0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"outsideOpacities",{get:function(){return this._buf1[0]=0,this._buf1[1]=this.outsideOpacity,this._buf1},enumerable:!0,configurable:!0}),e.prototype.getSizeVVFieldStops=function(e){var t=this._vvSizeFieldStops;switch(t.type){case"static":return t;case"level-dependent":return a.unwrapOr(t.levels[e],(function(){var i=1/0,s=0;for(var o in t.levels){var r=parseFloat(o),n=Math.abs(e-r);n<i&&(i=n,s=r)}if(i===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};var l=e-s,u=Math.pow(2,l/2),v=a.unwrap(t.levels[s]),d=new Float32Array(v.values);return d[2]*=u,d[3]*=u,{sizes:a.unwrap(v.sizes),values:d}}))}},Object.defineProperty(e.prototype,"vvMaterialParameters",{get:function(){return this._vvMaterialParameters},enumerable:!0,configurable:!0}),e.prototype.update=function(e){a.isSome(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,e)},e.prototype.setInfo=function(e,t,i){var s=this;switch(a.isSome(i)?(i.forEach((function(e,t){return s._updateEffects(t,e)})),this.effectCount=i.length):this.effectCount=0,this._vvInfo=t,e.type){case"dot-density":this._updateDotDensityInfo(e)}},e.prototype.getVariation=function(){return{ddDotBlending:this.ddDotBlending,outsideLabelsVisible:this.outsideLabelsVisible,effectCount:this.effectCount,oesTextureFloat:s("esri-webgl-texture-float")}},e.prototype.getVariationHash=function(){return(this.ddDotBlending?1:0)|(this.outsideLabelsVisible?1:0)<<1|this.effectCount<<2},e.prototype._updateEffects=function(e,t){var i=e+1;if(a.isSome(t)&&t.filter&&t.filter.enabled){this.outsideLabelsVisible=t.excludedLabelsVisible;var s=t.parsedIncludedEffect,o=t.parsedExcludedEffect;a.isSome(s)?(c(this.insideEffect,s.getColorMatrix(),i),this.insideOpacity=s.getOpacity()):(c(this.insideEffect,p,i),this.insideOpacity=1),a.isSome(o)?(c(this.outsideEffect,o.getColorMatrix(),i),this.outsideOpacity=o.getOpacity()):(c(this.outsideEffect,p,i),this.outsideOpacity=1)}else c(this.insideEffect,p,i),c(this.outsideEffect,p,i),this.insideOpacity=1,this.outsideOpacity=1},e.prototype._updateVisualVariables=function(e,t){var i=this._vvMaterialParameters;if(i.vvOpacityEnabled=!1,i.vvSizeEnabled=!1,i.vvColorEnabled=!1,i.vvRotationEnabled=!1,e){var s=e.size;if(s){if(i.vvSizeEnabled=!0,s.minMaxValue){var a=s.minMaxValue,n=void 0,u=void 0;if(v.isDefined(a.minSize)&&v.isDefined(a.maxSize))if(v.isNumber(a.minSize)&&v.isNumber(a.maxSize))n=o.pt2px(a.minSize),u=o.pt2px(a.maxSize);else{var f=t.scale;n=o.pt2px(d(f,a.minSize.stops)),u=o.pt2px(d(f,a.maxSize.stops))}this.vvSizeMinMaxValue.set([a.minDataValue,a.maxDataValue,n,u])}if(s.scaleStops&&(this.vvSizeScaleStopsValue=o.pt2px(d(t.scale,s.scaleStops.stops))),s.unitValue){var c=r.getMetersPerUnitForSR(t.spatialReference)/l.meterIn[s.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=c/t.resolution}s.fieldStops&&(this._vvSizeFieldStops=s.fieldStops)}var p=e.color;p&&(i.vvColorEnabled=!0,this.vvColorValues.set(p.values),this.vvColors.set(p.colors));var h=e.opacity;h&&(i.vvOpacityEnabled=!0,this.vvOpacityValues.set(h.values),this.vvOpacities.set(h.opacities));var y=e.rotation;y&&(i.vvRotationEnabled=!0,i.vvRotationType=y.type)}},e.prototype._updateDotDensityInfo=function(e){var t=e.attributes;this.ddDotValue=e.dotValue,this.ddDotScale=e.referenceScale,this.ddDotSize=e.dotSize,this.ddDotBlending=e.dotBlendingEnabled,this.ddSeed=e.seed;for(var s=0;s<u.DOT_DENSITY_MAX_FIELDS;s++){var a=s>=t.length?new i([0,0,0,0]):t[s].color;f(this.ddColors,a,4*s)}for(s=0;s<8;s++)this.ddActiveDots[s]=s<e.attributes.length?1:0;f(this.ddBackgroundColor,e.backgroundColor)},e}();t.WGLRendererInfo=h}));