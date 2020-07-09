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

define(["require","exports","tslib","../../../../Color","../../../../core/maybe","../../../../core/unitUtils","../../../../core/libs/earcut/earcut","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/math/common","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/aaBoundingRect","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayer","./polygonUtils","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/materials/WaterMaterial","../../webgl-engine/materials/internal/waterMaterialUtils"],(function(e,t,r,a,i,n,o,s,l,u,c,d,p,h,m,y,g,v,f,_,b,x,D,E,C,S){Object.defineProperty(t,"__esModule",{value:!0});var w=function(e){function t(t,r,a,i){return e.call(this,t,r,a,i)||this}return r.__extends(t,e),t.prototype.doLoad=function(){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(e){return[2]}))}))},t.prototype.destroy=function(){e.prototype.destroy.call(this),i.isSome(this._material)&&(this._context.stage.remove(3,this._material.id),this._material=null)},t.prototype.createGraphics3DGraphic=function(e){var r=e.graphic;if(!this._validateGeometryType(r.geometry,t.validGeometryTypes,this.symbolLayer.type))return null;if(!this._validateGeometry(r.geometry))return null;var a="graphic"+r.uid,i=this.setGraphicElevationContext(r,new g.ElevationContext);return this.ensureDrapedStatus("on-the-ground"===i.mode),this.ensureMaterial(),this.draped?this._createAsOverlay(r,a):this._createAs3DShape(r,i,a,r.uid)},t.prototype.ensureMaterial=function(){if(!i.isSome(this._material)){var e=r.__assign({},S.defaultWaterMaterialParameters),n=this.symbolLayer.color;i.isSome(n)&&(e.color=a.toUnitRGBA(n));var o=this._getCombinedOpacity(n,{hasIntrinsicColor:!0});e.color=[e.color[0],e.color[1],e.color[2],o],e.transparent=o<1||this.needsDrivenTransparentPass,e.waveDirection=i.isSome(this.symbolLayer.waveDirection)?t.headingVectorFromAngle(this.symbolLayer.waveDirection):u.vec2f64.fromValues(0,0);var s=this.symbolLayer.waveStrength+"-"+this.symbolLayer.waterbodySize,l=S.wavePresets[s];e.waveStrength=l.waveStrength,e.waveTextureRepeat=l.textureRepeat,e.waveVelocity=l.waveVelocity,e.flowStrength=l.perturbationStrength,e.slicePlaneEnabled=this._context.slicePlaneEnabled,e.isDraped=this.draped,this._material=new C.WaterMaterial(e,"water"),this._context.stage.add(3,this._material)}},t.prototype.layerOpacityChanged=function(){if(i.isNone(this._material))return!0;var e=this._material.getParameters().color,t=this._getCombinedOpacity(this.symbolLayer.color,{hasIntrinsicColor:!0}),r=t<1||this.needsDrivenTransparentPass;return this._material.setParameterValues({color:[e[0],e[1],e[2],t],transparent:r}),!0},t.prototype.layerElevationInfoChanged=function(e,r,a){var i=this._elevationContext.mode,n=y.elevationModeChangeUpdateType(t.elevationModeChangeTypes,a,i);if(n!==y.SymbolUpdateType.UPDATE)return n;var o=y.needsElevationUpdates2D(i);return this.updateGraphics3DGraphicElevationInfo(e,r,(function(){return o}))},t.prototype.slicePlaneEnabledChanged=function(){return i.isSome(this._material)&&this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),!0},t.prototype.physicalBasedRenderingChanged=function(){return!0},t.prototype.pixelRatioChanged=function(){return!0},t.prototype._createAs3DShape=function(e,t,r,a){var n=b.geometryAsPolygon(e.geometry);if(i.isNone(n))return null;A.renderData=b.geometryToRenderInfo(n,this._context.elevationProvider,this._context.renderCoordsHelper,t);var o=A.renderData.position.length/3;if(A.uvCoords=new Float64Array(2*o),A.idHint=r,A.outNum=0,A.outGeometries=[],A.outTransforms=[],A.outMaterials=[],this._create3DShapeGeometries(A),this._logGeometryCreationWarnings(A.renderData,n.rings,"rings","WaterSymbol3DLayer"),0===A.outNum)return null;this._createUVCoordsFromVertices(A.uvCoords,A.renderData.mapPosition,o,this._context.elevationProvider.spatialReference);var s=new D({geometries:A.outGeometries,materials:A.outMaterials,transformations:A.outTransforms,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:a},idHint:r}),l=m.perVertexElevationAligner,u=new f(this,s,A.outGeometries,null,null,l,t);return u.alignedSampledElevation=A.renderData.sampledElevation,u.needsElevationUpdates=y.needsElevationUpdates2D(t.mode),u},t.prototype._createUVCoordsFromVertices=function(e,r,a,i){var o=n.getMetersPerUnitForSR(i);h.empty(G);for(var s=0;s<a;s++)l.vec2.set(P,r[3*s+0],r[3*s+1]),h.expandPointInPlace(G,P);c.vec4.scale(G,G,o);var u=G[0]%t.unitSizeOfTexture,d=G[1]%t.unitSizeOfTexture;T[0]=G[0]-u,T[1]=G[1]-d;for(s=0;s<a;s++)e[2*s+0]=(r[3*s+0]*o-T[0])/t.unitSizeOfTexture,e[2*s+1]=(r[3*s+1]*o-T[1])/t.unitSizeOfTexture},t.prototype._create3DShapeGeometries=function(e){for(var t=e.renderData.polygons,r=e.uvCoords,a=0,n=t;a<n.length;a++){var l=n[a],u=l.count,c=l.index,d=l.position,h=l.mapPosition,m=l.holeIndices;if(!i.isSome(this._context.clippingExtent)||(p.empty(U),p.expandWithBuffer(U,h),p.intersectsClippingArea(U,this._context.clippingExtent))){var y=o.earcut(h,m,3);if(0!==y.length){var g=new Uint32Array(y),v=new Float64Array(r.buffer,2*c*r.BYTES_PER_ELEMENT,2*u),f=b.createWaterGeometryData({indices:g,attributeData:{position:d,uv0:v,mapPosition:h}}),_=new x(f,e.idHint);e.outGeometries.push(_),e.outMaterials.push(i.unwrap(this._material)),e.outTransforms.push(s.mat4f64.IDENTITY),e.outNum++}}}},t.prototype._createAsOverlay=function(e,t){var r=b.geometryAsPolygon(e.geometry);if(i.isNone(r))return null;i.unwrap(this._material).renderPriority=this._renderPriority,M.renderData=b.geometryToRenderInfoDraped(r,this._context.overlaySR),M.idHint=t;var a=M.renderData.position.length/3;return M.uvCoords=new Float64Array(2*a),M.outNum=0,M.outGeometries=[],M.outBoundingBox=p.empty(),M.layerUid=this._context.layer.uid,M.graphicsUid=e.uid,this._createAsOverlayWater(M),this._logGeometryCreationWarnings(M.renderData,r.rings,"rings","WaterSymbol3DLayer"),0===M.outNum?null:(this._createUVCoordsFromVertices(M.uvCoords,M.renderData.position,a,r.spatialReference),M.outNum>0?new v(this,M.outGeometries,M.outBoundingBox):null)},t.prototype._createAsOverlayWater=function(e){for(var t=e.uvCoords,r=0,a=e.renderData.polygons;r<a.length;r++){var n=a[r],s=n.position,l=n.holeIndices,u=n.index,c=n.count;if(p.empty(U),p.expandWithBuffer(U,s),p.intersectsClippingArea(U,this._context.clippingExtent)){p.expand(e.outBoundingBox,U);var d=o.earcut(s,l,3);if(0!==d.length){var h=new Uint32Array(d),m=new Float64Array(t.buffer,2*u*t.BYTES_PER_ELEMENT,2*c),y=b.createWaterGeometryData({indices:h,attributeData:{position:s,uv0:m}}),g=new E(y);g.data.layerUid=e.layerUid,g.data.graphicUid=e.graphicsUid,g.material=i.unwrap(this._material);var v=U;g.center=[.5*(v[0]+v[3]),.5*(v[1]+v[4]),0],g.bsRadius=.5*Math.sqrt((v[3]-v[0])*(v[3]-v[0])+(v[4]-v[1])*(v[4]-v[1])),e.outGeometries.push(g),e.outNum++}}}},t.headingVectorFromAngle=function(e){var t=u.vec2f64.create(),r=d.toRadian(e);return t[0]=Math.sin(r),t[1]=Math.cos(r),t},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{create3DShape:function(t){return e._createAs3DShape(t.graphic,t.elevationContext,t.idHint,t.graphicUid)},ensureMaterial:function(){return e.ensureMaterial()}}},enumerable:!0,configurable:!0}),t.validGeometryTypes=["polyline","polygon","extent"],t.unitSizeOfTexture=100,t.elevationModeChangeTypes={definedChanged:y.SymbolUpdateType.RECREATE,staysOnTheGround:y.SymbolUpdateType.NONE,onTheGroundChanged:y.SymbolUpdateType.RECREATE},t}(_.default);t.Graphics3DWaterSymbolLayer=w;var T=u.vec2f64.create(),G=h.create(),P=u.vec2f64.create(),U=p.create(),A={idHint:null,renderData:null,uvCoords:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null},M={idHint:null,renderData:null,uvCoords:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null};t.default=w}));