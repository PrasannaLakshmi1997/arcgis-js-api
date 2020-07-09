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

define(["require","exports","tslib","../../../core/Handles","../../../core/accessorSupport/decorators","../../../geometry/support/webMercatorUtils","./BitmapTileLayerView2D","./LayerView2D","../tiling/TileInfoView","../tiling/TileQueue","../tiling/TileStrategy","../../layers/LayerView","../../layers/RefreshableLayerView"],(function(e,t,i,r,n,a,l,o,s,u,c,h,f){var p=[102113,102100,3857,3785,900913];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new r,t._tileStrategy=null,t._fetchQueue=null,t._tileRequests=new Map,t.layer=null,t}return i.__extends(t,e),Object.defineProperty(t.prototype,"tileMatrixSet",{get:function(){if(this.layer.activeLayer.tileMatrixSetId)return this.layer.activeLayer.tileMatrixSet;var e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(this.layer.activeLayer.tileMatrixSetId=e.id,e):null},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(){return null},t.prototype.update=function(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")},t.prototype.attach=function(){var t=this,i=this.layer.activeLayer,r=this.tileMatrixSet;if(r){var n=r.tileInfo.spatialReference,l=i.fullExtent&&i.fullExtent.clone();n.isWebMercator?l=a.geographicToWebMercator(l):n.isWGS84||(l=r.fullExtent),this._tileInfoView=new s(r.tileInfo,l),this._fetchQueue=new u({tileInfoView:this._tileInfoView,process:function(e){return t.fetchTile(e)}}),this._tileStrategy=new c({cachePolicy:"keep",acquireTile:function(e){return t.acquireTile(e)},releaseTile:function(e){return t.releaseTile(e)},tileInfoView:this._tileInfoView}),this._handles.add(this.watch("layer.activeLayer.styleId, tileMatrixSet",(function(){return t._refresh()}))),e.prototype.attach.call(this)}},t.prototype.detach=function(){e.prototype.detach.call(this),this._handles.removeAll(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(e){return this.updateRequested||this.suspended?[2]:(this._refresh(),[2])}))}))},t.prototype.isUpdating=function(){return this._fetchQueue.length>0},t.prototype.acquireTile=function(e){var t,i,r=this,n=this._bitmapView.createTile(e),a=n.bitmap;t=this._tileInfoView.getTileCoords([0,0],n.key),a.x=t[0],a.y=t[1],a.resolution=this._tileInfoView.getTileResolution(n.key),i=this._tileInfoView.tileInfo.size,a.width=i[0],a.height=i[1],this._tileInfoView.getTileCoords(a,n.key);var l={id:e.id,fulfilled:!1,promise:this._fetchQueue.push(n.key).then((function(e){n.bitmap.source=e,n.once("attach",(function(){return r.requestUpdate()})),r._bitmapView.addChild(n)})).catch((function(){n.bitmap.source=null,n.once("attach",(function(){return r.requestUpdate()})),r._bitmapView.addChild(n)}))};return l.promise.then((function(){return l.fulfilled=!0}),(function(){return l.fulfilled=!0})),this._tileRequests.set(n,l),this.requestUpdate(),n},t.prototype.releaseTile=function(e){var t=this._tileRequests.get(e);t.fulfilled||this._fetchQueue.abort(t.id),this._tileRequests.delete(e),this._bitmapView.removeChild(e),this.requestUpdate()},t.prototype.fetchTile=function(e){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(t){return[2,this.layer.fetchTile(e.level,e.row,e.col)]}))}))},t.prototype.canResume=function(){var t=e.prototype.canResume.call(this);return t?null!==this.tileMatrixSet:t},t.prototype._refresh=function(){var e=this;this._fetchQueue.reset(),this._tileStrategy.tiles.forEach((function(t){if(t.bitmap.source){t.bitmap.source=null;var i={id:t.key.id,fulfilled:!1,promise:e._fetchQueue.push(t.key).then((function(i){t.bitmap.source=i,t.requestRender(),e.notifyChange("updating")}))};i.promise.then((function(){return i.fulfilled=!0}),(function(){return i.fulfilled=!0})),e._tileRequests.set(t,i)}})),this.notifyChange("updating")},t.prototype._getTileMatrixSetBySpatialReference=function(e){var t=this.view.spatialReference;if(!e.tileMatrixSets)return null;var i=e.tileMatrixSets.find((function(e){return e.tileInfo.spatialReference.wkid===t.wkid}));return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find((function(e){return p.indexOf(e.tileInfo.spatialReference.wkid)>-1}))),i},i.__decorate([n.property({dependsOn:["tileMatrixSet"]})],t.prototype,"suspended",void 0),i.__decorate([n.property({readOnly:!0,dependsOn:["view.spatialReference","layer.activeLayer"]})],t.prototype,"tileMatrixSet",null),t=i.__decorate([n.subclass("esri.views.2d.layers.WMTSLayerView2D")],t)}(f.RefreshableLayerView(l.BitmapTileLayerView2D(o.LayerView2DMixin(h))))}));