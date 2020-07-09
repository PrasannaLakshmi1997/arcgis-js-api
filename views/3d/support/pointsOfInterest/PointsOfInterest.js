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

define(["require","exports","tslib","../../../../core/Accessor","../../../../core/Handles","../../../../core/SetUtils","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../PropertiesPool","../geometryUtils/ray","./CameraOnSurface","./CenterOnSurface","./ContentGeometryUpdates","./disposeMembers","./Focus","./StableSurfaceCenter","./SurfaceGeometryUpdates","../../webgl-engine/lib/Intersector","../../webgl-engine/lib/intersectorUtils","../../../support/Scheduler"],(function(e,t,r,n,i,s,a,o,c,u,d,f,p,h,l,O,y,C,_,A,S){Object.defineProperty(t,"__esModule",{value:!0});var m=function(e){function t(t){var r=e.call(this,t)||this;return r.handles=new i,r.surfaceAltitudeAtCenter=0,r.surfaceAltitudeAtCenterDirty=!0,r.surfaceAltitudeAtCenterWithContent=0,r.surfaceAltitudeAtCenterWithContentDirty=!0,r.propertiesPool=new u.PropertiesPool({renderPointOfView:g},r),r.renderPointOfView=c.vec3f64.create(),r}return r.__extends(t,e),t.prototype.initialize=function(){var e=this,t=this.view,n=t.state,i=t.basemapTerrain,a=t.renderCoordsHelper,o=t.map;this.surfaceIntersector=new _.Intersector(n.mode),n.isGlobal?this.surfaceIntersector.options.backfacesTerrain=!1:this.surfaceIntersector.options.backfacesTerrain=!0,this.surfaceIntersector.options.invisibleTerrain=!1,this.contentIntersector=new _.Intersector(n.mode),this.contentIntersectorOptions={exclude:s.SetFromValues([A.TERRAIN_ID])};var c=function(){return e.estimateSurfaceAltitudeAtCenter()},u={state:n,scheduler:this.view.resourceController.scheduler,surface:i,renderCoordsHelper:a};this._set("centerOnSurfaceInfrequent",new p.default(r.__assign(r.__assign({},u),{task:S.Task.POINT_OF_INTEREST_INFREQUENT,estimateSurfaceAltitudeAtCenter:c}))),this._set("centerOnSurfaceFrequent",new p.default(r.__assign(r.__assign({},u),{task:S.Task.POINT_OF_INTEREST_FREQUENT,estimateSurfaceAltitudeAtCenter:c}))),this._set("centerOnContent",new p.default(r.__assign(r.__assign({},u),{task:S.Task.POINT_OF_INTEREST_FREQUENT,estimateSurfaceAltitudeAtCenter:function(){return e.estimateSurfaceAltitudeAtCenterWithContent()}}))),this._set("cameraOnSurface",new f.default(r.__assign(r.__assign({},u),{task:S.Task.POINT_OF_INTEREST_INFREQUENT,map:o}))),this._set("surfaceGeometryUpdates",new C.default(r.__assign(r.__assign({},u),{centerOnSurfaces:[this.centerOnSurfaceFrequent,this.centerOnContent,this.centerOnSurfaceInfrequent]}))),this._set("contentGeometryUpdates",new h.default({contentLayerViews:this.view.allLayerViews,renderCoordsHelper:a})),this._set("surfaceOrigin",new y.default({view:this.view})),this._set("focus",new O.default({state:n,surface:i,renderCoordsHelper:a,centerOnSurface:this.centerOnSurfaceFrequent})),this.handles.add([n.watch("camera",(function(t){return e.cameraChanged(t)}),!0),i.watch("extent",(function(){return e.updateCenterPointsOfInterest()})),this.surfaceGeometryUpdates.events.on("request-update",(function(){return e.updateCenterPointsOfInterest()})),this.contentGeometryUpdates.events.on("request-update",(function(){return e.updateCenterOnContent()}))]),this.cameraChanged(this.view.state.camera),this.centerOnContent.update(),this.centerOnSurfaceFrequent.update(),this.centerOnSurfaceInfrequent.update(),this.cameraOnSurface.update()},t.prototype.destroy=function(){l.default(this,"handles","centerOnSurfaceInfrequent","centerOnSurfaceFrequent","cameraOnSurface","centerOnContent","surfaceOrigin","focus","propertiesPool")},Object.defineProperty(t.prototype,"updating",{get:function(){return!!(this.surfaceGeometryUpdates&&this.surfaceGeometryUpdates.updating||this.centerOnContent&&this.centerOnContent.updating||this.centerOnSurfaceInfrequent&&this.centerOnSurfaceInfrequent.updating||this.centerOnSurfaceFrequent&&this.centerOnSurfaceFrequent.updating||this.cameraOnSurface&&this.cameraOnSurface.updating||this.focus&&this.focus.updating)},enumerable:!0,configurable:!0}),t.prototype.estimateSurfaceAltitudeAtCenterWithContent=function(){if(!this.surfaceAltitudeAtCenterWithContentDirty)return this.surfaceAltitudeAtCenterWithContent;this.surfaceAltitudeAtCenterWithContentDirty=!1;var e=this.view.state.camera,t=this.view.sceneIntersectionHelper.getCenterRayWithSubpixelOffset(e,I);return this.view.sceneIntersectionHelper.intersectRay(t,this.contentIntersector,v,this.contentIntersectorOptions)?this.surfaceAltitudeAtCenterWithContent=this.view.renderCoordsHelper.getAltitude(v):this.surfaceAltitudeAtCenterWithContent=this.estimateSurfaceAltitudeAtCenter(t),this.surfaceAltitudeAtCenterWithContent},t.prototype.estimateSurfaceAltitudeAtCenter=function(e){if(!this.view.basemapTerrain)return 0;if(!this.surfaceAltitudeAtCenterDirty)return this.surfaceAltitudeAtCenter;this.surfaceAltitudeAtCenterDirty=!1;var t=this.view.state.camera;e||(e=this.view.sceneIntersectionHelper.getCenterRayWithSubpixelOffset(t,I));var r=e.origin,n=o.vec3.add(v,e.origin,e.direction);return this.surfaceIntersector.resetWithRay(e),this.surfaceIntersector.intersect(null,null,t),this.view.basemapTerrain.intersect(this.surfaceIntersector,null,r,n),this.surfaceIntersector.results.min.getIntersectionPoint(v)&&(this.surfaceAltitudeAtCenter=this.view.renderCoordsHelper.getAltitude(v)),this.surfaceAltitudeAtCenter},t.prototype.cameraChanged=function(e){this.updateCenterPointsOfInterest();var t=e.eye;o.vec3.exactEquals(this.renderPointOfView,t)||this._set("renderPointOfView",o.vec3.copy(this.propertiesPool.get("renderPointOfView"),t))},t.prototype.updateCenterPointsOfInterest=function(){this.surfaceAltitudeAtCenterDirty=!0,this.surfaceAltitudeAtCenterWithContentDirty=!0,this.centerOnSurfaceFrequent.updateRenderLocation(),this.centerOnSurfaceInfrequent.updateRenderLocation(),this.cameraOnSurface.updateRenderLocation(),this.focus.updateRenderLocation(),this.centerOnContent.updateRenderLocation()},t.prototype.updateCenterOnContent=function(){this.surfaceAltitudeAtCenterWithContentDirty=!0,this.centerOnContent.updateRenderLocation()},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{update:function(){e.surfaceGeometryUpdates.update(),e.centerOnSurfaceFrequent.update(),e.centerOnSurfaceInfrequent.update()},surfaceGeometryUpdates:this.surfaceGeometryUpdates}},enumerable:!0,configurable:!0}),r.__decorate([a.property({readOnly:!0})],t.prototype,"centerOnContent",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"centerOnSurfaceFrequent",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"centerOnSurfaceInfrequent",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"cameraOnSurface",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"focus",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"renderPointOfView",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"surfaceOrigin",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"contentGeometryUpdates",void 0),r.__decorate([a.property({readOnly:!0})],t.prototype,"surfaceGeometryUpdates",void 0),r.__decorate([a.property({constructOnly:!0})],t.prototype,"view",void 0),r.__decorate([a.property({readOnly:!0,dependsOn:["surfaceGeometryUpdates.updating","centerOnContent.updating","centerOnSurfaceInfrequent.updating","centerOnSurfaceFrequent.updating","cameraOnSurface.updating","focus.updating"]})],t.prototype,"updating",null),t=r.__decorate([a.subclass("esri.views.3d.support.PointsOfInterest")],t)}(n);t.PointsOfInterest=m;var g=Array,v=c.vec3f64.create(),I=d.create();t.default=m}));