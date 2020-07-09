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

define(["require","exports","../../../core/lang","../../../geometry/support/jsonUtils"],(function(t,e,i,n){Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(){}return t.local=function(){return null===t.instance&&(t.instance=new t),t.instance},t.prototype.execute=function(t,e,i){return new f(t,e,i)},t.instance=null,t}();e.EffectMove=o;var f=function(){function t(t,e,i){this._inputGeometries=t,this._offsetX=void 0!==e.offsetX?e.offsetX*i:0,this._offsetY=void 0!==e.offsetY?-e.offsetY*i:0}return t.prototype.next=function(){for(var t=this._inputGeometries.next();t;){if(n.isExtent(t))return{xmin:t.xmin+this._offsetX,xmax:t.xmax+this._offsetX,ymin:t.ymin+this._offsetY,ymax:t.ymax+this._offsetY};if(n.isPolygon(t)){var e=i.clone(t);return this._moveMultipath(e.rings,this._offsetX,this._offsetY),e}if(n.isPolyline(t)){var o=i.clone(t);return this._moveMultipath(o.paths,this._offsetX,this._offsetY),o}if(n.isMultipoint(t)){var f=i.clone(t);return this._movePath(f.points,this._offsetX,this._offsetY),f}if(n.isPoint(t))return{x:t.x+this._offsetX,y:t.y+this._offsetY};t=this._inputGeometries.next()}return null},t.prototype._moveMultipath=function(t,e,i){if(t)for(var n=0,o=t;n<o.length;n++){var f=o[n];this._movePath(f,e,i)}},t.prototype._movePath=function(t,e,i){if(t)for(var n=0,o=t;n<o.length;n++){var f=o[n];f[0]+=e,f[1]+=i}},t}()}));