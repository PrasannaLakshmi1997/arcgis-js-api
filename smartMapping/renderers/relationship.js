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

define(["require","exports","tslib","../../core/Error","../../core/lang","../../core/maybe","../../core/promiseUtils","../../intl/messages","../../renderers/support/AuthoringInfo","../../renderers/support/AuthoringInfoClassBreakInfo","../../renderers/support/AuthoringInfoFieldInfo","./type","./support/utils","../support/utils","../symbology/relationship","../../symbols/support/utils"],(function(e,n,a,i,r,l,s,o,t,u,d,m,f,p,c,h){Object.defineProperty(n,"__esModule",{value:!0});var v=["equal-interval","natural-breaks","quantile"],y=["HH","HL","LH","LL"],b={2:[["HL","HH"],["LL","LH"]],3:[["HL","HM","HH"],["ML","MM","MH"],["LL","LM","LH"]],4:[["HL","HM1","HM2","HH"],["M2L","M2M1","M2M2","M2H"],["M1L","M1M1","M1M2","M1H"],["LL","LM1","LM2","LH"]]},g={2:["L","H"],3:["L","M","H"],4:["L","M1","M2","H"]},w=function(e){return{minValue:e.minValue,maxValue:e.maxValue}};function I(e){return a.__awaiter(this,void 0,void 0,(function(){var n,r,s,o,t,u,d,m,c,h;return a.__generator(this,(function(b){switch(b.label){case 0:if(!(e&&e.layer&&e.view&&e.field1&&e.field2))throw new i("relationship-renderer:missing-parameters","'layer', 'view', 'field1' and 'field2' parameters are required");if((n=a.__assign({},e)).symbolType=n.symbolType||"2d",n.defaultSymbolEnabled=null==n.defaultSymbolEnabled||n.defaultSymbolEnabled,n.classificationMethod=n.classificationMethod||"quantile",n.numClasses=n.numClasses||3,n.focus=n.focus||null,-1===v.indexOf(n.classificationMethod))throw new i("relationship-renderer:invalid-parameters","classification method "+n.classificationMethod+" is not supported");if(n.numClasses<2||n.numClasses>4)throw new i("relationship-renderer:invalid-parameters","'numClasses' must be 2, 3 or 4");if(e.focus&&-1===y.indexOf(e.focus))throw new i("relationship-renderer:invalid-parameters","'focus' must be 'HH', 'HL', 'LH', 'LL' or null");if(r=[0,2,1,3],s=p.createLayerAdapter(n.layer,r),n.layer=s,!s)throw new i("relationship-renderer:invalid-parameters","'layer' must be one of these types: "+p.getLayerTypeLabels(r).join(", "));return o=l.isSome(n.signal)?{signal:n.signal}:null,[4,s.load(o)];case 1:if(b.sent(),t=s.geometryType,u=n.symbolType.indexOf("3d")>-1,n.outlineOptimizationEnabled="polygon"===t&&n.outlineOptimizationEnabled,n.sizeOptimizationEnabled=("point"===t||"multipoint"===t||"polyline"===t)&&n.sizeOptimizationEnabled,"mesh"===t)n.symbolType="3d-volumetric",n.colorMixMode=n.colorMixMode||"replace",n.edgesType=n.edgesType||"none";else{if("3d-volumetric-uniform"===n.symbolType&&"point"!==t)throw new i("relationship-renderer:not-supported","3d-volumetric-uniform symbols are supported for point layers only");if(u&&"polygon"===t)throw new i("relationship-renderer:not-supported","3d symbols are not supported for polygon layers");if(n.symbolType.indexOf("3d-volumetric")>-1&&(!n.view||"3d"!==n.view.type))throw new i("relationship-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'")}if(d=n.field1,m=n.field2,c=[d.field,m.field],d.normalizationField&&c.push(d.normalizationField),m.normalizationField&&c.push(m.normalizationField),h=f.verifyBasicFieldValidity(s,c,"relationship-renderer:invalid-parameters"))throw h;return[2,n]}}))}))}function M(e){return a.__awaiter(this,void 0,void 0,(function(){var n,r,l,s,o,t;return a.__generator(this,(function(a){if(!(e&&e.renderer&&e.numClasses))throw new i("update-relationship-renderer:missing-parameters","'renderer' and 'numClasses' parameters are required");if(n=e.field1,r=e.field2,l=e.renderer,s=e.numClasses,o=e.colors,t=Math.pow(s,2),(n||r)&&!(n&&r&&n.field&&r.field))throw new i("update-relationship-renderer:missing-parameters","'field1' and 'field2' parameters are required");if(n&&!n.classBreakInfos||r&&!r.classBreakInfos)throw new i("update-relationship-renderer:missing-parameters","'field1.classBreakInfos' and 'field2.classBreakInfos' are required");if(!l.authoringInfo)throw new i("update-relationship-renderer:missing-parameters","'renderer.authoringInfo' is required");if(l.uniqueValueInfos.length!==t)throw new i("update-relationship-renderer:invalid-parameters","Renderer must have "+t+" unique value infos to support "+s+" classes");if(o&&o.length!==t)throw new i("update-relationship-renderer:invalid-parameters","The scheme must have "+t+" colors");return[2,e]}))}))}function z(e){return a.__awaiter(this,void 0,void 0,(function(){var n,i,r,s,o;return a.__generator(this,(function(a){switch(a.label){case 0:return n=e.relationshipScheme,i=null,r=null,[4,f.getBasemapInfo(e.basemap,e.view)];case 1:return s=a.sent(),i=l.isSome(s.basemapId)?s.basemapId:null,r=l.isSome(s.basemapTheme)?s.basemapTheme:null,n?[2,{scheme:c.cloneScheme(n),basemapId:i,basemapTheme:r}]:((o=c.getSchemes({basemap:i,basemapTheme:r,geometryType:e.geometryType,theme:e.theme,worldScale:e.worldScale,view:e.view}))&&(n=o.primaryScheme,i=o.basemapId,r=o.basemapTheme),[2,{scheme:n,basemapId:i,basemapTheme:r}])}}))}))}function F(e,n){var a=r.clone(b[e]);return c.flatten2DArray(a,n)}function T(e,n,a,i){var r=e.field,l=e.normalizationField,s=n.field,o=n.normalizationField,t=a.map((function(e){return[e.minValue,e.maxValue]})),u=i.map((function(e){return[e.minValue,e.maxValue]})),d=t.length,m=g[d];return"\n  var field1 = $feature['"+r+"'];\n  var field2 = $feature['"+s+"'];\n  var hasNormField1 = "+(l?"true":"false")+";\n  var hasNormField2 = "+(o?"true":"false")+";\n  var normField1 = "+(l?"$feature['"+l+"']":"null")+";\n  var normField2 = "+(o?"$feature['"+o+"']":"null")+";\n\n  if (\n    IsEmpty(field1) ||\n    IsEmpty(field2) ||\n    (hasNormField1 && (IsEmpty(normField1) || normField1 == 0)) ||\n    (hasNormField2 && (IsEmpty(normField2) || normField2 == 0))\n  ) {\n    return null;\n  }\n\n  var value1 = IIf(hasNormField1, (field1 / normField1), field1);\n  var value2 = IIf(hasNormField2, (field2 / normField2), field2);\n\n  var breaks1 = "+JSON.stringify(t)+";\n  var breaks2 = "+JSON.stringify(u)+";\n  var classCodes = "+JSON.stringify(m)+";\n\n  function getClassCode(value, breaks) {\n    var code = null;\n\n    for (var i in breaks) {\n      var info = breaks[i];\n      if (value >= info[0] && value <= info[1]) {\n        code = classCodes[i];\n        break;\n      }\n    }\n\n    return code;\n  }\n\n  var code1 = getClassCode(value1, breaks1);\n  var code2 = getClassCode(value2, breaks2);\n\n  var classValue = IIf(IsEmpty(code1) || IsEmpty(code2), null, code1 + code2);\n  return classValue;\n  "}function L(e,n,r){return a.__awaiter(this,void 0,void 0,(function(){var l,s,u,d,f,p,h,v,y,b,g,I,M,L,V,C,_,k,H,x,E,S,B;return a.__generator(this,(function(O){switch(O.label){case 0:return[4,o.loadMessageBundle("esri/smartMapping/t9n/smartMapping")];case 1:if(l=O.sent(),s=e.basemap,u=e.classificationMethod,d=e.field1,f=e.field2,p=e.focus,h=e.numClasses,v=e.signal,y=e.layer,b=n.classBreakInfos,g=r.classBreakInfos,h!==b.length||b.length!==g.length)throw new i("relationship-renderer:error","incompatible class breaks");return I=function(e,n){return F(e,n).map((function(e){return{value:e,count:0}}))}(h,p),M=T(e.field1,e.field2,b,g),[4,z({basemap:s,geometryType:y.geometryType,theme:"default",relationshipScheme:e.relationshipScheme,worldScale:e.symbolType.indexOf("3d-volumetric")>-1,view:e.view})];case 2:return L=O.sent(),V=L.scheme,[4,m.createRenderer({layer:y,basemap:s,valueExpression:M,valueExpressionTitle:l.relationship.legendTitle,numTypes:-1,sortEnabled:!1,defaultSymbolEnabled:e.defaultSymbolEnabled,typeScheme:a.__assign({colors:c.getColors(V,h,p)},V),statistics:{uniqueValueInfos:I},legendOptions:e.legendOptions,outlineOptimizationEnabled:e.outlineOptimizationEnabled,sizeOptimizationEnabled:e.sizeOptimizationEnabled,symbolType:e.symbolType,colorMixMode:e.colorMixMode,edgesType:e.edgesType,view:e.view,signal:v})];case 3:for(C=O.sent(),_=C.renderer,k=_.uniqueValueInfos,H=l.relationship,x=0,E=k;x<E.length;x++)(S=E[x]).label=H[S.value];return B=new t({type:"relationship",classificationMethod:u,numClasses:h,focus:p,field1:{field:d.field,normalizationField:d.normalizationField,label:d.label,classBreakInfos:b.map(w)},field2:{field:f.field,normalizationField:f.normalizationField,label:f.label,classBreakInfos:g.map(w)}}),_.authoringInfo=B,[2,{renderer:_,classBreaks:{field1:n,field2:r},uniqueValueInfos:C.uniqueValueInfos,relationshipScheme:V,basemapId:C.basemapId,basemapTheme:C.basemapTheme}]}}))}))}n.updateRenderer=function(e){return a.__awaiter(this,void 0,void 0,(function(){var n,i,r,l,s,o,t,m,p;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,M(e)];case 1:return n=a.sent(),i=n.field1,r=n.field2,l=n.renderer,s=n.numClasses,o=n.focus,t=n.colors,(m=l.clone()).valueExpression=T(i,r,i.classBreakInfos,r.classBreakInfos),function(e,n,a){var i=F(n,a);e.sort((function(e,n){var a=i.indexOf(e.value),r=i.indexOf(n.value),l=0;return a<r?l=-1:a>r&&(l=1),l}))}(m.uniqueValueInfos,s,o),t&&(p=f.createColors(t,t.length),m.uniqueValueInfos.forEach((function(e,n){return h.applyColorToSymbol(e.symbol,p[n])}))),function(e,n){var a=e.authoringInfo;a.numClasses=n.numClasses,a.focus=n.focus||null,a.focus||delete a.focus;var i=n.field1,r=n.field2;a.field1=new d.default({field:i.field,normalizationField:i.normalizationField,label:i.label,classBreakInfos:i.classBreakInfos.map((function(e){return new u.default(w(e))}))}),a.field2=new d.default({field:r.field,normalizationField:r.normalizationField,label:r.label,classBreakInfos:r.classBreakInfos.map((function(e){return new u.default(w(e))}))}),e.authoringInfo=a}(m,n),[2,m]}}))}))},n.createRenderer=function(e){return a.__awaiter(this,void 0,void 0,(function(){var n,r,l,o,t,u,d,m,p,c,h,v,y;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,I(e)];case 1:return n=a.sent(),r=n.layer,l=n.classificationMethod,o=n.field1,t=n.field2,u=n.numClasses,d=n.view,m=n.signal,p={layer:r,classificationMethod:l,field:o.field,normalizationField:o.normalizationField,normalizationType:o.normalizationField?"field":null,minValue:o.minValue,maxValue:o.maxValue,analyzeData:!(null!=o.minValue&&null!=o.maxValue),numClasses:u,view:d,signal:m},c={layer:r,classificationMethod:l,field:t.field,normalizationField:t.normalizationField,normalizationType:t.normalizationField?"field":null,minValue:t.minValue,maxValue:t.maxValue,analyzeData:!(null!=t.minValue&&null!=t.maxValue),numClasses:u,view:d,signal:m},[4,s.all([f.getClassBreaks(p),f.getClassBreaks(c)])];case 2:if(h=a.sent(),v=h[0],y=h[1],!v||!y)throw new i("relationship-renderer:error","error when calculating class breaks");return[2,L(n,v.result,y.result)]}}))}))}}));