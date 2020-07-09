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

define(["require","exports","tslib","../webgl-engine/core/shaderLibrary/util/ColorConversion.glsl","../webgl-engine/core/shaderLibrary/util/RgbaFloatEncoding.glsl","../webgl-engine/core/shaderModules/interfaces","../webgl-engine/core/shaderModules/ShaderBuilder"],(function(e,a,n,t,r,l,o){var i,s,c,d,h,m,p,f,u,g,v,S,y,R,C,D,x,b,w,B,P;Object.defineProperty(a,"__esModule",{value:!0}),a.build=function(e){var a=new o.ShaderBuilder;return a.attributes.add("position","vec2"),a.attributes.add("uv0","vec2"),a.varyings.add("worldRay","vec3"),a.varyings.add("vtc","vec2"),e.haze&&a.varyings.add("eyeDir","vec3"),a.vertex.uniforms.add("projectionInverse","mat4"),a.vertex.uniforms.add("viewInverse","mat4"),a.vertex.code.add(l.glsl(s||(s=n.__makeTemplateObject(["\n    void main(void) {\n      vec3 posViewNear = (projectionInverse * vec4(position, -1, 1)).xyz;\n\n      worldRay = (viewInverse * vec4(posViewNear, 0)).xyz;\n      vtc = uv0;\n\n      ","\n\n      gl_Position = vec4(position, 1, 1);\n    }\n  "],["\n    void main(void) {\n      vec3 posViewNear = (projectionInverse * vec4(position, -1, 1)).xyz;\n\n      worldRay = (viewInverse * vec4(posViewNear, 0)).xyz;\n      vtc = uv0;\n\n      ","\n\n      gl_Position = vec4(position, 1, 1);\n    }\n  "])),e.haze?l.glsl(i||(i=n.__makeTemplateObject(["eyeDir = posViewNear;"],["eyeDir = posViewNear;"]))):"")),a.fragment.uniforms.add("lightingMainDirection","vec3").add("invWavelength","vec3").add("invWavelengthScaled","vec3").add("radii","vec2").add("atmosphereParameters1","vec4").add("atmosphereParameters2","vec4").add("cameraPosition","vec3").add("nearFar","vec2").add("heightParameters","vec4"),e.haze?a.fragment.uniforms.add("depthTex","sampler2D"):a.fragment.uniforms.add("atmosphereParameters3","vec3").add("innerFadeDistance","float").add("altitudeFade","float"),a.include(r.RgbaFloatEncoding),a.include(t.ColorConversion,{stages:1}),a.fragment.code.add(l.glsl(c||(c=n.__makeTemplateObject(["\n  // Atmosphere\n  const float krESun = 0.075;        // Kr * ESun = 0.005 * 15.0\n  const float kmESun = 0.015;        // Km * ESun = 0.005 * 15\n\n  // The inner (planetary) radius\n  #define innerRadius radii[0]\n  // The outer (atmosphere) radius\n  #define outerRadius radii[1]\n\n  // Atmosphere parameters:\n\n  // shellScale:               1.0 / (outerRadius - innerRadius)\n  #define shellScale atmosphereParameters1.x\n\n  // shellDepth:               The scale depth (i.e. the altitude at which the atmosphere's average density is found)\n  // scaleDepthBlue:           The scale depth (i.e. the altitude at which the atmosphere's average density is found)\n  #define shellDepth vec2(atmosphereParameters1.y, atmosphereParameters2.y)\n\n  // scaleOverScaleDepth:      scale / shellDepth\n  // scaleOverScaleDepthBlue:  scale / scaleDepthBlue\n  #define scaleOverScaleDepth vec2(atmosphereParameters1.z, atmosphereParameters2.z)\n\n  // oneOverScaleDepth:        1.0 / shellDepth\n  // oneOverScaleDepthBlue;    1.0 / scaleDepthBlue\n  #define oneOverScaleDepth vec2(atmosphereParameters1.w, atmosphereParameters2.w)\n  "],["\n  // Atmosphere\n  const float krESun = 0.075;        // Kr * ESun = 0.005 * 15.0\n  const float kmESun = 0.015;        // Km * ESun = 0.005 * 15\n\n  // The inner (planetary) radius\n  #define innerRadius radii[0]\n  // The outer (atmosphere) radius\n  #define outerRadius radii[1]\n\n  // Atmosphere parameters:\n\n  // shellScale:               1.0 / (outerRadius - innerRadius)\n  #define shellScale atmosphereParameters1.x\n\n  // shellDepth:               The scale depth (i.e. the altitude at which the atmosphere's average density is found)\n  // scaleDepthBlue:           The scale depth (i.e. the altitude at which the atmosphere's average density is found)\n  #define shellDepth vec2(atmosphereParameters1.y, atmosphereParameters2.y)\n\n  // scaleOverScaleDepth:      scale / shellDepth\n  // scaleOverScaleDepthBlue:  scale / scaleDepthBlue\n  #define scaleOverScaleDepth vec2(atmosphereParameters1.z, atmosphereParameters2.z)\n\n  // oneOverScaleDepth:        1.0 / shellDepth\n  // oneOverScaleDepthBlue;    1.0 / scaleDepthBlue\n  #define oneOverScaleDepth vec2(atmosphereParameters1.w, atmosphereParameters2.w)\n  "])))),e.haze||a.fragment.code.add(l.glsl(d||(d=n.__makeTemplateObject(["\n      #define g atmosphereParameters2.x\n      #define gSq atmosphereParameters3.x\n      #define miePhaseCoefficients atmosphereParameters3.y\n      #define lowerAlphaBlendBound atmosphereParameters3.z\n    "],["\n      #define g atmosphereParameters2.x\n      #define gSq atmosphereParameters3.x\n      #define miePhaseCoefficients atmosphereParameters3.y\n      #define lowerAlphaBlendBound atmosphereParameters3.z\n    "])))),a.fragment.code.add(l.glsl(h||(h=n.__makeTemplateObject(["\n  // The camera's current height\n  #define cameraHeight heightParameters[0]\n  // cameraHeight^2\n  #define cameraHeightSq heightParameters[1]\n  // cameraHeightSq - outerRadiusSq; // C = ||o-c||^2 - r^2\n  #define C heightParameters[2]\n  // cameraHeightSq - (innerRadiusSq - 63756370000.0); // C = ||o-c||^2 - r^2\n  #define CSur heightParameters[3]\n\n  ","\n    // Loop constants for integral approximation\n    const float samples = 5.0;\n    const int maxSamples = 5;\n\n    // ToneMapping operators\n    vec3 expTM(vec3 inputColor,float _exposure) {\n        return pow(1.0 - exp(inputColor * -_exposure), oneOverGamma);\n    }\n\n    // Approximation for inner integral based on a radii ratio of 10.25:10\n    float scale(float _cos) {\n      float x = 1.0 - _cos;\n      return exp( -0.00287 + x * ( 0.459 + x * ( 3.83 + x * (-6.80 + x * 5.25 ))));\n    }\n\n    void main() {\n      // Obtain ray from Camera\n      vec3 worldSpaceRay = normalize(worldRay);\n\n      // Compute Atmosphere intersection; i.e. ray/sphere intersection\n      float B = 2.0 * dot(cameraPosition, worldSpaceRay); // B = 2(l * (o-c))\n      float det = B * B - 4.0 * C; // det = B^2 - 4.0* C\n\n      // idealized sphere intersection to discard early some pixels\n      float detSur = B * B - 4.0 * CSur; // det = B^2 - 4.0* C\n\n      // the minimal sample start position:\n      // at the camera by default, on the earth radius surface if the camera is underground.\n      float minRayStart = 0.0;\n  "],["\n  // The camera's current height\n  #define cameraHeight heightParameters[0]\n  // cameraHeight^2\n  #define cameraHeightSq heightParameters[1]\n  // cameraHeightSq - outerRadiusSq; // C = ||o-c||^2 - r^2\n  #define C heightParameters[2]\n  // cameraHeightSq - (innerRadiusSq - 63756370000.0); // C = ||o-c||^2 - r^2\n  #define CSur heightParameters[3]\n\n  ","\n    // Loop constants for integral approximation\n    const float samples = 5.0;\n    const int maxSamples = 5;\n\n    // ToneMapping operators\n    vec3 expTM(vec3 inputColor,float _exposure) {\n        return pow(1.0 - exp(inputColor * -_exposure), oneOverGamma);\n    }\n\n    // Approximation for inner integral based on a radii ratio of 10.25:10\n    float scale(float _cos) {\n      float x = 1.0 - _cos;\n      return exp( -0.00287 + x * ( 0.459 + x * ( 3.83 + x * (-6.80 + x * 5.25 ))));\n    }\n\n    void main() {\n      // Obtain ray from Camera\n      vec3 worldSpaceRay = normalize(worldRay);\n\n      // Compute Atmosphere intersection; i.e. ray/sphere intersection\n      float B = 2.0 * dot(cameraPosition, worldSpaceRay); // B = 2(l * (o-c))\n      float det = B * B - 4.0 * C; // det = B^2 - 4.0* C\n\n      // idealized sphere intersection to discard early some pixels\n      float detSur = B * B - 4.0 * CSur; // det = B^2 - 4.0* C\n\n      // the minimal sample start position:\n      // at the camera by default, on the earth radius surface if the camera is underground.\n      float minRayStart = 0.0;\n  "])),e.haze?"// Camera HDR\n        const float exposure = 1.5;\n        const vec3 oneOverGamma = vec3(1.0); //Gamma = 1.0":"const float exposure = 2.0;\n        const vec3 oneOverGamma = vec3(0.454545); // Gamma = 2.2\n        vec3 reinhardTM(vec3 inputColor, float _exposure) {\n          vec3 intermediate = inputColor * _exposure;\n          intermediate /= ( 1.0 + intermediate );\n          return pow(intermediate, oneOverGamma);\n        }\n        ")),e.haze||a.fragment.code.add(l.glsl(m||(m=n.__makeTemplateObject(["\n      float surfaceBlend = 0.0;\n      vec4 surfaceColor = vec4(0.0);\n      if (detSur >= 0.0) {\n        float nearSurface = max(0.0, 0.5 *(-B - sqrt(detSur)));\n        float farSurface = max(0.0, 0.5 *(-B + sqrt(detSur)));\n\n        if (nearSurface == 0.0) {\n          minRayStart = farSurface;\n        }\n\n        // Compute lighting at the point where the ray enters the earth surface\n        // Lighting computation is copied from the terrain shader.\n        vec3 vPos = cameraPosition + worldSpaceRay * nearSurface;\n        float lightAngle = dot(-lightingMainDirection, normalize(vPos));\n        float brightness = max(0.0, (smoothstep(-1.0, 0.8, 2.0 * lightAngle)));\n\n        // Make the surface transparent based on altitude\n        surfaceColor = vec4(brightness, brightness, brightness, 1.0 - altitudeFade);\n\n        // Fade based on the distance the ray travels below the earth surface\n        float relDist = (farSurface - nearSurface) / innerFadeDistance;\n\n        // early exit\n        if (relDist > 1.0) {\n          gl_FragColor = surfaceColor;\n          return;\n        }\n\n        surfaceBlend = smoothstep(0.0, 1.0, relDist * relDist);\n      }\n    "],["\n      float surfaceBlend = 0.0;\n      vec4 surfaceColor = vec4(0.0);\n      if (detSur >= 0.0) {\n        float nearSurface = max(0.0, 0.5 *(-B - sqrt(detSur)));\n        float farSurface = max(0.0, 0.5 *(-B + sqrt(detSur)));\n\n        if (nearSurface == 0.0) {\n          minRayStart = farSurface;\n        }\n\n        // Compute lighting at the point where the ray enters the earth surface\n        // Lighting computation is copied from the terrain shader.\n        vec3 vPos = cameraPosition + worldSpaceRay * nearSurface;\n        float lightAngle = dot(-lightingMainDirection, normalize(vPos));\n        float brightness = max(0.0, (smoothstep(-1.0, 0.8, 2.0 * lightAngle)));\n\n        // Make the surface transparent based on altitude\n        surfaceColor = vec4(brightness, brightness, brightness, 1.0 - altitudeFade);\n\n        // Fade based on the distance the ray travels below the earth surface\n        float relDist = (farSurface - nearSurface) / innerFadeDistance;\n\n        // early exit\n        if (relDist > 1.0) {\n          gl_FragColor = surfaceColor;\n          return;\n        }\n\n        surfaceBlend = smoothstep(0.0, 1.0, relDist * relDist);\n      }\n    "])))),a.fragment.code.add(l.glsl(p||(p=n.__makeTemplateObject(["\n    if (det >= 0.0) {\n    ","\n    float rayStart = 0.5 *(-B - sqrt(det)); //near intersection with atmosphere\n    ","\n\n    float scatterDistance; // calculate its scattering offset\n    // Calculate the ray's starting position\n    if (rayStart < minRayStart)\n    { // ray starts from camera or inner radius sphere to far\n      rayStart = minRayStart;\n      ","\n    }\n    ","\n    // Initialize the scattering loop variables\n    vec3 start = cameraPosition + worldSpaceRay * rayStart;\n  "],["\n    if (det >= 0.0) {\n    ","\n    float rayStart = 0.5 *(-B - sqrt(det)); //near intersection with atmosphere\n    ","\n\n    float scatterDistance; // calculate its scattering offset\n    // Calculate the ray's starting position\n    if (rayStart < minRayStart)\n    { // ray starts from camera or inner radius sphere to far\n      rayStart = minRayStart;\n      ","\n    }\n    ","\n    // Initialize the scattering loop variables\n    vec3 start = cameraPosition + worldSpaceRay * rayStart;\n  "])),e.haze?"\n          float depthSample = texture2D(depthTex, vtc).r;\n\n          float zNear = nearFar[0];\n          float zFar = nearFar[1];\n\n          // http://web.archive.org/web/20130416194336/http://olivers.posterous.com/linear-depth-in-glsl-for-real\n          float zNorm = 2.0 * depthSample - 1.0;\n          float linDepth = 2.0 * zNear * zFar /\n            (zFar + zNear - zNorm * (zFar - zNear));\n\n          float rayEnd;\n          float altitudeAlpha = 1.0;\n\n          // find intersections with ground, but only between the near and far\n          // clipping planes.\n          if (depthSample < 1.0 && depthSample > 0.0) {\n            vec3 cameraSpaceRay = normalize(eyeDir);\n            cameraSpaceRay /= cameraSpaceRay.z;\n            cameraSpaceRay *= linDepth;\n\n            float cameraSpaceRayLength = length(cameraSpaceRay);\n\n            vec3 world = cameraPosition + worldSpaceRay * cameraSpaceRayLength;\n            float worldRadiusSq = dot(world, world);\n\n            // Handle tall structures:\n            // https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/5450\n            float transitionStart = innerRadius + 20000.0;\n            float transitionHeight = 25000.0;\n            float transitionEnd = transitionStart + transitionHeight;\n\n            float edge0 = transitionStart * transitionStart;\n            float edge1 = transitionEnd * transitionEnd;\n\n            altitudeAlpha = 1.0 - clamp((worldRadiusSq - edge0) / (edge1 - edge0), 0.0, 1.0);\n            rayEnd = cameraSpaceRayLength;\n\n            if (altitudeAlpha > 0.0 && detSur > 0.0) {\n              float nearSurface = 0.5 * ( -B - sqrt(detSur) );\n              float interp = clamp(((cameraHeight - innerRadius) - 2000000.0) / 6000000.0, 0.0, 1.0);\n              rayEnd = mix(cameraSpaceRayLength, nearSurface, interp);\n            }\n          }":"",e.haze?"float near = abs(rayStart);\n        float far = abs(rayEnd);":"float rayEnd = 0.5 *(-B + sqrt(det)); //far intersection with atmosphere",e.haze?"":"// clamp to value at inner radius altitude\n          scatterDistance = shellScale * min(0.0, innerRadius - cameraHeight);",e.haze?"":"else { // outside atmosphere\n          scatterDistance = -1.0;\n        }")),e.haze&&a.fragment.code.add(l.glsl(f||(f=n.__makeTemplateObject(["\n      vec3 end = cameraPosition + worldSpaceRay * rayEnd;\n\n      float endLength = length(end);\n      //altitudeStart, altitudeEnd\n      vec2 altitudeInterval = vec2(length(start) - innerRadius, endLength - innerRadius);\n\n      // for camera positions below altitude 0, invert the altitudes, to achieve\n      // a similar haze as above ground. Note that there is a small but visible change\n      // when the camera passes altitude 0.\n      if (altitudeInterval.x < 0.0) {\n        altitudeInterval = -altitudeInterval;\n      }\n\n      // computed for the original end point to get consistent light angles after possible inversions\n      float lightAngle = dot(-lightingMainDirection, end) / endLength;\n\n      if (near > far)\n      {\n        if (altitudeInterval.x < altitudeInterval.y)\n        {\n          // Switch positive slopes for flipped rays\n          end = cameraPosition + worldSpaceRay * rayStart;\n          start = cameraPosition + worldSpaceRay * rayEnd;\n          worldSpaceRay *= -1.0;\n          float tmp = altitudeInterval.x;\n          altitudeInterval.x = altitudeInterval.y;\n          altitudeInterval.y = tmp;\n        }\n        else if (altitudeInterval.x == altitudeInterval.y)\n        { // create minuscule fake slope for integration if the slope is zero\n          altitudeInterval.x += 1.0; //BUGFIX, if the height of camera and ground is equal the equation breaks, add fake meter to camera height to get\n          // slope for the camera function\n        }\n      }\n\n      // Calculate its scattering offset\n      // Assumes camera constrains of WSV 3.8\n      if (altitudeInterval.x > outerRadius - innerRadius)\n      { // outside atmosphere\n        scatterDistance = innerRadius - outerRadius;\n      } else\n      {\n        scatterDistance = altitudeInterval.y - altitudeInterval.x;\n      }\n    "],["\n      vec3 end = cameraPosition + worldSpaceRay * rayEnd;\n\n      float endLength = length(end);\n      //altitudeStart, altitudeEnd\n      vec2 altitudeInterval = vec2(length(start) - innerRadius, endLength - innerRadius);\n\n      // for camera positions below altitude 0, invert the altitudes, to achieve\n      // a similar haze as above ground. Note that there is a small but visible change\n      // when the camera passes altitude 0.\n      if (altitudeInterval.x < 0.0) {\n        altitudeInterval = -altitudeInterval;\n      }\n\n      // computed for the original end point to get consistent light angles after possible inversions\n      float lightAngle = dot(-lightingMainDirection, end) / endLength;\n\n      if (near > far)\n      {\n        if (altitudeInterval.x < altitudeInterval.y)\n        {\n          // Switch positive slopes for flipped rays\n          end = cameraPosition + worldSpaceRay * rayStart;\n          start = cameraPosition + worldSpaceRay * rayEnd;\n          worldSpaceRay *= -1.0;\n          float tmp = altitudeInterval.x;\n          altitudeInterval.x = altitudeInterval.y;\n          altitudeInterval.y = tmp;\n        }\n        else if (altitudeInterval.x == altitudeInterval.y)\n        { // create minuscule fake slope for integration if the slope is zero\n          altitudeInterval.x += 1.0; //BUGFIX, if the height of camera and ground is equal the equation breaks, add fake meter to camera height to get\n          // slope for the camera function\n        }\n      }\n\n      // Calculate its scattering offset\n      // Assumes camera constrains of WSV 3.8\n      if (altitudeInterval.x > outerRadius - innerRadius)\n      { // outside atmosphere\n        scatterDistance = innerRadius - outerRadius;\n      } else\n      {\n        scatterDistance = altitudeInterval.y - altitudeInterval.x;\n      }\n    "])))),a.fragment.code.add(l.glsl(u||(u=n.__makeTemplateObject(["\n    vec2 opticalStartDepth = exp(scatterDistance * oneOverScaleDepth);\n\n    float rayLength = rayEnd - rayStart;\n    float sampleLength = rayLength / samples;\n    float scaledLength = sampleLength * shellScale;\n    vec3 sampleRay = worldSpaceRay * sampleLength;\n    vec3 samplePoint = start + sampleRay * 0.5;\n  "],["\n    vec2 opticalStartDepth = exp(scatterDistance * oneOverScaleDepth);\n\n    float rayLength = rayEnd - rayStart;\n    float sampleLength = rayLength / samples;\n    float scaledLength = sampleLength * shellScale;\n    vec3 sampleRay = worldSpaceRay * sampleLength;\n    vec3 samplePoint = start + sampleRay * 0.5;\n  "])))),e.haze?a.fragment.code.add(l.glsl(g||(g=n.__makeTemplateObject(["\n      float cameraAngle = dot(-worldSpaceRay, end) / length(end);\n      float scaleCameraAngle = scale(cameraAngle);\n      vec2 cameraOffset = scaleCameraAngle * opticalStartDepth;\n\n      float scaledValues = scale(lightAngle) + scaleCameraAngle;\n      vec2 scaledValuesDepth = scaledValues * shellDepth;\n    "],["\n      float cameraAngle = dot(-worldSpaceRay, end) / length(end);\n      float scaleCameraAngle = scale(cameraAngle);\n      vec2 cameraOffset = scaleCameraAngle * opticalStartDepth;\n\n      float scaledValues = scale(lightAngle) + scaleCameraAngle;\n      vec2 scaledValuesDepth = scaledValues * shellDepth;\n    "])))):a.fragment.code.add(l.glsl(v||(v=n.__makeTemplateObject(["\n      float cameraAngle = dot(worldSpaceRay, start / length(start));\n      float angleMultiplier = cameraAngle > 0.0 ? cameraAngle : 0.0;\n\n      float scaleCameraAngle = scale(cameraAngle);\n      vec2 cameraOffset = scaleCameraAngle * opticalStartDepth * shellDepth;\n    "],["\n      float cameraAngle = dot(worldSpaceRay, start / length(start));\n      float angleMultiplier = cameraAngle > 0.0 ? cameraAngle : 0.0;\n\n      float scaleCameraAngle = scale(cameraAngle);\n      vec2 cameraOffset = scaleCameraAngle * opticalStartDepth * shellDepth;\n    "])))),a.fragment.code.add(l.glsl(S||(S=n.__makeTemplateObject(["\n    // Loop variables\n    vec3 frontColor = vec3(0.0);\n    vec3 frontColorBlue = vec3(0.0);\n    vec3 attenuate = vec3(0.0);\n    vec3 attenuateBlue = vec3(0.0);\n\n    // Now loop through the sample rays\n    for(int i=0; i<maxSamples; i++) {\n      float height = length(samplePoint);\n      float altitude = abs(height - innerRadius);\n\n      vec2 depth = exp(-altitude * scaleOverScaleDepth);\n  "],["\n    // Loop variables\n    vec3 frontColor = vec3(0.0);\n    vec3 frontColorBlue = vec3(0.0);\n    vec3 attenuate = vec3(0.0);\n    vec3 attenuateBlue = vec3(0.0);\n\n    // Now loop through the sample rays\n    for(int i=0; i<maxSamples; i++) {\n      float height = length(samplePoint);\n      float altitude = abs(height - innerRadius);\n\n      vec2 depth = exp(-altitude * scaleOverScaleDepth);\n  "])))),e.haze?a.fragment.code.add(l.glsl(y||(y=n.__makeTemplateObject(["\n      vec2 scatter = depth * scaledValuesDepth - cameraOffset;\n    "],["\n      vec2 scatter = depth * scaledValuesDepth - cameraOffset;\n    "])))):a.fragment.code.add(l.glsl(R||(R=n.__makeTemplateObject(["\n      float lightAngle = dot(-lightingMainDirection, samplePoint) / height;\n      float cameraAngle = dot(worldSpaceRay, samplePoint) / height;\n      float tmpScaledValues = scale(lightAngle) - scale(cameraAngle);\n      vec2 scatter = cameraOffset + tmpScaledValues * depth * shellDepth;\n    "],["\n      float lightAngle = dot(-lightingMainDirection, samplePoint) / height;\n      float cameraAngle = dot(worldSpaceRay, samplePoint) / height;\n      float tmpScaledValues = scale(lightAngle) - scale(cameraAngle);\n      vec2 scatter = cameraOffset + tmpScaledValues * depth * shellDepth;\n    "])))),a.fragment.code.add(l.glsl(C||(C=n.__makeTemplateObject(["\n      attenuate = exp(-scatter.x * invWavelengthScaled);\n      attenuateBlue = exp(-scatter.y * invWavelengthScaled);\n\n      frontColor += attenuate * depth.x;\n      frontColorBlue += attenuateBlue * depth.y;\n\n      samplePoint += sampleRay;\n    }\n\n    // Phase computation\n    // clamp to avoid numerical instability at fCos == -1.0 (and close values) to display fake sun\n    float LdotR = clamp(dot(-lightingMainDirection, -worldSpaceRay ),-0.9999999,1.0);\n    float LdotRSq = LdotR * LdotR + 1.0;\n  "],["\n      attenuate = exp(-scatter.x * invWavelengthScaled);\n      attenuateBlue = exp(-scatter.y * invWavelengthScaled);\n\n      frontColor += attenuate * depth.x;\n      frontColorBlue += attenuateBlue * depth.y;\n\n      samplePoint += sampleRay;\n    }\n\n    // Phase computation\n    // clamp to avoid numerical instability at fCos == -1.0 (and close values) to display fake sun\n    float LdotR = clamp(dot(-lightingMainDirection, -worldSpaceRay ),-0.9999999,1.0);\n    float LdotRSq = LdotR * LdotR + 1.0;\n  "])))),e.haze?a.fragment.code.add(l.glsl(D||(D=n.__makeTemplateObject(["\n      // Finally, scale the Rayleigh colors and set up the varying variables for the pixel shader\n      vec3 colorCoefficients = (scaledLength * 0.75 * LdotRSq) * (krESun * invWavelength + kmESun );\n\n      // Scaled Length is only applied afterwards to save multiplications\n      vec3 color = colorCoefficients * frontColor;\n      vec3 colorBlue = colorCoefficients * frontColorBlue;\n    "],["\n      // Finally, scale the Rayleigh colors and set up the varying variables for the pixel shader\n      vec3 colorCoefficients = (scaledLength * 0.75 * LdotRSq) * (krESun * invWavelength + kmESun );\n\n      // Scaled Length is only applied afterwards to save multiplications\n      vec3 color = colorCoefficients * frontColor;\n      vec3 colorBlue = colorCoefficients * frontColorBlue;\n    "])))):a.fragment.code.add(l.glsl(x||(x=n.__makeTemplateObject(["\n      vec3 rayleighCoefficients = (scaledLength * 0.75 * LdotRSq * krESun) * invWavelength;\n      float mieCoefficients = scaledLength * kmESun * miePhaseCoefficients * LdotRSq / pow(1.0 + gSq - 2.0 * g * LdotR, 1.5);\n\n      // Calculate the attenuation factor for the ground\n      vec3 color = rayleighCoefficients * frontColor + mieCoefficients * frontColor;\n      vec3 colorBlue = rayleighCoefficients * frontColorBlue + mieCoefficients * frontColorBlue;\n    "],["\n      vec3 rayleighCoefficients = (scaledLength * 0.75 * LdotRSq * krESun) * invWavelength;\n      float mieCoefficients = scaledLength * kmESun * miePhaseCoefficients * LdotRSq / pow(1.0 + gSq - 2.0 * g * LdotR, 1.5);\n\n      // Calculate the attenuation factor for the ground\n      vec3 color = rayleighCoefficients * frontColor + mieCoefficients * frontColor;\n      vec3 colorBlue = rayleighCoefficients * frontColorBlue + mieCoefficients * frontColorBlue;\n    "])))),a.fragment.code.add(l.glsl(b||(b=n.__makeTemplateObject(["\n    // HDR to LDR conversion\n    vec3 ldrBlue = expTM(colorBlue, 2.0 * exposure);\n    vec3 ldrRed = expTM(color, exposure);\n\n    // mix reddish and blueish atmosphere\n    vec3 LDR = mix(ldrBlue, ldrRed, 0.2);\n  "],["\n    // HDR to LDR conversion\n    vec3 ldrBlue = expTM(colorBlue, 2.0 * exposure);\n    vec3 ldrRed = expTM(color, exposure);\n\n    // mix reddish and blueish atmosphere\n    vec3 LDR = mix(ldrBlue, ldrRed, 0.2);\n  "])))),e.haze?a.fragment.code.add(l.glsl(w||(w=n.__makeTemplateObject(["\n      LDR *= (1.0 - cameraAngle);\n      vec3 hsv = rgb2hsv(LDR);\n      hsv.y = clamp(hsv.y * 1.5, 0.0, 1.0); // boost haze saturation by 50%\n      LDR = hsv2rgb(hsv);\n      vec3 finalColor = LDR;\n      // when rendering we specify the blend functions such that\n      // newDestColor = oldDestColor*(1.0-finalColor) + finalColor\n    "],["\n      LDR *= (1.0 - cameraAngle);\n      vec3 hsv = rgb2hsv(LDR);\n      hsv.y = clamp(hsv.y * 1.5, 0.0, 1.0); // boost haze saturation by 50%\n      LDR = hsv2rgb(hsv);\n      vec3 finalColor = LDR;\n      // when rendering we specify the blend functions such that\n      // newDestColor = oldDestColor*(1.0-finalColor) + finalColor\n    "])))):a.fragment.code.add(l.glsl(B||(B=n.__makeTemplateObject(["\n      // reinhard tonemapper for looking upwards\n      vec3 ldrReinhard = reinhardTM(color, exposure);\n      LDR += angleMultiplier * ldrReinhard;\n\n      // height dependent parameter to smooth out reddish atmosphere\n      float side = (rayEnd + rayStart) * 0.5;\n      float atmoHeight = sqrt(cameraHeightSq - side * side);\n      float h2 = clamp(1.0 - ( atmoHeight - lowerAlphaBlendBound ) / ( outerRadius - lowerAlphaBlendBound ), 0.0, 1.0);\n\n      vec3 finalColor = LDR * h2;\n      vec3 hsv = rgb2hsv(finalColor);\n      hsv.y = clamp(hsv.y * 1.5, 0.0, 1.0); // boost sky saturation by 50%\n      finalColor = hsv2rgb(hsv);\n    "],["\n      // reinhard tonemapper for looking upwards\n      vec3 ldrReinhard = reinhardTM(color, exposure);\n      LDR += angleMultiplier * ldrReinhard;\n\n      // height dependent parameter to smooth out reddish atmosphere\n      float side = (rayEnd + rayStart) * 0.5;\n      float atmoHeight = sqrt(cameraHeightSq - side * side);\n      float h2 = clamp(1.0 - ( atmoHeight - lowerAlphaBlendBound ) / ( outerRadius - lowerAlphaBlendBound ), 0.0, 1.0);\n\n      vec3 finalColor = LDR * h2;\n      vec3 hsv = rgb2hsv(finalColor);\n      hsv.y = clamp(hsv.y * 1.5, 0.0, 1.0); // boost sky saturation by 50%\n      finalColor = hsv2rgb(hsv);\n    "])))),a.fragment.code.add(l.glsl(P||(P=n.__makeTemplateObject(["\n    ","\n      } else { // Outside Atmosphere\n        gl_FragColor = vec4(0.0);\n      }\n    }\n  "],["\n    ","\n      } else { // Outside Atmosphere\n        gl_FragColor = vec4(0.0);\n      }\n    }\n  "])),e.haze?"gl_FragColor = vec4(finalColor, 1.0) * altitudeAlpha;":"float atmosStrength = clamp((length(ldrRed) - 0.05) * 1.05, 0.0, 1.0);\n          gl_FragColor = vec4(finalColor, atmosStrength * clamp(1.0 - ( atmoHeight - innerRadius ) / (outerRadius - innerRadius), 0.0, 1.0));\n          if (surfaceBlend > 0.0) {\n            gl_FragColor = mix(gl_FragColor, surfaceColor, surfaceBlend);\n          }")),a}}));