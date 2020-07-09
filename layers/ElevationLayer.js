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

define(["require","exports","tslib","../request","../core/deprecate","../core/Error","../core/Logger","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/HeightModelInfo","./Layer","./mixins/ArcGISCachedService","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./support/commonProperties","./support/LercDecoder","@dojo/framework/shim/Promise"],(function(e,r,t,o,i,a,n,p,l,s,c,u,d,y,h,v,m,f,_,g){var S=n.getLogger("esri.layers.ElevationLayer");return function(r){function n(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var o=r.apply(this,e)||this;return o.copyright=null,o.heightModelInfo=null,o.path=null,o.opacity=1,o.operationalLayerType="ArcGISTiledElevationServiceLayer",o.sourceJSON=null,o.type="elevation",o.url=null,o.version=null,o._lercDecoder=g.acquireInstance(),o}return t.__extends(n,r),n.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t.__assign({url:e},r):e},n.prototype.destroy=function(){g.releaseInstance(this._lercDecoder),this._lercDecoder=null},Object.defineProperty(n.prototype,"minScale",{get:function(){},set:function(e){this.constructed&&S.warn(this.declaredClass+".minScale support has been removed (since 4.5)")},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"maxScale",{get:function(){},set:function(e){this.constructed&&S.warn(this.declaredClass+".maxScale support has been removed (since 4.5)")},enumerable:!0,configurable:!0}),n.prototype.readVersion=function(e,r){var t=r.currentVersion;return t||(t=9.3),t},n.prototype.load=function(e){var r=this,t=p.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"],supportsData:!1,validateItem:function(e){for(var r=0;r<e.typeKeywords.length;r++)if("elevation 3d layer"===e.typeKeywords[r].toLowerCase())return!0;throw new a("portal:invalid-layer-item-type","Invalid layer item type '${type}', expected '${expectedType}' ",{type:"Image Service",expectedType:"Image Service Elevation 3D Layer"})}},e).then((function(){return r._fetchImageService(t)}),(function(){return r._fetchImageService(t)}))),s.resolve(this)},n.prototype.fetchTile=function(e,r,t,a){var n=this;void 0===a&&(a={}),null!=a&&"number"==typeof a&&(i.deprecated(S,"Passing 'noDataValue' directly as a parameter",{replacement:"use { noDataValue } options object instead",version:"4.12"}),a={noDataValue:a});var p={responseType:"array-buffer",signal:a.signal},l={noDataValue:a.noDataValue,returnFileInfo:!0};return this.load().then((function(){return n._fetchTileAvailability(e,r,t,a)})).then((function(){return o(n.getTileUrl(e,r,t),p)})).then((function(e){return n._lercDecoder.decode(e.data,l,a.signal)})).then((function(e){return{values:e.pixelData,width:e.width,height:e.height,maxZError:e.fileInfo.maxZError,noDataValue:e.noDataValue,minValue:e.minValue,maxValue:e.maxValue}}))},n.prototype.getTileUrl=function(e,r,o){var i=!this.tilemapCache&&this.supportsBlankTile,a=c.objectToQuery(t.__assign(t.__assign({},this.parsedUrl.query),{blankTile:!i&&null}));return this.parsedUrl.path+"/tile/"+e+"/"+r+"/"+o+(a?"?"+a:"")},n.prototype.queryElevation=function(e,r){var t=this;return this._importElevationQuery().then((function(o){return(new o.ElevationQuery).query(t,e,r)}))},n.prototype.createElevationSampler=function(e,r){var t=this;return this._importElevationQuery().then((function(o){return(new o.ElevationQuery).createSampler(t,e,r)}))},n.prototype._fetchTileAvailability=function(e,r,t,o){return this.tilemapCache?this.tilemapCache.fetchAvailability(e,r,t,o):s.resolve("unknown")},n.prototype._fetchImageService=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,i;return t.__generator(this,(function(a){switch(a.label){case 0:return this.sourceJSON?[2,this.sourceJSON]:(r={query:t.__assign({f:"json"},this.parsedUrl.query),responseType:"json",signal:e},[4,o(this.parsedUrl.path,r)]);case 1:return(i=a.sent()).ssl&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=i.data,this.read(i.data,{origin:"service",url:this.parsedUrl}),[2]}}))}))},n.prototype._importElevationQuery=function(){return new Promise((function(r,t){e(["./support/ElevationQuery"],r,t)}))},t.__decorate([u.property({json:{read:{source:"copyrightText"}}})],n.prototype,"copyright",void 0),t.__decorate([u.property({readOnly:!0,type:d})],n.prototype,"heightModelInfo",void 0),t.__decorate([u.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],n.prototype,"path",void 0),t.__decorate([u.property({type:["show","hide"]})],n.prototype,"listMode",void 0),t.__decorate([u.property({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],n.prototype,"minScale",null),t.__decorate([u.property({json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],n.prototype,"maxScale",null),t.__decorate([u.property({json:{read:!1,write:!1,origins:{"web-document":{read:!1,write:!1}}}})],n.prototype,"opacity",void 0),t.__decorate([u.property({type:["ArcGISTiledElevationServiceLayer"]})],n.prototype,"operationalLayerType",void 0),t.__decorate([u.property()],n.prototype,"sourceJSON",void 0),t.__decorate([u.property({json:{read:!1},value:"elevation",readOnly:!0})],n.prototype,"type",void 0),t.__decorate([u.property(_.url)],n.prototype,"url",void 0),t.__decorate([u.property()],n.prototype,"version",void 0),t.__decorate([u.reader("version",["currentVersion"])],n.prototype,"readVersion",null),n=t.__decorate([u.subclass("esri.layers.ElevationLayer")],n)}(h.ArcGISCachedService(v.ArcGISService(m.OperationalLayer(f.PortalLayer(l.MultiOriginJSONMixin(y))))))}));