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

define(["require","exports","tslib","../ForwardLinearDepth.glsl","../Offset.glsl","../Slice.glsl","../Transform.glsl","../attributes/InstancedDoublePrecision.glsl","../attributes/NormalAttribute.glsl","../attributes/PositionAttribute.glsl","../attributes/SymbolColor.glsl","../attributes/TextureCoordinateAttribute.glsl","../attributes/VertexColor.glsl","../attributes/VerticalOffset.glsl","./DefaultMaterialAuxiliaryPasses.glsl","../shading/EvaluateAmbientOcclusion.glsl","../shading/EvaluateSceneLighting.glsl","../shading/PhysicallyBasedRendering.glsl","../shading/PhysicallyBasedRenderingParameters.glsl","../shading/ReadShadowMap.glsl","../shading/VisualVariables.glsl","../util/AlphaDiscard.glsl","../util/MixExternalColor.glsl","../../shaderModules/interfaces","../../shaderModules/ShaderBuilder"],(function(o,e,a,l,i,t,n,r,d,c,s,v,g,m,u,p,x,b,h,f,C,w,y,_,M){var O,P,A,E,L,S,F,D,N,k,T;Object.defineProperty(e,"__esModule",{value:!0}),e.build=function(o){var e=new M.ShaderBuilder,j=e.vertex.code,B=e.fragment.code;return e.vertex.uniforms.add("proj","mat4").add("view","mat4").add("camPos","vec3").add("localOrigin","vec3"),e.include(c.PositionAttribute),e.varyings.add("vpos","vec3"),e.include(C.VisualVariables,o),e.include(r.InstancedDoublePrecision,o),e.include(m.VerticalOffset,o),0===o.output&&(e.include(d.NormalAttribute,o),e.include(n.Transform,{linearDepth:!1}),o.offsetBackfaces&&e.include(i.Offset),o.instancedColor&&e.attributes.add("instanceColor","vec4"),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("localvpos","vec3"),e.include(v.TextureCoordinateAttribute,o),e.include(l.ForwardLinearDepth,o),e.include(s.SymbolColor,o),e.include(g.VertexColor,o),e.vertex.uniforms.add("externalColor","vec4"),e.varyings.add("vcolorExt","vec4"),j.add(_.glsl(O||(O=a.__makeTemplateObject(["\n        void main(void) {\n          forwardNormalizedVertexColor();\n          vcolorExt = externalColor;\n          ","\n          vcolorExt *= vvColor();\n          vcolorExt *= getSymbolColor();\n          forwardColorMixMode();\n\n          if (vcolorExt.a < ",") {\n            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);\n          }\n          else {\n            vpos = calculateVPos();\n            localvpos = vpos - view[3].xyz;\n            vpos = subtractOrigin(vpos);\n            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));\n            vpos = addVerticalOffset(vpos, localOrigin);\n            gl_Position = transformPosition(proj, view, vpos);\n            ","\n          }\n          forwardLinearDepth();\n          forwardTextureCoordinates();\n        }\n      "],["\n        void main(void) {\n          forwardNormalizedVertexColor();\n          vcolorExt = externalColor;\n          ","\n          vcolorExt *= vvColor();\n          vcolorExt *= getSymbolColor();\n          forwardColorMixMode();\n\n          if (vcolorExt.a < ",") {\n            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);\n          }\n          else {\n            vpos = calculateVPos();\n            localvpos = vpos - view[3].xyz;\n            vpos = subtractOrigin(vpos);\n            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));\n            vpos = addVerticalOffset(vpos, localOrigin);\n            gl_Position = transformPosition(proj, view, vpos);\n            ","\n          }\n          forwardLinearDepth();\n          forwardTextureCoordinates();\n        }\n      "])),o.instancedColor?"vcolorExt *= instanceColor;":"",_.glsl.float(w.symbolAlphaCutoff),o.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, camPos);":"")),e.include(t.Slice,o),e.include(x.EvaluateSceneLighting,o),e.include(p.EvaluateAmbientOcclusion,o),e.include(w.DiscardOrAdjustAlpha,o),o.receiveShadows&&e.include(f.ReadShadowMap,o),e.fragment.uniforms.add("camPos","vec3").add("localOrigin","vec3").add("ambient","vec3").add("diffuse","vec3").add("opacity","float").add("layerOpacity","float"),e.fragment.uniforms.add("view","mat4"),o.hasColorTexture&&e.fragment.uniforms.add("tex","sampler2D"),e.include(h.PhysicallyBasedRenderingParameters,o),e.include(b.PhysicallyBasedRendering,o),e.include(y.MixExternalColor,{stages:1}),B.add(_.glsl(T||(T=a.__makeTemplateObject(["\n      void main() {\n        discardBySlice(vpos);\n        ","\n        vec3 viewDirection = normalize(vpos - camPos);\n        ","\n        float ssao = evaluateAmbientOcclusionInverse();\n        ssao *= getBakedOcclusion();\n\n        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);\n        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;\n        ","\n        vec3 matColor = max(ambient, diffuse);\n        ","\n        ","\n        ","\n        ","\n        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);\n      }\n    "],["\n      void main() {\n        discardBySlice(vpos);\n        ","\n        vec3 viewDirection = normalize(vpos - camPos);\n        ","\n        float ssao = evaluateAmbientOcclusionInverse();\n        ssao *= getBakedOcclusion();\n\n        float additionalAmbientScale = _oldHeuristicLighting(vpos + localOrigin);\n        vec3 additionalLight = ssao * lightingMainIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;\n        ","\n        vec3 matColor = max(ambient, diffuse);\n        ","\n        ","\n        ","\n        ","\n        gl_FragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);\n      }\n    "])),o.hasColorTexture?_.glsl(P||(P=a.__makeTemplateObject(["\n        vec4 texColor = texture2D(tex, vuv0);\n        ","\n        discardOrAdjustAlpha(texColor);"],["\n        vec4 texColor = texture2D(tex, vuv0);\n        ","\n        discardOrAdjustAlpha(texColor);"])),o.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""):_.glsl(A||(A=a.__makeTemplateObject(["vec4 texColor = vec4(1.0);"],["vec4 texColor = vec4(1.0);"]))),1===o.pbrMode?"applyPBRFactors();":"",o.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":0===o.viewingMode?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;",o.attributeColor?_.glsl(E||(E=a.__makeTemplateObject(["\n        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));"],["\n        vec3 albedo_ = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));"]))):_.glsl(L||(L=a.__makeTemplateObject(["\n        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));\n        "],["\n        vec3 albedo_ = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));\n        float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));\n        "]))),_.glsl(S||(S=a.__makeTemplateObject(["\n        vec3 shadedNormal = normalize(vNormalWorld);\n        albedo_ *= 1.2;\n        vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);\n        float alignmentLightView = clamp(dot(-viewForward, lightingMainDirection), 0.0, 1.0);\n        float transmittance = 1.0 - clamp(dot(-viewForward, shadedNormal), 0.0, 1.0);\n        float treeRadialFalloff = vColor.r;\n        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);\n        additionalLight += backLightFactor * lightingMainIntensity;"],["\n        vec3 shadedNormal = normalize(vNormalWorld);\n        albedo_ *= 1.2;\n        vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);\n        float alignmentLightView = clamp(dot(-viewForward, lightingMainDirection), 0.0, 1.0);\n        float transmittance = 1.0 - clamp(dot(-viewForward, shadedNormal), 0.0, 1.0);\n        float treeRadialFalloff = vColor.r;\n        float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);\n        additionalLight += backLightFactor * lightingMainIntensity;"]))),1===o.pbrMode||2===o.pbrMode?0===o.viewingMode?_.glsl(F||(F=a.__makeTemplateObject(["vec3 normalGround = normalize(vpos + localOrigin);"],["vec3 normalGround = normalize(vpos + localOrigin);"]))):_.glsl(D||(D=a.__makeTemplateObject(["vec3 normalGround = vec3(0.0, 0.0, 1.0);"],["vec3 normalGround = vec3(0.0, 0.0, 1.0);"]))):_.glsl(N||(N=a.__makeTemplateObject([""],[""]))),1===o.pbrMode||2===o.pbrMode?_.glsl(k||(k=a.__makeTemplateObject(["\n            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];\n            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);"],["\n            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * lightingMainIntensity[2];\n            vec3 shadedColor = evaluateSceneLightingPBR(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);"]))):"vec3 shadedColor = evaluateSceneLighting(shadedNormal, albedo_, shadow, 1.0 - ssao, additionalLight);"))),e.include(u.DefaultMaterialAuxiliaryPasses,o),e}}));