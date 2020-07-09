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

define(["require","exports","tslib","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators","../../support/persistableUrlUtils"],(function(e,r,t,o,i,n,p){Object.defineProperty(r,"__esModule",{value:!0});var s=o.strict()({sphere:"sphere",cylinder:"cylinder",cube:"cube",cone:"cone",diamond:"diamond",tetrahedron:"tetrahedron",invertedCone:"inverted-cone"}),c=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}var o;return t.__extends(r,e),o=r,r.prototype.clone=function(){return new o({href:this.href,primitive:this.primitive})},t.__decorate([n.property({type:String,json:{read:p.read,write:p.write}})],r.prototype,"href",void 0),t.__decorate([n.enumeration(s)],r.prototype,"primitive",void 0),r=o=t.__decorate([n.subclass("esri.symbols.support.ObjectSymbol3DLayerResource")],r)}(i.JSONSupport);r.ObjectSymbol3DLayerResource=c,r.defaultPrimitive="sphere",r.default=c}));