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

define(["require","exports","tslib","../../../../Color","../../../../geometry","../../../../core/Error","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../renderers/support/renderingInfoUtils","./ElevationAligners","./elevationAlignmentUtils","./ElevationContext","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayer","./lineUtils","../support/FastSymbolUpdates","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/materials/lineStippleUtils","../../webgl-engine/materials/RibbonLineMaterial"],(function(e,t,i,a,r,n,s,o,l,p,h,y,d,u,c,g,m,f,_,b,v,x,P,M,U){Object.defineProperty(t,"__esModule",{value:!0});var S=function(e){function t(t,i,a,r){var n=e.call(this,t,i,a,r)||this;return n._uniformSize=1,n}return i.__extends(t,e),t.prototype.doLoad=function(){return i.__awaiter(this,void 0,void 0,(function(){var e;return i.__generator(this,(function(t){if(this._vvConvertOptions={modelSize:[1,1,1],symbolSize:[1,1,1],unitInMeters:1,transformation:{anchor:[0,0,0],scale:[1,1,1],rotation:[0,0,0]},supportedTypes:{size:!0,color:!0,opacity:!0,rotation:!1}},this._context.renderer&&this._context.renderer.visualVariables&&this._context.renderer.visualVariables.length>0?this._fastUpdates=b.initFastSymbolUpdatesState(this._context.renderer,this._vvConvertOptions):this._fastUpdates={enabled:!1},!this._drivenProperties.size){if((e=null!=this.symbolLayer.size?this.symbolLayer.size:o.px2pt(1))<0)throw new n("graphics3dlinesymbollayer:invalid-size","Symbol sizes may not be negative values");this._uniformSize=e}return[2]}))}))},t.prototype.getMaterialParameters=function(e){var t=s.get(this.symbolLayer,"material","color"),r=this._getCombinedOpacityAndColor(t),n=r[3],l={width:1,color:r,polygonOffset:!0,join:this.symbolLayer.join||"miter",cap:this.symbolLayer.cap||"butt",transparent:n<1||this.needsDrivenTransparentPass,slicePlaneEnabled:this._context.slicePlaneEnabled,isClosed:e,stipplePattern:this.symbolLayer.stipplePattern?M.createStipplePattern(this.symbolLayer.stipplePattern.map(o.pt2px)):null,stippleOffColor:this.symbolLayer.stippleOffColor?a.toUnitRGBA(this.symbolLayer.stippleOffColor):null,stippleIntegerRepeats:!0};if(this._drivenProperties.size)this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size&&(l.width=o.pt2px(1));else{var p=null!=this.symbolLayer.size?this.symbolLayer.size:o.px2pt(1);l.width=o.pt2px(p)}return this._fastUpdates&&this._fastUpdates.visualVariables?i.__assign(i.__assign({},l),this._fastUpdates.materialParameters):l},Object.defineProperty(t.prototype,"lineMaterial",{get:function(){return s.isNone(this._lineMaterial)&&(this._lineMaterial=new U(this.getMaterialParameters(!1),this._getIdHint("_ribbonlinemat")),this._context.stage.add(3,this._lineMaterial)),this._lineMaterial},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ringMaterial",{get:function(){return s.isNone(this._ringMaterial)&&(this._ringMaterial=new U(this.getMaterialParameters(!0),this._getIdHint("_ribbonlinemat")),this._context.stage.add(3,this._ringMaterial)),this._ringMaterial},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){e.prototype.destroy.call(this),s.isSome(this._lineMaterial)&&(this._context.stage.remove(3,this._lineMaterial.id),this._lineMaterial=null),s.isSome(this._ringMaterial)&&(this._context.stage.remove(3,this._ringMaterial.id),this._ringMaterial=null)},t.prototype.getDrivenSize=function(e){return this._drivenProperties.size&&e.size?o.pt2px(y.getDriverAxisSizeValueAny(e.size)):1},t.prototype.getSizeFeatureAttributeData=function(e){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size?f.getAttributeValue(this._fastUpdates.visualVariables.size.field,e):null},t.prototype.getDrivenColor=function(e){var t=p.vec4f64.fromValues(1,1,1,1);return this._drivenProperties.color&&e.color&&(t[0]=e.color[0],t[1]=e.color[1],t[2]=e.color[2],e.color.length>0&&(t[3]=e.color[3])),this._drivenProperties.opacity&&e.opacity&&(t[3]=e.opacity),t},t.prototype.getColorFeatureAttributeData=function(e){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.color?f.getAttributeValue(this._fastUpdates.visualVariables.color.field,e):null},t.prototype.getOpacityFeatureAttributeData=function(e){return this._fastUpdates.enabled&&this._fastUpdates.visualVariables.opacity?f.getAttributeValue(this._fastUpdates.visualVariables.opacity.field,e):null},t.prototype.createGraphics3DGraphic=function(e){var i=e.graphic,a=i.geometry;if(!this._validateGeometryType(i.geometry,t.validGeometryTypes,this.symbolLayer.type))return null;if(!this._validateGeometry(a))return null;var r="graphic"+i.uid,n=this.setGraphicElevationContext(i,new c.ElevationContext);return this.ensureDrapedStatus("on-the-ground"===n.mode),this.draped?this._createAsOverlay(e,this._context.layer.uid):this._createAs3DShape(e,n,r,i.uid)},t.prototype.applyRendererDiff=function(e,t){for(var i in e.diff)switch(i){case"visualVariables":if(!b.updateFastSymbolUpdatesState(this._fastUpdates,t,this._vvConvertOptions))return!1;s.isSome(this._lineMaterial)&&this._lineMaterial.setParameterValues(this._fastUpdates.materialParameters),s.isSome(this._ringMaterial)&&this._ringMaterial.setParameterValues(this._fastUpdates.materialParameters);break;default:return!1}return!0},t.prototype.layerOpacityChanged=function(){return s.isSome(this._lineMaterial)&&this.updateMaterialLayerOpacity(this._lineMaterial),s.isSome(this._ringMaterial)&&this.updateMaterialLayerOpacity(this._ringMaterial),!0},t.prototype.updateMaterialLayerOpacity=function(e){var t=e.getParameters().color,i=s.get(this.symbolLayer,"material","color"),a=this._getCombinedOpacity(i),r=a<1||this.needsDrivenTransparentPass,n=[t[0],t[1],t[2],a];e.setParameterValues({color:n,transparent:r})},t.prototype.layerElevationInfoChanged=function(e,i,a){var r=this._elevationContext.mode,n=u.elevationModeChangeUpdateType(t.elevationModeChangeTypes,a,r);if(n!==u.SymbolUpdateType.UPDATE)return n;var s=u.needsElevationUpdates2D(r);return this.updateGraphics3DGraphicElevationInfo(e,i,(function(){return s}))},t.prototype.slicePlaneEnabledChanged=function(){return s.isSome(this._lineMaterial)&&this._lineMaterial.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),s.isSome(this._ringMaterial)&&this._ringMaterial.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled}),!0},t.prototype.physicalBasedRenderingChanged=function(){return!0},t.prototype.pixelRatioChanged=function(){return!0},t.prototype._getGeometryAsPolygonOrPolyline=function(e){switch(e.type){case"extent":if(e instanceof r.Extent)return r.Polygon.fromExtent(e);break;case"polygon":case"polyline":return e}return null},t.prototype._createAs3DShape=function(e,t,i,a){var r=e.graphic,n=this._getGeometryAsPolygonOrPolyline(r.geometry),o="polygon"===n.type?n.rings:n.paths,p=[],y=[],c=[],g=h.create(),f=_.geometryToRenderInfo(n,this._context.elevationProvider,this._context.renderCoordsHelper,t),b="polygon"===n.type?"rings":"paths";this._logGeometryCreationWarnings(f,o,b,"LineSymbol3DLayer");for(var P=0;P<f.lines.length;P++){var M=f.lines[P],U=M.position,S=M.mapPosition;if(!s.isSome(this._context.clippingExtent)||(h.empty(g),h.expandWithBuffer(g,S),h.intersectsClippingArea(g,this._context.clippingExtent))){var D=this._createGeometryData(e,U,S,n.type),C=new v(D,i+"path"+P);p.push(C),y.push("polygon"===n.type?this.ringMaterial:this.lineMaterial),c.push(l.mat4f64.IDENTITY)}}if(0===p.length)return null;var E=new x({geometries:p,materials:y,transformations:c,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:a},idHint:i}),G=d.perVertexElevationAligner,z=new m(this,E,p,null,null,G,t);return z.alignedSampledElevation=f.sampledElevation,z.needsElevationUpdates=u.needsElevationUpdates2D(t.mode),z},t.prototype._createGeometryData=function(e,t,i,a){var r="polygon"===a?1:0,n=this._fastUpdates.enabled&&this._fastUpdates.visualVariables.color,s=this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size;return _.createGeometryData({removeDuplicateStartEnd:r,uniformSize:this._uniformSize,attributeData:{position:t,mapPosition:i,size:s?null:this.getDrivenSize(e.renderingInfo),color:n?null:this.getDrivenColor(e.renderingInfo),sizeFeature:this.getSizeFeatureAttributeData(e.graphic),colorFeature:this.getColorFeatureAttributeData(e.graphic),opacityFeature:this.getOpacityFeatureAttributeData(e.graphic)}})},t.prototype._createAsOverlay=function(e,t){var i=e.graphic,a=this._getGeometryAsPolygonOrPolyline(i.geometry),r="polygon"===a.type?a.rings:a.paths,n="polygon"===a.type?this.ringMaterial:this.lineMaterial;n.renderPriority=this._renderPriority;var s=[],o=h.create(),l=h.empty(),p=_.geometryToRenderInfoDraped(a,this._context.overlaySR),y="polygon"===a.type?"rings":"paths";if(this._logGeometryCreationWarnings(p,r,y,"LineSymbol3DLayer"),r.length>0){for(var d=p.lines,u=0;u<d.length;++u){var c=d[u];if(h.empty(o),h.expandWithBuffer(o,c.position),h.intersectsClippingArea(o,this._context.clippingExtent)){h.expand(l,o);var m=this._createGeometryData(e,c.position,null,a.type),f=new P(m);f.data.layerUid=t,f.data.graphicUid=i.uid,f.material=n,f.center=[.5*(o[0]+o[3]),.5*(o[1]+o[4]),0],f.bsRadius=.5*Math.sqrt((o[3]-o[0])*(o[3]-o[0])+(o[4]-o[1])*(o[4]-o[1])),s.push(f)}}return new g(this,s,l)}return null},t.validGeometryTypes=["polyline","polygon","extent"],t.elevationModeChangeTypes={definedChanged:u.SymbolUpdateType.RECREATE,staysOnTheGround:u.SymbolUpdateType.NONE,onTheGroundChanged:u.SymbolUpdateType.RECREATE},t}(f.Graphics3DSymbolLayer);t.Graphics3DLineSymbolLayer=S,t.default=S}));