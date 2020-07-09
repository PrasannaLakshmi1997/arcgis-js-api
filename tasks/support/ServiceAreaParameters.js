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

define(["require","exports","tslib","../../geometry","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/reader","../../core/accessorSupport/decorators/subclass","../../core/accessorSupport/decorators/writer"],(function(e,r,t,o,i,p,a,n,s,l){var y=new i.default({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"}),d=new i.default({esriNAOutputPolygonNone:"none",esriNAOutputPolygonSimplified:"simplified",esriNAOutputPolygonDetailed:"detailed"}),u=new i.default({esriNFSBAllowBacktrack:"allow-backtrack",esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"}),c=new i.default({esriNATravelDirectionFromFacility:"from-facility",esriNATravelDirectionToFacility:"to-facility"}),_=new i.default({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"});return function(e){function r(r){var t=e.call(this,r)||this;return t.accumulateAttributes=null,t.attributeParameterValues=null,t.defaultBreaks=null,t.doNotLocateOnRestrictedElements=!0,t.excludeSourcesFromPolygons=null,t.facilities=null,t.impedanceAttribute=null,t.mergeSimilarPolygonRanges=!1,t.outputGeometryPrecision=null,t.outputGeometryPrecisionUnits=null,t.outputLines=null,t.outputPolygons=null,t.outSpatialReference=null,t.overlapLines=!1,t.overlapPolygons=!1,t.pointBarriers=null,t.polygonBarriers=null,t.polylineBarriers=null,t.restrictionAttributes=null,t.restrictUTurns=null,t.returnFacilities=!1,t.returnPointBarriers=!1,t.returnPolygonBarriers=!1,t.returnPolylineBarriers=!1,t.splitLinesAtBreaks=!1,t.splitPolygonsAtBreaks=!1,t.timeOfDay=null,t.travelDirection=null,t.travelMode=null,t.trimOuterPolygon=!1,t.trimPolygonDistance=null,t.trimPolygonDistanceUnits=null,t.useHierarchy=null,t}return t.__extends(r,e),r.prototype.readTimeOfDay=function(e,r){return null!=r.timeOfDay?new Date(r.timeOfDay):null},r.prototype.writeTimeOfDay=function(e,r){r.timeOfDay=e?e.getTime():null},t.__decorate([a.property({type:[String],json:{write:!0}})],r.prototype,"accumulateAttributes",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"attributeParameterValues",void 0),t.__decorate([a.property({type:[Number],json:{write:!0}})],r.prototype,"defaultBreaks",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"doNotLocateOnRestrictedElements",void 0),t.__decorate([a.property({type:[String],json:{write:!0}})],r.prototype,"excludeSourcesFromPolygons",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"facilities",void 0),t.__decorate([a.property({type:String,json:{write:!0}})],r.prototype,"impedanceAttribute",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"mergeSimilarPolygonRanges",void 0),t.__decorate([a.property({type:Number,json:{write:!0}})],r.prototype,"outputGeometryPrecision",void 0),t.__decorate([a.property({type:_.apiValues,json:{read:{reader:_.read},write:{writer:_.write}}})],r.prototype,"outputGeometryPrecisionUnits",void 0),t.__decorate([a.property({type:y.apiValues,json:{read:{reader:y.read},write:{writer:y.write}}})],r.prototype,"outputLines",void 0),t.__decorate([a.property({type:d.apiValues,json:{read:{reader:d.read},write:{writer:d.write}}})],r.prototype,"outputPolygons",void 0),t.__decorate([a.property({type:o.SpatialReference,json:{write:!0}})],r.prototype,"outSpatialReference",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"overlapLines",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"overlapPolygons",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"pointBarriers",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"polygonBarriers",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"polylineBarriers",void 0),t.__decorate([a.property({type:[String],json:{write:!0}})],r.prototype,"restrictionAttributes",void 0),t.__decorate([a.property({type:u.apiValues,json:{read:{reader:u.read},write:{writer:u.write}}})],r.prototype,"restrictUTurns",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"returnFacilities",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"returnPointBarriers",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"returnPolygonBarriers",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"returnPolylineBarriers",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"splitLinesAtBreaks",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"splitPolygonsAtBreaks",void 0),t.__decorate([a.property({type:Date,json:{type:Number,write:!0}})],r.prototype,"timeOfDay",void 0),t.__decorate([n.reader("timeOfDay")],r.prototype,"readTimeOfDay",null),t.__decorate([l.writer("timeOfDay")],r.prototype,"writeTimeOfDay",null),t.__decorate([a.property({type:c.apiValues,json:{read:{reader:c.read},write:{writer:c.write}}})],r.prototype,"travelDirection",void 0),t.__decorate([a.property({json:{write:!0}})],r.prototype,"travelMode",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"trimOuterPolygon",void 0),t.__decorate([a.property({type:Number,json:{write:!0}})],r.prototype,"trimPolygonDistance",void 0),t.__decorate([a.property({type:_.apiValues,json:{read:{reader:_.read},write:{writer:_.write}}})],r.prototype,"trimPolygonDistanceUnits",void 0),t.__decorate([a.property({type:Boolean,json:{write:!0}})],r.prototype,"useHierarchy",void 0),r=t.__decorate([s.subclass("esri.tasks.support.ServiceAreaParameters")],r)}(p.JSONSupport)}));