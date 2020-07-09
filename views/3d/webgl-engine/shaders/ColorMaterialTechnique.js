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

define(["require","exports","tslib","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/DefaultVertexAttributeLocations","../lib/StencilUtils","./ColorMaterial.glsl","../../../webgl/Program","../../../webgl/renderState","@dojo/framework/shim/Promise"],(function(e,t,r,o,a,i,n,l,s,c,u,d,p){Object.defineProperty(t,"__esModule",{value:!0});var h=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return r.__extends(n,t),n.prototype.initializeProgram=function(e){var t=n.shader.get(),r=this.configuration,o=t.build({attributeColor:r.vertexColors,slicePlaneEnabled:r.slicePlaneEnabled,sliceHighlightDisabled:r.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1});return new d(e.rctx,o.generateSource("vertex"),o.generateSource("fragment"),s.Default3D)},n.prototype.bindPass=function(e,t,r){this.program.setUniform4fv("eColor",t.color)},n.prototype.bindDraw=function(e){a.Transform.bindUniforms(this.program,e),o.Slice.bindUniformsWithOrigin(this.program,this.configuration,e)},n.prototype.initializePipeline=function(){var e=this.configuration,t=p.separateBlendingParams(770,1,771,771),r=0===e.output?e.transparent&&t:null,o=function(t){return p.makePipelineState({blending:r,polygonOffset:e.polygonOffset&&f,culling:(o=e.cullFace,0!==o&&{face:1===o?1028:1029,mode:2305}),depthTest:c.depthCompareLess,depthWrite:e.writeDepth&&p.defaultDepthWriteParams,colorWrite:p.defaultColorWriteParams,stencilWrite:e.sceneHasOcludees?c.stencilWriteMaskOn:null,stencilTest:e.sceneHasOcludees?t?c.stencilToolMaskBaseParams:c.stencilBaseAllZerosParams:null});var o};return this._occludeeState=o(!0),o(!1)},Object.defineProperty(n.prototype,"opaqueOccludeeState",{get:function(){return this._occludeeState},enumerable:!0,configurable:!0}),n.shader=new i.ReloadableShaderModule(u,(function(){return new Promise((function(t,r){e(["./ColorMaterial.glsl"],t,r)}))})),n}(n.ShaderTechnique);t.ColorMaterialTechnique=h;var f={factor:1,units:1},g=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.output=0,t.cullFace=0,t.slicePlaneEnabled=!1,t.sliceHighlightDisabled=!1,t.vertexColors=!1,t.transparent=!1,t.polygonOffset=!1,t.writeDepth=!0,t.sceneHasOcludees=!1,t}return r.__extends(t,e),r.__decorate([l.parameter({count:7})],t.prototype,"output",void 0),r.__decorate([l.parameter({count:3})],t.prototype,"cullFace",void 0),r.__decorate([l.parameter()],t.prototype,"slicePlaneEnabled",void 0),r.__decorate([l.parameter()],t.prototype,"sliceHighlightDisabled",void 0),r.__decorate([l.parameter()],t.prototype,"vertexColors",void 0),r.__decorate([l.parameter()],t.prototype,"transparent",void 0),r.__decorate([l.parameter()],t.prototype,"polygonOffset",void 0),r.__decorate([l.parameter()],t.prototype,"writeDepth",void 0),r.__decorate([l.parameter()],t.prototype,"sceneHasOcludees",void 0),t}(l.ShaderTechniqueConfiguration);t.ColorMaterialTechniqueConfiguration=g}));