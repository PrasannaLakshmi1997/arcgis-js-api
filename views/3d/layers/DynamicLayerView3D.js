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

define(["require","exports","tslib","../../../core/asyncUtils","../../../core/Logger","../../../core/promiseUtils","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/Extent","../../../geometry/support/aaBoundingRect","./LayerView3D","./support/overlayImageUtils","./support/projectExtentUtils","../support/debugFlags","../webgl-engine/lib/RenderGeometry","../webgl-engine/lib/Texture","../webgl-engine/materials/ImageMaterial","../../layers/LayerView","../../layers/RefreshableLayerView"],(function(e,t,r,i,a,n,o,s,l,u,h,c,d,p,g,m,y,f,_,v){var x=a.getLogger("esri.views.3d.layers.DynamicLayerView3D"),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.drapeSourceType=0,t.hasDraped=!0,t.fullExtentInLocalViewSpatialReference=null,t.maximumDataResolution=null,t._images=new Array,t._extents=new Array,t._overlayExtents=new Array,t.updateWhenStationary=!0,t}return r.__extends(t,e),t.prototype.initialize=function(){var e=this;this.addResolvingPromise(p.toViewIfLocal(this).then((function(t){return e._set("fullExtentInLocalViewSpatialReference",t)}))),this.updatingHandles.add(this,"suspended",(function(){return e._suspendedChangeHandler()})),this.handles.add(this.view.resourceController.scheduler.registerIdleStateCallbacks((function(){e._isScaleRangeActive()&&e.notifyChange("suspended")}),(function(){}))),this._isScaleRangeLayer()&&this.updatingHandles.add(this.layer,"scaleRangeId",(function(){return e.notifyChange("suspended")})),"local"===this.view.viewingMode&&this.updatingHandles.add(this.view.basemapTerrain,"extent",(function(){return e._overlayExtents.forEach((function(t,r){return e._updateImageExtent(r)}))}))},t.prototype.destroy=function(){this.clear()},t.prototype.setDrapingExtent=function(e,t,r,i,a,n){this._overlayExtents[e]={extent:h.create(t),spatialReference:r,resolution:i,renderLocalOrigin:a,pixelRatio:n},this._updateImageExtent(e)},t.prototype._updateImageExtent=function(e){var t=this._overlayExtents[e],r=this._clippedExtent(t.extent,b),i=d.computeImageExportSize(t.extent,r,t.resolution),a=t.pixelRatio*this.view.pixelRatio;if("imageMaxWidth"in this.layer||"imageMaxHeight"in this.layer){var o=this.layer.imageMaxWidth,s=this.layer.imageMaxHeight;if(i.width>o){var l=o/i.width;i.height=Math.floor(i.height*l),i.width=o,a*=l}if(i.height>s){l=s/i.height;i.width=Math.floor(i.width*l),i.height=s,a*=l}}var u=this._extents[e];u&&h.equals(u.extent,r)&&!this._imageSizeDiffers(r,u.imageSize,i)||(this._extents[e]={extent:h.create(r),spatialReference:t.spatialReference,imageSize:i,pixelRatio:a},this.suspended||this._fetch(e).catch((function(e){n.isAbortError(e)||x.error(e)})))},t.prototype.clear=function(){for(var e=0;e<this._images.length;e++)this._clearImage(e)},t.prototype.doRefresh=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i;return r.__generator(this,(function(r){switch(r.label){case 0:if(this.suspended)return[2];for(t=[],i=0;i<this._extents.length;i++)this._extents[i]&&t.push(this._fetch(i,e));return[4,n.eachAlways(t)];case 1:return r.sent(),[2]}}))}))},t.prototype.canResume=function(){if(!e.prototype.canResume.call(this))return!1;if(this._isScaleRangeLayer()){var t=this.layer,r=t.minScale,i=t.maxScale;if(r>0||i>0){var a=this.view.scale;if(a<i||r>0&&a>r)return!1}}return!0},t.prototype.isUpdating=function(){return this._images.some((function(e){return!!e.loadingPromise}))},t.prototype.processResult=function(e,t,i){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)&&(e.image=t),[2]}))}))},t.prototype.findExtentInfoAt=function(e){for(var t=0,r=this._extents;t<r.length;t++){var i=r[t],a=i.extent;if(new u(a[0],a[1],a[2],a[3],i.spatialReference).contains(e))return i}return null},t.prototype.getFetchOptions=function(){},t.prototype.redraw=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var a=this;return r.__generator(this,(function(n){switch(n.label){case 0:return[4,i.forEach(this._images,(function(i,n){return r.__awaiter(a,void 0,void 0,(function(){return r.__generator(this,(function(r){switch(r.label){case 0:return i?[4,e(i,t)]:[2];case 1:return r.sent(),this._createStageObjects(n,i.image),this.emit("draped-data-change"),[2]}}))}))}))];case 1:return n.sent(),[2]}}))}))},t.prototype._imageSizeDiffers=function(e,t,r){if(!this.maximumDataResolution)return!0;if(g.TESTS_DISABLE_UPDATE_THRESHOLDS)return!0;var i=h.width(e)/this.maximumDataResolution.x,a=h.height(e)/this.maximumDataResolution.y,n=i/t.width,o=a/t.height,s=i/r.width,l=a/r.height,u=Math.abs(n-s),c=Math.abs(o-l);return u>1.5||c>1.5},t.prototype._fetch=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,a,s,l,c,d,p,g,m,y=this;return r.__generator(this,(function(f){switch(f.label){case 0:return this.suspended?[2]:(i=this._overlayExtents[e],a=this._extents[e],s=a.extent,l=new u(s[0],s[1],s[2],s[3],a.spatialReference),this._images[e]||(this._images[e]={texture:null,material:null,rendergeometry:null,loadingPromise:null,loadingAbortController:null,image:null,pixelData:null,renderExtent:h.create(s)}),(c=this._images[e]).loadingAbortController&&(c.loadingAbortController.abort(),c.loadingAbortController=null),0===l.width||0===l.height?(this._clearImage(e),[2]):(d=n.createAbortController(),c.loadingAbortController=d,n.onAbort(t,(function(){return d.abort()})),p=d.signal,g=this._waitFetchReady(p).then((function(){var e=r.__assign(r.__assign({requestAsImageElement:!0,pixelRatio:i.pixelRatio},y.getFetchOptions()),{signal:p}),t=a.imageSize,n=t.height,o=t.width;return y.layer.fetchImage(l,o,n,e)})).then((function(e){if(o.isAborted(p))throw x.warnOnce("A call to fetchImage resolved even though the request was aborted. fetchImage should not resolve if options.signal.aborted is true."),o.createAbortError();return y.processResult(c,e)})),c.loadingPromise=g,n.always(g,(function(){g===c.loadingPromise&&(c.loadingPromise=null,c.loadingAbortController=null)})),m=g.then((function(){h.set(c.renderExtent,s),y._createStageObjects(e,c.image),y.notifyChange("updating"),y.emit("draped-data-change")})).catch((function(e){throw e&&!n.isAbortError(e)&&x.error(e),y.notifyChange("updating"),e})),this.notifyChange("updating"),[4,m]));case 1:return f.sent(),[2]}}))}))},t.prototype.notifyGraphicUpdate=function(){},t.prototype._clearImage=function(e){var t=this._images[e],r=this.view._stage;t&&(t.rendergeometry&&(this.view.basemapTerrain.overlayManager.renderer.removeGeometries([t.rendergeometry],this,2),t.rendergeometry=null),t.texture&&(r.remove(4,t.texture.id),t.texture=null),t.material&&(r.remove(3,t.material.id),t.material=null),t.loadingAbortController&&(t.loadingAbortController.abort(),t.loadingAbortController=null),t.loadingPromise=null,t.image=null,t.pixelData=null)},t.prototype._createStageObjects=function(e,t){var r=this.view._stage,i=this._images[e];i.texture&&(r.remove(4,i.texture.id),i.texture=null),t?(i.texture=new y(t,"dynamicLayer",{width:t.width,height:t.height,preMultiplyAlpha:!0,wrap:{s:33071,t:33071}}),r.add(4,i.texture)):i.material&&(r.remove(3,i.material.id),i.material=null),!i.material&&i.texture?(i.material=new f({transparent:!0,textureId:i.texture.id},"dynamicLayer"),r.add(3,i.material)):i.material&&t&&i.material.setParameterValues({textureId:i.texture.id});var a=this.view.basemapTerrain.overlayManager.renderer;if(i.material){var n=void 0,o=this._overlayExtents[e].renderLocalOrigin;if(0===e)n=d.createGeometryForExtent(i.renderExtent,-1);else{if(1!==e)return void console.error("DynamicLayerView3D._createStageObjects: Invalid extent idx");var s=this._images[0].renderExtent;if(!s)return;n=d.createOuterImageGeometry(s,i.renderExtent,-1)}var l=new m(n);l.material=i.material,l.origin=o,a.addGeometries([l],this,2),i.rendergeometry&&a.removeGeometries([i.rendergeometry],this,2),i.rendergeometry=l}else i.rendergeometry&&(a.removeGeometries([i.rendergeometry],this,2),i.rendergeometry=null)},t.prototype._isScaleRangeLayer=function(){return"minScale"in this.layer&&"maxScale"in this.layer},t.prototype._isScaleRangeActive=function(){return!!this._isScaleRangeLayer()&&(this.layer.minScale>0||this.layer.maxScale>0)},t.prototype._clippedExtent=function(e,t){if("local"!==this.view.viewingMode)return h.set(t,e);var r=this.view.basemapTerrain,i=r.extent;return r.ready&&i?h.intersection(e,i,t):h.set(t,e)},t.prototype._suspendedChangeHandler=function(){this.suspended?(this.clear(),this.emit("draped-data-change")):this.refresh()},t.prototype._waitFetchReady=function(e){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(t){switch(t.label){case 0:return this.updateWhenStationary?[4,s.whenOnce(this.view,"stationary",e)]:[3,2];case 1:t.sent(),t.label=2;case 2:return[2]}}))}))},r.__decorate([l.property()],t.prototype,"layer",void 0),r.__decorate([l.property({dependsOn:["view.scale","layer.minScale","layer.maxScale"]})],t.prototype,"suspended",void 0),r.__decorate([l.property({type:Boolean})],t.prototype,"hasDraped",void 0),r.__decorate([l.property({readOnly:!0})],t.prototype,"fullExtentInLocalViewSpatialReference",void 0),r.__decorate([l.property()],t.prototype,"updating",void 0),t=r.__decorate([l.subclass("esri.views.3d.layers.DynamicLayerView3D")],t)}(v.RefreshableLayerView(c.LayerView3D(_))),b=h.create();return w}));