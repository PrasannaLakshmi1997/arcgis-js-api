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

define(["require","exports","tslib","../geometry","../PopupTemplate","../renderers","../request","../symbols","../core/deprecate","../core/Error","../core/global","../core/jsonMap","../core/Logger","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/accessorSupport/decorators","../core/accessorSupport/ensureType","./Layer","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./mixins/TemporalLayer","./support/commonProperties","./support/featureReductionUtils","./support/Field","./support/FieldsIndex","./support/fieldUtils","./support/fieldUtils","./support/LabelClass","./support/labelingInfo","./support/PurgeOptions","../renderers/support/jsonUtils","../renderers/support/styleUtils","../support/popupUtils","../symbols/support/ElevationInfo","../symbols/support/jsonUtils","../tasks/support/Query"],(function(e,r,t,o,i,n,p,a,l,s,d,y,u,c,f,m,g,_,b,v,S,h,w,I,R,P,O,T,x,L,F,j,D,E,G,U,k,M,W,q){var A=u.getLogger("esri.layers.StreamLayer"),J=new y.default({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon"});return function(e){function r(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];var i=e.apply(this,r)||this;return i.copyright=null,i.definitionExpression=null,i.displayField=null,i.elevationInfo=null,i.featureReduction=null,i.fields=null,i.geometryDefinition=null,i.geometryType=null,i.labelsVisible=!0,i.labelingInfo=null,i.legendEnabled=!0,i.objectIdField=null,i.operationalLayerType="ArcGISStreamLayer",i.popupEnabled=!0,i.popupTemplate=null,i.purgeOptions=new E,i.screenSizePerspectiveEnabled=!0,i.sourceJSON=null,i.spatialReference=o.SpatialReference.WGS84,i.type="stream",i.url=null,i}return t.__extends(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t.__assign({url:e},r):e},r.prototype.load=function(e){var r=this;"WebSocket"in d||m.reject(new s("stream-layer:websocket-unsupported","WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."));var t=c.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Stream Service"]},e).catch((function(e){return e})).then((function(){return r._fetchService(t)}))),m.resolve(this)},Object.defineProperty(r.prototype,"defaultPopupTemplate",{get:function(){return this.createPopupTemplate()},enumerable:!0,configurable:!0}),r.prototype.readFeatureReduction=function(e,r){return O.read(e,r)},r.prototype.writeWebSceneFeatureReduction=function(e,r,t,o){O.writeTarget(e,r,"layerDefinition.featureReduction",o)},Object.defineProperty(r.prototype,"fieldsIndex",{get:function(){return new x(this.fields)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"maximumTrackPoints",{get:function(){return l.deprecatedProperty(A,"maximumTrackPoints",{replacement:"purgeOptions.maxObservations",version:"4.15"}),this.purgeOptions.maxObservations},set:function(e){l.deprecatedProperty(A,"maximumTrackPoints",{replacement:"purgeOptions.maxObservations",version:"4.15"});var r=this.purgeOptions.clone();r.maxObservations=e,this.purgeOptions=r},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"renderer",{set:function(e){L.fixRendererFields(e,this.fields),this._set("renderer",e)},enumerable:!0,configurable:!0}),r.prototype.readRenderer=function(e,r,t){var o,i,p=(r=r.layerDefinition||r).drawingInfo&&r.drawingInfo.renderer||void 0;if(p)(o=G.read(p,r,t)||void 0)||A.error("Failed to create renderer",{rendererDefinition:r.drawingInfo.renderer,layer:this,context:t});else if(r.defaultSymbol)W.read(r.defaultSymbol,r,t),r.types&&r.types.length?(o=new n.UniqueValueRenderer({defaultSymbol:i,field:r.typeIdField}),r.types.forEach((function(e){p.addUniqueValueInfo(e.id,W.read(e.symbol,e,t))}))):o=new n.SimpleRenderer({symbol:i});else if("Table"!==r.type){switch(r.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":i=new a.SimpleMarkerSymbol;break;case"esriGeometryPolyline":i=new a.SimpleLineSymbol;break;case"esriGeometryPolygon":i=new a.SimpleFillSymbol}o=i&&new n.SimpleRenderer({symbol:i})}return o},r.prototype.writeRenderer=function(e,r,t,o){G.writeTarget(e,r,t,o)},r.prototype.writeWebSceneRenderer=function(e,r,t,o){G.writeTarget(e,r,"layerDefinition.drawingInfo.renderer",o)},r.prototype.createPopupTemplate=function(e){return k.createPopupTemplate(this,e)},r.prototype.createQuery=function(){var e=new q;return e.returnGeometry=!0,e.outFields=["*"],e.where=this.definitionExpression||"1=1",e},r.prototype.getFieldDomain=function(e,r){if(!this.fields)return null;var t=null;return this.fields.some((function(r){return r.name===e&&(t=r.domain),!!t})),t},r.prototype.getField=function(e){return this.fieldsIndex.get(e)},r.prototype._fetchService=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r;return t.__generator(this,(function(o){switch(o.label){case 0:return this.sourceJSON?[3,2]:[4,p(this.parsedUrl.path,{query:t.__assign({f:"json"},this.parsedUrl.query),responseType:"json",signal:e})];case 1:r=o.sent().data,this.sourceJSON=t.__assign(t.__assign({},r),{objectIdField:"__esri_stream_id__"}),o.label=2;case 2:return this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl}),F.fixRendererFields(this.renderer,this.fields),F.fixTimeInfoFields(this.timeInfo,this.fields),[2,U.loadStyleRenderer(this,{origin:"service"})]}}))}))},t.__decorate([g.property({type:String})],r.prototype,"copyright",void 0),t.__decorate([g.property({readOnly:!0,dependsOn:["fields","title"]})],r.prototype,"defaultPopupTemplate",null),t.__decorate([g.property({type:String})],r.prototype,"definitionExpression",void 0),t.__decorate([g.property({type:String})],r.prototype,"displayField",void 0),t.__decorate([g.property({type:M})],r.prototype,"elevationInfo",void 0),t.__decorate([g.reader("featureReduction",["layerDefinition.featureReduction"])],r.prototype,"readFeatureReduction",null),t.__decorate([g.writer("web-scene","featureReduction",{"layerDefinition.featureReduction":{types:O.webSceneFeatureReductionTypes}})],r.prototype,"writeWebSceneFeatureReduction",null),t.__decorate([g.property({type:[T]})],r.prototype,"fields",void 0),t.__decorate([g.property({readOnly:!0,dependsOn:["fields"]})],r.prototype,"fieldsIndex",null),t.__decorate([g.property({type:o.Extent})],r.prototype,"geometryDefinition",void 0),t.__decorate([g.property({type:["point","polygon","polyline","multipoint"],json:{read:{reader:J.read}}})],r.prototype,"geometryType",void 0),t.__decorate([g.property(P.labelsVisible)],r.prototype,"labelsVisible",void 0),t.__decorate([g.property({type:[j],json:{read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:D.reader},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],r.prototype,"labelingInfo",void 0),t.__decorate([g.property(P.legendEnabled)],r.prototype,"legendEnabled",void 0),t.__decorate([g.property({type:["show","hide"]})],r.prototype,"listMode",void 0),t.__decorate([g.property({type:_.Integer})],r.prototype,"maximumTrackPoints",null),t.__decorate([g.property({type:String})],r.prototype,"objectIdField",void 0),t.__decorate([g.property({value:"ArcGISStreamLayer",type:["ArcGISStreamLayer"]})],r.prototype,"operationalLayerType",void 0),t.__decorate([g.property(P.popupEnabled)],r.prototype,"popupEnabled",void 0),t.__decorate([g.property({type:i,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],r.prototype,"popupTemplate",void 0),t.__decorate([g.property({type:E})],r.prototype,"purgeOptions",void 0),t.__decorate([g.property({types:n.rendererTypes,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],r.prototype,"renderer",null),t.__decorate([g.reader("service","renderer",["drawingInfo.renderer","defaultSymbol","type"]),g.reader("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol","layerDefinition.type"])],r.prototype,"readRenderer",null),t.__decorate([g.writer("renderer")],r.prototype,"writeRenderer",null),t.__decorate([g.writer("web-scene","renderer",{"layerDefinition.drawingInfo.renderer":{types:n.webSceneRendererTypes}})],r.prototype,"writeWebSceneRenderer",null),t.__decorate([g.property(P.screenSizePerspectiveEnabled)],r.prototype,"screenSizePerspectiveEnabled",void 0),t.__decorate([g.property({type:o.SpatialReference,json:{origins:{service:{read:{source:"spatialReference"}}}}})],r.prototype,"spatialReference",void 0),t.__decorate([g.property({json:{read:!1}})],r.prototype,"type",void 0),t.__decorate([g.property(P.url)],r.prototype,"url",void 0),r=t.__decorate([g.subclass("esri.layers.StreamLayer")],r)}(R.TemporalLayer(I.ScaleRangeLayer(w.RefreshableLayer(v.ArcGISService(S.OperationalLayer(h.PortalLayer(f.MultiOriginJSONMixin(b))))))))}));