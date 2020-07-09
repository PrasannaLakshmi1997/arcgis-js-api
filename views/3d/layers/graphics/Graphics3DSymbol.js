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

define(["require","exports","tslib","../../../../core/asyncUtils","../../../../core/maybe","../../../../core/promiseUtils","./Graphics3DGraphic","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayerFactory","./Loadable","./symbolComplexity"],(function(e,r,t,o,s,a,i,n,y,l,c){var h=function(e){function r(r,t,o){var s=e.call(this)||this;return s._symbol=r,s._context=t,s._backgroundLayers=o,s._destroyed=!1,s.symbolLayers=[],s.referenced=0,s}return t.__extends(r,e),Object.defineProperty(r.prototype,"symbol",{get:function(){return this._symbol},set:function(e){if(this._symbol=e,this.symbolLayers)for(var r=0;r<e.symbolLayers.length;r++){var t=this.symbolLayers[r];s.isNone(t)||(t.symbol=e,t.symbolLayer=e.symbolLayers.items[r])}},enumerable:!0,configurable:!0}),r.prototype.doLoad=function(e){return t.__awaiter(this,void 0,void 0,(function(){var r,i,n,l,c,h=this;return t.__generator(this,(function(f){switch(f.label){case 0:for(r=this._symbol.symbolLayers,this._backgroundLayers&&(r=this._backgroundLayers.concat(r)),i=r.length;this.symbolLayers.length<r.length;)this.symbolLayers.push(null);for(this.symbolLayers.length=r.length,n=function(t){var o=r.getItemAt(t);if(!1===o.enabled)return"continue";u.renderPriority=1-(1+t)/i,u.renderPriorityStep=1/i,u.ignoreDrivers=o._ignoreDrivers;var s=y.make(l.symbol,o,l._context,u);a.onAbortOrThrow(e,(function(){h.symbolLayers[t]=null,s.destroy()})),l.symbolLayers[t]=s},l=this,c=0;c<i;c++)n(c);return[4,o.forEach(this.symbolLayers,(function(e,r){return t.__awaiter(h,void 0,void 0,(function(){return t.__generator(this,(function(t){switch(t.label){case 0:if(!s.isSome(e))return[3,4];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,e.load()];case 2:return t.sent(),[3,4];case 3:return t.sent(),this.symbolLayers[r]=null,[3,4];case 4:return[2]}}))}))}))];case 1:if(f.sent(),a.throwIfAborted(e),this.symbolLayers.length&&!this.symbolLayers.some((function(e){return!!e})))throw new Error;return[2]}}))}))},r.prototype.getSymbolLayerSize=function(e){var r=this.symbolLayers[e];return s.isSome(r)?r.getCachedSize():null},r.prototype.createGraphics3DGraphic=function(e,r){for(var t=e.graphic,o=new Array(this.symbolLayers.length),a=0;a<this.symbolLayers.length;a++){var n=this.symbolLayers[a];o[a]=s.isSome(n)?n.createGraphics3DGraphic(e):null}var y=this._context.arcade||this._context.featureExpressionInfoContext&&this._context.featureExpressionInfoContext.arcade&&this._context.featureExpressionInfoContext.arcade.modules||null;return new i(t,r||this,o,e.layer,y)},Object.defineProperty(r.prototype,"complexity",{get:function(){return c.totalSymbolComplexities(this.symbolLayers.map((function(e){return s.isSome(e)&&e.complexity})))},enumerable:!0,configurable:!0}),r.prototype.globalPropertyChanged=function(e,r){for(var t=this.symbolLayers.length,o=function(t){var o=a.symbolLayers[t];if(s.isSome(o)&&!o.globalPropertyChanged(e,r,(function(e){var r=e._graphics[t];return r instanceof n?r:null})))return{value:!1}},a=this,i=0;i<t;i++){var y=o(i);if("object"==typeof y)return y.value}return!0},r.prototype.applyRendererDiff=function(e,r){return 1===this.loadStatus&&this.symbolLayers.reduce((function(t,o){return t&&(s.isNone(o)||o.applyRendererDiff(e,r))}),!0)},r.prototype.prepareSymbolPatch=function(e){if(2!==this.loadStatus&&"partial"===e.diff.type){var r=e.diff.diff;if(r.symbolLayers&&"partial"===r.symbolLayers.type){var t=r.symbolLayers.diff;this.symbolLayers.forEach((function(r,o){var a;if(!s.isNone(r)){var i=t[o];if(i){var n={diff:i,graphics3DGraphicPatches:[],symbolLayerStatePatches:[]};r.prepareSymbolLayerPatch(n),(a=e.symbolStatePatches).push.apply(a,n.symbolLayerStatePatches),n.graphics3DGraphicPatches.length&&e.graphics3DGraphicPatches.push((function(e,r){var t=e._graphics[o];s.isSome(t)&&n.graphics3DGraphicPatches.forEach((function(e){return e(t,r)}))}))}}}))}}},r.prototype.updateGeometry=function(e,r){for(var t=0;t<this.symbolLayers.length;t++){var o=this.symbolLayers[t];if(!s.isNone(o)){var a=e._graphics[t];if(s.isSome(a)&&!o.updateGeometry(a,r))return!1}}return!0},r.prototype.onRemoveGraphic=function(e){for(var r=0;r<this.symbolLayers.length;r++){var t=this.symbolLayers[r];if(!s.isNone(t)){var o=e._graphics[r];s.isSome(o)&&t.onRemoveGraphic(o)}}},r.prototype.getFastUpdateStatus=function(){var e=0,r=0,t=0;return this.symbolLayers.forEach((function(o){s.isNone(o)||(0===o.loadStatus?e++:o.isFastUpdatesEnabled()?t++:r++)})),{loading:e,slow:r,fast:t}},r.prototype.destroy=function(){if(this.destroyed)console.error("Graphics3DSymbol.destroy called when already destroyed!");else{this.abortLoad();for(var e=0,r=this.symbolLayers;e<r.length;e++){var t=r[e];s.isSome(t)&&t.destroy()}this.symbolLayers.length=0,this._destroyed=!0}},Object.defineProperty(r.prototype,"destroyed",{get:function(){return this._destroyed},enumerable:!0,configurable:!0}),r}(l.Loadable),u={renderPriority:0,renderPriorityStep:1,ignoreDrivers:!1};return h}));