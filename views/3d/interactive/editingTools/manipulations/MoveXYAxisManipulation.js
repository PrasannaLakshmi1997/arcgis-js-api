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

define(["require","exports","tslib","../../../../../Color","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/handleUtils","../../../../../core/maybe","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../support/elevationInfoUtils","../../Manipulator3D","../dragEventPipeline3D","../settings","./config","./Manipulation","./moveUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/materials/ColorMaterial","../../../../interactive/dragEventPipeline"],(function(t,a,e,r,n,i,o,l,s,u,p,c,f,d,m,_,g,h,v,M,y,w,b,A){Object.defineProperty(a,"__esModule",{value:!0});var I=function(t){function a(a){var e=t.call(this)||this;return e._handles=new i,e._arrowManipulatorInfos=new Array,e._opaqueMaterial=e.createMaterial(),e._transparentMaterial=e.createMaterial(.5),e._angle=0,e._scale=1,e._radius=g.DISC_RADIUS,e._updateAfterDrag=!1,e.events=new n,e._tool=a.tool,e._view=a.view,null!=a.radius&&(e._radius=a.radius),e._createManipulators(),e.forEachManipulator((function(t){return e._tool.manipulators.add(t)})),e}return e.__extends(a,t),Object.defineProperty(a.prototype,"orthogonalAvailable",{set:function(t){this._arrowManipulatorInfos[1].manipulator.available=t,this._arrowManipulatorInfos[3].manipulator.available=t},enumerable:!0,configurable:!0}),a.prototype.destroy=function(){var t=this;this.forEachManipulator((function(a){t._tool.manipulators.remove(a),a.destroy()})),this._handles.removeAll(),this._tool=null,this._view=null,this._arrowManipulatorInfos.length=0},a.prototype.forEachManipulator=function(t){this._arrowManipulatorInfos.map((function(a){var e=a.manipulator;return t(e,1)}))},a.prototype.createGraphicDragPipeline=function(t,a){var e=this,r=t.graphic,n=f.getGraphicEffectiveElevationInfo(r),i=l.unwrap(r.geometry).spatialReference;return v.createGraphicMoveDragPipeline(t,a,(function(t){return e.createDragPipeline(t,n,i)}))},a.prototype.createDragPipeline=function(t,a,e){var r=this;return o.handlesGroup(this._arrowManipulatorInfos.map((function(n,i){var o=n.manipulator;return A.createManipulatorDragEventPipeline(o,(function(n,o,l,s){var u=o.next(m.screenToMapXYAtLocation(r._view,n.elevationAlignedLocation,a,e)).next(A.constrainToMapAxis(n.location,r.angle+(i+1)*Math.PI*.5)).next(A.addScreenDelta());t(n,u,l,s)}))})))},Object.defineProperty(a.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,this.dragging?this._updateAfterDrag=!0:this._updateManipulatorTransform()},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"displayScale",{get:function(){return this._scale},set:function(t){this._scale=t,this._updateManipulatorTransform()},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"radius",{get:function(){return this._radius},set:function(t){this._radius!==t&&(this._radius=t,this._updateManipulators())},enumerable:!0,configurable:!0}),a.prototype._updateManipulators=function(){for(var t=0;t<this._arrowManipulatorInfos.length;t++)this._updateArrowManipulator(this._arrowManipulatorInfos[t],t);this._updateManipulatorTransform()},a.prototype._updateArrowManipulator=function(t,a){var e=t.manipulator,r=t.transform,n=this._radius/g.DISC_RADIUS,i=g.DISC_TRANSLATE_ARROW_SIZE*n,o=Math.sqrt(i*i*3/4),l=w.createExtrudedTriangle(o,i/2,i/2,g.DISC_HEIGHT);w.transformInPlace(l,s.mat4.fromTranslation(M.sm4d.get(),p.vec3.set(M.sv3d.get(),0,-o/3,0)));var u=new y(l,"move-xy-axis-arrow");e.renderObjects=[{geometry:u,material:this._opaqueMaterial,stateMask:2},{geometry:u,material:this._transparentMaterial,stateMask:1}],e.radius=o/3*2*1.2;var c=s.mat4.identity(M.sm4d.get());s.mat4.fromZRotation(c,a*Math.PI/2);var f=s.mat4.identity(M.sm4d.get());s.mat4.fromTranslation(f,p.vec3.set(M.sv3d.get(),0,g.DISC_TRANSLATE_ARROW_OFFSET*n,0)),s.mat4.multiply(r,c,f)},a.prototype._createManipulators=function(){for(var t=0;t<4;t++){var a=this._createArrowManipulator(t);this._arrowManipulatorInfos.push(a)}this._updateManipulatorTransform()},a.prototype._updateManipulatorTransform=function(){var t=this.angle,a=s.mat4.identity(M.sm4d.get());s.mat4.rotate(a,a,t,c.vec3f64.fromValues(0,0,1));var e=s.mat4.fromScaling(M.sm4d.get(),p.vec3.set(M.sv3d.get(),this.displayScale,this.displayScale,this.displayScale)),r=s.mat4.identity(M.sm4d.get());s.mat4.multiply(r,e,a);for(var n=0,i=this._arrowManipulatorInfos;n<i.length;n++){var o=i[n],l=s.mat4.multiply(M.sm4d.get(),r,o.transform);o.manipulator.modelTransform=l}},a.prototype._createArrowManipulator=function(t){var a=this,e=new d.Manipulator3D({view:this._view,autoScaleRenderObjects:!1,worldOriented:!0,focusMultiplier:1,touchMultiplier:1,collisionType:{type:"disc",direction:c.vec3f64.fromValues(0,0,1)}}),r={manipulator:e,transform:u.mat4f64.create()};return this._updateArrowManipulator(r,t),this._handles.add(e.events.on("drag",(function(t){a._updateAfterDrag&&"end"===t.action&&!a.dragging&&(a._updateManipulatorTransform(),a._updateAfterDrag=!1)}))),r},a.prototype.createMaterial=function(t){void 0===t&&(t=1);var a=r.toUnitRGBA(_.colors.main);a[3]*=t;var e=new b({color:a,transparent:1!==t,cullFace:2},"graphic-transform");return e.renderOccluded=2,e},Object.defineProperty(a.prototype,"test",{get:function(){return{arrowManipulators:this._arrowManipulatorInfos.map((function(t){return t.manipulator}))}},enumerable:!0,configurable:!0}),a}(h.Manipulation);a.MoveXYAxisManipulation=I}));