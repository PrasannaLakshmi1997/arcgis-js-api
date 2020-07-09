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

define(["require","exports","tslib","./AnalyticalSkyModel.glsl","./PiUtils.glsl","../../shaderModules/interfaces"],(function(e,n,o,t,a,r){var l,i,c,d,s,f,u,g,p,m,v;Object.defineProperty(n,"__esModule",{value:!0}),n.PhysicallyBasedRendering=function(e,n){var h=e.fragment.code;e.include(a.PiUtils),3===n.pbrMode||4===n.pbrMode?(h.add(r.glsl(l||(l=o.__makeTemplateObject(["\n    struct PBRShadingWater\n    {\n        float NdotL;   // cos angle between normal and light direction\n        float NdotV;   // cos angle between normal and view direction\n        float NdotH;   // cos angle between normal and half vector\n        float VdotH;   // cos angle between view direction and half vector\n        float LdotH;   // cos angle between light direction and half vector\n        float VdotN;   // cos angle between view direction and normal vector\n    };\n\n    float dtrExponent = ",";\n    "],["\n    struct PBRShadingWater\n    {\n        float NdotL;   // cos angle between normal and light direction\n        float NdotV;   // cos angle between normal and view direction\n        float NdotH;   // cos angle between normal and half vector\n        float VdotH;   // cos angle between view direction and half vector\n        float LdotH;   // cos angle between light direction and half vector\n        float VdotN;   // cos angle between view direction and normal vector\n    };\n\n    float dtrExponent = ",";\n    "])),n.useCustomDTRExponentForWater?"2.2":"2.0")),h.add(r.glsl(i||(i=o.__makeTemplateObject(["\n    vec3 fresnelReflection(float angle, vec3 f0, float f90) {\n      return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);\n    }\n    "],["\n    vec3 fresnelReflection(float angle, vec3 f0, float f90) {\n      return f0 + (f90 - f0) * pow(1.0 - angle, 5.0);\n    }\n    "])))),h.add(r.glsl(c||(c=o.__makeTemplateObject(["\n    float normalDistributionWater(float NdotH, float roughness)\n    {\n      float r2 = roughness * roughness;\n      float NdotH2 = NdotH * NdotH;\n      float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;\n      return r2 / denom;\n    }\n    "],["\n    float normalDistributionWater(float NdotH, float roughness)\n    {\n      float r2 = roughness * roughness;\n      float NdotH2 = NdotH * NdotH;\n      float denom = pow((NdotH2 * (r2 - 1.0) + 1.0), dtrExponent) * PI;\n      return r2 / denom;\n    }\n    "])))),h.add(r.glsl(d||(d=o.__makeTemplateObject(["\n    float geometricOcclusionKelemen(float LoH)\n    {\n        return 0.25 / (LoH * LoH);\n    }\n    "],["\n    float geometricOcclusionKelemen(float LoH)\n    {\n        return 0.25 / (LoH * LoH);\n    }\n    "])))),h.add(r.glsl(s||(s=o.__makeTemplateObject(["\n    vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)\n    {\n      vec3  F = fresnelReflection(props.VdotH, F0, F0Max);\n      float dSun = normalDistributionWater(props.NdotH, roughness);\n      float V = geometricOcclusionKelemen(props.LdotH);\n\n      float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);\n      float strengthSunHaze  = 1.2;\n      float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;\n\n      return ((dSun + dSunHaze) * V) * F;\n    }\n\n    vec3 tonemapACES(const vec3 x) {\n      return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);\n    }\n    "],["\n    vec3 brdfSpecularWater(in PBRShadingWater props, float roughness, vec3 F0, float F0Max)\n    {\n      vec3  F = fresnelReflection(props.VdotH, F0, F0Max);\n      float dSun = normalDistributionWater(props.NdotH, roughness);\n      float V = geometricOcclusionKelemen(props.LdotH);\n\n      float diffusionSunHaze = mix(roughness + 0.045, roughness + 0.385, 1.0 - props.VdotH);\n      float strengthSunHaze  = 1.2;\n      float dSunHaze = normalDistributionWater(props.NdotH, diffusionSunHaze)*strengthSunHaze;\n\n      return ((dSun + dSunHaze) * V) * F;\n    }\n\n    vec3 tonemapACES(const vec3 x) {\n      return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);\n    }\n    "]))))):1!==n.pbrMode&&2!==n.pbrMode||(e.include(t.AnalyticalSkyModel),h.add(r.glsl(f||(f=o.__makeTemplateObject(["\n    struct PBRShadingInfo\n    {\n        float NdotL;                  // cos angle between normal and light direction\n        float NdotV;                  // cos angle between normal and view direction\n        float NdotH;                  // cos angle between normal and half vector\n        float VdotH;                  // cos angle between view direction and half vector\n        float LdotH;                  // cos angle between view light direction and half vector\n        float NdotNG;                 // cos angle between normal and normal of the ground\n        float RdotNG;                 // cos angle between view direction reflected of the normal and normal of the ground\n        float NdotAmbDir;             // cos angle between view direction and the fill light in ambient illumination\n        float NdotH_Horizon;          // cos angle between normal and half vector defined with horizon illumination\n        vec3 skyRadianceToSurface;         // integrated radiance of the sky based on the surface roughness (used for specular reflection)\n        vec3 groundRadianceToSurface;      // integrated radiance of the ground based on the surface roughness (used for specular reflection)\n        vec3 skyIrradianceToSurface;       // irradiance of the sky (used for diffuse reflection)\n        vec3 groundIrradianceToSurface;    // irradiance of the ground (used for diffuse reflection)\n\n        float averageAmbientRadiance;      // average ambient radiance used to deduce black level in gamut mapping\n        float ssao;                   // ssao coefficient\n        vec3 albedoLinear;            // linear color of the albedo\n        vec3 f0;                      // fresnel value at normal incident light\n        vec3 f90;                     // fresnel value at 90o of incident light\n\n        vec3 diffuseColor;            // diffuse color of the material used in environment illumination\n        float metalness;              // metalness of the material\n        float roughness;              // roughness of the material\n    };\n    "],["\n    struct PBRShadingInfo\n    {\n        float NdotL;                  // cos angle between normal and light direction\n        float NdotV;                  // cos angle between normal and view direction\n        float NdotH;                  // cos angle between normal and half vector\n        float VdotH;                  // cos angle between view direction and half vector\n        float LdotH;                  // cos angle between view light direction and half vector\n        float NdotNG;                 // cos angle between normal and normal of the ground\n        float RdotNG;                 // cos angle between view direction reflected of the normal and normal of the ground\n        float NdotAmbDir;             // cos angle between view direction and the fill light in ambient illumination\n        float NdotH_Horizon;          // cos angle between normal and half vector defined with horizon illumination\n        vec3 skyRadianceToSurface;         // integrated radiance of the sky based on the surface roughness (used for specular reflection)\n        vec3 groundRadianceToSurface;      // integrated radiance of the ground based on the surface roughness (used for specular reflection)\n        vec3 skyIrradianceToSurface;       // irradiance of the sky (used for diffuse reflection)\n        vec3 groundIrradianceToSurface;    // irradiance of the ground (used for diffuse reflection)\n\n        float averageAmbientRadiance;      // average ambient radiance used to deduce black level in gamut mapping\n        float ssao;                   // ssao coefficient\n        vec3 albedoLinear;            // linear color of the albedo\n        vec3 f0;                      // fresnel value at normal incident light\n        vec3 f90;                     // fresnel value at 90o of incident light\n\n        vec3 diffuseColor;            // diffuse color of the material used in environment illumination\n        float metalness;              // metalness of the material\n        float roughness;              // roughness of the material\n    };\n    "])))),h.add(r.glsl(u||(u=o.__makeTemplateObject(["\n    float normalDistribution(float NdotH, float roughness)\n    {\n        float a = NdotH * roughness;\n        float b = roughness / (1.0 - NdotH * NdotH + a * a);\n        return b * b * INV_PI;\n    }\n    "],["\n    float normalDistribution(float NdotH, float roughness)\n    {\n        float a = NdotH * roughness;\n        float b = roughness / (1.0 - NdotH * NdotH + a * a);\n        return b * b * INV_PI;\n    }\n    "])))),h.add(r.glsl(g||(g=o.__makeTemplateObject(["\n    const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);\n    const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);\n    const vec2 c2 = vec2(-1.04, 1.04);\n\n    vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {\n        vec4 r = roughness * c0 + c1;\n        float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;\n        return c2 * a004 + r.zw;\n    }\n    "],["\n    const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);\n    const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);\n    const vec2 c2 = vec2(-1.04, 1.04);\n\n    vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {\n        vec4 r = roughness * c0 + c1;\n        float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;\n        return c2 * a004 + r.zw;\n    }\n    "])))),h.add(r.glsl(p||(p=o.__makeTemplateObject(["\n    vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {\n      vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);\n      vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);\n\n      // From diffuse illumination calculate reflected color\n      vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;\n\n      // From specular illumination calculate reflected color\n      vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);\n      vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;\n      vec3 specularComponent = specularColor * indirectSpecular;\n\n      return (diffuseComponent + specularComponent);\n    }\n    "],["\n    vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {\n      vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);\n      vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);\n\n      // From diffuse illumination calculate reflected color\n      vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;\n\n      // From specular illumination calculate reflected color\n      vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);\n      vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;\n      vec3 specularComponent = specularColor * indirectSpecular;\n\n      return (diffuseComponent + specularComponent);\n    }\n    "])))),h.add(r.glsl(m||(m=o.__makeTemplateObject(["\n    float gamutMapChanel(float x, vec2 p){\n      return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );\n    }"],["\n    float gamutMapChanel(float x, vec2 p){\n      return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );\n    }"])))),h.add(r.glsl(v||(v=o.__makeTemplateObject(["\n    vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){\n      vec3 outColor;\n      vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));\n      outColor.x = gamutMapChanel(inColor.x, p) ;\n      outColor.y = gamutMapChanel(inColor.y, p) ;\n      outColor.z = gamutMapChanel(inColor.z, p) ;\n      return outColor;\n    }\n    "],["\n    vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){\n      vec3 outColor;\n      vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));\n      outColor.x = gamutMapChanel(inColor.x, p) ;\n      outColor.y = gamutMapChanel(inColor.y, p) ;\n      outColor.z = gamutMapChanel(inColor.z, p) ;\n      return outColor;\n    }\n    "])))))}}));