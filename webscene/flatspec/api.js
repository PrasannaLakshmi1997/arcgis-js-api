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

define(["require","exports","tslib","../../Basemap","../../Ground","../../WebScene","../../core/compilerUtils","../../core/accessorSupport/ensureType","../../core/accessorSupport/extensions/serializableProperty/type","../../layers/GroupLayer","../../layers/KMLLayer","../../layers/mixins/operationalLayerModuleMap","../../layers/mixins/operationalLayers","./utils"],(function(e,t,r,n,a,u,s,i,p,o,y,l,c,f){function d(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){switch(r.label){case 0:switch(t.typeName){case"array":return[3,1];case"union":return[3,3];case"json":return[3,5];case"native":return[3,7];case"enum":return[3,9]}return[3,11];case 1:return[4,_(e,t,n)];case 2:return r.sent(),[3,12];case 3:return[4,h(e,t,n)];case 4:return r.sent(),[3,12];case 5:return[4,w(e,t,n)];case 6:return r.sent(),[3,12];case 7:return[4,v(e,t,n)];case 8:return r.sent(),[3,12];case 9:return[4,m(e,t,n)];case 10:return r.sent(),[3,12];case 11:s.neverReached(t),r.label=12;case 12:return[2]}}))}))}function v(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return n.addProperty({name:e,type:T(t),default:t.default}),[2]}))}))}function m(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){var a;return r.__generator(this,(function(r){var u,s;return a=t.values.slice(),t.nullable&&a.push(null),n.currentClass&&n.currentClass.typeValue&&"type"===e?n.addProperty({name:e,type:"string",enum:'"'+n.currentClass.typeValue+'"'}):n.addProperty({name:e,type:T(t),enum:(u=a,s=u.slice(),s.sort(),s).map((function(e){return"string"==typeof e?'"'+e+'"':""+e})).join("|"),default:t.default}),[2]}))}))}function _(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){switch(r.label){case 0:return[4,d(e+"[]",t.elementType,n)];case 1:return r.sent(),[2]}}))}))}function h(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){var a,u,s,i,p;return r.__generator(this,(function(r){switch(r.label){case 0:a=[],u=0,s=t.types,r.label=1;case 1:return u<s.length?"native"!==(i=s[u]).type.typeName&&t.key?[3,2]:(a.push(i.type),[3,4]):[3,5];case 2:return[4,d(e+"<"+function(e,t){if("json"===e.typeName){var r=e.type.__accessorMetadata__,n=r&&r.properties&&r.properties&&r.properties.type,a=n&&L(n),u=a&&a.type,s=u||n&&n.type;if(s&&Array.isArray(s)&&1===s.length&&"string"==typeof s[0])return u?s[0]:O(n,s[0])}return t}(i.type,i.value)+">",i.type,n)];case 3:r.sent(),r.label=4;case 4:return u++,[3,1];case 5:return a.length&&(p=a.map(T),t.nullable&&p.push("null"),p.sort(),n.addProperty({type:p.join("|"),name:e,default:t.default})),[2]}}))}))}function b(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return e.type===u&&"layers"===t?[2,j("web-scene/operational-layers")]:e.type!==n||"baseLayers"!==t&&"baseMapLayers"!==t?e.type===n&&"elevationLayers"===t?[2,j("web-scene/ground")]:e.type===a&&"layers"===t?[2,j("web-scene/ground")]:e.type===o&&"layers"===t?[2,j("web-scene/operational-layers",(function(e){return e!==o}))]:[2,null]:[2,j("web-scene/basemap")]}))}))}function g(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){var a;return r.__generator(this,(function(r){switch(r.label){case 0:return[4,b(e,t)];case 1:return(a=r.sent())?[2,a]:[2,k(n)]}}))}))}function w(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){var a,u,s,i,p,o,y,l,c,f,v,m,_,h,b,w;return r.__generator(this,(function(r){switch(r.label){case 0:if(a=t.type.__accessorMetadata__,j=t.type,u=j.prototype.declaredClass.replace(/\./g,"/"),!(s=a&&a.properties))return e&&n.addProperty({name:e,type:"unknown"}),[2,null];if(i=u,p=null,(o=e&&e.match(/<([^>]+)>$/))&&(i+="--"+o[1],p=o[1]),(y=n.seen.get(i))&&e)return n.addProperty({name:e,type:y}),[2,y];for(f in l={type:t.type,name:u,id:i,properties:[]},e&&(n.addProperty({name:e,type:l}),l.typeValue=p),n.push(e,l),c=[],s)c.push(f);v=0,r.label=1;case 1:return v<c.length?(m=c[v],_=s[m],(h=A(_))&&h.enabled?"string"!=typeof(b=h.target)&&null!=b?[3,4]:[4,g(t,m,_)]:[3,6]):[3,7];case 2:return(w=r.sent())?[4,d("string"==typeof b?b:m,w,n)]:[3,6];case 3:return r.sent(),[3,6];case 4:return[4,N(t,b,n)];case 5:r.sent(),r.label=6;case 6:return v++,[3,1];case 7:return[2,n.pop()]}var j}))}))}function N(e,t,n){return r.__awaiter(this,void 0,void 0,(function(){var a,u,s,i,p,o;return r.__generator(this,(function(r){switch(r.label){case 0:for(u in a=[],t)a.push(u);s=0,r.label=1;case 1:return s<a.length?(i=a[s],[4,b(e,i)]):[3,5];case 2:return(p=r.sent())||(o=t[i],(p=o.types?S(o.types):P(o.type)).default=o.default,p=M(p)),[4,d(i,p,n)];case 3:r.sent(),r.label=4;case 4:return s++,[3,1];case 5:return[2]}}))}))}function j(e,t){return r.__awaiter(this,void 0,void 0,(function(){var n,a,u,s,i,p;return r.__generator(this,(function(r){switch(r.label){case 0:for(u in n={typeName:"union",key:"layerType",types:[]},a=[],c.supportedTypes[e])a.push(u);s=0,r.label=1;case 1:return s<a.length?(i=a[s],[4,l.typeModuleMap[i]()]):[3,4];case 2:if(!(p=r.sent()))return[3,3];if(t&&!t(p))return[3,3];if(p===y)return[3,3];n.types.push({type:{typeName:"json",type:p},value:i}),r.label=3;case 3:return s++,[3,1];case 4:return 0===n.types.length?[2,null]:[2,{typeName:"array",elementType:1===n.types.length?n.types[0].type:n}]}}))}))}function T(e){switch(e.typeName){case"array":return T(e.elementType)+"[]";case"union":var t=e.types.map((function(e){return T(e.type)}));return e.nullable&&t.push("null"),t.sort(),""+t.join(" | ");case"native":switch(e.type){case Number:return"number";case i.Integer:return"integer";case String:return"string";case Boolean:return"boolean";case Object:return"object";default:return"unknown"}case"json":return e.type.prototype.declaredClass;case"enum":return"string";default:return void s.neverReached(e)}}function M(e){if("array"===e.typeName)return e.elementType=M(e.elementType),e;var t=function(e){if("json"!==e.typeName)return null;var t=e.type.__accessorMetadata__,r=t&&t.properties&&t.properties.type,n=r&&L(r),a=n&&n.type,u=a||r&&r.type;return u&&Array.isArray(u)&&"string"==typeof u[0]?a||r.type.map((function(e){return O(r,e)})):null}(e);return t?{typeName:"union",key:"type",types:t.map((function(t){return{value:t,type:e}}))}:e}function k(e){var t=L(e);return t.types?S(t.types):!t.type&&e.types?S(e.types):M(function(e){var t=L(e),r=A(e),n=P(t&&t.type||e.type);t&&void 0!==t.default&&"function"!=typeof t.default&&(n.default=O(e,t.default));r.allowNull&&(n.nullable=!0);return n}(e))}function S(e){if(Array.isArray(e))return{typeName:"array",elementType:S(e[0])};var t=[];for(var r in e.typeMap){var n=e.typeMap[r];t.push({type:P(n),value:C(n)?null:r})}return{typeName:"union",key:"string"==typeof e.key?e.key:"type",types:t}}function O(e,t){var r,n=A(e);if(null!=(r=n.writer)&&r.name&&-1!==r.name.indexOf("JSONMapWrite")){var a={value:""};return n.writer(t,a,"value"),a.value}return t}function P(e){return e?i.isLongFormType(e)?function e(t){switch(t.type){case"native":return{typeName:"native",type:t.value};case"array":return{typeName:"array",elementType:P(t.value)};case"one-of":return{typeName:"union",key:null,types:t.values.map((function(t){return{type:e(t),value:null}}))};default:return void s.neverReached(t)}}(e):Array.isArray(e)?"string"==typeof e[0]||"number"==typeof e[0]?{typeName:"enum",values:e}:e.length>1?{typeName:"union",key:null,types:e.map((function(e){return{type:P(e),value:null}}))}:{typeName:"array",elementType:P(e[0])}:p.isCollection(e)?function(e){var t=e.prototype.itemType&&e.prototype.itemType.Type;if(!t)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"==typeof t)return{typeName:"array",elementType:P(t)};if(t.typeMap){var r=[];for(var n in t.typeMap){var a=t.typeMap[n];r.push({type:P(a),value:C(a)?null:n})}return{typeName:"array",elementType:{typeName:"union",key:"string"==typeof t.key?t.key:"type",types:r}}}}(e):C(e)?{typeName:"native",type:e}:function(e){var t=e;for(;t;){if(t.prototype&&("esri.core.JSONSupport"===t.prototype.declaredClass||"esri.core.MultiOriginJSONSupport"===t.prototype.declaredClass))return!0;t=Object.getPrototypeOf(t)}return!1}(e)?{typeName:"json",type:e}:{typeName:"native",type:null}:{typeName:"native",type:null}}function C(e){return e===String||e===Boolean||e===Number||e===i.Integer||e===Object}function L(e){if(!e.json)return null;var t=e.json.origins,r=e.json,n=t&&t["web-scene"],a=t&&t["web-document"];return n||a||r||null}function A(e){if(!e.json)return null;var t=e.json.origins,r=e.json.write,n=t&&t["web-scene"]&&t["web-scene"].write,a=t&&t["web-document"]&&t["web-document"].write;return n||a||r||null}Object.defineProperty(t,"__esModule",{value:!0}),t.scan=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t;return r.__generator(this,(function(r){return t=new f.ScanContext,[2,w(null,{typeName:"json",type:e},t)]}))}))}}));