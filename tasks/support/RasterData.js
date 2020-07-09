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

define(["require","exports","tslib","../../core/JSONSupport","../../core/accessorSupport/decorators"],(function(r,t,e,o,p){return function(r){function t(t){var e=r.call(this,t)||this;return e.format=null,e.itemId=null,e.url=null,e}return e.__extends(t,r),e.__decorate([p.property()],t.prototype,"format",void 0),e.__decorate([p.property({json:{read:{source:"itemID"},write:{target:"itemID"}}})],t.prototype,"itemId",void 0),e.__decorate([p.property()],t.prototype,"url",void 0),t=e.__decorate([p.subclass("esri/tasks/support/RasterData")],t)}(o.JSONSupport)}));