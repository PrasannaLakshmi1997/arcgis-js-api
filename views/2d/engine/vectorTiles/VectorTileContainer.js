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

define(["require","exports","tslib","../../../../core/MapUtils","../../../../core/maybe","../../../../core/promiseUtils","../../../../geometry/support/aaBoundingRect","../../engine","./FadeRecorder","../webgl/definitions","../webgl/enums","../webgl/TiledDisplayObject","../../tiling/TileCoverage","../../tiling/TileKey"],(function(e,t,r,s,a,i,n,o,l,d,h,p,c,u){Object.defineProperty(t,"__esModule",{value:!0});function y(e,t){if(e){var r=e.getLayoutProperty("visibility");if(!r||"none"!==r.getValue()&&(void 0===e.minzoom||e.minzoom<t+1e-6)&&(void 0===e.maxzoom||e.maxzoom>=t-1e-6))return!0}return!1}var f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._backgroundTiles=[],t._fadeRecorder=new l.FadeRecorder(400),t._pointToCallbacks=new Map,t._parsedDataQueue=new Map,t}return r.__extends(t,e),t.prototype.destroy=function(){this.removeAllChildren(),this.children.forEach((function(e){return e.destroy()})),this._spriteMosaic&&this._spriteMosaic.dispose(),this._glyphMosaic&&this._glyphMosaic.dispose()},Object.defineProperty(t.prototype,"updating",{get:function(){return this._parsedDataQueue.size>0},enumerable:!0,configurable:!0}),t.prototype.setStyleResources=function(e,t,r){this._spriteMosaic=e,this._glyphMosaic=t,this._styleRepository=r},t.prototype.hitTest=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var s,a;return r.__generator(this,(function(r){return s=[e,t],a=i.createResolver(),this._pointToCallbacks.set(s,a),this.requestRender(),[2,a.promise]}))}))},t.prototype.setTileData=function(e,t){var r=this.stage;if(r.dataUploadCounter<d.MAX_GPU_UPLOADS_PER_FRAME&&t)return e.setData(t.tileData,t.client,t.refKeys),void r.dataUploadCounter++;t?(this._parsedDataQueue.set(e,t),this.emit("updating-change")):e.setData(null,null)},t.prototype.createRenderParams=function(t){return r.__assign(r.__assign({},e.prototype.createRenderParams.call(this,t)),{renderPass:null,styleLayer:null,styleLayerId:-1,glyphMosaic:this._glyphMosaic,spriteMosaic:this._spriteMosaic,fadeRecorder:this._fadeRecorder,hasClipping:!!this._clippingInfos})},t.prototype.doRender=function(t){!this.visible||t.drawPhase!==h.WGLDrawPhase.MAP&&t.drawPhase!==h.WGLDrawPhase.DEBUG||void 0===this._spriteMosaic||e.prototype.doRender.call(this,t)},t.prototype.removeChild=function(t){return this._parsedDataQueue.has(t)&&(this._parsedDataQueue.delete(t),this.emit("updating-change")),e.prototype.removeChild.call(this,t)},t.prototype.renderChildren=function(t){if(t.drawPhase!==h.WGLDrawPhase.DEBUG){var r=this.stage;if(this._parsedDataQueue.size>0&&r.dataUploadCounter<d.MAX_GPU_UPLOADS_PER_FRAME){for(var a=s.pairsOfMap(this._parsedDataQueue),i=0;i<a.length&&r.dataUploadCounter<d.MAX_GPU_UPLOADS_PER_FRAME;i++){var n=a[i][0],o=a[i][1];n.setData(o.tileData,o.client,o.refKeys),this._parsedDataQueue.delete(n),r.dataUploadCounter++}this.emit("updating-change")}if(this._fadeRecorder.recordLevel(t.displayLevel),this._doRender(t),(this._parsedDataQueue.size>0||this._fadeRecorder.needsRedraw())&&this.requestRender(),this._pointToCallbacks.size>0){var l=t.context,p=l.getBoundFramebufferObject();t.drawPhase=h.WGLDrawPhase.HITTEST;var c=t.painter.effects.hittest;c.bind(t),this._doRender(t),c.draw(t,this._pointToCallbacks,6),l.bindFramebuffer(p)}}else e.prototype.renderChildren.call(this,t)},t.prototype.removeAllChildren=function(){this._parsedDataQueue.clear();for(var t=0;t<this.children.length;t++){this.children[t].dispose()}e.prototype.removeAllChildren.call(this)},t.prototype._doRender=function(t){var r=t.context,s=this._styleRepository,a=s.layers,i=!0;t.drawPhase===h.WGLDrawPhase.HITTEST&&(i=!1),s.backgroundBucketIds.length>0&&(t.renderPass="background",this._renderBackgroundLayers(t,s.backgroundBucketIds)),e.prototype.renderChildren.call(this,t);for(var n=this.children.filter((function(e){return e.visible})),o=0,l=n;o<l.length;o++){var d=l[o];d.triangleCount=0,d.commitChanges()}r.setStencilWriteMask(0),r.setColorMask(!0,!0,!0,!0),r.setStencilOp(7680,7680,7681),r.setStencilTestEnabled(!0),r.setBlendingEnabled(!1),r.setDepthTestEnabled(!0),r.setDepthWriteEnabled(!0),r.setDepthFunction(515),r.setClearDepth(1),r.clear(r.gl.DEPTH_BUFFER_BIT),t.renderPass="opaque";for(var p=a.length-1;p>=0;p--)this._renderStyleLayer(p,t,n);r.setDepthWriteEnabled(!1),r.setBlendingEnabled(i),r.setBlendFunctionSeparate(1,771,1,771),t.renderPass="translucent";for(p=0;p<a.length;p++)this._renderStyleLayer(p,t,n);r.setDepthTestEnabled(!1),t.renderPass="symbol";for(p=0;p<a.length;p++)this._renderStyleLayer(p,t,n);r.bindVAO(),r.setStencilTestEnabled(!0),r.setBlendingEnabled(!0)},t.prototype._renderStyleLayer=function(e,t,r){var s=t.painter,a=t.renderPass,i=this._styleRepository.layers[e];if(void 0!==i){var n;switch(i.type){case 0:return;case 1:if("opaque"!==a&&"translucent"!==t.renderPass)return;n="vtlFill";break;case 2:if("translucent"!==a)return;n="vtlLine";break;case 4:if("symbol"!==a)return;n="vtlCircle";break;case 3:if("symbol"!==a)return;n="vtlSymbol"}var o=t.displayLevel;if(!(0===r.length||void 0!==i.minzoom&&i.minzoom>=o+1e-6||void 0!==i.maxzoom&&i.maxzoom<o-1e-6)){t.styleLayerId=e,t.styleLayer=i;for(var l=0,d=r;l<d.length;l++){if(d[l].layerData[e]){s.renderObjects(t,r,n);break}}}}},t.prototype._renderBackgroundLayers=function(e,t){for(var r=e.context,s=e.displayLevel,i=e.painter,o=e.state,l=this._styleRepository,d=!1,f=0,_=t;f<_.length;f++){var g=_[f];if(y(l.layers[g],s)){d=!0;break}}if(d){var v=this._tileInfoView.getTileCoverage(e.state,0,"smallest"),b=v.spans,m=v.lodInfo,D=m.level,P=n.create(),T=[];if(this._renderPasses){var C=this._renderPasses[0];a.isSome(this._clippingInfos)&&(C.brushes[0].prepareState(e,this._clippingInfos[0]),C.brushes[0].drawMany(e,this._clippingInfos))}for(var R,w=this._backgroundTiles,M=0,L=0,k=b;L<k.length;L++)for(var E=k[L],S=E.row,I=E.colFrom,B=E.colTo,F=I;F<=B;F++){if(M<w.length)(R=w[M]).key.set(D,S,m.normalizeCol(F),m.getWorldForColumn(F)),this._tileInfoView.getTileBounds(P,R.key,!1),R.bounds=P,R.coords[0]=P[0],R.coords[1]=P[3];else{var U=new u(D,S,m.normalizeCol(F),m.getWorldForColumn(F));R=new p.TiledDisplayObject(U,this._tileInfoView.getTileBounds(n.create(),U),[512,512],[4096,4096]),w.push(R)}R.setTransform(o,this._tileInfoView.getTileResolution(R.key)),T.push(R),M++}r.setStencilWriteMask(0),r.setColorMask(!0,!0,!0,!0),r.setStencilOp(7680,7680,7681),r.setStencilFunction(514,0,255);var z=!0;e.drawPhase===h.WGLDrawPhase.HITTEST&&(z=!1),r.setStencilTestEnabled(z);for(var A=0,O=t;A<O.length;A++){g=O[A];var W=l.layers[g];y(W,s)&&(e.styleLayerId=g,e.styleLayer=W,i.renderObjects(e,T,"vtlBackground"))}c.pool.release(v)}},t}(o.TileContainer);t.VectorTileContainer=f}));