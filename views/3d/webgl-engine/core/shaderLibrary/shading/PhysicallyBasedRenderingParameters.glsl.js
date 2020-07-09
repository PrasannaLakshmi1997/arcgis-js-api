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

define(["require","exports","tslib","../../../../../../core/libs/gl-matrix-2/vec3f32","../attributes/VertexTextureCoordinates.glsl","../../shaderModules/interfaces"],(function(e,s,n,o,t,a){function r(e,s){var o=e.fragment,r=s.hasMetalnessAndRoughnessTexture||s.hasEmissionTexture||s.hasOcclusionTexture;1===s.pbrMode&&r&&e.include(t.VertexTextureCoordinates,s),2!==s.pbrMode?(0===s.pbrMode&&o.code.add(a.glsl(i||(i=n.__makeTemplateObject(["\n      float getBakedOcclusion() { return 1.0; }\n  "],["\n      float getBakedOcclusion() { return 1.0; }\n  "])))),1===s.pbrMode&&(o.uniforms.add("emissionFactor","vec3"),o.uniforms.add("mrrFactors","vec3"),o.code.add(a.glsl(l||(l=n.__makeTemplateObject(["\n      vec3 mrr;\n      vec3 emission;\n      float occlusion;\n    "],["\n      vec3 mrr;\n      vec3 emission;\n      float occlusion;\n    "])))),s.hasMetalnessAndRoughnessTexture&&(o.uniforms.add("texMetallicRoughness","sampler2D"),s.supportsTextureAtlas&&o.uniforms.add("texMetallicRoughnessSize","vec2"),o.code.add(a.glsl(u||(u=n.__makeTemplateObject(["\n      void applyMetallnessAndRoughness(TextureLookupParameter params) {\n        vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;\n\n        mrr[0] *= metallicRoughness.b;\n        mrr[1] *= metallicRoughness.g;\n      }"],["\n      void applyMetallnessAndRoughness(TextureLookupParameter params) {\n        vec3 metallicRoughness = textureLookup(texMetallicRoughness, params).rgb;\n\n        mrr[0] *= metallicRoughness.b;\n        mrr[1] *= metallicRoughness.g;\n      }"]))))),s.hasEmissionTexture&&(o.uniforms.add("texEmission","sampler2D"),s.supportsTextureAtlas&&o.uniforms.add("texEmissionSize","vec2"),o.code.add(a.glsl(m||(m=n.__makeTemplateObject(["\n      void applyEmission(TextureLookupParameter params) {\n        emission *= textureLookup(texEmission, params).rgb;\n      }"],["\n      void applyEmission(TextureLookupParameter params) {\n        emission *= textureLookup(texEmission, params).rgb;\n      }"]))))),s.hasOcclusionTexture?(o.uniforms.add("texOcclusion","sampler2D"),s.supportsTextureAtlas&&o.uniforms.add("texOcclusionSize","vec2"),o.code.add(a.glsl(d||(d=n.__makeTemplateObject(["\n      void applyOcclusion(TextureLookupParameter params) {\n        occlusion *= textureLookup(texOcclusion, params).r;\n      }\n\n      float getBakedOcclusion() {\n        return occlusion;\n      }\n      "],["\n      void applyOcclusion(TextureLookupParameter params) {\n        occlusion *= textureLookup(texOcclusion, params).r;\n      }\n\n      float getBakedOcclusion() {\n        return occlusion;\n      }\n      "]))))):o.code.add(a.glsl(p||(p=n.__makeTemplateObject(["\n      float getBakedOcclusion() { return 1.0; }\n      "],["\n      float getBakedOcclusion() { return 1.0; }\n      "])))),o.code.add(a.glsl(v||(v=n.__makeTemplateObject(["\n    void applyPBRFactors() {\n      mrr = mrrFactors;\n      emission = emissionFactor;\n      occlusion = 1.0;\n      ","\n      ","\n      ","\n      ","\n    }\n  "],["\n    void applyPBRFactors() {\n      mrr = mrrFactors;\n      emission = emissionFactor;\n      occlusion = 1.0;\n      ","\n      ","\n      ","\n      ","\n    }\n  "])),r?"vtc.uv = vuv0;":"",s.hasMetalnessAndRoughnessTexture?s.supportsTextureAtlas?"vtc.size = texMetallicRoughnessSize; applyMetallnessAndRoughness(vtc);":"applyMetallnessAndRoughness(vtc);":"",s.hasEmissionTexture?s.supportsTextureAtlas?"vtc.size = texEmissionSize; applyEmission(vtc);":"applyEmission(vtc);":"",s.hasOcclusionTexture?s.supportsTextureAtlas?"vtc.size = texOcclusionSize; applyOcclusion(vtc);":"applyOcclusion(vtc);":"")))):o.code.add(a.glsl(c||(c=n.__makeTemplateObject(["\n      const vec3 mrr = vec3(0.0, 0.6, 0.2);\n      const vec3 emission = vec3(0.0);\n      float occlusion = 1.0;\n\n      void applyPBRFactors() {}\n\n      float getBakedOcclusion() { return 1.0; }\n    "],["\n      const vec3 mrr = vec3(0.0, 0.6, 0.2);\n      const vec3 emission = vec3(0.0);\n      float occlusion = 1.0;\n\n      void applyPBRFactors() {}\n\n      float getBakedOcclusion() { return 1.0; }\n    "]))))}var c,i,l,u,m,d,p,v;Object.defineProperty(s,"__esModule",{value:!0}),s.PBRSchematicMRRValues=o.vec3f32.fromValues(0,.6,.2),s.PhysicallyBasedRenderingParameters=r,function(e){e.bindUniforms=function(e,s,n){void 0===n&&(n=!1),n||(e.setUniform3fv("mrrFactors",s.mrrFactors),e.setUniform3fv("emissionFactor",s.emissiveFactor))}}(r=s.PhysicallyBasedRenderingParameters||(s.PhysicallyBasedRenderingParameters={}))}));