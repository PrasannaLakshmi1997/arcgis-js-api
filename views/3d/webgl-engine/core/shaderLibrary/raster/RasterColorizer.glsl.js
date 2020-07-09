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

define(["require","exports","tslib","./BasicGrid.glsl","./Colormap.glsl","./Common.glsl","../util/ColorConversion.glsl","../../shaderModules/interfaces","../../shaderModules/ShaderBuilder"],(function(a,e,n,t,l,o,i,u,r){var c,f,m,x,s,g,v,d,_,p;Object.defineProperty(e,"__esModule",{value:!0}),e.build=function(a){var e=new r.ShaderBuilder;return e.include(t.BasicGrid),e.include(o.Common),e.include(l.Colormap),0===a.output?function(a,e){a.fragment.uniforms.add("u_bandCount","int"),a.fragment.uniforms.add("u_minCutOff","float",3),a.fragment.uniforms.add("u_maxCutOff","float",3),a.fragment.uniforms.add("u_factor","float",3),a.fragment.uniforms.add("u_minOutput","float"),a.fragment.uniforms.add("u_maxOutput","float"),a.fragment.uniforms.add("u_useGamma","bool"),a.fragment.uniforms.add("u_gamma","float",3),a.fragment.uniforms.add("u_gammaCorrection","float",3),a.fragment.code.add(u.glsl(f||(f=n.__makeTemplateObject(["\n      float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {\n        // clamp values\n        if (val >= maxCutOff) {\n          return maxOutput;\n        } else if (val <= minCutOff) {\n          return minOutput;\n        }\n\n        // stretch a single value based on whether to use gamma\n        float stretchedVal;\n        if (useGamma) {\n          float tempf = 1.0;\n          float outRange = maxOutput - minOutput;\n          float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);\n          if (gamma > 1.0) {\n            tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);\n          }\n          stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;\n        } else {\n          stretchedVal = minOutput + (val - minCutOff) * factor;\n        }\n        return stretchedVal;\n      }\n    "],["\n      float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {\n        // clamp values\n        if (val >= maxCutOff) {\n          return maxOutput;\n        } else if (val <= minCutOff) {\n          return minOutput;\n        }\n\n        // stretch a single value based on whether to use gamma\n        float stretchedVal;\n        if (useGamma) {\n          float tempf = 1.0;\n          float outRange = maxOutput - minOutput;\n          float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);\n          if (gamma > 1.0) {\n            tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);\n          }\n          stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;\n        } else {\n          stretchedVal = minOutput + (val - minCutOff) * factor;\n        }\n        return stretchedVal;\n      }\n    "]))));var t=e?u.glsl(m||(m=n.__makeTemplateObject(["gl_FragColor = colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma);"],["gl_FragColor = colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma);"]))):u.glsl(x||(x=n.__makeTemplateObject(["gl_FragColor = vec4(grayVal, grayVal, grayVal, 1.0) * currentPixel.a * u_opacity;"],["gl_FragColor = vec4(grayVal, grayVal, grayVal, 1.0) * currentPixel.a * u_opacity;"])));a.fragment.code.add(u.glsl(s||(s=n.__makeTemplateObject(["\n      void main() {\n        vec2 pixelLocation = getPixelLocation(v_texcoord);\n        if (isOutside(pixelLocation)) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        vec4 currentPixel = getPixel(pixelLocation);\n        if (currentPixel.a == 0.0) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        if (u_bandCount == 1) {\n          float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);\n          ","\n        } else {\n          float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);\n          float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);\n          float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);\n          gl_FragColor = vec4(redVal, greenVal, blueVal, 1.0) * currentPixel.a * u_opacity;\n        }\n      }\n    "],["\n      void main() {\n        vec2 pixelLocation = getPixelLocation(v_texcoord);\n        if (isOutside(pixelLocation)) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        vec4 currentPixel = getPixel(pixelLocation);\n        if (currentPixel.a == 0.0) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        if (u_bandCount == 1) {\n          float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);\n          ","\n        } else {\n          float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);\n          float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);\n          float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);\n          gl_FragColor = vec4(redVal, greenVal, blueVal, 1.0) * currentPixel.a * u_opacity;\n        }\n      }\n    "])),t))}(e,a.applyColormap):1===a.output?function(a){a.fragment.code.add(u.glsl(c||(c=n.__makeTemplateObject(["\n      void main() {\n        // get pixel location\n        vec2 pixelLocation = getPixelLocation(v_texcoord);\n        if (isOutside(pixelLocation)) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        vec4 currentPixel = getPixel(pixelLocation);\n        // apply colormap we use float texture here\n        gl_FragColor = colormap(currentPixel, true);\n      }\n    "],["\n      void main() {\n        // get pixel location\n        vec2 pixelLocation = getPixelLocation(v_texcoord);\n        if (isOutside(pixelLocation)) {\n          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n          return;\n        }\n\n        vec4 currentPixel = getPixel(pixelLocation);\n        // apply colormap we use float texture here\n        gl_FragColor = colormap(currentPixel, true);\n      }\n    "]))))}(e):2===a.output&&function(a,e){a.fragment.uniforms.add("u_hillshadeType","int"),a.fragment.uniforms.add("u_sinZcosAs","float",6),a.fragment.uniforms.add("u_sinZsinAs","float",6),a.fragment.uniforms.add("u_cosZs","float",6),a.fragment.uniforms.add("u_weights","float",6),a.fragment.uniforms.add("u_factor","vec2"),a.fragment.uniforms.add("u_applyColormap","bool"),a.fragment.uniforms.add("u_minValue","float"),a.fragment.uniforms.add("u_maxValue","float"),a.fragment.uniforms.add("u_srcImageSize","vec2"),a.include(i.ColorConversion,{stages:1}),a.fragment.code.add(u.glsl(g||(g=n.__makeTemplateObject(["\n  vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {\n    val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);\n    vec4 rgb = colormap(vec4(val, val, val, 1.0), false);\n    vec3 hsv = rgb2hsv(rgb.xyz);\n    hsv.z = hillshade;\n    return vec4(hsv2rgb(hsv) * alpha, alpha);\n  }\n"],["\n  vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {\n    val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);\n    vec4 rgb = colormap(vec4(val, val, val, 1.0), false);\n    vec3 hsv = rgb2hsv(rgb.xyz);\n    hsv.z = hillshade;\n    return vec4(hsv2rgb(hsv) * alpha, alpha);\n  }\n"])))),a.fragment.code.add(u.glsl(v||(v=n.__makeTemplateObject(["\n    float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){\n      if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {\n        return 0.0;\n      }  else {\n        return e;\n      }\n    }\n  "],["\n    float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){\n      if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {\n        return 0.0;\n      }  else {\n        return e;\n      }\n    }\n  "]))));var t=e?u.glsl(d||(d=n.__makeTemplateObject(["gl_FragColor = overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha);"],["gl_FragColor = overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha);"]))):u.glsl(_||(_=n.__makeTemplateObject(["\n       hillshade *= alpha;\n       gl_FragColor = vec4(hillshade, hillshade, hillshade, alpha);\n       "],["\n       hillshade *= alpha;\n       gl_FragColor = vec4(hillshade, hillshade, hillshade, alpha);\n       "])));a.fragment.code.add(u.glsl(p||(p=n.__makeTemplateObject(["\n    void main() {\n      vec2 pixelLocation = getPixelLocation(v_texcoord);\n      if (isOutside(pixelLocation)) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        return;\n      }\n\n      vec4 currentPixel = getPixel(pixelLocation);\n      if (currentPixel.a == 0.0) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        return;\n      }\n\n      //mirror edge pixels\n      vec2 axy = vec2(-1.0, -1.0);\n      vec2 bxy = vec2(0.0, -1.0);\n      vec2 cxy = vec2(1.0, -1.0);\n      vec2 dxy = vec2(-1.0, 0.0);\n      vec2 fxy = vec2(1.0, 0.0);\n      vec2 gxy = vec2(-1.0, 1.0);\n      vec2 hxy = vec2(0.0, 1.0);\n      vec2 ixy = vec2(1.0, 1.0);\n      vec2 onePixel = 1.0 / u_srcImageSize;\n      if (pixelLocation.s < onePixel.s) {\n        axy[0] = 1.0;\n        dxy[0] = 1.0;\n        gxy[0] = 1.0;\n      }\n      if (pixelLocation.t < onePixel.t) {\n        axy[1] = 1.0;\n        bxy[1] = 1.0;\n        cxy[1] = 1.0;\n      }\n      if (pixelLocation.s > 1.0 - onePixel.s) {\n        cxy[0] = -1.0;\n        fxy[0] = -1.0;\n        ixy[0] = -1.0;\n      }\n      if (pixelLocation.t > 1.0 - onePixel.t) {\n        gxy[1] = -1.0;\n        hxy[1] = -1.0;\n        ixy[1] = -1.0;\n      }\n\n      // calculate hillshade\n      vec4 va = texture2D(u_image, pixelLocation + onePixel * axy);\n      vec4 vb = texture2D(u_image, pixelLocation + onePixel * bxy);\n      vec4 vc = texture2D(u_image, pixelLocation + onePixel * cxy);\n      vec4 vd = texture2D(u_image, pixelLocation + onePixel * dxy);\n      vec4 ve = texture2D(u_image, pixelLocation);\n      vec4 vf = texture2D(u_image, pixelLocation + onePixel * fxy);\n      vec4 vg = texture2D(u_image, pixelLocation + onePixel * gxy);\n      vec4 vh = texture2D(u_image, pixelLocation + onePixel * hxy);\n      vec4 vi = texture2D(u_image, pixelLocation + onePixel * ixy);\n\n      // calculate the rate of z change along the x, y, and diagonal direction\n      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;\n      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;\n      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);\n      float hillshade = 0.0;\n\n      // traditional single light source\n      if (u_hillshadeType == 0){\n        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;\n        float z = (u_cosZs[0] + cosDelta) / dzd;\n        if (z < 0.0)  z = 0.0;\n        hillshade = z;\n      } else {\n        // multi-directional with 6 light sources\n        for (int k = 0; k < 6; k++) {\n        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;\n        float z = (u_cosZs[k] + cosDelta) / dzd;\n        if (z < 0.0) z = 0.0;\n        hillshade = hillshade + z * u_weights[k];\n        if (k == 5) break;\n        }\n      }\n\n      // set color\n      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);\n      alpha *= u_opacity;\n      ","\n    }\n  "],["\n    void main() {\n      vec2 pixelLocation = getPixelLocation(v_texcoord);\n      if (isOutside(pixelLocation)) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        return;\n      }\n\n      vec4 currentPixel = getPixel(pixelLocation);\n      if (currentPixel.a == 0.0) {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n        return;\n      }\n\n      //mirror edge pixels\n      vec2 axy = vec2(-1.0, -1.0);\n      vec2 bxy = vec2(0.0, -1.0);\n      vec2 cxy = vec2(1.0, -1.0);\n      vec2 dxy = vec2(-1.0, 0.0);\n      vec2 fxy = vec2(1.0, 0.0);\n      vec2 gxy = vec2(-1.0, 1.0);\n      vec2 hxy = vec2(0.0, 1.0);\n      vec2 ixy = vec2(1.0, 1.0);\n      vec2 onePixel = 1.0 / u_srcImageSize;\n      if (pixelLocation.s < onePixel.s) {\n        axy[0] = 1.0;\n        dxy[0] = 1.0;\n        gxy[0] = 1.0;\n      }\n      if (pixelLocation.t < onePixel.t) {\n        axy[1] = 1.0;\n        bxy[1] = 1.0;\n        cxy[1] = 1.0;\n      }\n      if (pixelLocation.s > 1.0 - onePixel.s) {\n        cxy[0] = -1.0;\n        fxy[0] = -1.0;\n        ixy[0] = -1.0;\n      }\n      if (pixelLocation.t > 1.0 - onePixel.t) {\n        gxy[1] = -1.0;\n        hxy[1] = -1.0;\n        ixy[1] = -1.0;\n      }\n\n      // calculate hillshade\n      vec4 va = texture2D(u_image, pixelLocation + onePixel * axy);\n      vec4 vb = texture2D(u_image, pixelLocation + onePixel * bxy);\n      vec4 vc = texture2D(u_image, pixelLocation + onePixel * cxy);\n      vec4 vd = texture2D(u_image, pixelLocation + onePixel * dxy);\n      vec4 ve = texture2D(u_image, pixelLocation);\n      vec4 vf = texture2D(u_image, pixelLocation + onePixel * fxy);\n      vec4 vg = texture2D(u_image, pixelLocation + onePixel * gxy);\n      vec4 vh = texture2D(u_image, pixelLocation + onePixel * hxy);\n      vec4 vi = texture2D(u_image, pixelLocation + onePixel * ixy);\n\n      // calculate the rate of z change along the x, y, and diagonal direction\n      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;\n      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;\n      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);\n      float hillshade = 0.0;\n\n      // traditional single light source\n      if (u_hillshadeType == 0){\n        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;\n        float z = (u_cosZs[0] + cosDelta) / dzd;\n        if (z < 0.0)  z = 0.0;\n        hillshade = z;\n      } else {\n        // multi-directional with 6 light sources\n        for (int k = 0; k < 6; k++) {\n        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;\n        float z = (u_cosZs[k] + cosDelta) / dzd;\n        if (z < 0.0) z = 0.0;\n        hillshade = hillshade + z * u_weights[k];\n        if (k == 5) break;\n        }\n      }\n\n      // set color\n      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);\n      alpha *= u_opacity;\n      ","\n    }\n  "])),t))}(e,a.applyColormap),e}}));