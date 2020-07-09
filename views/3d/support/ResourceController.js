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

define(["require","exports","tslib","../../../core/Accessor","../../../core/Handles","../../../core/scheduling","../../../core/accessorSupport/decorators","./index","./MemoryController","./StreamDataLoader","../../support/Scheduler"],(function(e,t,r,o,a,n,s,i,u,l,d){Object.defineProperty(t,"__esModule",{value:!0});var c,h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.updating=!1,t}return r.__extends(t,e),r.__decorate([s.property({readOnly:!0})],t.prototype,"updating",void 0),t=r.__decorate([s.subclass("esri.views.3d.support.ResourceController")],t)}(o);t.ResourceControllerMaster=h,t.newResourceController=function(e,t){return void 0===t&&(t=function(){return performance.now()}),new c.ResourceController({view:e,now:t})},function(e){var t=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._scheduler=null,t._memoryController=null,t._streamDataLoader=null,t._cameraChangeTime=0,t._handles=new a,t._frameTask=null,t}return r.__extends(t,e),t.prototype.initialize=function(){var e=this;this._cameraChangeTime=this.now(),this._scheduler=d.newScheduler(this.now),this._memoryController=u.newMemoryController(this.view),this._streamDataLoader=new l.default,this._streamDataLoader.setup(i.maxDownloadSlots,i.downloadSlotsPerClient,this._scheduler),this._handles.add([this.view.watch("state.camera",(function(t,r){return e._cameraChangedHandler(t,r)}),!0),this.view.watch("stationary",(function(){return e._stationaryChangedHandler()})),this._memoryController.events.on("updating-changed",(function(){return e.notifyChange("updating")}))]),this._frameTask=n.addFrameTask({update:function(t){return e.frame(t)}})},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this._frameTask&&(this._frameTask.remove(),this._frameTask=null),this._streamDataLoader&&(this._streamDataLoader.destroy(),this._streamDataLoader=null),this._memoryController.destroy(),this._memoryController=null,this._scheduler.destroy(),this._scheduler=null},Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this._memoryController&&this._memoryController.updating||this._streamDataLoader&&this._streamDataLoader.updating)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scheduler",{get:function(){return this._scheduler},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"memoryController",{get:function(){return this._memoryController},enumerable:!0,configurable:!0}),t.prototype.createStreamDataRequester=function(e){var t=this._streamDataLoader;return{request:function(r,o,a){return t.request(r,o,e,a)},get busy(){return t.busy}}},t.prototype.frame=function(e){this.view.suspended||this.view.stateManager&&(this.view.stateManager.step(e.deltaTime/1e3),!this._scheduler)||(this._scheduler.state=this.state,this._scheduler.updateBudget(e)?(this._memoryController.update(),this._scheduler.frame()):this._memoryController.updating&&this._memoryController.update())},t.prototype._cameraChangedHandler=function(e,t){e&&t&&e.almostEquals(t)||(this._cameraChangeTime=this._scheduler.now,this._scheduler.state=this.state)},t.prototype._stationaryChangedHandler=function(){this.memoryController.resetStableQuality()},Object.defineProperty(t.prototype,"state",{get:function(){var e=this.view;return e.animation?0:e.interacting||this._scheduler.now-this._cameraChangeTime<=o?1:2},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{getQueueStats:function(t){return e._streamDataLoader.test.loadQueue.getStatsForType(t)},state:this.state}},enumerable:!0,configurable:!0}),r.__decorate([s.property({constructOnly:!0})],t.prototype,"view",void 0),r.__decorate([s.property({constructOnly:!0})],t.prototype,"now",void 0),r.__decorate([s.property()],t.prototype,"_streamDataLoader",void 0),r.__decorate([s.property({readOnly:!0,dependsOn:["_streamDataLoader.updating"]})],t.prototype,"updating",null),t=r.__decorate([s.subclass("esri.views.3d.support.ResourceController")],t)}(h);e.ResourceController=t;var o=300}(c||(c={}))}));