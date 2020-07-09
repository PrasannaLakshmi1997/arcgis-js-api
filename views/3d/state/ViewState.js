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

define(["require","exports","tslib","../../../core/Accessor","../../../core/Evented","../../../core/maybe","../../../core/accessorSupport/decorators","../../../core/accessorSupport/watch","../../../core/libs/gl-matrix-2/vec3f64","../../ViewAnimation","./Constraints","./controllers/AnimationController","./controllers/CameraController","../support/earthUtils","../support/PropertiesPool","../webgl-engine/lib/Camera"],(function(e,t,r,o,a,n,i,l,c,p,s,u,d,m,f,y){Object.defineProperty(t,"__esModule",{value:!0});var h=function(e){function t(t){var r=e.call(this,t)||this;return r.propertiesPool=new f.default({camera:y.default},r),r.lastSeenCameraProjectionValues=new y.default,r.events=new a,r._cameraChanged=!1,r.updateQueue=new Array,r.processingUpdates=!1,r}return r.__extends(t,e),t.prototype.destroy=function(){this.cameraController=null,this.propertiesPool=n.destroyMaybe(this.propertiesPool)},t.prototype.normalizeCtorArgs=function(e){return{camera:this.createInitialCamera(e.viewingMode),mode:e.viewingMode,spatialReference:e.spatialReference,constraints:new s.default({mode:e.viewingMode})}},Object.defineProperty(t.prototype,"animation",{get:function(){return this.cameraController instanceof u.AnimationController&&n.isSome(this.cameraController.viewAnimation)?this.cameraController.viewAnimation:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"camera",{get:function(){return this._get("camera")},set:function(e){var t=this;e!==g&&g.copyFrom(e),g.markViewDirty(),g.computeUp(this.mode),C.camera=g,this.events.emit("before-camera-change",C);var r=this._get("camera");if(this.cameraProjectionChanged(this.lastSeenCameraProjectionValues,g)&&(this.lastSeenCameraProjectionValues.copyFrom(g),_.camera=this.lastSeenCameraProjectionValues,this.events.emit("camera-projection-changed",_)),(!r||!r.equals(g))&&(this._set("camera",this.propertiesPool.get("camera").copyFrom(g)),this._cameraChanged=!r||!r.almostEquals(g),this._cameraChanged))var o=l.afterDispatch((function(){t._cameraChanged=!1,o.remove()}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isGlobal",{get:function(){return!this.isLocal},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isLocal",{get:function(){return"local"===this.mode},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"navigating",{get:function(){return!(!this.cameraController||!this.cameraController.isInteractive)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stationary",{get:function(){return!this._cameraChanged&&!this.navigating},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cameraController",{get:function(){return this._get("cameraController")},set:function(e){var t=this;this.stopActiveCameraController()?(e&&(e.watch("state",(function(r){r!==d.State.Finished&&r!==d.State.Stopped||(t._set("cameraController",null),t.updateCamera((function(t){return e.onControllerEnd(t)})))}),!0),e.onControllerStart(this.camera)),this._set("cameraController",e)):e&&(e.state=d.State.Rejected)},enumerable:!0,configurable:!0}),t.prototype.switchCameraController=function(e){return this.cameraController=e,e.state!==d.State.Rejected},t.prototype.stopActiveCameraController=function(){return!(this.cameraController&&!this.cameraController.stopController())},t.prototype.updateCamera=function(e){this.updateQueue.push(e),this.processUpdateQueue()},t.prototype.processUpdateQueue=function(){if(0!==this.updateQueue.length&&!this.processingUpdates){this.processingUpdates=!0;var e=this.updateQueue.shift();g.copyFrom(this._get("camera")),e(g),this.camera=g,this.processingUpdates=!1,this.processUpdateQueue()}},t.prototype.createInitialCamera=function(e){return"global"===e?new y.default(c.vec3f64.fromValues(4*m.earthRadius,0,0),c.vec3f64.fromValues(m.earthRadius,0,0),c.vec3f64.fromValues(0,0,1)):new y.default(c.vec3f64.fromValues(0,0,100),c.vec3f64.fromValues(0,0,0),c.vec3f64.fromValues(0,1,0))},t.prototype.cameraProjectionChanged=function(e,t){return e.fov!==t.fov||(e.fullViewport[0]!==t.fullViewport[0]||e.fullViewport[1]!==t.fullViewport[1]||e.fullViewport[2]!==t.fullViewport[2]||e.fullViewport[3]!==t.fullViewport[3]||(e.padding[0]!==t.padding[0]||e.padding[1]!==t.padding[1]||e.padding[2]!==t.padding[2]||e.padding[3]!==t.padding[3]))},r.__decorate([i.property({readOnly:!0,type:p,dependsOn:["cameraController"]})],t.prototype,"animation",null),r.__decorate([i.property({type:y.default})],t.prototype,"camera",null),r.__decorate([i.property({constructOnly:!0})],t.prototype,"constraints",void 0),r.__decorate([i.property({readOnly:!0})],t.prototype,"events",void 0),r.__decorate([i.property({readOnly:!0,dependsOn:["isLocal"]})],t.prototype,"isGlobal",null),r.__decorate([i.property({readOnly:!0,dependsOn:["mode"]})],t.prototype,"isLocal",null),r.__decorate([i.property({constructOnly:!0})],t.prototype,"mode",void 0),r.__decorate([i.property({constructOnly:!0})],t.prototype,"spatialReference",void 0),r.__decorate([i.property({readOnly:!0,dependsOn:["cameraController"]})],t.prototype,"navigating",null),r.__decorate([i.property({readOnly:!0,dependsOn:["navigating","_cameraChanged"]})],t.prototype,"stationary",null),r.__decorate([i.property()],t.prototype,"_cameraChanged",void 0),r.__decorate([i.property()],t.prototype,"cameraController",null),t=r.__decorate([i.subclass("esri.views.3d.state.ViewState")],t)}(o);t.ViewState=h;var g=new y.default,C={camera:null},_={camera:null};t.default=h}));