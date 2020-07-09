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

define(["require","exports","tslib","../../shaderModules/interfaces","../../../materials/internal/MaterialUtil"],(function(e,n,a,r,s){function c(e){e.vertex.code.add(r.glsl(i||(i=a.__makeTemplateObject(["\n    float screenSizePerspectiveMinSize(float size, vec4 factor) {\n      float nonZeroSize = 1.0 - step(size, 0.0);\n\n      return (\n        factor.z * (\n          1.0 +\n          // Multiply by nzs ensures if size is 0, then we ignore proportionally scaled padding\n          nonZeroSize *\n          2.0 * factor.w / (\n            size + (1.0 - nonZeroSize) // Adding 1 - nzs ensures we divide either by size, or by 1\n          )\n        )\n      );\n    }\n  "],["\n    float screenSizePerspectiveMinSize(float size, vec4 factor) {\n      float nonZeroSize = 1.0 - step(size, 0.0);\n\n      return (\n        factor.z * (\n          1.0 +\n          // Multiply by nzs ensures if size is 0, then we ignore proportionally scaled padding\n          nonZeroSize *\n          2.0 * factor.w / (\n            size + (1.0 - nonZeroSize) // Adding 1 - nzs ensures we divide either by size, or by 1\n          )\n        )\n      );\n    }\n  "])))),e.vertex.code.add(r.glsl(t||(t=a.__makeTemplateObject(["\n    float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {\n      return absCosAngle * absCosAngle * absCosAngle;\n    }\n  "],["\n    float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {\n      return absCosAngle * absCosAngle * absCosAngle;\n    }\n  "])))),e.vertex.code.add(r.glsl(o||(o=a.__makeTemplateObject(["\n    vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {\n      return vec4(\n        min(params.x / (distanceToCamera - params.y), 1.0),\n        screenSizePerspectiveViewAngleDependentFactor(absCosAngle),\n        params.z,\n        params.w\n      );\n    }\n  "],["\n    vec4 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec4 params) {\n      return vec4(\n        min(params.x / (distanceToCamera - params.y), 1.0),\n        screenSizePerspectiveViewAngleDependentFactor(absCosAngle),\n        params.z,\n        params.w\n      );\n    }\n  "])))),e.vertex.code.add(r.glsl(l||(l=a.__makeTemplateObject(["\n    float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {\n      return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));\n    }\n  "],["\n    float applyScreenSizePerspectiveScaleFactorFloat(float size, vec4 factor) {\n      return max(mix(size * factor.x, size, factor.y), screenSizePerspectiveMinSize(size, factor));\n    }\n  "])))),e.vertex.code.add(r.glsl(p||(p=a.__makeTemplateObject(["\n    float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {\n      return applyScreenSizePerspectiveScaleFactorFloat(\n        size,\n        screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)\n      );\n    }\n  "],["\n    float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec4 params) {\n      return applyScreenSizePerspectiveScaleFactorFloat(\n        size,\n        screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)\n      );\n    }\n  "])))),e.vertex.code.add(r.glsl(z||(z=a.__makeTemplateObject(["\n    vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {\n      return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);\n    }\n  "],["\n    vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec4 factor) {\n      return mix(size * clamp(factor.x, screenSizePerspectiveMinSize(size.y, factor) / size.y, 1.0), size, factor.y);\n    }\n  "])))),e.vertex.code.add(r.glsl(S||(S=a.__makeTemplateObject(["\n    vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {\n      return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));\n    }\n  "],["\n    vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec4 params) {\n      return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));\n    }\n  "]))))}var i,t,o,l,p,z,S;Object.defineProperty(n,"__esModule",{value:!0}),n.ScreenSizePerspective=c,function(e){e.bindUniforms=function(e,n){if(n.screenSizePerspective){s.bindScreenSizePerspective(n.screenSizePerspective,e,"screenSizePerspective");var a=n.screenSizePerspectiveAlignment||n.screenSizePerspective;s.bindScreenSizePerspective(a,e,"screenSizePerspectiveAlignment")}}}(c=n.ScreenSizePerspective||(n.ScreenSizePerspective={}))}));