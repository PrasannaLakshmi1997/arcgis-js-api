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

define(["require","exports","tslib","../../../../Color","../../../../Color","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/earcut/earcut","../../../../core/libs/gl-matrix-2/mat4f64","../../../../geometry/support/aaBoundingBox","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayer","./graphicUtils","./lineUtils","./polygonUtils","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/lib/Util","../../webgl-engine/materials/ColorMaterial","../../webgl-engine/materials/lineStippleUtils","../../webgl-engine/materials/NativeLineMaterial","../../webgl-engine/materials/RibbonLineMaterial"],(function(e,t,i,r,a,n,o,l,s,u,p,h,c,d,m,y,g,_,f,v,b,x,O,D,C,E,P){Object.defineProperty(t,"__esModule",{value:!0});var S=function(e){function t(t,i,r,a){var n=e.call(this,t,i,r,a)||this;return n._hasOutline=!1,n}return i.__extends(t,e),t.prototype.doLoad=function(){return i.__awaiter(this,void 0,void 0,(function(){return i.__generator(this,(function(e){return[2]}))}))},t.prototype.ensureMaterials=function(){this.ensureFillMaterial(),this.ensureOutlineMaterial()},t.prototype.ensureFillMaterial=function(){if(!n.isSome(this._material)){var e=n.get(this.symbolLayer,"material","color"),t=this._getCombinedOpacityAndColor(e);this._material=new D({color:t,transparent:t[3]<1||this.needsDrivenTransparentPass,polygonOffset:!1,vertexColors:!0,slicePlaneEnabled:this._context.slicePlaneEnabled},this._getIdHint("_colormat")),this._context.stage.add(3,this._material)}},t.prototype.ensureOutlineMaterial=function(){var e=this,t=this.symbolLayer.outline;if(!n.isSome(this._outlineMaterial)&&this._isValidOutline(t)){this._hasOutline=!0;var i,r,l;this._outlineMaterial=(i=o.pt2px(t.size),r=t.stipplePattern?C.createStipplePattern(t.stipplePattern.map(o.pt2px)):null,l=t.stippleOffColor?a.toUnitRGBA(t.stippleOffColor):null,i>1.5?new P({width:i,color:e._getOutlineColor(),polygonOffset:!0,slicePlaneEnabled:e._context.slicePlaneEnabled,isClosed:!0,stipplePattern:r,stippleIntegerRepeats:!0,stippleOffColor:l},e._getIdHint("_outline_ribbonlinemat")):new E({color:e._getOutlineColor(),slicePlaneEnabled:e._context.slicePlaneEnabled,width:i,stipplePattern:r,stippleIntegerRepeats:!0,stippleOffColor:l},e._getIdHint("_outline_nativelinemat"))),this._context.stage.add(3,this._outlineMaterial)}},t.prototype._isValidOutline=function(e){return n.isSome(e)&&e.size&&e.size>0&&n.isSome(e.color)},t.prototype.destroy=function(){e.prototype.destroy.call(this),n.isSome(this._material)&&(this._context.stage.remove(3,this._material.id),this._material=null),n.isSome(this._outlineMaterial)&&(this._context.stage.remove(3,this._outlineMaterial.id),this._outlineMaterial=null)},t.prototype.createGraphics3DGraphic=function(e){var i=e.graphic;if(!this._validateGeometryType(i.geometry,t.validGeometryTypes,this.symbolLayer.type))return null;if(!this._validateGeometry(i.geometry))return null;var r="graphic"+i.uid,a=this._getVertexOpacityAndColor(e.renderingInfo,Uint8Array,255),n=this.setGraphicElevationContext(i,new c.ElevationContext);return this.ensureDrapedStatus("on-the-ground"===n.mode),this.ensureMaterials(),this.draped?this._createAsOverlay(i,a,r):this._createAs3DShape(i,a,n,r)},t.prototype.layerOpacityChanged=function(){if(n.isSome(this._material)){var e=this._material.getParameters().color,t=n.get(this.symbolLayer,"material","color"),i=this._getCombinedOpacity(t);this._material.setParameterValues({color:[e[0],e[1],e[2],i],transparent:i<1||this.needsDrivenTransparentPass})}if(n.isSome(this._outlineMaterial)){var r=this._outlineMaterial.getParameters().color;this._outlineMaterial.setParameterValues({color:[r[0],r[1],r[2],this._getOutlineOpacity()]})}return!0},t.prototype.layerElevationInfoChanged=function(e,i,r){var a=this._elevationContext.mode,n=h.elevationModeChangeUpdateType(t.elevationModeChangeTypes,r,a);if(n!==h.SymbolUpdateType.UPDATE)return n;var o=h.needsElevationUpdates2D(a);return this.updateGraphics3DGraphicElevationInfo(e,i,(function(){return o}))},t.prototype.slicePlaneEnabledChanged=function(){if(n.isSome(this._material)&&this._material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),n.isSome(this._outlineMaterial)){var e={slicePlaneEnabled:this._context.slicePlaneEnabled};this._outlineMaterial.setParameterValues(e)}return!0},t.prototype.physicalBasedRenderingChanged=function(){return!0},t.prototype.pixelRatioChanged=function(){return!0},t.prototype._createAs3DShape=function(e,t,i,r){var a=f.geometryAsPolygon(e.geometry);if(n.isNone(a))return null;if(G.renderData=f.geometryToRenderInfo(a,this._context.elevationProvider,this._context.renderCoordsHelper,i),G.idHint=r,G.color=t,G.outNum=0,G.outGeometries=[],G.outTransforms=[],G.outMaterials=[],this._createAs3DShapeFill(G),this._hasOutline&&this._createAs3DShapeOutline(G),this._logGeometryCreationWarnings(G.renderData,a.rings,"rings","FillSymbol3DLayer"),0===G.outNum)return null;var o=new b({geometries:G.outGeometries,materials:G.outMaterials,transformations:G.outTransforms,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:e.uid},idHint:r}),l=p.perVertexElevationAligner,s=new m(this,o,G.outGeometries,null,null,l,i);return s.alignedSampledElevation=G.renderData.sampledElevation,s.needsElevationUpdates=h.needsElevationUpdates2D(i.mode),s},t.prototype._createAs3DShapeFill=function(e){for(var t=e.renderData.polygons,i=0;i<t.length;++i){var r=t[i],a=r.position,o=r.mapPosition,p=r.holeIndices;if(!n.isSome(this._context.clippingExtent)||(u.empty(A),u.expandWithBuffer(A,o),u.intersectsClippingArea(A,this._context.clippingExtent))){var h=l.earcut(o,p,3);if(0!==h.length){var c=new Uint32Array(h),d=f.createColorGeometryData({indices:c,attributeData:{position:a,color:e.color,mapPosition:o}}),m=new v(d,e.idHint);e.outGeometries.push(m),e.outMaterials.push(n.unwrap(this._material)),e.outTransforms.push(s.mat4f64.IDENTITY),e.outNum++}}}},t.prototype._createAs3DShapeOutline=function(e){if(this._hasOutline)for(var t=e.renderData.outlines,i=this._outlineMaterial instanceof E,r=0;r<t.length;++r){var a=t[r],o=a.mapPosition,l=a.position;if(!n.isSome(this._context.clippingExtent)||(u.empty(A),u.expandWithBuffer(A,o),u.intersectsClippingArea(A,this._context.clippingExtent))){var p=_.createGeometryData({removeDuplicateStartEnd:i?0:1,attributeData:{position:l,mapPosition:o}}),h=p.vertexAttributes[O.VertexAttrConstants.POSITION];h.data===l&&(h.data=new Float64Array(l));var c=new v(p,e.idHint+"outline"+r);e.outGeometries.push(c),e.outMaterials.push(n.unwrap(this._outlineMaterial)),e.outTransforms.push(s.mat4f64.IDENTITY),e.outNum++}}},t.prototype._createAsOverlay=function(e,t,i){var r=f.geometryAsPolygon(e.geometry);return n.isNone(r)?null:(n.unwrap(this._material).renderPriority=this._renderPriority+this._renderPriorityStep/2,n.isSome(this._outlineMaterial)&&(this._outlineMaterial.renderPriority=this._renderPriority),M.renderData=f.geometryToRenderInfoDraped(r,this._context.overlaySR),M.idHint=i,M.color=t,M.outNum=0,M.outGeometries=[],M.outBoundingBox=u.empty(),M.layerUid=this._context.layer.uid,M.graphicsUid=e.uid,this._createAsOverlayFill(M),this._hasOutline&&this._createAsOverlayOutline(M),this._logGeometryCreationWarnings(M.renderData,r.rings,"rings","FillSymbol3DLayer"),M.outNum>0?new d(this,M.outGeometries,M.outBoundingBox):null)},t.prototype._createAsOverlayFill=function(e){for(var t=e.renderData.polygons,i=0;i<t.length;++i){var r=t[i],a=r.position,o=r.holeIndices;if(u.empty(A),u.expandWithBuffer(A,a),u.intersectsClippingArea(A,this._context.clippingExtent)){var s=l.earcut(a,o,3);if(0!==s.length){u.expand(e.outBoundingBox,A);var p=new Uint32Array(s),h=f.createColorGeometryData({indices:p,attributeData:{position:a,color:e.color}}),c=new x(h);c.data.layerUid=e.layerUid,c.data.graphicUid=e.graphicsUid,c.material=n.unwrap(this._material);var d=A;c.center=[.5*(d[0]+d[3]),.5*(d[1]+d[4]),0],c.bsRadius=.5*Math.sqrt((d[3]-d[0])*(d[3]-d[0])+(d[4]-d[1])*(d[4]-d[1])),e.outGeometries.push(c),e.outNum++}}}},t.prototype._createAsOverlayOutline=function(e){if(this._hasOutline)for(var t=e.renderData.outlines,i=0;i<t.length;++i){var r=t[i].position;if(u.empty(A),u.expandWithBuffer(A,r),u.intersectsClippingArea(A,this._context.clippingExtent)){u.expand(e.outBoundingBox,A);var a=this._outlineMaterial instanceof E,o=_.createGeometryData({removeDuplicateStartEnd:a?0:1,attributeData:{position:r}}),l=new x(o);l.data.layerUid=e.layerUid,l.data.graphicUid=e.graphicsUid,l.material=n.unwrap(this._outlineMaterial);var s=A;l.center=[.5*(s[0]+s[3]),.5*(s[1]+s[4]),0],l.bsRadius=.5*Math.sqrt((s[3]-s[0])*(s[3]-s[0])+(s[4]-s[1])*(s[4]-s[1])),e.outGeometries.push(l),e.outNum++}}},t.prototype._getOutlineOpacity=function(){var e=n.get(this.symbolLayer,"outline","color");return(this.draped?1:this._getLayerOpacity())*(n.isSome(e)?e.a:0)},t.prototype._getOutlineColor=function(){var e=n.get(this.symbolLayer,"outline","color"),t=this._getOutlineOpacity();return g.mixinColorAndOpacity(n.isSome(e)?r.toUnitRGB(e):null,t)},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{createAsOverlay:function(t,i,r){return e._createAsOverlay(t,i,r)},createAs3DShape:function(t,i,r,a){return e._createAs3DShape(t,i,r,a)}}},enumerable:!0,configurable:!0}),t.validGeometryTypes=["polyline","polygon","extent"],t.elevationModeChangeTypes={definedChanged:h.SymbolUpdateType.RECREATE,staysOnTheGround:h.SymbolUpdateType.NONE,onTheGroundChanged:h.SymbolUpdateType.RECREATE},t}(y.default);t.Graphics3DPolygonFillSymbolLayer=S;var A=u.create(),G={idHint:null,renderData:null,color:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null},M={idHint:null,renderData:null,color:null,outNum:0,outBoundingBox:null,outGeometries:null,outMaterials:null,outTransforms:null};t.default=S}));