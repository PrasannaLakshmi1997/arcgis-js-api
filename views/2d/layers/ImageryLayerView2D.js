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

define(["require","exports","tslib","../../../Graphic","../../../core/Logger","../../../core/promiseUtils","../../../core/screenUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/support/rasterFunctions/pixelUtils","../engine","../engine/ImageryBitmapSource","./LayerView2D","./support/ExportStrategy","../../layers/ImageryLayerView","../../layers/LayerView","../../layers/RefreshableLayerView"],(function(e,t,r,i,n,a,o,s,l,p,u,c,y,h,d,g,f){var m=n.getLogger("esri.views.2d.layers.ImageryLayerView2D");return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._exportImageVersion=-1,t.container=new u.BitmapContainer,t}return r.__extends(t,e),Object.defineProperty(t.prototype,"pixelData",{get:function(){if(this.updating)return null;var e=this.strategy.container.children;if(1===e.length&&e[0].source)return{extent:e[0].source.extent,pixelBlock:e[0].source.originalPixelBlock};if(e.length>1){var t=this.view.extent,r=e.map((function(e){return e.source})).filter((function(e){return e.extent&&e.extent.intersects(t)})).map((function(e){return{extent:e.extent,pixelBlock:e.originalPixelBlock}})),i=p.mosaicPixelData(r,t);return i?{extent:i.extent,pixelBlock:i.pixelBlock}:null}return null},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(e,t){if(this.suspended)return a.resolve(null);var r=this.view.toMap(o.createScreenPoint(e,t));return a.resolve(new i({attributes:{},geometry:r,layer:this.layer}))},t.prototype.update=function(e){this.strategy.update(e).catch((function(e){a.isAbortError(e)||m.error(e)}))},t.prototype.attach=function(){var e=this;this.layer.increaseRasterJobHandlerUsage();var t=this.layer.version>=10,r=this.layer.version>=10.1?this.layer.imageMaxHeight:2048,i=this.layer.version>=10.1?this.layer.imageMaxWidth:2048;this.strategy=new h({container:this.container,imageNormalizationSupported:t,imageMaxHeight:r,imageMaxWidth:i,fetchSource:this.fetchImage.bind(this),requestUpdate:function(){return e.requestUpdate()}}),this.handles.add([s.init(this,"layer.exportImageServiceParameters.version",(function(t){e._exportImageVersion!==t&&(e._exportImageVersion=t,e.requestUpdate())})),this.watch("timeExtent",(function(){return e.requestUpdate()})),this.layer.on("redraw",(function(){e.strategy.updateExports((function(t){t.source instanceof HTMLImageElement?t.requestRender():e.layer.applyRenderer({pixelBlock:t.source.pixelBlock}).then((function(r){var i=t.source;i.pixelBlock=r.pixelBlock,i.filter=function(t){return e.layer.applyFilter(t)},e.container.requestRender()}))}))}))],"imagerylayerview-update"),this.container&&(this.container.blendMode=this.layer.blendMode)},t.prototype.detach=function(){this.layer.decreaseRasterJobHandlerUsage(),this.strategy.destroy(),this.container.removeAllChildren(),this.handles.remove("imagerylayerview-update"),this._exportImageVersion=-1},t.prototype.moveStart=function(){},t.prototype.viewChange=function(){},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(e){return this.requestUpdate(),[2]}))}))},t.prototype.isUpdating=function(){return this.strategy.updating||this.updateRequested},t.prototype.fetchImage=function(e,t,r,i){var n=this;return this._exportImageVersion=this.get("layer.exportImageServiceParameters.version"),(i=i||{}).timeExtent=this.timeExtent,i.requestAsImageElement=!0,this.layer.fetchImage(e,t,r,i).then((function(e){return e.imageElement?e.imageElement:n.layer.applyRenderer(e.pixelData,{signal:i.signal}).then((function(t){var r=new c.default(t.pixelBlock,t.extent.clone(),e.pixelData.pixelBlock);return r.filter=function(e){return n.layer.applyFilter(e)},r}))}))},r.__decorate([l.property({dependsOn:["updating"]})],t.prototype,"pixelData",null),r.__decorate([l.property()],t.prototype,"strategy",void 0),r.__decorate([l.property({dependsOn:["strategy.updating"]})],t.prototype,"updating",void 0),t=r.__decorate([l.subclass("esri.views.2d.layers.ImageryLayerView2D")],t)}(d.ImageryLayerView(f.RefreshableLayerView(y.LayerView2DMixin(g))))}));