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

define(["require","exports","../../../../core/mathUtils","../../support/earthUtils"],(function(e,a,t,r){function i(e,a,t){var r=t.parameters,i=t.paddingPixelsOverride;return u.scale=Math.min(r.divisor/(a-r.offset),1),u.factor=function(e){return Math.abs(e*e*e)}(e),u.minPixelSize=r.minPixelSize,u.paddingPixels=i,u}function n(e,a){return 0===e?a.minPixelSize:a.minPixelSize*(1+2*a.paddingPixels/e)}function l(e,a){return Math.max(t.lerp(e*a.scale,e,a.factor),n(e,a))}Object.defineProperty(a,"__esModule",{value:!0}),a.getSettings=function(e){return new c(e,s)},a.getLabelSettings=function(e){var a=s.curvatureDependent,t=s.scaleStart,r=s.scaleFallOffRange;return new c(e,{curvatureDependent:{min:{curvature:a.min.curvature,tiltAngle:a.min.tiltAngle,scaleFallOffFactor:o.curvatureDependent.min.scaleFallOffFactor},max:{curvature:a.max.curvature,tiltAngle:a.max.tiltAngle,scaleFallOffFactor:o.curvatureDependent.max.scaleFallOffFactor}},scaleStart:t,scaleFallOffRange:r,minPixelSize:o.minPixelSize})},a.applyScaleFactor=l,a.applyScaleFactorVec2=function(e,a,r){void 0===r&&(r=[0,0]);var i=Math.min(Math.max(a.scale,n(e[1],a)/e[1]),1);return r[0]=t.lerp(e[0]*i,e[0],a.factor),r[1]=t.lerp(e[1]*i,e[1],a.factor),r},a.precomputeScaleFactor=function(e,a,t,r){r.scale=function(e,a,t){var r=i(e,a,t);return r.minPixelSize=0,r.paddingPixels=0,l(1,r)}(e,a,t),r.factor=0,r.minPixelSize=t.parameters.minPixelSize,r.paddingPixels=t.paddingPixelsOverride},a.applyPrecomputedScaleFactor=function(e,a,t){void 0===t&&(t=[0,0]);var r=Math.min(Math.max(a.scale,n(e[1],a)/e[1]),1);return t[0]=e[0]*r,t[1]=e[1]*r,t},a.scale=function(e,a,t,r){return l(e,i(a,t,r))};var c=function(){function e(e,a,t,r){void 0===t&&(t={camera:{distance:0,fovY:0},divisor:0,offset:0,minPixelSize:0,paddingPixels:0}),this.viewingMode=e,this.description=a,this.parameters=t,this._paddingPixelsOverride=r,"local"===this.viewingMode?(this.coverageCompensation=this.surfaceCoverageCompensationLocal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersLocal):(this.coverageCompensation=this.surfaceCoverageCompensationGlobal,this.calculateCurvatureDependentParameters=this.calculateCurvatureDependentParametersGlobal)}return Object.defineProperty(e.prototype,"paddingPixelsOverride",{get:function(){return this._paddingPixelsOverride||this.parameters.paddingPixels},enumerable:!0,configurable:!0}),e.prototype.update=function(e){return(!this.parameters||this.parameters.camera.fovY!==e.fovY||this.parameters.camera.distance!==e.distance)&&(this.calculateParameters(e,this.parameters),!0)},e.prototype.overridePadding=function(a){return a!==this.paddingPixelsOverride?new e(this.viewingMode,this.description,this.parameters,a):this},e.prototype.calculateParameters=function(e,a){var t=this.description,r=t.scaleStart,i=t.scaleFallOffRange,n=t.minPixelSize,l=e.fovY,c=e.distance,s=this.calculateCurvatureDependentParameters(e),o=this.coverageCompensation(e,s),u=s.tiltAngle,d=s.scaleFallOffFactor,f=Math.sin(u)*c,p=.5*Math.PI-u-l*(.5-r*o),m=f/Math.cos(p),v=p+l*i*o,h=(m-d*(f/Math.cos(v)))/(1-d);return a.camera.fovY=e.fovY,a.camera.distance=e.distance,a.offset=h,a.divisor=m-h,a.minPixelSize=n,a},e.prototype.calculateCurvatureDependentParametersLocal=function(e,a){return void 0===a&&(a=d),a.tiltAngle=this.description.curvatureDependent.min.tiltAngle,a.scaleFallOffFactor=this.description.curvatureDependent.min.scaleFallOffFactor,a},e.prototype.calculateCurvatureDependentParametersGlobal=function(e,a){void 0===a&&(a=d);var i=this.description.curvatureDependent,n=1+e.distance/r.earthRadius,l=Math.sqrt(n*n-1),c=[i.min.curvature,i.max.curvature],s=c[0],o=c[1],u=t.clamp((l-s)/(o-s),0,1),f=[i.min,i.max],p=f[0],m=f[1];return a.tiltAngle=t.lerp(p.tiltAngle,m.tiltAngle,u),a.scaleFallOffFactor=t.lerp(p.scaleFallOffFactor,m.scaleFallOffFactor,u),a},e.prototype.surfaceCoverageCompensationLocal=function(e,a){return(e.fovY-a.tiltAngle)/e.fovY},e.prototype.surfaceCoverageCompensationGlobal=function(e,a){var t=r.earthRadius*r.earthRadius,i=a.tiltAngle+.5*Math.PI,n=e.fovY,l=e.distance,c=l*l+t-2*Math.cos(i)*l*r.earthRadius,s=Math.sqrt(c),o=Math.sqrt(c-t);return(Math.acos(o/s)-Math.asin(r.earthRadius/(s/Math.sin(i)))+.5*n)/n},e}(),s={curvatureDependent:{min:{curvature:t.deg2rad(10),tiltAngle:t.deg2rad(12),scaleFallOffFactor:.5},max:{curvature:t.deg2rad(70),tiltAngle:t.deg2rad(40),scaleFallOffFactor:.8}},scaleStart:.3,scaleFallOffRange:.65,minPixelSize:0},o={curvatureDependent:{min:{scaleFallOffFactor:.7},max:{scaleFallOffFactor:.95}},minPixelSize:14};var u={scale:0,factor:0,minPixelSize:0,paddingPixels:0},d={tiltAngle:0,scaleFallOffFactor:0}}));