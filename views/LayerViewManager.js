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

define(["require","exports","tslib","../core/Error","../core/HandleOwner","../core/Logger","../core/promiseUtils","../core/scheduling","../core/watchUtils","../core/accessorSupport/decorators","./support/WatchUpdatingTracking"],(function(e,r,a,t,i,n,o,l,s,y,c){Object.defineProperty(r,"__esModule",{value:!0});var h=n.getLogger("esri.views.LayerViewManager"),w=new Map;w.set("view.map.basemap.baseLayers","view.basemapView.baseLayerViews"),w.set("view.map.ground.layers","view.groundView.layerViews"),w.set("view.map.layers","view.layerViews"),w.set("view.map.basemap.referenceLayers","view.basemapView.referenceLayerViews");var d=function(){function e(e,r,a){var i=this;this.layer=e,this.view=r,this.layerViewImporter=a,this._controller=o.createAbortController(),this._deferred=o.createDeferred(),this._started=!1,this.done=!1,o.onAbort(this._controller.signal,(function(){var r=new t("cancelled:layerview-create","layerview creation cancelled",{layer:e});i._deferred.reject(r)}))}return Object.defineProperty(e.prototype,"promise",{get:function(){return this._deferred.promise},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._controller.abort();var e=this.layerView;if(e){var r=this.layer,a=this.view;e.destroy(),r.emit("layerview-destroy",{view:a,layerView:e}),a.emit("layerview-destroy",{layer:r,layerView:e}),this.done=!0,this.layer=null,this.layerView=null,this.view=null,this.layerViewImporter=null,e.layer=null,e.parent=null,e.view=null}},e.prototype.start=function(){return a.__awaiter(this,void 0,void 0,(function(){var e,r,i,n,l,s,y,c;return a.__generator(this,(function(a){switch(a.label){case 0:if(this._started)return[2];this._started=!0,r=(e=this)._controller.signal,i=e.layer,n=e.view,this._map=n.map,a.label=1;case 1:return a.trys.push([1,10,,11]),[4,i.load({signal:r})];case 2:return a.sent(),"prefetchResources"in i?[4,i.prefetchResources({signal:r})]:[3,4];case 3:a.sent(),a.label=4;case 4:return l=void 0,i.createLayerView?[4,i.createLayerView(n,{signal:r})]:[3,6];case 5:return l=a.sent(),[3,8];case 6:if(!this.layerViewImporter.hasLayerViewModule(i))throw new t("layer:view-not-supported","No layerview implementation was found");return[4,this.layerViewImporter.importLayerView(i)];case 7:s=a.sent(),o.throwIfAborted(r),l="default"in s?new s.default({layer:i,view:n}):new s({layer:i,view:n}),a.label=8;case 8:return o.throwIfAborted(r),[4,l.when()];case 9:return a.sent(),!(y=this._map&&this._map.allLayers.includes(i))||r.aborted?(l.destroy(),l.layer=l.parent=l.view=null,this.done=!0,y?[2]:[2,this._deferred.reject(new t("view:no-layerview-for-layer","The layer has been removed from the map",{layer:i}))]):(this.layerView=l,i.emit("layerview-create",{view:n,layerView:l}),n.emit("layerview-create",{layer:i,layerView:l}),this.done=!0,this._deferred.resolve(l),[3,11]);case 10:return c=a.sent(),i.emit("layerview-create-error",{view:n,error:c}),n.emit("layerview-create-error",{layer:i,error:c}),this.done=!0,this._deferred.reject(new t("layerview:create-error","layerview creation failed",{layer:i,error:c})),[3,11];case 11:return[2]}}))}))},e}(),p=function(e){function r(r){var a=e.call(this,r)||this;return a._layerLayerViewInfoMap=new Map,a._watchUpdatingTracking=new c.WatchUpdatingTracking,a.view=null,a._preloadLayerViewModules=function(){var e=a.view,r=a.get("view.map.allLayers");e&&r&&r.forEach((function(e){a.layerViewImporter.hasLayerViewModule(e)&&a.layerViewImporter.importLayerView(e)}))},a._reschedule=function(){a.handles.remove("reschedule"),a.handles.add(l.schedule(a._doWork),"reschedule"),a.notifyChange("updating")},a._doWork=function(){var e=a.get("view.map");if(a._map!==e&&(a.clear(),a._map=e),a.handles.has("reschedule")){a.handles.remove("reschedule"),a.handles.remove("collection-change");var r=e&&e.allLayers;if(r){r.forEach(a._createLayerView,a),a._refreshCollections();var t=[];a._layerLayerViewInfoMap.forEach((function(e,a){r.includes(a)||t.push(e)}));for(var i=0,n=t;i<n.length;i++){var o=n[i];a._layerLayerViewInfoMap.delete(o.layer),o.destroy()}a.handles.add(a._watchUpdatingTracking.addOnCollectionChange(r,a._reschedule),"collection-change"),a.notifyChange("updating")}}},a.handles.add([s.on(a,"view.map.allLayers","change",a._preloadLayerViewModules,a._preloadLayerViewModules),a.watch(["view.map.basemap","view.map.ground","view.map.layers","view.ready"],a._reschedule,!0)]),a}return a.__extends(r,e),r.prototype.initialize=function(){this._preloadLayerViewModules()},r.prototype.destroy=function(){this.clear(),this._watchUpdatingTracking.destroy(),this.view=null,this._map=null},Object.defineProperty(r.prototype,"updating",{get:function(){if(this.handles.has("reschedule")||this._watchUpdatingTracking.updating)return!0;var e=!0;return this._layerLayerViewInfoMap.forEach((function(r){return e=e&&r.done})),!e},enumerable:!0,configurable:!0}),r.prototype.clear=function(){this.destroyed||(this._layerLayerViewInfoMap.forEach((function(e){return e.destroy()})),this._layerLayerViewInfoMap.clear(),this._refreshCollections())},r.prototype.whenLayerView=function(e){return this._reschedule(),this._doWork(),this._layerLayerViewInfoMap.has(e)?this._layerLayerViewInfoMap.get(e).promise:o.reject(new t("view:no-layerview-for-layer","No layerview has been found for the layer",{layer:e}))},r.prototype._refreshCollections=function(){var e=this;w.forEach((function(r,a){e._populateLayerViewsOwners(e.get(a),e.get(r),e.view)}))},r.prototype._populateLayerViewsOwners=function(e,r,a){var t=this;if(e&&r){var i=0;e.forEach((function(e){var n=t._layerLayerViewInfoMap.get(e);if(n&&n.layerView){var o=n.layerView;o.layer=e,o.parent=a,r.getItemAt(i)!==o&&r.splice(i,0,o),e.layers&&t._populateLayerViewsOwners(e.layers,o.layerViews,o),i+=1}})),i<r.length&&r.splice(i,r.length)}else r&&r.removeAll()},r.prototype._createLayerView=function(e){var r=this;if(this._layerLayerViewInfoMap.has(e))return this.view.ready&&this._layerLayerViewInfoMap.get(e).start(),void this.notifyChange("updating");e.load().catch((function(){})),this.layerViewImporter.hasLayerViewModule(e)&&this.layerViewImporter.importLayerView(e);var a=new d(e,this.view,this.layerViewImporter);a.promise.then((function(){r._refreshCollections(),r.notifyChange("updating")}),(function(a){a&&(o.isAbortError(a)||"cancelled:layerview-create"===a.name)||h.error("Failed to create view for layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"'.",{error:a}),r._refreshCollections(),r.notifyChange("updating")})),this._layerLayerViewInfoMap.set(e,a),this.view.ready&&a.start(),this.notifyChange("updating")},a.__decorate([y.property({readOnly:!0})],r.prototype,"_watchUpdatingTracking",void 0),a.__decorate([y.property()],r.prototype,"layerViewImporter",void 0),a.__decorate([y.property({readOnly:!0,dependsOn:["_watchUpdatingTracking.updating"]})],r.prototype,"updating",null),a.__decorate([y.property()],r.prototype,"view",void 0),r=a.__decorate([y.subclass("esri.views.LayerViewManager")],r)}(i.HandleOwner);r.default=p}));