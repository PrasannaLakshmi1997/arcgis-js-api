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

define(["require","exports","tslib","../../../core/shaderModules/interfaces","./EdgeUtil.glsl"],(function(e,n,t,s,i){var o,d,a,l,c;Object.defineProperty(n,"__esModule",{value:!0}),n.UnpackAttributes=function(e,n){var r=e.vertex;switch(e.include(i.EdgeUtil,n),e.attributes.add("sideness","vec2"),2===n.mode?r.code.add(s.glsl(o||(o=t.__makeTemplateObject(["\n      struct UnpackedAttributes {\n        vec2 sideness;\n        vec2 sidenessNorm;\n        float lineWidthPixels;\n        float extensionLengthPixels;\n        float type;\n      };\n    "],["\n      struct UnpackedAttributes {\n        vec2 sideness;\n        vec2 sidenessNorm;\n        float lineWidthPixels;\n        float extensionLengthPixels;\n        float type;\n      };\n    "])))):r.code.add(s.glsl(d||(d=t.__makeTemplateObject(["\n      struct UnpackedAttributes {\n        vec2 sideness;\n        vec2 sidenessNorm;\n        float lineWidthPixels;\n        float extensionLengthPixels;\n      };\n  "],["\n      struct UnpackedAttributes {\n        vec2 sideness;\n        vec2 sidenessNorm;\n        float lineWidthPixels;\n        float extensionLengthPixels;\n      };\n  "])))),n.mode){case 2:r.code.add(s.glsl(a||(a=t.__makeTemplateObject(["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float fType = component.type;\n          float extensionLengthPixels = component.extensionLength;\n          float lineWidth = component.lineWidth;\n\n          if (fType <= 0.0) {\n            extensionLengthPixels *= variantExtension * 2.0 - 1.0;\n          }\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels, fType);\n        }\n      "],["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float fType = component.type;\n          float extensionLengthPixels = component.extensionLength;\n          float lineWidth = component.lineWidth;\n\n          if (fType <= 0.0) {\n            extensionLengthPixels *= variantExtension * 2.0 - 1.0;\n          }\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels, fType);\n        }\n      "]))));break;case 1:r.code.add(s.glsl(l||(l=t.__makeTemplateObject(["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float extensionLengthPixels = component.extensionLength;\n          extensionLengthPixels *= variantExtension * 2.0 - 1.0;\n          float lineWidth = component.lineWidth;\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels);\n        }\n      "],["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float extensionLengthPixels = component.extensionLength;\n          extensionLengthPixels *= variantExtension * 2.0 - 1.0;\n          float lineWidth = component.lineWidth;\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels);\n        }\n      "]))));break;case 0:r.code.add(s.glsl(c||(c=t.__makeTemplateObject(["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float extensionLengthPixels = component.extensionLength;\n          float lineWidth = component.lineWidth;\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels);\n        }\n      "],["\n        UnpackedAttributes unpackAttributes(ComponentData component) {\n          vec2 sidenessNorm = sideness;\n          vec2 sideness = sidenessNorm * 2.0 - 1.0;\n          float extensionLengthPixels = component.extensionLength;\n          float lineWidth = component.lineWidth;\n\n          return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels);\n        }\n      "]))))}}}));