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

define(["require","exports","tslib","./PositionAttribute.glsl","../../shaderModules/interfaces"],(function(e,o,n,i,t){var r,a,l,v,f,c,p,s,u,m,x;Object.defineProperty(o,"__esModule",{value:!0}),o.PathVertexPosition=function(e,o){e.attributes.add("featureValue","vec4"),e.vertex.code.add(t.glsl(r||(r=n.__makeTemplateObject(["\n  bool isCapVertex() {\n    return featureValue.w == 1.0;\n  }\n  "],["\n  bool isCapVertex() {\n    return featureValue.w == 1.0;\n  }\n  "])))),e.vertex.uniforms.add("size","vec3"),o.vvSize?(e.vertex.uniforms.add("vvSizeMinSize","vec3"),e.vertex.uniforms.add("vvSizeMaxSize","vec3"),e.vertex.uniforms.add("vvSizeOffset","vec3"),e.vertex.uniforms.add("vvSizeFactor","vec3"),e.vertex.code.add(t.glsl(a||(a=n.__makeTemplateObject(["\n    vec2 getSize() {\n      return size.xy*clamp(vvSizeOffset + featureValue.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;\n    }\n    "],["\n    vec2 getSize() {\n      return size.xy*clamp(vvSizeOffset + featureValue.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;\n    }\n    "]))))):e.vertex.code.add(t.glsl(l||(l=n.__makeTemplateObject(["\n    vec2 getSize(){\n      return size.xy;\n    }\n    "],["\n    vec2 getSize(){\n      return size.xy;\n    }\n    "])))),o.vvOpacity?(e.vertex.defines.addInt("VV_OPACITY_N",8),e.vertex.code.add(t.glsl(v||(v=n.__makeTemplateObject(["\n    uniform float vvOpacityValues[VV_OPACITY_N];\n    uniform float vvOpacityOpacities[VV_OPACITY_N];\n\n    vec4 applyOpacity(vec4 color) {\n      float value = featureValue.z;\n      if (value <= vvOpacityValues[0]) {\n        return vec4( color.xyz, vvOpacityOpacities[0]);\n      }\n\n      for (int i = 1; i < VV_OPACITY_N; ++i) {\n        if (vvOpacityValues[i] >= value) {\n          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);\n          return vec4( color.xyz, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));\n        }\n      }\n\n      return vec4( color.xyz, vvOpacityOpacities[VV_OPACITY_N - 1]);\n    }\n    "],["\n    uniform float vvOpacityValues[VV_OPACITY_N];\n    uniform float vvOpacityOpacities[VV_OPACITY_N];\n\n    vec4 applyOpacity(vec4 color) {\n      float value = featureValue.z;\n      if (value <= vvOpacityValues[0]) {\n        return vec4( color.xyz, vvOpacityOpacities[0]);\n      }\n\n      for (int i = 1; i < VV_OPACITY_N; ++i) {\n        if (vvOpacityValues[i] >= value) {\n          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);\n          return vec4( color.xyz, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));\n        }\n      }\n\n      return vec4( color.xyz, vvOpacityOpacities[VV_OPACITY_N - 1]);\n    }\n    "]))))):e.vertex.code.add(t.glsl(f||(f=n.__makeTemplateObject(["\n    vec4 applyOpacity(vec4 color){\n      return color;\n    }\n    "],["\n    vec4 applyOpacity(vec4 color){\n      return color;\n    }\n    "])))),o.vvColor?(e.vertex.defines.addInt("VV_COLOR_N",8),e.vertex.code.add(t.glsl(c||(c=n.__makeTemplateObject(["\n    uniform float vvColorValues[VV_COLOR_N];\n    uniform vec4 vvColorColors[VV_COLOR_N];\n\n    vec4 getColor() {\n      float value = featureValue.y;\n      if (value <= vvColorValues[0]) {\n        return applyOpacity(vvColorColors[0]);\n      }\n\n      for (int i = 1; i < VV_COLOR_N; ++i) {\n        if (vvColorValues[i] >= value) {\n          float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);\n          return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));\n        }\n      }\n\n      return applyOpacity(vvColorColors[VV_COLOR_N - 1]);\n    }\n    "],["\n    uniform float vvColorValues[VV_COLOR_N];\n    uniform vec4 vvColorColors[VV_COLOR_N];\n\n    vec4 getColor() {\n      float value = featureValue.y;\n      if (value <= vvColorValues[0]) {\n        return applyOpacity(vvColorColors[0]);\n      }\n\n      for (int i = 1; i < VV_COLOR_N; ++i) {\n        if (vvColorValues[i] >= value) {\n          float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);\n          return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));\n        }\n      }\n\n      return applyOpacity(vvColorColors[VV_COLOR_N - 1]);\n    }\n    "]))))):e.vertex.code.add(t.glsl(p||(p=n.__makeTemplateObject(["\n    vec4 getColor(){\n      return applyOpacity(vec4(1, 1, 1, 1));\n    }\n    "],["\n    vec4 getColor(){\n      return applyOpacity(vec4(1, 1, 1, 1));\n    }\n    "])))),e.include(i.PositionAttribute),e.attributes.add("profileRight","vec4"),e.attributes.add("profileUp","vec4"),e.attributes.add("profileVertexAndNormal","vec4"),e.vertex.code.add(t.glsl(s||(s=n.__makeTemplateObject(["\n  vec3 calculateVPos() {\n    vec2 size = getSize();\n    vec3 origin = position;\n    vec3 right = profileRight.xyz;\n    vec3 up = profileUp.xyz;\n    vec3 forward = cross(up, right);\n    vec2 profileVertex = profileVertexAndNormal.xy * size;\n    vec2 profileNormal = profileVertexAndNormal.zw;\n    float positionOffsetAlongProfilePlaneNormal = 0.0;\n    float normalOffsetAlongProfilePlaneNormal = 0.0;\n    "],["\n  vec3 calculateVPos() {\n    vec2 size = getSize();\n    vec3 origin = position;\n    vec3 right = profileRight.xyz;\n    vec3 up = profileUp.xyz;\n    vec3 forward = cross(up, right);\n    vec2 profileVertex = profileVertexAndNormal.xy * size;\n    vec2 profileNormal = profileVertexAndNormal.zw;\n    float positionOffsetAlongProfilePlaneNormal = 0.0;\n    float normalOffsetAlongProfilePlaneNormal = 0.0;\n    "])))),e.vertex.code.add(t.glsl(u||(u=n.__makeTemplateObject(["\n    if(!isCapVertex()) {\n      vec2 rotationRight = vec2(profileRight.w, profileUp.w);\n      float maxDistance = length(rotationRight);\n  "],["\n    if(!isCapVertex()) {\n      vec2 rotationRight = vec2(profileRight.w, profileUp.w);\n      float maxDistance = length(rotationRight);\n  "])))),e.vertex.code.add(t.glsl(m||(m=n.__makeTemplateObject(["\n      rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);\n\n      // decompose vertex into rotationRight and rotationUp\n      // limit rotation right component to maxDistance\n      // and reassemble profile vertex from rotationRight and rotationUp\n      float rx = dot(profileVertex, rotationRight);\n      if (abs(rx) > maxDistance) {\n        // NB: we do the tangent by x=-y and y=x\n        vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);\n        float ry = dot(profileVertex, rotationUp);\n        profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;\n      }\n    }else{\n       positionOffsetAlongProfilePlaneNormal = profileRight.w * size[0];\n       normalOffsetAlongProfilePlaneNormal = profileUp.w;\n    }\n\n    vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;\n\n    return origin + offset; // localPosition\n  }\n  "],["\n      rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);\n\n      // decompose vertex into rotationRight and rotationUp\n      // limit rotation right component to maxDistance\n      // and reassemble profile vertex from rotationRight and rotationUp\n      float rx = dot(profileVertex, rotationRight);\n      if (abs(rx) > maxDistance) {\n        // NB: we do the tangent by x=-y and y=x\n        vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);\n        float ry = dot(profileVertex, rotationUp);\n        profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;\n      }\n    }else{\n       positionOffsetAlongProfilePlaneNormal = profileRight.w * size[0];\n       normalOffsetAlongProfilePlaneNormal = profileUp.w;\n    }\n\n    vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;\n\n    return origin + offset; // localPosition\n  }\n  "])))),e.vertex.code.add(t.glsl(x||(x=n.__makeTemplateObject(["\n  vec3 localNormal() {\n    vec3 right = profileRight.xyz;\n    vec3 up = profileUp.xyz;\n    vec3 forward = cross(up, right);\n    vec2 profileNormal = profileVertexAndNormal.zw;\n\n    vec3 normal = right * profileNormal.x + up * profileNormal.y;\n\n    if(isCapVertex()) {\n      normal += forward * profileUp.w;\n    }\n\n    return normal;\n  }\n  "],["\n  vec3 localNormal() {\n    vec3 right = profileRight.xyz;\n    vec3 up = profileUp.xyz;\n    vec3 forward = cross(up, right);\n    vec2 profileNormal = profileVertexAndNormal.zw;\n\n    vec3 normal = right * profileNormal.x + up * profileNormal.y;\n\n    if(isCapVertex()) {\n      normal += forward * profileUp.w;\n    }\n\n    return normal;\n  }\n  "]))))},o.setVVUniforms=function(e,o){o.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",o.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",o.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",o.vvSizeOffset),e.setUniform3fv("vvSizeFactor",o.vvSizeFactor)),o.vvColorEnabled&&(e.setUniform1fv("vvColorValues",o.vvColorValues),e.setUniform4fv("vvColorColors",o.vvColorColors)),o.vvOpacityEnabled&&(e.setUniform1fv("vvOpacityValues",o.vvOpacityValues),e.setUniform1fv("vvOpacityOpacities",o.vvOpacityOpacities))}}));