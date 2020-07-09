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

define(["require","exports","../../../../core/Evented","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../editingTools/settings","./DrapedVisualElementResources","./VisualElementResources","../../layers/graphics/ElevationContext","../../layers/graphics/pointUtils","../../support/projectionUtils","../../webgl-engine/lib/Camera","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/materials/ColorMaterial","../../webgl-engine/materials/ShadedColorMaterial"],(function(e,t,r,o,i,s,n,a,c,u,l,p,d,h,f,m,v,y,g,b,x,w,R){Object.defineProperty(t,"__esModule",{value:!0});var M=function(){function e(e){var t=this;this.view=null,this.camera=new g.default,this.events=new r,this._isDraped=!1,this._vertices=null,this._spatialReference=null,this._color=d.settings.colorToVec4(d.settings.reshapeManipulators.vertex.color),this._elevationInfo=null,this._occludedMode=8,this.resources=new f.VisualElementResources({view:e.view,createResources:function(e){return t.createResources(e)},recreateGeometry:function(e,r){return e.geometries.length=0,t.recreateGeometry(r,e.vertexMaterial,e.vertexOutlineMaterial,e.geometries),e.geometries}}),this.drapedResources=new h.DrapedVisualElementResources({view:e.view,createResources:function(){return t.createDrapedResources()},recreateGeometry:function(e){}});var o=!0;for(var i in e)i in this?"attached"===i?o=e[i]:this[i]=e[i]:console.error("Cannot set unknown property",i);this.attached=o}return e.prototype.onViewChange=function(){this.camera.copyFrom(this.view.state.camera)},e.prototype.destroy=function(){this.resources.destroy(),this.drapedResources.destroy()},Object.defineProperty(e.prototype,"isDraped",{get:function(){return this._isDraped},set:function(e){e!==this._isDraped&&(this._isDraped=e,this.updateAttached(this.attached))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hidden",{get:function(){return this.resources.hidden},set:function(e){this.resources.hidden=e,this.drapedResources.hidden=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"attached",{get:function(){return this.resources.attached||this.drapedResources.attached},set:function(e){this.updateAttached(e)},enumerable:!0,configurable:!0}),e.prototype.updateAttached=function(e){this.resources.attached=!this.isDraped&&e,this.drapedResources.attached=this.isDraped&&e},Object.defineProperty(e.prototype,"vertices",{get:function(){return this._vertices},set:function(e){this._vertices=e,this.resources.recreateGeometry(),this.drapedResources.recreateGeometry()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"spatialReference",{get:function(){return this._spatialReference},set:function(e){this._spatialReference=e,this.resources.recreateGeometry(),this.drapedResources.recreateGeometry()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"color",{get:function(){return this._color},set:function(e){u.vec4.exactEquals(e,this._color)||(u.vec4.copy(this._color,e),this.updateMaterial())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elevationInfo",{get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this.resources.recreateGeometry()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"occludedMode",{get:function(){return this._occludedMode},set:function(e){e!==this._occludedMode&&(this._occludedMode=e,o.isSome(this.resources.resources)&&(this.resources.resources.vertexMaterial.renderOccluded=e,this.resources.resources.vertexOutlineMaterial.renderOccluded=e),o.isSome(this.drapedResources.resources))},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"vertexMaterialParameters",{get:function(){return{color:this._color,transparent:this._color[3]<1}},enumerable:!0,configurable:!0}),e.prototype.updateMaterial=function(){o.isSome(this.resources.resources)&&this.resources.resources.vertexMaterial.setParameterValues(this.vertexMaterialParameters)},e.prototype.recreateGeometry=function(e,t,r,o){for(var i=0,s=this.createRenderGeometries();i<s.length;i++){var n=s[i];e.addGeometry(n.vertexGeometry,t,n.xform),o.push(n.vertexGeometry),e.addGeometry(n.vertexOutlineGeometry,r,n.xform),o.push(n.vertexOutlineGeometry)}},e.prototype.createResources=function(e){var t=this.color,r=l.vec4f64.fromValues(t[0],t[1],t[2],t.length>3?t[3]:1),o=t[3]<1,i=new R.ShadedColorMaterial({color:r,transparent:o,writeDepth:!0,cullFace:2},"manipulator");i.renderOccluded=d.settings.reshapeManipulators.vertex.renderOccludedFlag;var s=d.settings.colorToVec4(d.settings.reshapeManipulators.vertex.outlineColor),n=l.vec4f64.fromValues(s[0],s[1],s[2],4===s.length?s[3]:1),a=new w({color:n,transparent:!0,writeDepth:!0,cullFace:1},"manipulator-outline");a.renderOccluded=d.settings.reshapeManipulators.vertex.renderOccludedFlag;var c=[];return this.recreateGeometry(e,i,a,c),{vertexMaterial:i,vertexOutlineMaterial:a,geometries:c,forEach:function(e){e(i),e(a),c.forEach(e)}}},e.prototype.createDrapedResources=function(){return{geometries:null}},e.prototype.calculateMapBounds=function(e){if(o.isNone(this.resources.resources))return!1;for(var t=this.view.renderCoordsHelper,r=0,i=this.resources.resources.geometries;r<i.length;r++){var s=i[r].data.getAttribute("position"),n=s.data,a=new Float64Array(n.length);y.bufferToBuffer(s.data,t.spatialReference,0,a,this.view.spatialReference,0,n.length/3),p.expandWithBuffer(e,a)}return!0},e.prototype.computeScreenLocation=function(e,t){return t.pixelSize=this.camera.computeScreenPixelSizeAt(e),this.camera.projectPoint(e,t.renderScreenPointArray),this.camera.renderToScreen(t.renderScreenPointArray,t.screenPointArray),t},e.prototype.computeTransform=function(e,t){var r=n.mat4f64.create(),o=t*this.computeScreenLocation(e,_).pixelSize;return s.mat4.set(r,o,0,0,0,0,o,0,0,0,0,o,0,0,0,0,1),r[12]+=e[0],r[13]+=e[1],r[14]+=e[2],r[15]=1,r},e.prototype.createRenderGeometries=function(){var e=this.vertices;if(o.isNone(e)||0===e.length)return[];if(!this.view.state||!this.view.state.camera)return[];this.camera.copyFrom(this.view.state.camera);for(var t=d.settings.reshapeManipulators.vertex,r=t.size/2,i=r+t.collisionPadding,s=r/i,n=(r+t.outlineSize)/i,c=v.geometryToRenderInfo(e,this.spatialReference,this.view.elevationProvider,this.view.renderCoordsHelper,m.ElevationContext.fromElevationInfo(this.elevationInfo)),u=[],l=c.numVertices,p=c.position,h=0;h<l;++h){var f=new b(x.createSphereGeometry(s,16,16),"VerticesVisualElement-vertex"),y=new b(x.createSphereGeometry(n,16,16),"VerticesVisualElement-vertexOutline"),g=a.vec3.set(G,p[3*h+0],p[3*h+1],p[3*h+2]),w=this.computeTransform(g,i);u.push({vertexGeometry:f,vertexOutlineGeometry:y,xform:w})}return u},e}();t.VerticesVisualElement=M;var _={screenPointArray:i.createScreenPointArray(),renderScreenPointArray:i.createRenderScreenPointArray3(),pixelSize:0},G=c.vec3f64.create()}));