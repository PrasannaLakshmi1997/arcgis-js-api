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

define(["require","exports","./unitFormatUtils"],(function(r,t,e){Object.defineProperty(t,"__esModule",{value:!0}),t.formatDecimal=function(r,t,a,n,i){return void 0===n&&(n=2),void 0===i&&(i="abbr"),e.formatDecimal(r,t.toUnit(a).value,a,n,i)},t.formatMetricLength=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"length"!==t.measure)throw new Error("quantity is not a length");return e.formatMetricLength(r,t.value,t.unit,a,n)},t.formatMetricVerticalLength=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"length"!==t.measure)throw new Error("quantity is not a length");return e.formatMetricVerticalLength(r,t.value,t.unit,a,n)},t.formatMetricArea=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"area"!==t.measure)throw new Error("quantity is not an area");return e.formatMetricArea(r,t.value,t.unit,a,n)},t.formatImperialLength=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"length"!==t.measure)throw new Error("quantity is not a length");return e.formatImperialLength(r,t.value,t.unit,a,n)},t.formatImperialVerticalLength=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"length"!==t.measure)throw new Error("quantity is not a length");return e.formatImperialVerticalLength(r,t.value,t.unit,a,n)},t.formatImperialArea=function(r,t,a,n){if(void 0===a&&(a=2),void 0===n&&(n="abbr"),"area"!==t.measure)throw new Error("quantity is not an area");return e.formatImperialArea(r,t.value,t.unit,a,n)},t.formatDMS=function(r){if("angle"!==r.measure)throw new Error("quantity is not an angle");return e.formatDMS(r.value,r.unit)}}));