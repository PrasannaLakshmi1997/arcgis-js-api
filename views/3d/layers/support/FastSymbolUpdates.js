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

define(["require","exports","../../../../core/compilerUtils","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../renderers/support/utils","../../support/debugFlags"],(function(e,t,o,i,r,n,a,l,s,u,f,c){Object.defineProperty(t,"__esModule",{value:!0});var v;function p(e){return null!=e}function d(e){return"number"==typeof e}function z(e){return"string"==typeof e}function m(e,t){e&&e.push(t),S(t)}function y(e){0}function S(e){0}function b(e,t,o,i,r){var n=e.minSize,a=e.maxSize;if(e.expression)return m(r,"Could not convert size info: expression not supported"),!1;if(e.useSymbolValue){var l=i.symbolSize[o];return t.minSize[o]=l,t.maxSize[o]=l,t.offset[o]=t.minSize[o],t.factor[o]=0,t.type[o]=1,!0}if(p(e.field))return p(e.stops)?2===e.stops.length&&d(e.stops[0].size)&&d(e.stops[1].size)?(x(e.stops[0].size,e.stops[1].size,e.stops[0].value,e.stops[1].value,t,o),t.type[o]=1,!0):(m(r,"Could not convert size info: stops only supported with 2 elements"),!1):d(n)&&d(a)&&p(e.minDataValue)&&p(e.maxDataValue)?(x(n,a,e.minDataValue,e.maxDataValue,t,o),t.type[o]=1,!0):null!=f.meterIn[e.valueUnit]?(t.minSize[o]=-1/0,t.maxSize[o]=1/0,t.offset[o]=0,t.factor[o]=1/f.meterIn[e.valueUnit],t.type[o]=1,!0):"unknown"===e.valueUnit?(m(r,"Could not convert size info: proportional size not supported"),!1):(m(r,"Could not convert size info: scale-dependent size not supported"),!1);if(!p(e.field)){if(e.stops&&e.stops[0]&&d(e.stops[0].size))return t.minSize[o]=e.stops[0].size,t.maxSize[o]=e.stops[0].size,t.offset[o]=t.minSize[o],t.factor[o]=0,t.type[o]=1,!0;if(d(n))return t.minSize[o]=n,t.maxSize[o]=n,t.offset[o]=n,t.factor[o]=0,t.type[o]=1,!0}return m(r,"Could not convert size info: unsupported variant of sizeInfo"),!1}function x(e,t,o,i,r,n){var a=Math.abs(i-o)>0?(t-e)/(i-o):0;r.minSize[n]=a>0?e:t,r.maxSize[n]=a>0?t:e,r.offset[n]=e-o*a,r.factor[n]=a}function h(e,t,o,i){if(e.normalizationField||e.valueRepresentation)return m(i,"Could not convert size info: unsupported property"),null;if(null!=(r=e.field)&&!z(r))return m(i,"Could not convert size info: field is not a string"),null;var r,n;if(t.size){if(e.field)if(t.size.field){if(e.field!==t.size.field)return m(i,"Could not convert size info: multiple fields in use"),null}else t.size.field=e.field}else t.size={field:e.field,minSize:[0,0,0],maxSize:[0,0,0],offset:[0,0,0],factor:[0,0,0],type:[0,0,0]};switch(e.axis){case"width":return(n=b(e,t.size,0,o,i))?t:null;case"height":return(n=b(e,t.size,2,o,i))?t:null;case"depth":return(n=b(e,t.size,1,o,i))?t:null;case"width-and-depth":return(n=b(e,t.size,0,o,i))&&b(e,t.size,1,o,i),n?t:null;case null:case void 0:case"all":return(n=(n=(n=b(e,t.size,0,o,i))&&b(e,t.size,1,o,i))&&b(e,t.size,2,o,i))?t:null;default:return m(i,'Could not convert size info: unknown axis "'+e.axis+'""'),null}}function C(e,t,o){e[4*t+0]=o.r/255,e[4*t+1]=o.g/255,e[4*t+2]=o.b/255,e[4*t+3]=o.a}function M(e,t,o){var i=2===o&&"arithmetic"===e.rotationType;t.offset[o]=i?90:0,t.factor[o]=i?-1:1,t.type[o]=1}function g(e,t,i){if(!e)return null;var r=!t.supportedTypes||!!t.supportedTypes.size,n=!t.supportedTypes||!!t.supportedTypes.color,a=!t.supportedTypes||!!t.supportedTypes.rotation,l=!!t.supportedTypes&&!!t.supportedTypes.opacity;var s=e.reduce((function(e,s){if(!e)return e;if(s.valueExpression)return m(i,"Could not convert visual variables: arcade expressions not supported"),null;switch(s.type){case"size":return r?h(s,e,t,i):e;case"color":return n?function(e,t,o){if(e.normalizationField)return m(o,"Could not convert color info: unsupported property"),null;if(z(e.field)){if(!e.stops)return m(o,"Could not convert color info: missing stops or colors"),null;if(e.stops.length>8)return m(o,"Could not convert color info: too many color stops"),null;t.color={field:e.field,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(var i=e.stops,r=0;r<8;++r){var n=i[Math.min(r,i.length-1)];t.color.values[r]=n.value,C(t.color.colors,r,n.color)}}else{if(!(e.stops&&e.stops.length>=0))return m(o,"Could not convert color info: no field and no colors/stops"),null;var a=e.stops&&e.stops.length>=0&&e.stops[0].color;t.color={field:null,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(r=0;r<8;r++)t.color.values[r]=1/0,C(t.color.colors,r,a)}return t}(s,e,i):e;case"opacity":return l?function(e,t,o){if(e.normalizationField)return m(o,"Could not convert opacity info: unsupported property"),null;if(z(e.field)){if(!e.stops)return m(o,"Could not convert opacity info: missing stops or opacities"),null;if(e.stops.length>8)return m(o,"Could not convert opacity info: too many opacity stops"),null;t.opacity={field:e.field,values:[0,0,0,0,0,0,0,0],opacityValues:[0,0,0,0,0,0,0,0]};for(var i=e.stops,r=0;r<8;++r){var n=i[Math.min(r,i.length-1)];t.opacity.values[r]=n.value,t.opacity.opacityValues[r]=n.opacity}}else{if(!(e.stops&&e.stops.length>=0))return m(o,"Could not convert opacity info: no field and no opacities/stops"),null;var a=e.stops&&e.stops.length>=0&&e.stops[0].opacity;t.opacity={field:null,values:[0,0,0,0,0,0,0,0],opacityValues:[0,0,0,0,0,0,0,0]};for(r=0;r<8;r++)t.opacity.values[r]=1/0,t.opacity.opacityValues[r]=a}return t}(s,e,i):null;case"rotation":return a?function(e,t,o){if(!z(e.field))return m(o,"Could not convert rotation info: field is not a string"),null;if(t.rotation){if(e.field)if(t.rotation.field){if(e.field!==t.rotation.field)return m(o,"Could not convert rotation info: multiple fields in use"),null}else t.rotation.field=e.field}else t.rotation={field:e.field,offset:[0,0,0],factor:[1,1,1],type:[0,0,0]};switch(e.axis){case"tilt":return M(e,t.rotation,0),t;case"roll":return M(e,t.rotation,1),t;case null:case void 0:case"heading":return M(e,t.rotation,2),t;default:return m(o,'Could not convert rotation info: unknown axis "'+e.axis+'""'),null}}(s,e,i):e;default:return o.neverReached(s),null}}),{size:null,color:null,opacity:null,rotation:null});return!(e.length>0&&s)||s.size||s.color||s.opacity||s.rotation?s&&s.size&&!function(e,t,o){for(var i=0;i<3;++i){var r=t.unitInMeters;1===e.type[i]&&(r*=t.modelSize[i],e.type[i]=2),e.minSize[i]=e.minSize[i]/r,e.maxSize[i]=e.maxSize[i]/r,e.offset[i]=e.offset[i]/r,e.factor[i]=e.factor[i]/r}var n;if(0!==e.type[0])n=0;else if(0!==e.type[1])n=1;else{if(0===e.type[2])return m(o,"No size axis contains a valid size or scale"),!1;n=2}for(i=0;i<3;++i)0===e.type[i]&&(e.minSize[i]=e.minSize[n],e.maxSize[i]=e.maxSize[n],e.offset[i]=e.offset[n],e.factor[i]=e.factor[n],e.type[i]=e.type[n]);return!0}(s.size,t,i)?null:s:null}function V(e){return e&&null!=e.size}function T(e,t,o){if(!!e!=!!t)return y(),!1;if(e&&e.field!==t.field)return y(),!1;if(e&&"rotation"===o)for(var i=e,r=t,n=0;n<3;n++)if(i.type[n]!==r.type[n]||i.offset[n]!==r.offset[n]||i.factor[n]!==r.factor[n])return!1;return!0}function O(e,t){var o={vvSizeEnabled:!1,vvSizeMinSize:null,vvSizeMaxSize:null,vvSizeOffset:null,vvSizeFactor:null,vvSizeValue:null,vvColorEnabled:!1,vvColorValues:null,vvColorColors:null,vvOpacityEnabled:!1,vvOpacityValues:null,vvOpacityOpacities:null,vvSymbolAnchor:null,vvSymbolRotationMatrix:null},i=V(e);return e&&e.size?(o.vvSizeEnabled=!0,o.vvSizeMinSize=e.size.minSize,o.vvSizeMaxSize=e.size.maxSize,o.vvSizeOffset=e.size.offset,o.vvSizeFactor=e.size.factor):e&&i&&(o.vvSizeValue=t.transformation.scale),e&&i&&(o.vvSymbolAnchor=t.transformation.anchor,o.vvSymbolRotationMatrix=n.mat3f64.create(),a.mat4.identity(E),function(e,t,o,i){void 0===i&&(i=l.mat4f64.create());var r=e||0,n=t||0,s=o||0;0!==r&&a.mat4.rotateZ(i,i,-r/180*Math.PI),0!==n&&a.mat4.rotateX(i,i,n/180*Math.PI),0!==s&&a.mat4.rotateY(i,i,s/180*Math.PI)}(t.transformation.rotation[2],t.transformation.rotation[0],t.transformation.rotation[1],E),r.mat3.fromMat4(o.vvSymbolRotationMatrix,E)),e&&e.color&&(o.vvColorEnabled=!0,o.vvColorValues=e.color.values,o.vvColorColors=e.color.colors),e&&e.opacity&&(o.vvOpacityEnabled=!0,o.vvOpacityValues=e.opacity.values,o.vvOpacityOpacities=e.opacity.opacityValues),o}t.convertVisualVariables=g,t.initFastSymbolUpdatesState=function(e,t){if(!e)return y(),{enabled:!1};if(c.DISABLE_FAST_UPDATES)return y(),{enabled:!1};var o=g(e.visualVariables,t);return o?(S(),{enabled:!0,visualVariables:o,materialParameters:O(o,t),requiresShaderTransformation:V(o)}):(y(),{enabled:!1})},t.updateFastSymbolUpdatesState=function(e,t,o){if(!t||!e.enabled)return!1;var i=e.visualVariables,r=g(t.visualVariables,o);return r?!!(T(i.size,r.size,"size")&&T(i.color,r.color,"color")&&T(i.rotation,r.rotation,"rotation")&&T(i.opacity,r.opacity,"opacity"))&&(e.visualVariables=r,e.materialParameters=O(r,o),e.requiresShaderTransformation=V(r),S(),!0):(y(),!1)},t.getMaterialParams=O,function(e){var t=l.mat4f64.create(),o=u.vec3f64.create();e.evaluateModelTransform=function(e,r,n){if(!e.vvSizeEnabled)return n;a.mat4.copy(t,n);var l=e.vvSymbolRotationMatrix;a.mat4.set(E,l[0],l[1],l[2],0,l[3],l[4],l[5],0,l[6],l[7],l[8],0,0,0,0,1),a.mat4.multiply(t,t,E);for(var s=0;s<3;++s){var u=e.vvSizeOffset[s]+r[0]*e.vvSizeFactor[s];o[s]=i.clamp(u,e.vvSizeMinSize[s],e.vvSizeMaxSize[s])}return a.mat4.scale(t,t,o),a.mat4.translate(t,t,e.vvSymbolAnchor),t},e.evaluateModelTransformScale=function(e,t,o){if(!t.vvSizeEnabled)return s.vec3.set(e,1,1,1);for(var r=0;r<3;++r){var n=t.vvSizeOffset[r]+o[0]*t.vvSizeFactor[r];e[r]=i.clamp(n,t.vvSizeMinSize[r],t.vvSizeMaxSize[r])}return e}}(v||(v={}));var E=l.mat4f64.create();t.evaluateModelTransform=v.evaluateModelTransform,t.evaluateModelTransformScale=v.evaluateModelTransformScale}));