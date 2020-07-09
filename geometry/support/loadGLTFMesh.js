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

define(["require","exports","tslib","../../core/maybe","../../core/libs/gl-matrix-2/mat3","../../core/libs/gl-matrix-2/mat3f64","../../core/libs/gl-matrix-2/vec3f64","../../core/libs/gl-matrix-2/vec4f64","./MeshMaterialMetallicRoughness","./MeshTexture","./meshUtils/georeference","../../views/3d/glTF/DefaultLoadingContext","../../views/3d/glTF/loader","../../views/3d/glTF/internal/indexUtils","../../views/3d/support/buffer/BufferView","../../views/3d/support/buffer/math","../../views/3d/support/buffer/utils","../../views/3d/webgl-engine/materials/DefaultMaterial"],(function(e,t,r,a,n,i,o,u,f,c,s,l,p,m,v,w,g,d){function h(e){switch(e){case"OPAQUE":return"opaque";case"MASK":return"mask";case"BLEND":return"blend"}}function V(e){switch(e){case 33071:return"clamp";case 33648:return"mirror";case 10497:return"repeat"}}function B(e){return 255*Math.pow(e,1/d.COLOR_GAMMA)}Object.defineProperty(t,"__esModule",{value:!0}),t.loadGLTFMesh=function(e,t,d){return r.__awaiter(this,void 0,void 0,(function(){var b,x,M,y,T,S;return r.__generator(this,(function(F){switch(F.label){case 0:return b=new l.DefaultLoadingContext,[4,p.load(b,t,d)];case 1:return x=F.sent(),M=x.model,y=M.lods.shift(),T=new Map,S=new Map,M.textures.forEach((function(e,t){return T.set(t,new c({data:(r=e).data,wrap:(a=r.parameters.wrap,{horizontal:V(a.s),vertical:V(a.t)})}));var r,a})),M.materials.forEach((function(e,t){return S.set(t,function(e,t){var r=(c=e.color,s=e.opacity,u.vec4f64.fromValues(B(c[0]),B(c[1]),B(c[2]),s)),n=e.emissiveFactor?function(e){return o.vec3f64.fromValues(B(e[0]),B(e[1]),B(e[2]))}(e.emissiveFactor):null,i={color:r,colorTexture:a.unwrap(a.applySome(e.textureColor,(function(e){return t.get(e)}))),normalTexture:a.unwrap(a.applySome(e.textureNormal,(function(e){return t.get(e)}))),emissiveColor:n,emissiveTexture:a.unwrap(a.applySome(e.textureEmissive,(function(e){return t.get(e)}))),occlusionTexture:a.unwrap(a.applySome(e.textureOcclusion,(function(e){return t.get(e)}))),alphaMode:h(e.alphaMode),alphaCutoff:e.alphaCutoff,doubleSided:e.doubleSided,metallic:e.metallicFactor,roughness:e.roughnessFactor,metallicRoughnessTexture:a.unwrap(a.applySome(e.textureMetallicRoughness,(function(e){return t.get(e)})))};var c,s;return new f(i)}(e,T))})),[2,y.parts.map((function(t){return function(e,t,o,u){var f=g.createBuffer(v.BufferViewVec3f64,o.attributes.position.count);w.vec3.transformMat4(f,o.attributes.position,o.transform);var c=a.applySome(o.attributes.normal,(function(e){var t=g.createBuffer(v.BufferViewVec3f,e.count),r=n.mat3.normalFromMat4(i.mat3f64.create(),o.transform);return w.vec3.transformMat3(t,e,r),t.typedBuffer})),l=a.applySome(o.attributes.tangent,(function(e){var t=g.createBuffer(v.BufferViewVec4f,e.count),r=n.mat3.normalFromMat4(i.mat3f64.create(),o.transform);return w.vec4.transformMat3(t,e,r),t.typedBuffer})),p=a.applySome(o.attributes.texCoord0,(function(e){var t=g.createBuffer(v.BufferViewVec2f,e.count);return g.vec2.normalizeIntegerBuffer(t,e),t.typedBuffer})),d=a.applySome(o.attributes.color,(function(e){var t=g.createBuffer(v.BufferViewVec4u8,e.count);if(4===e.elementCount)e instanceof v.BufferViewVec4f?w.vec4.scale(t,e,255):e instanceof v.BufferViewVec4u8?g.vec4.copy(t,e):e instanceof v.BufferViewVec4u16&&w.vec4.shiftRight(t,e,8);else{g.vec4.fill(t,255,255,255,255);var r=new v.BufferViewVec3u8(t.buffer,0,4);e instanceof v.BufferViewVec3f?w.vec3.scale(r,e,255):e instanceof v.BufferViewVec3u8?g.vec3.copy(r,e):e instanceof v.BufferViewVec3u16&&w.vec3.shiftRight(r,e,8)}return t.typedBuffer})),h=s.georeference({position:f.typedBuffer,normal:a.unwrap(c),tangent:a.unwrap(l)},e,r.__assign(r.__assign({},u),{unit:"meters"})),V=function(e,t){switch(t){case 4:return m.trianglesToTriangles(e);case 5:return m.triangleStripToTriangles(e);case 6:return m.triangleFanToTriangles(e)}}(o.indices||o.attributes.position.count,o.primitiveType);return{vertexAttributes:{position:h.position,normal:h.normal,tangent:h.tangent,uv:a.unwrap(p),color:a.unwrap(d)},components:[{faces:V,material:t.get(o.material),trustSourceNormals:!0}],spatialReference:e.spatialReference}}(e,S,t,d)}))]}}))}))}}));