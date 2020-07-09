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

define(["require","exports","tslib","../../core/has","../../core/mathUtils","../../core/maybe"],(function(e,t,i,o,r,a){return function(){function e(t,r,a){void 0===a&&(a=null),this._context=null,this._glName=null,this._id=-1,this._descriptor=void 0,this._samplingModeDirty=!1,this._wrapModeDirty=!1,this._boundToUnits=new Set,this._context=t,this._descriptor=i.__assign({target:3553,samplingMode:9729,wrapMode:10497,flipped:!1,hasMipmap:!1,isOpaque:!1,unpackAlignment:4,preMultiplyAlpha:!1},r),this._id=++e._nextId,o("esri-webgl-debug")&&t.instanceCounter.increment(0,this),this.setData(a)}return Object.defineProperty(e.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glName",{get:function(){return this._glName},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"descriptor",{get:function(){return this._descriptor},enumerable:!0,configurable:!0}),e.prototype.dispose=function(){var e=this;if(this._context&&this._context.gl){if(this._glName){var t=this._context.gl;this._boundToUnits.forEach((function(t){e._context.bindTexture(null,t)})),t.deleteTexture(this._glName),this._glName=null}o("esri-webgl-debug")&&this._context.instanceCounter.decrement(0,this),this._context=null}},e.prototype.release=function(){this.dispose()},e.prototype.resize=function(e,t){var i=this._descriptor;i.width===e&&i.height===t||(i.width=e,i.height=t,this.setData(null))},e.prototype.setData=function(t){var i=this._context.gl;this._glName||(this._glName=i.createTexture()),void 0===t&&(t=null),null===t&&(this._descriptor.width=this._descriptor.width||4,this._descriptor.height=this._descriptor.height||4);var o=this._context.getBoundTexture(0);this._context.bindTexture(this,0);var r=this._descriptor;e._validateTexture(r),i.pixelStorei(i.UNPACK_ALIGNMENT,r.unpackAlignment),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,r.flipped?1:0),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.preMultiplyAlpha?1:0);var n=r.pixelFormat,s=r.internalFormat?r.internalFormat:n;if(t instanceof ImageData||t instanceof HTMLImageElement||t instanceof HTMLCanvasElement||t instanceof HTMLVideoElement){var p=t.width,h=t.height;t instanceof HTMLVideoElement&&(p=t.videoWidth,h=t.videoHeight),r.width&&r.height&&console.assert(p===r.width&&h===r.height),i.texImage2D(i.TEXTURE_2D,0,s,n,r.dataType,t),r.hasMipmap&&this.generateMipmap(),void 0===r.width&&(r.width=p),void 0===r.height&&(r.height=h)}else{null!=r.width&&null!=r.height||console.error("Width and height must be specified!"),i.DEPTH24_STENCIL8&&s===i.DEPTH_STENCIL&&(s=i.DEPTH24_STENCIL8);p=r.width,h=r.height;if(function(e){return a.isSome(e)&&"type"in e&&"compressed"===e.type}(t)){var d=Math.round(Math.log(Math.max(p,h))/Math.LN2)+1;r.hasMipmap=r.hasMipmap&&d===t.levels.length;for(var l=0;;++l){var _=t.levels[Math.min(l,t.levels.length-1)];if(i.compressedTexImage2D(i.TEXTURE_2D,l,s,p,h,0,_),1===p&&1===h||!r.hasMipmap)break;p=Math.max(1,p>>1),h=Math.max(1,h>>1)}}else if(a.isSome(t))i.texImage2D(i.TEXTURE_2D,0,s,p,h,0,n,r.dataType,t),r.hasMipmap&&this.generateMipmap();else for(l=0;i.texImage2D(i.TEXTURE_2D,l,s,p,h,0,n,r.dataType,null),(1!==p||1!==h)&&r.hasMipmap;++l)p=Math.max(1,p>>1),h=Math.max(1,h>>1)}e._applySamplingMode(i,this._descriptor),e._applyWrapMode(i,this._descriptor),e._applyAnisotropicFilteringParameters(this._context,this._descriptor),this._context.bindTexture(o,0)},e.prototype.updateData=function(e,t,i,o,r,a){a||console.error("An attempt to use uninitialized data!"),this._glName||console.error("An attempt to update uninitialized texture!");var n=this._context.gl,s=this._descriptor,p=this._context.getBoundTexture(0);this._context.bindTexture(this,0),(t<0||i<0||o>s.width||r>s.height||t+o>s.width||i+r>s.height)&&console.error("An attempt to update out of bounds of the texture!"),n.pixelStorei(n.UNPACK_ALIGNMENT,s.unpackAlignment),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,s.flipped?1:0),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.preMultiplyAlpha?1:0),a instanceof ImageData||a instanceof HTMLImageElement||a instanceof HTMLCanvasElement||a instanceof HTMLVideoElement?n.texSubImage2D(n.TEXTURE_2D,e,t,i,s.pixelFormat,s.dataType,a):n.texSubImage2D(n.TEXTURE_2D,e,t,i,o,r,s.pixelFormat,s.dataType,a),this._context.bindTexture(p,0)},e.prototype.generateMipmap=function(){var t=this._descriptor;t.hasMipmap||(t.hasMipmap=!0,e._validateTexture(t)),9729===t.samplingMode?(this._samplingModeDirty=!0,t.samplingMode=9985):9728===t.samplingMode&&(this._samplingModeDirty=!0,t.samplingMode=9984);var i=this._context.getBoundTexture(0);this._context.bindTexture(this,0);var o=this._context.gl;o.generateMipmap(o.TEXTURE_2D),this._context.bindTexture(i,0)},e.prototype.setSamplingMode=function(t){t!==this._descriptor.samplingMode&&(this._descriptor.samplingMode=t,e._validateTexture(this._descriptor),this._samplingModeDirty=!0)},e.prototype.setWrapMode=function(t){t!==this._descriptor.wrapMode&&(this._descriptor.wrapMode=t,e._validateTexture(this._descriptor),this._wrapModeDirty=!0)},e.prototype.applyChanges=function(){var t=this._context.gl,i=this._descriptor;this._samplingModeDirty&&(e._applySamplingMode(t,i),this._samplingModeDirty=!1),this._wrapModeDirty&&(e._applyWrapMode(t,i),this._wrapModeDirty=!1)},e.prototype.setBoundToUnit=function(e,t){t?this._boundToUnits.add(e):this._boundToUnits.delete(e)},e._validateTexture=function(e){(e.width<0||e.height<0)&&console.error("Negative dimension parameters are not allowed!"),r.isPowerOfTwo(e.width)&&r.isPowerOfTwo(e.height)||("number"==typeof e.wrapMode?33071!==e.wrapMode&&console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"):33071===e.wrapMode.s&&33071===e.wrapMode.t||console.error("Non-power-of-two textures must have a wrap mode of CLAMP_TO_EDGE!"),e.hasMipmap&&console.error("Mipmapping requires power-of-two textures!"))},e._applySamplingMode=function(e,t){var i=t.samplingMode,o=t.samplingMode;9985===i||9987===i?(i=9729,t.hasMipmap||(o=9729)):9984!==i&&9986!==i||(i=9728,t.hasMipmap||(o=9728)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o)},e._applyWrapMode=function(e,t){"number"==typeof t.wrapMode?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,t.wrapMode),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,t.wrapMode)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,t.wrapMode.s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,t.wrapMode.t))},e._applyAnisotropicFilteringParameters=function(e,t){if(null!=t.maxAnisotropy){var i=e.capabilities.textureFilterAnisotropic;if(i){var o=e.gl;o.texParameterf(o.TEXTURE_2D,i.TEXTURE_MAX_ANISOTROPY,t.maxAnisotropy)}}},e._nextId=0,e}()}));