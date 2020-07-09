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

define(["require","exports","../../../geometry","../../../core/compilerUtils","../../../core/Evented","../../../core/maybe","../../../core/screenUtils","../../../core/accessorSupport/utils","../../../core/libs/gl-matrix-2/mat3","../../../core/libs/gl-matrix-2/mat3f64","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec2","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/factories/vec3f64","../../../geometry/support/aaBoundingRect","../../../layers/graphics/dehydratedFeatures","../../3d/support/ElevationProvider","../../3d/support/geometryUtils","../../3d/support/projectionUtils","../../3d/support/stack","../support/projectionUtils","../../3d/webgl-engine/lib/Camera","../../3d/webgl-engine/lib/Layer","../../3d/webgl-engine/lib/Object3D"],(function(e,t,i,n,r,o,a,s,c,l,h,u,d,f,_,p,g,v,m,b,y,j,S,L,O,R){Object.defineProperty(t,"__esModule",{value:!0});var w=function(){function e(e){for(var t in this.camera=new L.default,this._elevation={offset:0,override:null},this.collisionType={type:"point"},this.collisionPriority=0,this._renderObjects=[],this.autoScaleRenderObjects=!0,this._available=!0,this._noDisplayCount=0,this._radius=10,this._worldSized=!1,this.focusMultiplier=2,this.touchMultiplier=2.5,this.worldOriented=!1,this._modelTransform=u.mat4f64.create(),this._worldFrame=null,this._renderLocation=_.vec3f64.create(),this._renderLocationDirty=!0,this._location=new i.Point({x:0,y:0,z:0}),this._elevationAlignedLocation=new i.Point,this._elevationAlignedLocationDirty=!0,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.cursor=null,this._grabbing=!1,this.dragging=!1,this._hovering=!1,this._selected=!1,this._state=0,this._focused=!1,this.events=new r.EventEmitter,this._screenLocation={screenPointArray:a.createScreenPointArray(),renderScreenPointArray:a.createRenderScreenPointArray3(),pixelSize:0},this._screenLocationDirty=!0,this._applyObjectTransform=null,this._engineResourcesAddedToStage=!1,this._engineResources=null,this._attached=!1,this._engineLayerId=null,this._materialIdReferences=null,this._location.spatialReference=e.view.spatialReference,e)this[t]=e[t];this.view.state&&this.view.state.camera&&this.camera.copyFrom(this.view.state.camera)}return e.prototype.destroy=function(){this._removeResourcesFromStage(),this._engineResources=null,this.view=null,this.camera=null},Object.defineProperty(e.prototype,"elevationInfo",{get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this._elevationAlignedLocationDirty=!0,this._renderLocationDirty=!0,this._updateEngineObject()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderObjects",{get:function(){return this._renderObjects},set:function(e){this._removeResourcesFromStage(),this._engineResources=null,this._renderObjects=e.slice(),this._updateEngineObject()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"available",{get:function(){return this._available},set:function(e){e!==this._available&&(this._available=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),e.prototype.disableDisplay=function(){var e=this;return this._noDisplayCount++,1===this._noDisplayCount&&this._updateEngineObject(),{remove:s.once((function(){e._noDisplayCount--,0===e._noDisplayCount&&e._updateEngineObject()}))}},Object.defineProperty(e.prototype,"radius",{get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"worldSized",{get:function(){return this._worldSized},set:function(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"modelTransform",{get:function(){return this._modelTransform},set:function(e){P(e)&&(this._screenLocationDirty=!0),h.mat4.copy(this._modelTransform,e),this._updateEngineObject()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderLocation",{get:function(){return this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=u.mat4f64.create()),y.computeLinearTransformation(this.view.renderSpatialReference,this._renderLocation,this._worldFrame,this.view.renderSpatialReference),this._worldFrame[12]=0,this._worldFrame[13]=0,this._worldFrame[14]=0):this._worldFrame&&(this._worldFrame=null)),this._renderLocation},set:function(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._location),this.elevationAlignedLocation=this._location},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"location",{get:function(){return this._location},set:function(e){v.clonePoint(e,this._location),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!0,this._updateEngineObject(),this.events.emit("location-update",{location:this._location})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elevationAlignedLocation",{get:function(){return this._elevationAlignedLocationDirty?(this._evaluateElevationAlignment(),this._updateElevationAlignedLocation(),this._elevationAlignedLocation):this._elevationAlignedLocation},set:function(e){v.clonePoint(e,this._location),this._evaluateElevationAlignment(),this._location.z-=this._elevation.offset,this._updateElevationAlignedLocation(),this._updateEngineObject(),this.events.emit("location-update",{location:this._location})},enumerable:!0,configurable:!0}),e.prototype._updateElevationAlignedLocation=function(){this._elevationAlignedLocation.x=this.location.x,this._elevationAlignedLocation.y=this.location.y;var e=o.isSome(this._elevation.override)?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.z=e+this._elevation.offset,this._elevationAlignedLocation.spatialReference=this.location.spatialReference,this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!1},Object.defineProperty(e.prototype,"grabbing",{get:function(){return this._grabbing},set:function(e){e!==this._grabbing&&(this._grabbing=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hovering",{get:function(){return this._hovering},set:function(e){e!==this._hovering&&(this._hovering=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"selected",{get:function(){return this._selected},set:function(e){e!==this._selected&&(this._selected=e,this._updateEngineObject(),this.events.emit("select-changed",{action:e?"select":"deselect"}))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._state},set:function(e){e!==this._state&&(this._state=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),e.prototype.updateStateEnabled=function(e,t){t?this.state|=e:this.state&=~e},e.prototype._setFocused=function(e){e!==this._focused&&(this._focused=e,this.events.emit("focus-changed",{action:!0===e?"focus":"unfocus"}))},Object.defineProperty(e.prototype,"focused",{get:function(){return this._focused},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"screenLocation",{get:function(){return this.ensureScreenLocation(),this._screenLocation},enumerable:!0,configurable:!0}),e.prototype.ensureScreenLocation=function(){if(this._screenLocationDirty){var e;if(this._screenLocation.pixelSize=this.camera.computeScreenPixelSizeAt(this.renderLocation),this._screenLocationDirty=!1,P(this._modelTransform)){var t=this._calculateModelTransformOffset(B);e=f.vec3.add(t,t,this.renderLocation)}else e=this.renderLocation;this.camera.projectPoint(e,this._screenLocation.renderScreenPointArray),this.camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)}},Object.defineProperty(e.prototype,"applyObjectTransform",{get:function(){return this._applyObjectTransform},set:function(e){this._applyObjectTransform=e,this._screenLocationDirty=!0,this._updateEngineObject()},enumerable:!0,configurable:!0}),e.prototype.intersectionDistance=function(e,t){var i;if(!this.available)return null;var r=a.screenPointObjectToArray(e,A),o=this._getCollisionRadius(t),s=-1*this.collisionPriority;switch(this.collisionType.type){case"point":if(d.vec2.squaredDistance(this.screenLocation.screenPointArray,r)<o*o)return this.screenLocation.renderScreenPointArray[2]+s;break;case"line":for(var l=this.collisionType.paths,h=this._getWorldToScreenObjectScale(),u=this._calculateObjectTransform(h,I),_=o*this.screenLocation.pixelSize,g=b.ray.fromScreen(this.camera,r,E),v=0,m=l;v<m.length;v++){if(0!==(G=m[v]).length)for(var y=f.vec3.transformMat4(x,G[0],u),S=1;S<G.length;S++){var L=f.vec3.transformMat4(z,G[S],u);if(null!=(Z=b.lineSegment.closestRayDistance2(b.lineSegment.fromPoints(y,L,T),g))&&Z<_*_){var O=f.vec3.add(j.sv3d.get(),y,L);f.vec3.scale(O,O,.5);var R=a.castRenderScreenPointArray(j.sv3d.get());return this.camera.projectPoint(O,R),R[2]+s}f.vec3.copy(y,L)}}break;case"disc":var w=this.collisionType.direction,P=null!==(i=this.collisionType.offset)&&void 0!==i?i:p.ZEROS,F=(h=this._getWorldToScreenObjectScale(),u=this._calculateObjectTransform(h,I),_=o*this.screenLocation.pixelSize,g=b.ray.fromScreen(this.camera,r,E),c.mat3.fromMat4(D,u)),B=f.vec3.transformMat3(k,w,F),V=f.vec3.transformMat4(N,P,u);b.plane.fromPositionAndNormal(V,B,M);var W=C;if(b.plane.intersectRay(M,g,W)&&f.vec3.squaredDistance(W,V)<_*_)return this.screenLocation.renderScreenPointArray[2]+s;break;case"ribbon":var U=this.collisionType;l=U.paths,w=U.direction,h=this._getWorldToScreenObjectScale(),u=this._calculateObjectTransform(h,I),_=o*this.camera.computeScreenPixelSizeAt(this.renderLocation),g=b.ray.fromScreen(this.camera,r,E),F=c.mat3.fromMat4(D,u),B=f.vec3.transformMat3(k,w,F),V=this._calculateModelTransformPosition(N);b.plane.fromPositionAndNormal(V,B,M);W=C;if(!b.plane.intersectRay(M,g,W))break;for(var q=0,H=l;q<H.length;q++){var G;if(0!==(G=H[q]).length)for(y=f.vec3.transformMat4(x,G[0],u),S=1;S<G.length;S++){var Z;L=f.vec3.transformMat4(z,G[S],u);if(null!=(Z=b.lineSegment.distance2(b.lineSegment.fromPoints(y,L,T),W))&&Z<_*_){O=f.vec3.add(j.sv3d.get(),y,L);f.vec3.scale(O,O,.5);R=a.castRenderScreenPointArray(j.sv3d.get());return this.camera.projectPoint(O,R),R[2]+s}f.vec3.copy(y,L)}}break;default:n.neverReached(this.collisionType)}return null},e.prototype.attach=function(e){if(void 0===e&&(e={manipulator3D:{}}),this.view._stage){var t=e.manipulator3D;if(this._engineLayerId=t.engineLayerId,o.isNone(this._engineLayerId)){var n=new O("manipulator-3d",{isPickable:!1});this.view._stage.add(0,n),this.view._stage.addToViewContent([n.id]),this._engineLayerId=n.id,t.engineLayerId=n.id}t.engineLayerReferences=(t.engineLayerReferences||0)+1,this._materialIdReferences=t.materialIdReferences,o.isNone(this._materialIdReferences)&&(this._materialIdReferences=new Map,t.materialIdReferences=this._materialIdReferences),this.camera.copyFrom(this.view.state.camera),this._attached=!0,this._updateEngineObject(),y.canProject(this._location.spatialReference,this.view.spatialReference)||(this.location=new i.Point({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))}},e.prototype.detach=function(e){void 0===e&&(e={manipulator3D:{}});var t=e.manipulator3D;t.engineLayerReferences--;var i=0===t.engineLayerReferences;i&&(t.engineLayerId=null),this._removeResourcesFromStage(i),this._engineResources=null,this._engineLayerId=null,this._materialIdReferences=null,this._attached=!1},e.prototype.onViewChange=function(){this.camera.copyFrom(this.view.state.camera),this._screenLocationDirty=!0,this._updateEngineObject()},e.prototype.onElevationChange=function(e){S.pointToPoint(this.location,V,e.spatialReference),g.containsPointObject(e.extent,V)&&(this.location=this._location)},e.prototype._evaluateElevationAlignment=function(e){if(void 0===e&&(e=this.location),o.isNone(this.elevationInfo))return!1;var t=null,i=0,n=o.unwrapOr(this.elevationInfo.offset,0);switch(this.elevationInfo.mode){case"on-the-ground":t=m.getElevationAtPoint(this.view.elevationProvider,e,"ground")||0;break;case"relative-to-ground":i=(m.getElevationAtPoint(this.view.elevationProvider,e,"ground")||0)+n;break;case"relative-to-scene":i=(m.getElevationAtPoint(this.view.elevationProvider,e,"scene")||0)+n;break;case"absolute-height":i=n}return(i!==this._elevation.offset||t!==this._elevation.override)&&(this._elevation.offset=i,this._elevation.override=t,!0)},e.prototype._updateEngineObject=function(){if(this._attached)if(this.available){var e=this._getWorldToScreenObjectScale(),t=I;if(!0===this.autoScaleRenderObjects){var i=this._getFocusedSize(this._radius,this.focused)*e;this._calculateObjectTransform(i,t)}else this._calculateObjectTransform(e,t);for(var n=this._ensureEngineResources().objectsByState,r=(this.focused?2:1)|(this.selected?8:4),o=this._noDisplayCount>0,a=0,s=n;a<s.length;a++){var c=s[a],l=c.stateMask,h=c.objects;if(o)for(var u=0,d=h;u<d.length;u++){(b=d[u]).setVisible(!1)}else{var f=!(0!=(15&l))||(r&l)==(15&l),_=!(0!=(65520&l))||(this.state&l)==(65520&l);if(f&&_)for(var p=0,g=h;p<g.length;p++){(b=g[p]).setVisible(!0),b.objectTransformation=t}else for(var v=0,m=h;v<m.length;v++){var b;(b=m[v]).setVisible(!1)}}}}else this._removeResourcesFromStage()},e.prototype._ensureEngineResources=function(){if(o.isNone(this._engineResources)){var e=this.view._stage.getContent(0,o.unwrap(this._engineLayerId)),t=[],i=new Set;this.renderObjects.forEach((function(e){var n=e.material;i.has(n)||(t.push(n),i.add(n))}));var n=new Map;this.renderObjects.forEach((function(e){var t=new R({idHint:"manipulator",castShadow:!1});!function(e,t){var i=t.geometry,n=t.material,r=t.transform;Array.isArray(i)?i.forEach((function(t){return e.addGeometry(t,n,r)})):e.addGeometry(i,n,r)}(t,e);var i=e.stateMask||0,r=n.get(i)||[];r.push(t),n.set(i,r)}));var r=[];n.forEach((function(e,t){r.push({stateMask:t,objects:e})})),this._engineResources={objectsByState:r,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources},e.prototype._addResourcesToStage=function(){var e=this;if(!this._engineResourcesAddedToStage&&!o.isNone(this._engineResources)){var t=this._engineResources,i=t.objectsByState,n=t.layer;t.materials.forEach((function(t){var i=o.unwrap(e._materialIdReferences),n=i.get(t.id)||0;0===n&&e.view._stage.add(3,t),i.set(t.id,n+1)})),i.forEach((function(t){t.objects.forEach((function(t){n.addObject(t),e.view._stage.add(1,t)}))})),this._engineResourcesAddedToStage=!0}},e.prototype._removeResourcesFromStage=function(e){var t=this;if(void 0===e&&(e=!1),this._engineResourcesAddedToStage&&!o.isNone(this._engineResources)){var i=this._engineResources,n=i.objectsByState,r=i.layer,a=i.materials;n.forEach((function(e){e.objects.forEach((function(e){r.removeObject(e),t.view._stage.remove(1,e.id)}))})),a.forEach((function(e){var i=o.unwrap(t._materialIdReferences),n=i.get(e.id);1===n?(t.view._stage.remove(3,e.id),i.delete(e.id)):i.set(e.id,n-1)})),e&&this.view._stage.remove(0,r.id),this._engineResourcesAddedToStage=!1}},e.prototype._getCollisionRadius=function(e){return this._getFocusedSize(this.radius,!0)*("touch"===e?this.touchMultiplier:1)},e.prototype._getFocusedSize=function(e,t){return e*(t?this.focusMultiplier:1)},e.prototype._getWorldToScreenObjectScale=function(){return this._worldSized?1:this.screenLocation.pixelSize},e.prototype._calculateModelTransformPosition=function(e){var t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,F);return f.vec3.set(e,i[12],i[13],i[14])},e.prototype._calculateModelTransformOffset=function(e){var t=this._calculateModelTransformPosition(e);return f.vec3.subtract(e,t,this.renderLocation)},e.prototype._calculateObjectTransform=function(e,t){return h.mat4.set(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),this._worldFrame&&h.mat4.multiply(t,t,this._worldFrame),h.mat4.multiply(t,t,this._modelTransform),t[12]+=this.renderLocation[0],t[13]+=this.renderLocation[1],t[14]+=this.renderLocation[2],t[15]=1,o.isSome(this._applyObjectTransform)&&this._applyObjectTransform(t),t},Object.defineProperty(e.prototype,"test",{get:function(){var e=!1;if(o.isSome(this._engineResources))for(var t in this._engineResources.objectsByState){for(var i=0,n=this._engineResources.objectsByState[t].objects;i<n.length;i++){if(n[i].isVisible){e=!0;break}}if(e)break}return{areAnyResourcesVisible:e}},enumerable:!0,configurable:!0}),e}();function P(e){return 0!==e[12]||0!==e[13]||0!==e[14]}t.Manipulator3D=w;var A=a.createScreenPointArray(),T=b.lineSegment.create(),E=b.ray.create(),D=l.mat3f64.create(),F=u.mat4f64.create(),I=u.mat4f64.create(),M=b.plane.create(),x=_.vec3f64.create(),z=_.vec3f64.create(),C=_.vec3f64.create(),k=_.vec3f64.create(),N=_.vec3f64.create(),B=_.vec3f64.create(),V=new i.Point({x:0,y:0,z:0,spatialReference:null})}));