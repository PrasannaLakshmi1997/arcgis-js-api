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

define(["require","exports","tslib","../../../../core/maybe","../../../../core/maybe","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/shading/VisualVariables.glsl","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/StencilUtils","./RibbonLine.glsl","../../../webgl/Program","../../../webgl/renderState","@dojo/framework/shim/Promise"],(function(e,t,r,i,o,n,a,l,p,s,u,d,c,f,h,b){Object.defineProperty(t,"__esModule",{value:!0}),t.RibbonVertexAttributeConstants={POSITION:"position",SUBDIVISIONFACTOR:"subdivisionFactor",UV0:"uv0",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",SUBDIVISIONS:"subdivisions",COLOR:"color",COLORFEATUREATTRIBUTE:"colorFeatureAttribute",SIZE:"size",SIZEFEATUREATTRIBUTE:"sizeFeatureAttribute",OPACITYFEATUREATTRIBUTE:"opacityFeatureAttribute"},t.ribbonVertexAttributeLocations={position:0,subdivisionFactor:1,uv0:2,auxpos1:3,auxpos2:4,size:6,sizeFeatureAttribute:6,color:5,colorFeatureAttribute:5,opacityFeatureAttribute:7};var m=function(u){function d(e,t){var r=u.call(this,e,t)||this;return r.stipplePattern=null,r.stippleTextureBind=null,r.stippleTextureRepository=e.stippleTextureRepository,r}return r.__extends(d,u),d.prototype.initializeProgram=function(e){var r=d.shader.get(),i=this.configuration,o=r.build({output:i.output,slicePlaneEnabled:i.slicePlaneEnabled,sliceHighlightDisabled:i.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,stippleEnabled:i.stippleEnabled,stippleOffColorEnabled:i.stippleOffColorEnabled,stippleUVMaxEnabled:i.stippleIntegerRepeatsEnabled,stippleIntegerRepeatsEnabled:i.stippleIntegerRepeatsEnabled,roundCaps:i.roundCaps,roundJoins:i.roundJoins,vvColor:i.vvColor,vvSize:i.vvSize,vvInstancingEnabled:!0,vvOpacity:i.vvOpacity,falloffEnabled:i.falloffEnabled,innerColorEnabled:i.innerColorEnabled});return new h(e.rctx,o.generateSource("vertex"),o.generateSource("fragment"),t.ribbonVertexAttributeLocations)},d.prototype.dispose=function(){u.prototype.dispose.call(this),this.stippleTextureRepository.release(this.stipplePattern),this.stipplePattern=null,this.stippleTextureBind=null},d.prototype.bindPass=function(e,t,r){if(4===this.configuration.output&&l.OutputHighlight.bindOutputHighlight(e,this.program,r),this.program.setUniform1f("intrinsicWidth",t.width),this.program.setUniform4fv("intrinsicColor",t.color),this.program.setUniform1f("miterLimit","miter"!==t.join?0:t.miterLimit),this.program.setUniform1f("nearPlane",r.nearFar[0]),this.program.setUniform1f("pixelRatio",r.pixelRatio),this.program.setUniform2fv("screenSize",[r.viewport[2],r.viewport[3]]),p.VisualVariables.bindUniformsWithOpacity(this.program,t),this.stipplePattern!==t.stipplePattern){var n=t.stipplePattern;this.stippleTextureBind=this.stippleTextureRepository.swap(this.stipplePattern,n),this.stipplePattern=n}if(this.configuration.stippleEnabled){var a=o.isSome(this.stippleTextureBind)?this.stippleTextureBind(e,0)*r.pixelRatio:1;if(this.program.setUniform1i("stipplePatternTexture",0),this.program.setUniform1f("stipplePatternPixelSizeInv",1/a),this.configuration.stippleOffColorEnabled){var s=i.unwrap(t.stippleOffColor);this.program.setUniform4f("stippleOffColor",s[0],s[1],s[2],s.length>3?s[3]:1)}}this.configuration.falloffEnabled&&this.program.setUniform1f("falloff",t.falloff),this.configuration.innerColorEnabled&&(this.program.setUniform4fv("innerColor",i.unwrapOr(t.innerColor,t.color)),this.program.setUniform1f("innerWidth",t.innerWidth*r.pixelRatio))},d.prototype.bindDraw=function(e){a.Transform.bindUniforms(this.program,e),n.Slice.bindUniformsWithOrigin(this.program,this.configuration,e)},d.prototype.initializePipeline=function(){var e=this.configuration,t=b.separateBlendingParams(770,1,771,771),r=e.polygonOffset&&g;if(e.occluder&&(this._occluderPipelineTransparent=b.makePipelineState({blending:t,polygonOffset:r,depthTest:c.depthCompareAlways,depthWrite:null,colorWrite:b.defaultColorWriteParams,stencilWrite:null,stencilTest:c.stencilToolTransparentOccluderParams}),this._occluderPipelineOpaque=b.makePipelineState({polygonOffset:r,depthTest:c.depthCompareAlways,depthWrite:null,colorWrite:b.defaultColorWriteParams,stencilWrite:c.stencilWriteMaskOff,stencilTest:c.stencilToolMaskOccluderParams}),this._occluderPipelineMaskWrite=b.makePipelineState({polygonOffset:r,depthTest:c.depthCompareLess,depthWrite:null,colorWrite:null,stencilWrite:c.stencilWriteMaskOn,stencilTest:c.stencilToolMaskBaseParams})),0===e.output){var i=function(i){return b.makePipelineState({blending:t,polygonOffset:r,depthTest:c.depthCompareLess,depthWrite:!e.transparent&&e.writeDepth&&b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams,stencilWrite:e.sceneHasOcludees?c.stencilWriteMaskOn:null,stencilTest:e.sceneHasOcludees?i?c.stencilToolMaskBaseParams:e.sceneHasOcludees?c.stencilBaseAllZerosParams:null:null})};return this._occludeePipeline=i(!0),i(!1)}return b.makePipelineState({polygonOffset:r,depthTest:c.depthCompareLess,depthWrite:!e.transparent&&e.writeDepth&&b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams})},Object.defineProperty(d.prototype,"occluderPipelineTransparent",{get:function(){return this._occluderPipelineTransparent},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"occluderPipelineOpaque",{get:function(){return this._occluderPipelineOpaque},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"occludeePipeline",{get:function(){return this._occludeePipeline},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"occluderPipelineMaskWrite",{get:function(){return this._occluderPipelineMaskWrite},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"primitiveType",{get:function(){return 5},enumerable:!0,configurable:!0}),d.shader=new s.ReloadableShaderModule(f,(function(){return new Promise((function(t,r){e(["./RibbonLine.glsl"],t,r)}))})),d}(u.ShaderTechnique);t.RibbonLineTechnique=m;var g={factor:0,units:-4},v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.output=0,t.occluder=!1,t.slicePlaneEnabled=!1,t.sliceHighlightDisabled=!1,t.vertexColors=!1,t.transparent=!1,t.polygonOffset=!1,t.writeDepth=!1,t.stippleEnabled=!1,t.stippleOffColorEnabled=!1,t.stippleIntegerRepeatsEnabled=!1,t.roundCaps=!1,t.roundJoins=!1,t.vvSize=!1,t.vvColor=!1,t.vvOpacity=!1,t.falloffEnabled=!1,t.innerColorEnabled=!1,t.sceneHasOcludees=!1,t}return r.__extends(t,e),r.__decorate([d.parameter({count:7})],t.prototype,"output",void 0),r.__decorate([d.parameter()],t.prototype,"occluder",void 0),r.__decorate([d.parameter()],t.prototype,"slicePlaneEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"sliceHighlightDisabled",void 0),r.__decorate([d.parameter()],t.prototype,"vertexColors",void 0),r.__decorate([d.parameter()],t.prototype,"transparent",void 0),r.__decorate([d.parameter()],t.prototype,"polygonOffset",void 0),r.__decorate([d.parameter()],t.prototype,"writeDepth",void 0),r.__decorate([d.parameter()],t.prototype,"stippleEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"stippleOffColorEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"stippleIntegerRepeatsEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"roundCaps",void 0),r.__decorate([d.parameter()],t.prototype,"roundJoins",void 0),r.__decorate([d.parameter()],t.prototype,"vvSize",void 0),r.__decorate([d.parameter()],t.prototype,"vvColor",void 0),r.__decorate([d.parameter()],t.prototype,"vvOpacity",void 0),r.__decorate([d.parameter()],t.prototype,"falloffEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"innerColorEnabled",void 0),r.__decorate([d.parameter()],t.prototype,"sceneHasOcludees",void 0),t}(d.ShaderTechniqueConfiguration);t.RibbonLineTechniqueConfiguration=v}));