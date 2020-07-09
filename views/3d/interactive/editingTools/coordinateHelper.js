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

define(["require","exports","../../../../geometry","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/spatialReferenceUtils"],(function(e,t,r,o,n,i,a,p,u,c){Object.defineProperty(t,"__esModule",{value:!0});var f=function(){function e(e,t){this.spatialReference=e,this.viewingMode=t,this._unnormalizationInfo=m(e,t)}return e.prototype.createNew=function(){return n.vec2f64.create()},e.prototype.fromPoint=function(e){return n.vec2f64.fromValues(e.x,e.y)},e.prototype.fromArray=function(e){return n.vec2f64.fromValues(e[0],e[1])},e.prototype.toArray=function(e){return[e[0],e[1]]},e.prototype.toPoint=function(e,t){return t.x=e[0],t.y=e[1],t.hasZ=!1,t.hasM=!1,t.spatialReference=this.spatialReference,t},e.prototype.createPoint=function(e){return new r.Point({x:e[0],y:e[1],z:void 0,m:void 0,spatialReference:this.spatialReference})},e.prototype.createPointFromArray=function(e){return new r.Point({x:e[0],y:e[1],z:void 0,m:void 0,spatialReference:this.spatialReference})},e.prototype.lerp=function(e,t,r,n){return o.vec2.lerp(n,e,t,r)},e.prototype.addDelta=function(e,t,r){e[0]+=t,e[1]+=r},e.prototype.pointToArray=function(e){return[e.x,e.y]},e.prototype.zFromArray=function(e){},e.prototype.hasZ=function(){return!1},e.prototype.unnormalize=function(e){y(e,this._unnormalizationInfo)},e}();t.CoordinateHelper2D=f;var l=function(){function e(e,t,r){this.valueType=e,this.spatialReference=t,this._unnormalizationInfo=m(t,r)}return e.prototype.createNew=function(){return a.vec3f64.create()},e.prototype.fromPoint=function(e){return a.vec3f64.fromValues(e.x,e.y,0===this.valueType?e.z:e.m)},e.prototype.fromArray=function(e){return a.vec3f64.fromValues(e[0],e[1],e[2]||0)},e.prototype.toArray=function(e){return[e[0],e[1],e[2]]},e.prototype.toPoint=function(e,t){return t.x=e[0],t.y=e[1],0===this.valueType?(t.z=e[2],t.hasZ=!0,t.hasM=!1):(t.m=e[2],t.hasZ=!1,t.hasM=!0),t.spatialReference=this.spatialReference,t},e.prototype.createPoint=function(e){return new r.Point({x:e[0],y:e[1],z:0===this.valueType?e[2]:void 0,m:1===this.valueType?e[2]:void 0,spatialReference:this.spatialReference})},e.prototype.createPointFromArray=function(e){return new r.Point({x:e[0],y:e[1],z:0===this.valueType?e[2]:void 0,m:1===this.valueType?e[2]:void 0,spatialReference:this.spatialReference})},e.prototype.lerp=function(e,t,r,o){return i.vec3.lerp(o,e,t,r)},e.prototype.addDelta=function(e,t,r,o){e[0]+=t,e[1]+=r,0===this.valueType&&(e[2]+=o)},e.prototype.pointToArray=function(e){return 0===this.valueType?[e.x,e.y,e.z]:[e.x,e.y,e.m]},e.prototype.zFromArray=function(e){return 0===this.valueType?e[2]:void 0},e.prototype.hasZ=function(){return 0===this.valueType},e.prototype.unnormalize=function(e){y(e,this._unnormalizationInfo)},e}();t.CoordinateHelper3D=l;var s=function(){function e(e,t){this.spatialReference=e,this._unnormalizationInfo=m(e,t)}return e.prototype.createNew=function(){return u.vec4f64.create()},e.prototype.fromPoint=function(e){return u.vec4f64.fromValues(e.x,e.y,e.z,e.m)},e.prototype.fromArray=function(e){return u.vec4f64.fromValues(e[0],e[1],e[2]||0,e[3]||0)},e.prototype.toArray=function(e){return[e[0],e[1],e[2],e[3]]},e.prototype.toPoint=function(e,t){return t.x=e[0],t.y=e[1],t.z=e[2],t.m=e[3],t.hasZ=!0,t.hasM=!0,t.spatialReference=this.spatialReference,t},e.prototype.createPoint=function(e){return new r.Point({x:e[0],y:e[1],z:e[2],m:e[3],spatialReference:this.spatialReference})},e.prototype.createPointFromArray=function(e){return new r.Point({x:e[0],y:e[1],z:e[2],m:e[3],spatialReference:this.spatialReference})},e.prototype.lerp=function(e,t,r,o){return p.vec4.lerp(o,e,t,r)},e.prototype.addDelta=function(e,t,r,o){e[0]+=t,e[1]+=r,e[2]+=o},e.prototype.pointToArray=function(e){return[e.x,e.y,e.z,e.m]},e.prototype.zFromArray=function(e){return e[2]},e.prototype.hasZ=function(){return!0},e.prototype.unnormalize=function(e){y(e,this._unnormalizationInfo)},e}();function y(e,t){if(t.supported){var r=1/0,o=-1/0,n=t.upperBoundX-t.lowerBoundX;e.forEach((function(e){for(var i=e.pos[0];i<t.lowerBoundX;)i+=n;for(;i>t.upperBoundX;)i-=n;r=Math.min(r,i),o=Math.max(o,i),e.pos[0]=i}));var i=o-r;n-i<i&&e.forEach((function(e){e.pos[0]<0&&(e.pos[0]+=n)}))}}function m(e,t){var r=c.getInfo(e);return"global"===t&&r?{supported:!0,lowerBoundX:r.valid[0],upperBoundX:r.valid[1]}:{supported:!1,lowerBoundX:null,upperBoundX:null}}t.CoordinateHelper4D=s,t.createCoordinateHelper=function(e,t,r,o){return e&&t?new s(r,o):t?new l(1,r,o):e?new l(0,r,o):new f(r,o)}}));