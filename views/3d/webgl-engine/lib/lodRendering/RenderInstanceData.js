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

define(["require","exports","../../../support/buffer/BufferView","../Util","./BackedBufferObject"],(function(e,t,i,r,n){Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){this.modelOriginHi=e.getField("modelOriginHi",i.BufferViewVec3f),this.modelOriginLo=e.getField("modelOriginLo",i.BufferViewVec3f),this.model=e.getField("model",i.BufferViewMat3f),this.modelNormal=e.getField("modelNormal",i.BufferViewMat3f),this.color=e.getField("instanceColor",i.BufferViewVec4f),this.featureAttribute=e.getField("instanceFeatureAttribute",i.BufferViewVec4f)};t.View=a;var s=function(){function e(e,t){this._headIndex=0,this._tailIndex=0,this._captureFirstIndex=!0,this._updating=!1,this._prevHeadIndex=0,this._resized=!1,this._rctx=e,this._instanceBufferLayout=t,this._elementSize=t.stride,this._capacity=1}return e.prototype.destroy=function(){this._buffer&&this._buffer.destroy()},Object.defineProperty(e.prototype,"buffer",{get:function(){return this._buffer.buffer},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"view",{get:function(){return this._view},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"capacity",{get:function(){return this._capacity},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){var e=this._headIndex,t=this._tailIndex;return e>=t?e-t:e+this._capacity-t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isEmpty",{get:function(){return this._headIndex===this._tailIndex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isFull",{get:function(){return this._tailIndex===(this._headIndex+1)%this._capacity},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"headIndex",{get:function(){return this._headIndex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tailIndex",{get:function(){return this._tailIndex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"firstIndex",{get:function(){return this._firstIndex},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"memoryUsage",{get:function(){return this._buffer?this._buffer.memoryUsage:{cpu:0,gpu:0}},enumerable:!0,configurable:!0}),e.prototype.reset=function(){this._headIndex=0,this._tailIndex=0,this._firstIndex=null},e.prototype.startUpdateCylce=function(){this._captureFirstIndex=!0},e.prototype.beginUpdate=function(){r.assert(!this._updating,"already updating"),this._updating=!0,this._prevHeadIndex=this._headIndex},e.prototype.endUpdate=function(){r.assert(this._updating,"not updating"),this.size<h*this.capacity&&this.shrink(),this._resized?(this._buffer.transferAll(),this._resized=!1):this.transferRange(this._prevHeadIndex,this._headIndex),this._updating=!1},e.prototype.allocateHead=function(){r.assert(this._updating,"not updating"),this.isFull&&this.grow();var e=this.headIndex;return this._captureFirstIndex&&(this._firstIndex=e,this._captureFirstIndex=!1),this.incrementHead(),r.assert(this._headIndex!==this._tailIndex,"invalid pointers"),e},e.prototype.freeTail=function(){r.assert(this._updating,"not updating"),r.assert(this.size>0,"invalid size");var e=this._tailIndex===this._firstIndex;this.incrementTail(),e&&(this._firstIndex=this._tailIndex)},e.prototype.grow=function(){var e=Math.max(o,Math.floor(this._capacity*f));this.resize(e)},e.prototype.shrink=function(){if(c){var e=Math.max(o,Math.floor(this._capacity*d));this.resize(e)}},e.prototype.resize=function(e){if(r.assert(this._updating,"not updating"),e!==this._capacity){var t=new n(this._rctx,34962,35044,this._elementSize,e);if(this._buffer){this._firstIndex&&(this._firstIndex=(this._firstIndex+this._capacity-this._tailIndex)%this._capacity);var i=this.size,s=this.compactInstances(t);r.assert(s===i,"invalid compaction"),this._buffer.destroy(),this._tailIndex=0,this._headIndex=s,this._prevHeadIndex=0}this._resized=!0,this._capacity=e,this._buffer=t,this._view=new a(this._instanceBufferLayout.createView(this._buffer.array))}},e.prototype.compactInstances=function(e){var t=this._headIndex,i=this._tailIndex;return i<t?(this._buffer.copyRange(i,t,e),t-i):i>t?(this._buffer.copyRange(i,this._capacity,e),t>0&&this._buffer.copyRange(0,t,e,this._capacity-i),t+(this._capacity-i)):0},e.prototype.incrementHead=function(e){void 0===e&&(e=1),this._headIndex=(this._headIndex+e)%this._capacity},e.prototype.incrementTail=function(e){void 0===e&&(e=1),this._tailIndex=(this._tailIndex+e)%this._capacity},e.prototype.transferRange=function(e,t){e<t?this._buffer.transferRange(e,t):e>t&&(t>0&&this._buffer.transferRange(0,t),this._buffer.transferRange(e,this._capacity))},e}();t.RenderInstanceData=s;var o=1024,f=2,h=.3,d=.5,c=!0}));