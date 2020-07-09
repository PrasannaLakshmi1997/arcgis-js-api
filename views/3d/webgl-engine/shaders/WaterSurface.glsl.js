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

define(["require","exports","tslib","../core/shaderLibrary/ForwardLinearDepth.glsl","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderLibrary/shading/NormalUtils.glsl","../core/shaderLibrary/shading/ReadShadowMap.glsl","../core/shaderLibrary/shading/Water.glsl","../core/shaderLibrary/shading/WaterDistortion.glsl","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(a,n,e,o,r,i,t,l,d,v,s,m){var c,g,p,h,u,w,f,_,y;Object.defineProperty(n,"__esModule",{value:!0}),n.build=function(a){var n=new m.ShaderBuilder;return n.include(i.Transform,{linearDepth:!1}),n.attributes.add("position","vec3"),n.attributes.add("uv0","vec2"),n.vertex.uniforms.add("proj","mat4").add("view","mat4").add("localOrigin","vec3"),0===a.output&&(n.include(t.NormalUtils,a),n.include(o.ForwardLinearDepth,a),n.varyings.add("vuv","vec2"),n.varyings.add("vpos","vec3"),n.varyings.add("vnormal","vec3"),n.varyings.add("vtbnMatrix","mat3"),n.vertex.code.add(s.glsl(c||(c=e.__makeTemplateObject(["\n      void main(void) {\n        vuv = uv0;\n        vpos = position;\n\n        vnormal = getLocalUp(vpos, localOrigin);\n        vtbnMatrix = getTBNMatrix(vnormal);\n\n        gl_Position = transformPosition(proj, view, vpos);\n        forwardLinearDepth();\n      }\n    "],["\n      void main(void) {\n        vuv = uv0;\n        vpos = position;\n\n        vnormal = getLocalUp(vpos, localOrigin);\n        vtbnMatrix = getTBNMatrix(vnormal);\n\n        gl_Position = transformPosition(proj, view, vpos);\n        forwardLinearDepth();\n      }\n    "])))),n.include(v.WaterDistortion,a),n.include(r.Slice,a),a.receiveShadows&&n.include(l.ReadShadowMap,a),n.include(d.Water,a),n.fragment.uniforms.add("waterColor","vec4").add("lightingMainDirection","vec3").add("lightingMainIntensity","vec3").add("camPos","vec3").add("timeElapsed","float").add("view","mat4"),n.fragment.code.add(s.glsl(g||(g=e.__makeTemplateObject(["\n      void main() {\n        discardBySlice(vpos);\n        vec3 localUp = vnormal;\n        // the created normal is in tangent space\n        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);\n\n        // we rotate the normal according to the tangent-bitangent-normal-Matrix\n        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);\n        vec3 v = -normalize(vpos - camPos);\n        vec3 l = normalize(-lightingMainDirection);\n        "],["\n      void main() {\n        discardBySlice(vpos);\n        vec3 localUp = vnormal;\n        // the created normal is in tangent space\n        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);\n\n        // we rotate the normal according to the tangent-bitangent-normal-Matrix\n        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);\n        vec3 v = -normalize(vpos - camPos);\n        vec3 l = normalize(-lightingMainDirection);\n        "])))),a.receiveShadows?n.fragment.code.add(s.glsl(p||(p=e.__makeTemplateObject(["\n        float shadow = 1.0 - readShadowMap(vpos, linearDepth);\n      "],["\n        float shadow = 1.0 - readShadowMap(vpos, linearDepth);\n      "])))):n.fragment.code.add(s.glsl(h||(h=e.__makeTemplateObject(["\n        float shadow = 1.0;\n      "],["\n        float shadow = 1.0;\n      "])))),n.fragment.code.add(s.glsl(u||(u=e.__makeTemplateObject(["\n        vec4 vPosView = view*vec4(vpos, 1.0);\n        vec4 final = vec4(getSeaColor(n, v, l, waterColor.rgb, lightingMainIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz), waterColor.w);\n\n        // gamma correction\n        gl_FragColor = delinearizeGamma(final);\n        gl_FragColor = highlightSlice(gl_FragColor, vpos);\n      }\n    "],["\n        vec4 vPosView = view*vec4(vpos, 1.0);\n        vec4 final = vec4(getSeaColor(n, v, l, waterColor.rgb, lightingMainIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz), waterColor.w);\n\n        // gamma correction\n        gl_FragColor = delinearizeGamma(final);\n        gl_FragColor = highlightSlice(gl_FragColor, vpos);\n      }\n    "]))))),2===a.output&&(n.include(t.NormalUtils,a),n.include(v.WaterDistortion,a),n.include(r.Slice,a),n.varyings.add("vpos","vec3"),n.varyings.add("vuv","vec2"),n.vertex.code.add(s.glsl(w||(w=e.__makeTemplateObject(["\n        void main(void) {\n          vuv = uv0;\n          vpos = position;\n          gl_Position = transformPosition(proj, view, vpos);\n        }\n    "],["\n        void main(void) {\n          vuv = uv0;\n          vpos = position;\n          gl_Position = transformPosition(proj, view, vpos);\n        }\n    "])))),n.fragment.uniforms.add("timeElapsed","float"),n.fragment.code.add(s.glsl(f||(f=e.__makeTemplateObject(["\n        void main() {\n          discardBySlice(vpos);\n\n          // the created normal is in tangent space and foam\n          vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);\n          tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);\n\n          gl_FragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);\n        }\n    "],["\n        void main() {\n          discardBySlice(vpos);\n\n          // the created normal is in tangent space and foam\n          vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);\n          tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);\n\n          gl_FragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);\n        }\n    "]))))),5===a.output&&(n.include(t.NormalUtils,a),n.varyings.add("vpos","vec3"),n.vertex.code.add(s.glsl(_||(_=e.__makeTemplateObject(["\n        void main(void) {\n          vpos = position;\n          gl_Position = transformPosition(proj, view, vpos);\n        }\n    "],["\n        void main(void) {\n          vpos = position;\n          gl_Position = transformPosition(proj, view, vpos);\n        }\n    "])))),n.fragment.uniforms.add("waterColor","vec4"),n.fragment.code.add(s.glsl(y||(y=e.__makeTemplateObject(["\n        void main() {\n          gl_FragColor = waterColor;\n        }\n    "],["\n        void main() {\n          gl_FragColor = waterColor;\n        }\n    "]))))),n}}));