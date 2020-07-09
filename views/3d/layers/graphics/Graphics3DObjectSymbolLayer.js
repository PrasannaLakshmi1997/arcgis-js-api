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

define(["require","exports","tslib","../../../../Color","../../../../core/lang","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../symbols/support/ObjectSymbol3DLayerResource","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DLodInstanceGraphicLayer","./Graphics3DSymbolLayer","./graphicUtils","./lodResourceUtils","./objectResourceUtils","./pointUtils","./primitiveObjectSymbolUtils","./symbolComplexity","../support/FastSymbolUpdates","../../support/projectionUtils","../../webgl-engine/lib/Util","../../webgl-engine/lib/lodRendering/LodRenderer","../../webgl-engine/lib/lodRendering/LodResources","../../webgl-engine/materials/DefaultMaterial"],(function(e,t,r,i,s,o,a,n,l,c,h,d,u,p,m,f,y,_,v,b,g,R,S,x,P,E,L,B,C,U,O){Object.defineProperty(t,"__esModule",{value:!0});var z=function(e){function t(t,r,i,s){var o=e.call(this,t,r,i,s)||this;return o._removeResource=null,o._optionalFields=[],o._instanceIndexToGraphicUid=new Map,o.ensureDrapedStatus(!1),o}return r.__extends(t,e),t.prototype.getCachedSize=function(){var e=this._symbolSize;return{width:e[0],depth:e[1],height:e[2]}},t.prototype.doLoad=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,s;return r.__generator(this,(function(r){switch(r.label){case 0:if(t=this._getIdHint("_objectmat"),!this._drivenProperties.size&&b.validateSymbolLayerSize(this.symbolLayer))throw new Error;return i=this.symbolLayer,this.isByResource?[4,this._prepareModelResources(i.resource.href,e)]:[3,2];case 1:return r.sent(),[3,3];case 2:s=i.resource?i.resource.primitive:p.defaultPrimitive,this._preparePrimitiveResources(s,t),r.label=3;case 3:return[2]}}))}))},Object.defineProperty(t.prototype,"isByResource",{get:function(){return!(!this.symbolLayer.resource||!this.symbolLayer.resource.href)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lodRenderer",{get:function(){return this._lodRenderer},enumerable:!0,configurable:!0}),t.prototype.setMaterialTransparencyParams=function(e,t){void 0===t&&(t=o.get(this.symbolLayer,"material","color"));var r=this._getCombinedOpacity(t),i=r<1||this.needsDrivenTransparentPass;return e.transparent=i,e.opacity=r,e},t.prototype._preparePrimitiveResources=function(e,t){if(!x.isValidPrimitive(e))throw new Error("Unknown object symbol primitive: "+e);var r=this.symbolLayer;this._resourceBoundingBox=u.create(x.primitiveBoundingBox(e)),this._resourceSize=h.vec3f64.fromArray(u.size(this._resourceBoundingBox)),this._symbolSize=h.vec3f64.fromArray(b.computeSizeWithResourceSize(this._resourceSize,r)),this._isEsriSymbolResource=!1,this._isWosr=!1;var n={usePBR:this._context.physicalBasedRenderingEnabled,isSchematic:!0,instanced:["transformation"],ambient:h.vec3f64.ONES,diffuse:h.vec3f64.ONES,slicePlaneEnabled:this._context.slicePlaneEnabled,sliceHighlightDisabled:!0,castShadows:this.symbolLayer.castShadows,offsetTransparentBackfaces:this.symbolLayer.isPrimitive};this._physicalBasedRenderingEnabled=n.usePBR,this.setMaterialTransparencyParams(n);var l=this.symbol;if("point-3d"===l.type&&l.verticalOffset){var c=l.verticalOffset,p=c.screenLength,m=c.minWorldLength,f=c.maxWorldLength;n.verticalOffset={screenLength:a.pt2px(p),minWorldLength:m||0,maxWorldLength:null!=f?f:1/0},n.castShadows=!1}if(this._context.screenSizePerspectiveEnabled&&(n.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),this._drivenProperties.color)n.externalColor=d.vec4f64.ONES;else{var y=o.isSome(r.material)&&r.material.color,_=o.isSome(y)?i.toUnitRGBA(y):d.vec4f64.ONES;n.externalColor=_}this._fastUpdates=E.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(s.mixin(n,this._fastUpdates.materialParameters),n.instanced.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(n.instanced.push("color"),this._optionalFields.push("color"));var v=new O(n,t);if(this._lodResources=x.primitiveLodResources(e,v,t),this._originalMaterialParameters=U.materialsFromLodResources(this._lodResources).map((function(e){return{opacity:1,transparent:e.getParameters().transparent}})),!this._lodResources)throw new Error("Unknown object symbol primitive: "+e);this._finalizeSymbolResources(),this._initializeLodRenderer(),this.complexity=this.computeComplexity()},t.prototype._prepareModelResources=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){var i,n,l,c,d,p,m,f,y,_,v,S,x,P,L,B,C,O=this;return r.__generator(this,(function(r){switch(r.label){case 0:return n={instanced:i=["transformation"],slicePlaneEnabled:this._context.slicePlaneEnabled,castShadows:this.symbolLayer.castShadows},l={materialParamsMixin:n,streamDataRequester:this._context.streamDataRequester,cache:this._context.sharedResources.objectResourceCache},this._fastUpdates=E.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled?(s.mixin(l.materialParamsMixin,this._fastUpdates.materialParameters),i.push("featureAttribute"),this._optionalFields.push("featureAttribute")):this._hasPerInstanceColor()&&(i.push("color"),this._optionalFields.push("color")),"point-3d"===(c=this.symbol).type&&c.verticalOffset&&(d=c.verticalOffset,p=d.screenLength,m=d.minWorldLength,f=d.maxWorldLength,l.materialParamsMixin.verticalOffset={screenLength:a.pt2px(p),minWorldLength:m||0,maxWorldLength:null!=f?f:1/0},l.materialParamsMixin.castShadows=!1),l.signal=t,l.usePBR=this._context.physicalBasedRenderingEnabled,this._physicalBasedRenderingEnabled=l.usePBR,[4,R.fetch(e,l)];case 1:return y=r.sent(),this._isEsriSymbolResource=y.isEsriSymbolResource,this._isWosr=y.isWosr,this._removeResource=y.remove,_=g.makeLodResources(y.lods),g.fillEstimatedMinScreenSpaceRadius(_),_.levels.sort((function(e,t){return e.minScreenSpaceRadius-t.minScreenSpaceRadius})),_.levels[0].minScreenSpaceRadius=Math.min(2,_.levels[0].minScreenSpaceRadius),this._lodResources=_,v=this._context,S=this.symbolLayer.material,x=this._getExternalColorParameters(S),P=o.get(this.symbolLayer,"material","color"),L=this._getCombinedOpacity(P,{hasIntrinsicColor:!0}),B=this.needsDrivenTransparentPass,C=U.materialsFromLodResources(this._lodResources),this._originalMaterialParameters=U.materialsFromLodResources(this._lodResources).map((function(e){var t=e.getParameters();return{opacity:t.opacity||1,transparent:t.transparent}})),C.forEach((function(e){var t=e.getParameters();e.setParameterValues(x);var r=t.opacity*L,i=r<1||B||t.transparent;e.setParameterValues({opacity:r,transparent:i}),v.screenSizePerspectiveEnabled&&e.setParameterValues({screenSizePerspective:v.sharedResources.screenSizePerspectiveSettings})})),this._resourceBoundingBox=y.referenceBoundingBox,this._resourceSize=h.vec3f64.fromArray(u.size(this._resourceBoundingBox)),this._pivotOffset=h.vec3f64.fromArray(this._lodResources.levels[0].pivotOffset),this._symbolSize=h.vec3f64.fromArray(b.computeSizeWithResourceSize(this._resourceSize,this.symbolLayer)),E.updateFastSymbolUpdatesState(this._fastUpdates,this._context.renderer,this._fastVisualVariableConvertOptions())&&C.forEach((function(e){return e.setParameterValues(O._fastUpdates.materialParameters)})),this._finalizeSymbolResources(),this._initializeLodRenderer(),this.complexity=this.computeComplexity(),[2]}}))}))},t.prototype._finalizeSymbolResources=function(){var e=this._context.stage;this._materials=U.materialsFromLodResources(this._lodResources),this._physicalBasedRenderingEnabled!==this._context.physicalBasedRenderingEnabled&&this.physicalBasedRenderingChanged(),this._materials.forEach((function(t){e.add(3,t)})),this._textures=U.texturesFromLodResources(this._lodResources),this._textures.forEach((function(t){e.add(4,t)})),this._geometries=U.geometriesFromLodResources(this._lodResources),this._geometries.forEach((function(t){e.add(2,t)}))},t.prototype._initializeLodRenderer=function(){var e=this,t=this._context.stage,r={layerUid:this._context.layer.uid,graphicUid:function(t){return e._instanceIndexToGraphicUid.get(t)},notifyGraphicUpdate:function(t,r){return e._context.notifyGraphicUpdate(e._instanceIndexToGraphicUid.get(t),r)}},i=this._fastUpdates.enabled?{applyTransform:function(t,r,i){t.getFeatureAttribute(r,A),n.mat4.copy(i,E.evaluateModelTransform(e._fastUpdates.materialParameters,A,i))},scaleFactor:function(t,r,i){return r.getFeatureAttribute(i,A),E.evaluateModelTransformScale(t,e._fastUpdates.materialParameters,A)}}:null;this._lodRenderer=new C.LodRenderer(this._lodResources,this._optionalFields,r,i),this._lodRenderer.slicePlane=this._context.slicePlaneEnabled,t.addRenderPlugin(this._lodRenderer.slots,this._lodRenderer)},t.prototype._getExternalColorParameters=function(e){var t={};return this._drivenProperties.color?t.externalColor=d.vec4f64.ONES:o.isSome(e)&&o.isSome(e.color)?t.externalColor=i.toUnitRGBA(e.color):(t.externalColor=d.vec4f64.ONES,t.colorMixMode="ignore"),t},t.prototype.destroy=function(){e.prototype.destroy.call(this);var t=this._context.stage;o.isSome(this._lodRenderer)&&(t.removeRenderPlugin(this._lodRenderer),this._lodRenderer.destroy()),o.isSome(this._materials)&&this._materials.forEach((function(e){return t.remove(3,e.id)})),o.isSome(this._textures)&&this._textures.forEach((function(e){return t.remove(4,e.id)})),o.isSome(this._geometries)&&this._geometries.forEach((function(e){return t.remove(2,e.id)})),o.isSome(this._removeResource)&&this._removeResource()},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if(!this._validateGeometry(t.geometry))return null;var r=S.placePointOnGeometry(t.geometry);if(o.isNone(r))return this.logger.warn("unsupported geometry type for icon symbol: "+t.geometry.type),null;var i=this.setGraphicElevationContext(t,new y.ElevationContext),s=e.renderingInfo;return this._createAs3DShape(t,r,s,i,t.uid)},t.prototype.notifyDestroyGraphicLayer=function(e){this._instanceIndexToGraphicUid.delete(e.instanceIndex)},t.prototype.graphicLayerToGraphicId=function(){return 0},t.prototype.layerOpacityChanged=function(){var e=this;if(o.isNone(this._materials))return!0;var t=this._drivenProperties.opacity,r=this.isByResource;return this._materials.forEach((function(i,s){var a=o.get(e.symbolLayer,"material","color"),n=e._originalMaterialParameters[s],l=e._getCombinedOpacity(a,{hasIntrinsicColor:r})*n.opacity;i.setParameterValues({opacity:l,transparent:l<1||t||n.transparent})})),!0},t.prototype.layerElevationInfoChanged=function(e,t){return this.updateGraphics3DGraphicElevationInfo(e,t,f.needsElevationUpdates3D)},t.prototype.slicePlaneEnabledChanged=function(){var e=this;return!(!o.isNone(this._lodRenderer)&&!o.isNone(this._materials))||(this._lodRenderer.slicePlane=this._context.slicePlaneEnabled,this._materials.forEach((function(t){t.setParameterValues({slicePlaneEnabled:e._context.slicePlaneEnabled})})),!0)},t.prototype.physicalBasedRenderingChanged=function(){var e=this;return!!o.isNone(this._materials)||(this._materials.forEach((function(t){e.isByResource?e._isEsriSymbolResource&&!e._isWosr&&t.setParameterValues({usePBR:e._context.physicalBasedRenderingEnabled,isSchematic:!1}):t.setParameterValues({usePBR:e._context.physicalBasedRenderingEnabled,isSchematic:!0})})),!0)},t.prototype.pixelRatioChanged=function(){return!0},t.prototype.applyRendererDiff=function(e,t){var r=this;if(o.isNone(this._materials)||o.isNone(this._lodRenderer))return!0;for(var i in e.diff)switch(i){case"visualVariables":if(!E.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._materials.forEach((function(e){return e.setParameterValues(r._fastUpdates.materialParameters)})),this._lodRenderer.notifyShaderTransformationChanged();break;default:return!1}return!0},t.prototype.computeComplexity=function(){return this._lodResources?{primitivesPerFeature:U.geometriesFromLodLevelResources(this._lodResources.levels[0]).reduce((function(e,t){return e+t.data.getIndices(B.VertexAttrConstants.POSITION).length}),0)/3,primitivesPerCoordinate:0,estimated:!1,memory:P.defaultSymbolLayerMemoryComplexity(this.symbol,this.symbolLayer)}:e.prototype.computeComplexity.call(this)},t.prototype._createAs3DShape=function(e,t,r,i,s){if(o.isNone(this._lodRenderer))return null;var a=this.getFastUpdateAttrValues(e),n=!this._fastUpdates.enabled&&this._hasPerInstanceColor()?b.mixinColorAndOpacity(r.color,r.opacity):null,l=this._context.clippingExtent;if(L.pointToVector(t,w,this._context.elevationProvider.spatialReference),o.isSome(l)&&!u.containsPoint(l,w))return null;var c=this._requiresTerrainElevation(i),h=this._computeGlobalTransform(t,i,G,c?V:null),d=this._computeLocalTransform(this.symbolLayer,r,T),p=this._lodRenderer.instanceData,y=p.addInstance();this._instanceIndexToGraphicUid.set(y,s),p.setLocalTransform(y,d,!1),p.setGlobalTransform(y,h),a&&p.setFeatureAttribute(y,a),n&&p.setColor(y,n);var v=m.perLodInstanceElevationAligner,g=new _(this,y,v,i);return c&&(g.alignedSampledElevation=V.sampledElevation),g.needsElevationUpdates=f.needsElevationUpdates3D(i.mode),S.extendPointGraphicElevationContext(g,t,this._context.elevationProvider),g},t.prototype._computeGlobalTransform=function(e,t,r,i){var s=f.evaluateElevationAlignmentAtPoint(e,this._context.elevationProvider,t,this._context.renderCoordsHelper,i);return w[0]=e.x,w[1]=e.y,w[2]=s,L.computeLinearTransformation(e.spatialReference,w,r,this._context.renderCoordsHelper.spatialReference),r},t.prototype._computeLocalTransform=function(e,t,r){return n.mat4.identity(r),this._applyObjectRotation(t,!1,r),this._applyObjectRotation(e,!0,r),this._applyObjectScale(t,r),this._applyAnchor(e,r),r},t.prototype._applyObjectScale=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var r=this._drivenProperties.size&&e.size?e.size:this._symbolSize,i=b.computeObjectScale(r,this._symbolSize,this._resourceSize,this._context.renderCoordsHelper.unitInMeters);1===i[0]&&1===i[1]&&1===i[2]||n.mat4.scale(t,t,i)}},t.prototype.prepareSymbolLayerPatch=function(e){if("partial"===e.diff.type){var t=e.diff.diff;this._preparePatchTransform(e,t),this._preparePatchColor(e,t)}},t.prototype.updateGeometry=function(e,t){if(o.isNone(this._lodRenderer))return!0;var r=t&&S.placePointOnGeometry(t);if(o.isNone(r))return!1;var i=this.getGeometryElevationMode(t);if(e.elevationContext.mode!==i)return!1;var s=this._requiresTerrainElevation(e.elevationContext);return this._computeGlobalTransform(r,e.elevationContext,G,s?V:null),s&&(e.alignedSampledElevation=V.sampledElevation),this._lodRenderer.instanceData.setGlobalTransform(e.instanceIndex,G,!0),S.extendPointGraphicElevationContext(e,r,this._context.elevationProvider),!0},t.prototype._preparePatchTransform=function(e,t){var r=this;if(t.heading||t.tilt||t.roll||t.width||t.height||t.depth||t.anchor||t.anchorPosition){var i=this._lodRenderer;if(!o.isNone(i)){var s=function(e,t,r){return o.unwrapOr(null!=e&&"complete"===e.type?e.newValue:t,r)},a=s(t.heading,this.symbolLayer.heading,0),n=s(t.tilt,this.symbolLayer.tilt,0),l=s(t.roll,this.symbolLayer.roll,0),c=s(t.width,this.symbolLayer.width,void 0),d=s(t.height,this.symbolLayer.height,void 0),u=s(t.depth,this.symbolLayer.depth,void 0),p=s(t.anchor,this.symbolLayer.anchor,void 0),m=s(t.anchorPosition,this.symbolLayer.anchorPosition,void 0);delete t.heading,delete t.tilt,delete t.roll,delete t.width,delete t.height,delete t.depth,delete t.anchor,delete t.anchorPosition;var f={heading:a,tilt:n,roll:l,anchor:p,anchorPosition:m};1===this.loadStatus&&e.symbolLayerStatePatches.push((function(){r._symbolSize=h.vec3f64.fromArray(b.computeSizeWithResourceSize(r._resourceSize,{width:c,height:d,depth:u,isPrimitive:r.symbolLayer.isPrimitive}))})),e.graphics3DGraphicPatches.push((function(e,t){var s=r._computeLocalTransform(f,t,T),o=e.instanceIndex;i.instanceData.setLocalTransform(o,s,!0)}))}}},t.prototype._preparePatchColor=function(e,t){var r=this;if(t.material&&"partial"===t.material.type){var s=t.material.diff;if(s.color&&"complete"===s.color.type&&null!=s.color.newValue&&null!=s.color.oldValue){var a=s.color.newValue,n=o.isSome(a)?i.toUnitRGBA(a):d.vec4f64.ONES;delete s.color;var l=this._materials,c=this._lodRenderer;o.isNone(l)||o.isNone(c)||e.graphics3DGraphicPatches.push((function(e){var t;r._hasPerInstanceColor()?(c.instanceData.setColor(e.instanceIndex,n),t=r.setMaterialTransparencyParams({},a)):t=r.setMaterialTransparencyParams({externalColor:n},a);for(var i=0,s=l;i<s.length;i++){s[i].setParameterValues(t)}}))}}},t.prototype._requiresTerrainElevation=function(e){return"absolute-height"!==e.mode},t.prototype._applyObjectRotation=function(e,t,r){if(!(this._fastUpdates.enabled&&this._fastUpdates.requiresShaderTransformation&&t))return b.computeObjectRotation(e.heading,e.tilt,e.roll,r)},t.prototype._computeAnchor=function(e){var t=h.vec3f64.create();switch(e.anchor){case"center":c.vec3.copy(t,u.center(this._resourceBoundingBox)),c.vec3.negate(t,t);break;case"top":var r=u.center(this._resourceBoundingBox);c.vec3.set(t,-r[0],-r[1],-this._resourceBoundingBox[5]);break;case"bottom":r=u.center(this._resourceBoundingBox);c.vec3.set(t,-r[0],-r[1],-this._resourceBoundingBox[2]);break;case"relative":r=u.center(this._resourceBoundingBox);var i=u.size(this._resourceBoundingBox),s=e.anchorPosition,o=s?h.vec3f64.fromValues(s.x,s.y,s.z):h.vec3f64.ZEROS;c.vec3.multiply(t,i,o),c.vec3.add(t,t,r),c.vec3.negate(t,t);break;case"origin":default:this._pivotOffset?c.vec3.negate(t,this._pivotOffset):c.vec3.copy(t,h.vec3f64.ZEROS)}return t},t.prototype._applyAnchor=function(e,t){if(!this._fastUpdates.enabled||!this._fastUpdates.requiresShaderTransformation){var r=this._computeAnchor(e);r&&n.mat4.translate(t,t,r)}},t.prototype._hasPerInstanceColor=function(){return this._drivenProperties.color||this._drivenProperties.opacity},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._resourceBoundingBox?h.vec3f64.fromArray(u.size(this._resourceBoundingBox)):h.vec3f64.ONES,t=this._resourceBoundingBox?this._computeAnchor(this.symbolLayer):h.vec3f64.ZEROS,r=this._context.renderCoordsHelper.unitInMeters,i=b.computeObjectScale(this._symbolSize,this._symbolSize,this._resourceSize,r),s=h.vec3f64.fromValues(this.symbolLayer.tilt||0,this.symbolLayer.roll||0,this.symbolLayer.heading||0);return{modelSize:e,symbolSize:this._symbolSize||h.vec3f64.ONES,unitInMeters:r,transformation:{anchor:t,scale:i,rotation:s}}},t}(v.default);t.Graphics3DObjectSymbolLayer=z;var w=h.vec3f64.create(),T=l.mat4f64.create(),G=l.mat4f64.create(),A=d.vec4f64.create(),V={verticalDistanceToGround:0,sampledElevation:0};t.default=z}));