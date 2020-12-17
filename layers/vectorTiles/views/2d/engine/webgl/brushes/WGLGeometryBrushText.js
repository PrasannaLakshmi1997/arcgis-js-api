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
// See http://js.arcgis.com/3.34/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../enums","../Utils","./WGLGeometryBrush","../../../../webgl/VertexArrayObject"],(function(e,t,i,o,r,a,s){Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._attributeLocations={a_pos:0,a_id:1,a_color:2,a_vertexOffset:3,a_texFontSize:4,a_visible:5},t._attributeLocationsVV={a_pos:0,a_id:1,a_color:2,a_vertexOffset:3,a_texFontSize:4,a_vv:5,a_visible:6},t._vertexAttributeLayout={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:20,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:4,stride:20,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:20,normalized:!0,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:12,stride:20,normalized:!1,divisor:0},{name:"a_texFontSize",count:4,type:5120,offset:16,stride:20,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]},t._vertexAttributeLayoutVV={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:36,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:4,stride:36,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:36,normalized:!0,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:12,stride:36,normalized:!1,divisor:0},{name:"a_texFontSize",count:4,type:5120,offset:16,stride:36,normalized:!1,divisor:0},{name:"a_vv",count:4,type:5126,offset:20,stride:36,normalized:!1,divisor:0}],visibility:[{name:"a_visible",count:1,type:5121,offset:0,stride:1,normalized:!0,divisor:0}]},t._glyphsTextureSize=new Float32Array(2),t}return i(t,e),t.prototype.dispose=function(){},t.prototype.getGeometryType=function(){return o.WGLGeometryType.TEXT},t.prototype.drawGeometry=function(e,t,i,o){var r=e.context,a=e.painter,s=e.rendererInfo,n=e.drawPhase,v=i.materialInfo,u=i.indexCount,l=i.indexFrom,f=v.materialKeyInfo,d=f.vvSizeMinMaxValue||f.vvSizeScaleStops||f.vvSizeFieldStops||f.vvSizeUnitValue||f.vvColor||f.vvRotation||f.vvOpacity,m=d?this._attributeLocationsVV:this._attributeLocations,p=a.materialManager.getProgram(v.materialKey,n,m);if(p){r.bindProgram(p);var _=this._getVAO(r,t,d,this.getGeometryType());r.bindVAO(_);var y=v.texBindingInfo[0],c=y.pageId;a.textureManager.bindGlyphsPage(r,c,y.unit),p.setUniform1i(y.semantic,y.unit);var S=a.textureManager.glyphs;this._glyphsTextureSize[0]=S.width/4,this._glyphsTextureSize[1]=S.height/4;var x=s.vvMaterialParameters.vvRotationEnabled&&"geographic"===s.vvMaterialParameters.vvRotationType?a.extrudeMatrix:a.extrudeNoRotationMatrix;p.setUniformMatrix4fv("u_transformMatrix",t.tileTransform.transform),p.setUniformMatrix4fv("u_extrudeMatrix",x),p.setUniform2fv("u_normalized_origin",t.tileTransform.displayCoord),p.setUniform2fv("u_mosaicSize",this._glyphsTextureSize),p.setUniform1f("u_pixelRatio",1),p.setUniform1f("u_opacity",1),f.vvSizeMinMaxValue&&p.setUniform4fv("u_vvSizeMinMaxValue",s.vvSizeMinMaxValue),f.vvSizeScaleStops&&p.setUniform1f("u_vvSizeScaleStopsValue",s.vvSizeScaleStopsValue),f.vvSizeFieldStops&&(p.setUniform1fv("u_vvSizeFieldStopsValues",s.vvSizeFieldStopsValues),p.setUniform1fv("u_vvSizeFieldStopsSizes",s.vvSizeFieldStopsSizes)),f.vvSizeUnitValue&&p.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",s.vvSizeUnitValueToPixelsRatio),f.vvColor&&(p.setUniform1fv("u_vvColorValues",s.vvColorValues),p.setUniform4fv("u_vvColors",s.vvColors)),f.vvOpacity&&(p.setUniform1fv("u_vvOpacityValues",s.vvOpacityValues),p.setUniform1fv("u_vvOpacities",s.vvOpacities)),f.vvRotation&&p.setUniform1f("u_vvRotationType","geographic"===s.vvMaterialParameters.vvRotationType?0:1),r.drawElements(4,u,5125,4*l),r.bindVAO(null)}},t.prototype._getVAO=function(e,t,i,o){var a=t.getGeometry(o);if(a&&a.vao)return a.vao;var n=a.vertexBufferMap[r.C_VBO_GEOMETRY],v=a.vertexBufferMap[r.C_VBO_VISIBILITY],u=a.indexBuffer;return n&&u?(a.vao=i?new s(e,this._attributeLocationsVV,this._vertexAttributeLayoutVV,{geometry:n,visibility:v},u):new s(e,this._attributeLocations,this._vertexAttributeLayout,{geometry:n,visibility:v},u),a.vao):null},t}(a.default);t.default=n}));