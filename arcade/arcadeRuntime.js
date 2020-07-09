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

define(["require","exports","./ArcadePortal","./Attachment","./Dictionary","./Feature","./FunctionWrapper","./ImmutablePathArray","./ImmutablePointArray","./languageUtils","./treeAnalysis","./functions/date","./functions/geometry","./functions/geomsync","./functions/maths","./functions/stats","./functions/string","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline","../geometry/SpatialReference"],(function(e,r,t,n,o,a,i,s,u,l,c,f,p,d,h,g,m,v,E,w,N,y,I,b){function R(e,r){for(var t=[],n=0;n<r.arguments.length;n++)t.push(S(e,r.arguments[n]));return t}function O(e,r,t){try{return t(e,r,R(e,r))}catch(e){throw e}}function S(e,r){try{switch(r.type){case"EmptyStatement":return l.voidOperation;case"VariableDeclarator":return function(e,r){var t=null===r.init?null:S(e,r.init);t===l.voidOperation&&(t=null);if("Identifier"!==r.id.type)throw new Error("Can only assign a regular variable");var n=r.id.name.toLowerCase();null!==e.localScope?e.localScope[n]={value:t,valueset:!0,node:r.init}:e.globalScope[n]={value:t,valueset:!0,node:r.init};return l.voidOperation}(e,r);case"VariableDeclaration":return function(e,r){for(var t=0;t<r.declarations.length;t++)S(e,r.declarations[t]);return l.voidOperation}(e,r);case"BlockStatement":return function(e,r){for(var t=l.voidOperation,n=0;n<r.body.length;n++)if((t=S(e,r.body[n]))instanceof l.ReturnResult||t===l.breakResult||t===l.continueResult)return t;return t}(e,r);case"FunctionDeclaration":return function(e,r){var t=r.id.name.toLowerCase();return e.globalScope[t]={valueset:!0,node:null,value:new i(r,e)},l.voidOperation}(e,r);case"ReturnStatement":return function(e,r){if(null===r.argument)return new l.ReturnResult(l.voidOperation);var t=S(e,r.argument);return new l.ReturnResult(t)}(e,r);case"IfStatement":return function(e,r){if("AssignmentExpression"===r.test.type||"UpdateExpression"===r.test.type)throw new Error(c.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var t=S(e,r.test);if(!0===t)return S(e,r.consequent);if(!1===t)return null!==r.alternate?S(e,r.alternate):l.voidOperation;throw new Error(c.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))}(e,r);case"ExpressionStatement":return function(e,r){if("AssignmentExpression"===r.expression.type||"UpdateExpression"===r.expression.type)return S(e,r.expression);if("CallExpression"===r.expression.type){return(t=S(e,r.expression))===l.voidOperation?l.voidOperation:new l.ImplicitResult(t)}var t;if((t=S(e,r.expression))===l.voidOperation)return l.voidOperation;return new l.ImplicitResult(t)}(e,r);case"AssignmentExpression":return function(e,r){var t=S(e,r.right),n=null,i="";if("MemberExpression"===r.left.type){if(n=S(e,r.left.object),!0===r.left.computed?i=S(e,r.left.property):"Identifier"===r.left.property.type&&(i=r.left.property.name),l.isArray(n)){if(!l.isNumber(i))throw new Error("Invalid Parameter");if(i<0&&(i=n.length+i),i<0||i>n.length)throw new Error("Assignment outside of array bounds");if(i===n.length){if("="!==r.operator)throw new Error("Invalid Parameter");n[i]=M(t,r.operator,n[i],r)}else n[i]=M(t,r.operator,n[i],r)}else if(n instanceof o){if(!1===l.isString(i))throw new Error("Dictionary accessor must be a string");if(!0===n.hasField(i))n.setField(i,M(t,r.operator,n.field(i),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");n.setField(i,M(t,r.operator,null,r))}}else{if(!(n instanceof a))throw l.isImmutableArray(n)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===l.isString(i))throw new Error("Feature accessor must be a string");if(!0===n.hasField(i))n.setField(i,M(t,r.operator,n.field(i),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");n.setField(i,M(t,r.operator,null,r))}}return l.voidOperation}if(n=r.left.name.toLowerCase(),null!==e.localScope&&void 0!==e.localScope[n])return e.localScope[n]={value:M(t,r.operator,e.localScope[n].value,r),valueset:!0,node:r.right},l.voidOperation;if(void 0!==e.globalScope[n])return e.globalScope[n]={value:M(t,r.operator,e.globalScope[n].value,r),valueset:!0,node:r.right},l.voidOperation;throw new Error("Variable not recognised")}(e,r);case"UpdateExpression":return function(e,r){var t,n=null,i="";if("MemberExpression"===r.argument.type){if(n=S(e,r.argument.object),!0===r.argument.computed?i=S(e,r.argument.property):"Identifier"===r.argument.property.type&&(i=r.argument.property.name),l.isArray(n)){if(!l.isNumber(i))throw new Error("Invalid Parameter");if(i<0&&(i=n.length+i),i<0||i>=n.length)throw new Error("Assignment outside of array bounds");t=l.toNumber(n[i]),n[i]="++"===r.operator?t+1:t-1}else if(n instanceof o){if(!1===l.isString(i))throw new Error("Dictionary accessor must be a string");if(!0!==n.hasField(i))throw new Error("Invalid Parameter");t=l.toNumber(n.field(i)),n.setField(i,"++"===r.operator?t+1:t-1)}else{if(!(n instanceof a))throw l.isImmutableArray(n)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===l.isString(i))throw new Error("Feature accessor must be a string");if(!0!==n.hasField(i))throw new Error("Invalid Parameter");t=l.toNumber(n.field(i)),n.setField(i,"++"===r.operator?t+1:t-1)}return!1===r.prefix?t:"++"===r.operator?t+1:t-1}if(!(n="Identifier"===r.argument.type?r.argument.name.toLowerCase():""))throw new Error("Invalid identifier");if(null!==e.localScope&&void 0!==e.localScope[n])return t=l.toNumber(e.localScope[n].value),e.localScope[n]={value:"++"===r.operator?t+1:t-1,valueset:!0,node:r},!1===r.prefix?t:"++"===r.operator?t+1:t-1;if(void 0!==e.globalScope[n])return t=l.toNumber(e.globalScope[n].value),e.globalScope[n]={value:"++"===r.operator?t+1:t-1,valueset:!0,node:r},!1===r.prefix?t:"++"===r.operator?t+1:t-1;throw new Error("Variable not recognised")}(e,r);case"BreakStatement":return l.breakResult;case"ContinueStatement":return l.continueResult;case"TemplateElement":return function(e,r){return r.value?r.value.cooked:""}(0,r);case"TemplateLiteral":return function(e,r){for(var t="",n=0,o=0,a=r.quasis;o<a.length;o++){var i=a[o];if(t+=i.value?i.value.cooked:"",!1===i.tail){var s=r.expressions[n]?l.toString(S(e,r.expressions[n])):"";t+=s,n++}}return t}(e,r);case"ForStatement":return function(e,r){null!==r.init&&S(e,r.init);var t={testResult:!0,lastAction:l.voidOperation};do{T(e,r,t)}while(!0===t.testResult);if(t.lastAction instanceof l.ReturnResult)return t.lastAction;return l.voidOperation}(e,r);case"ForInStatement":return function(e,r){var t=S(e,r.right);"VariableDeclaration"===r.left.type&&S(e,r.left);var n=null,i="";if("VariableDeclaration"===r.left.type){var s=r.left.declarations[0].id;"Identifier"===s.type&&(i=s.name)}else"Identifier"===r.left.type&&(i=r.left.name);if(!i)throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDVARIABLE"));i=i.toLowerCase(),null!==e.localScope&&void 0!==e.localScope[i]&&(n=e.localScope[i]);null===n&&void 0!==e.globalScope[i]&&(n=e.globalScope[i]);if(null===n)throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTDECLARED"));if(l.isArray(t)||l.isString(t)){for(var u=t.length,f=0;f<u;f++){if(n.value=f,(h=S(e,r.body))===l.breakResult)break;if(h instanceof l.ReturnResult)return h}return l.voidOperation}if(l.isImmutableArray(t)){for(f=0;f<t.length();f++){if(n.value=f,(h=S(e,r.body))===l.breakResult)break;if(h instanceof l.ReturnResult)return h}return l.voidOperation}if(!(t instanceof o||t instanceof a))return l.voidOperation;for(var p=t.keys(),d=0;d<p.length;d++){var h;if(n.value=p[d],(h=S(e,r.body))===l.breakResult)break;if(h instanceof l.ReturnResult)return h}}(e,r);case"Identifier":return U(e,r);case"MemberExpression":return function(e,r){try{var t=S(e,r.object);if(null===t)throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"));if(!1===r.computed){if("Identifier"===r.property.type){if(t instanceof o||t instanceof a)return t.field(r.property.name);if(t instanceof E)return F(t,r.property.name,r)}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}var n=S(e,r.property);if(t instanceof o||t instanceof a){if(l.isString(n))return t.field(n);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(t instanceof E){if(l.isString(n))return F(t,n,r);throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isArray(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length+n),n>=t.length||n<0)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t[n]}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isString(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length+n),n>=t.length||n<0)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t[n]}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}if(l.isImmutableArray(t)){if(l.isNumber(n)&&isFinite(n)&&Math.floor(n)===n){if(n<0&&(n=t.length()+n),n>=t.length()||n<0)throw new Error(c.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));return t.get(n)}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))}catch(e){throw e}}(e,r);case"Literal":return r.value;case"CallExpression":return function(e,r){try{if("Identifier"!==r.callee.type)throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));if(null!==e.localScope&&void 0!==e.localScope[r.callee.name.toLowerCase()]){if((t=e.localScope[r.callee.name.toLowerCase()]).value instanceof l.NativeFunction)return t.value.fn(e,r);if(t.value instanceof i)return L(e,r,t.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}if(void 0!==e.globalScope[r.callee.name.toLowerCase()]){var t;if((t=e.globalScope[r.callee.name.toLowerCase()]).value instanceof l.NativeFunction)return t.value.fn(e,r);if(t.value instanceof i)return L(e,r,t.value.definition);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(e){throw e}}(e,r);case"UnaryExpression":return function(e,r){try{var t=S(e,r.argument);if(l.isBoolean(t)){if("!"===r.operator)return!t;if("-"===r.operator)return-1*l.toNumber(t);if("+"===r.operator)return 1*l.toNumber(t);if("~"===r.operator)return~l.toNumber(t);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}if("~"===r.operator)return~l.toNumber(t);if("-"===r.operator)return-1*l.toNumber(t);if("+"===r.operator)return 1*l.toNumber(t);throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR"))}catch(e){throw e}}(e,r);case"BinaryExpression":return function(e,r){try{var t=[S(e,r.left),S(e,r.right)],n=t[0],o=t[1];switch(r.operator){case"|":case"<<":case">>":case">>>":case"^":case"&":return l.binaryOperator(l.toNumber(n),l.toNumber(o),r.operator);case"==":return l.equalityTest(n,o);case"!=":return!l.equalityTest(n,o);case"<":case">":case"<=":case">=":return l.greaterThanLessThan(n,o,r.operator);case"+":return l.isString(n)||l.isString(o)?l.toString(n)+l.toString(o):l.toNumber(n)+l.toNumber(o);case"-":return l.toNumber(n)-l.toNumber(o);case"*":return l.toNumber(n)*l.toNumber(o);case"/":return l.toNumber(n)/l.toNumber(o);case"%":return l.toNumber(n)%l.toNumber(o);default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","OPERATORNOTRECOGNISED"))}}catch(e){throw e}}(e,r);case"LogicalExpression":return function(e,r){try{if("AssignmentExpression"===r.left.type||"UpdateExpression"===r.left.type)throw new Error(c.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));if("AssignmentExpression"===r.right.type||"UpdateExpression"===r.right.type)throw new Error(c.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"));var t=S(e,r.left);if(l.isBoolean(t))switch(r.operator){case"||":if(!0===t)return t;var n=S(e,r.right);if(l.isBoolean(n))return n;throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));case"&&":if(!1===t)return t;n=S(e,r.right);if(l.isBoolean(n))return n;throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}throw new Error(c.nodeErrorMessage(r,"RUNTIME","ONLYBOOLEAN"))}catch(e){throw e}}(e,r);case"ConditionalExpression":throw new Error(c.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return function(e,r){try{for(var t=[],n=0;n<r.elements.length;n++){var o=S(e,r.elements[n]);if(l.isFunctionParameter(o))throw new Error(c.nodeErrorMessage(r,"RUNTIME","FUNCTIONCONTEXTILLEGAL"));o===l.voidOperation?t.push(null):t.push(o)}return t}catch(e){throw e}}(e,r);case"ObjectExpression":return function(e,r){for(var t={},n=0;n<r.properties.length;n++){var a=S(e,r.properties[n]);if(l.isFunctionParameter(a.value))throw new Error("Illegal Argument");if(!1===l.isString(a.key))throw new Error("Illegal Argument");a.value===l.voidOperation?t[a.key.toString()]=null:t[a.key.toString()]=a.value}var i=new o(t);return i.immutable=!1,i}(e,r);case"Property":return function(e,r){return{key:"Identifier"===r.key.type?r.key.name:S(e,r.key),value:S(e,r.value)}}(e,r);default:throw new Error(c.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(e){throw e}}function T(e,r,t){if(null!==r.test){if(t.testResult=S(e,r.test),!1===t.testResult)return;if(!0!==t.testResult)throw new Error(c.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))}t.lastAction=S(e,r.body),t.lastAction!==l.breakResult?t.lastAction instanceof l.ReturnResult?t.testResult=!1:null!==r.update&&S(e,r.update):t.testResult=!1}function M(e,r,t,n){switch(r){case"=":return e===l.voidOperation?null:e;case"/=":return l.toNumber(t)/l.toNumber(e);case"*=":return l.toNumber(t)*l.toNumber(e);case"-=":return l.toNumber(t)-l.toNumber(e);case"+=":return l.isString(t)||l.isString(e)?l.toString(t)+l.toString(e):l.toNumber(t)+l.toNumber(e);case"%=":return l.toNumber(t)%l.toNumber(e);default:throw new Error(c.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}}Object.defineProperty(r,"__esModule",{value:!0});var A=0;function F(e,r,t){var n;switch(r=r.toLowerCase()){case"hasz":var a=e.hasZ;return void 0!==a&&a;case"hasm":var i=e.hasM;return void 0!==i&&i;case"spatialreference":var l=e.spatialReference._arcadeCacheId;if(void 0===l){var f=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(f=!1),f&&(A++,e.spatialReference._arcadeCacheId=A,l=A)}var p=new o({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==l&&(p._arcadeCacheId="SPREF"+l.toString()),p}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":var d=e[r];return void 0!==d?d:null;case"type":return"Extent"}break;case"polygon":switch(r){case"rings":return void 0===(n=e.cache._arcadeCacheId)&&(n=++A,e.cache._arcadeCacheId=n),new s(e.rings,e.spatialReference,!0===e.hasZ,!0===e.hasM,n);case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":return void 0===(n=e.cache._arcadeCacheId)&&(n=++A,e.cache._arcadeCacheId=n),new s(e.paths,e.spatialReference,!0===e.hasZ,!0===e.hasM,n);case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":return void 0===(n=e.cache._arcadeCacheId)&&(n=++A,e.cache._arcadeCacheId=n),new u(e.points,e.spatialReference,!0===e.hasZ,!0===e.hasM,n,1);case"type":return"Multipoint"}}throw new Error(c.nodeErrorMessage(t,"RUNTIME","PROPERTYNOTFOUND"))}function U(e,r){var t;try{var n=r.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[n])return!0===(t=e.localScope[n]).valueset?t.value:(t.value=S(e,t.node),t.valueset=!0,t.value);if(void 0!==e.globalScope[n])return!0===(t=e.globalScope[n]).valueset?t.value:(t.value=S(e,t.node),t.valueset=!0,t.value);throw new Error(c.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND"))}catch(e){throw e}}var C={};function x(e){return null==e?"":l.isArray(e)?"Array":l.isImmutableArray(e)?"Array":l.isDate(e)?"Date":l.isString(e)?"String":l.isBoolean(e)?"Boolean":l.isNumber(e)?"Number":e instanceof n?"Attachment":e instanceof t?"Portal":e instanceof o?"Dictionary":e instanceof a?"Feature":e instanceof N?"Point":e instanceof y?"Polygon":e instanceof I?"Polyline":e instanceof w?"Multipoint":e instanceof v?"Extent":l.isFunctionParameter(e)?"Function":l.isFeatureSet(e)?"FeatureSet":l.isFeatureSetCollection(e)?"FeatureSetCollection":e===l.voidOperation?"":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function P(e,r){var t=e.length,n=Math.floor(t/2);return 0===t?[]:1===t?[e[0]]:function(e,r,t){var n=[];for(;e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=t(e[0],r[0]);isNaN(o)&&(o=0),o<=0?(n.push(e[0]),e=e.slice(1)):(n.push(r[0]),r=r.slice(1))}else e.length>0?(n.push(e[0]),e=e.slice(1)):r.length>0&&(n.push(r[0]),r=r.slice(1));return n}(P(e.slice(0,n),r),P(e.slice(n,t),r),r)}function D(e,r,t){try{var n=e.body;if(t.length!==e.params.length)throw new Error("Invalid Parameter calls to function.");for(var o=0;o<t.length;o++)r.localScope[e.params[o].name.toLowerCase()]={value:t[o],valueset:!0,node:null};var a=S(r,n);if(a instanceof l.ReturnResult)return a.value;if(a===l.breakResult)throw new Error("Cannot Break from a Function");if(a===l.continueResult)throw new Error("Cannot Continue from a Function");return a instanceof l.ImplicitResult?a.value:a}catch(e){throw e}}function L(e,r,t){return O(e,r,(function(r,n,o){var a={spatialReference:e.spatialReference,globalScope:e.globalScope,depthCounter:e.depthCounter+1,console:e.console,lrucache:e.lrucache,localScope:{}};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return D(t,a,o)}))}function k(e){return function(){var r={spatialReference:e.context.spatialReference,console:e.context.console,lrucache:e.context.lrucache,localScope:{},depthCounter:e.context.depthCounter+1,globalScope:e.context.globalScope};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return D(e.definition,r,arguments)}}for(var _ in f.registerFunctions(C,O),m.registerFunctions(C,O),h.registerFunctions(C,O),p.registerFunctions(C,O),g.registerFunctions(C,O),d.registerFunctions(C,O),C.typeof=function(e,r){return O(e,r,(function(e,r,t){l.pcCheck(t,1,1);var n=x(t[0]);if("Unrecognised Type"===n)throw new Error("Unrecognised Type");return n}))},C.iif=function(e,r){try{l.pcCheck(null===r.arguments?[]:r.arguments,3,3);var t=S(e,r.arguments[0]);if(!1===l.isBoolean(t))throw new Error("IF Function must have a boolean test condition");var n=S(e,r.arguments[1]),o=S(e,r.arguments[2]);return!0===t?n:o}catch(e){throw e}},C.decode=function(e,r){try{if(r.arguments.length<2)throw new Error("Missing Parameters");if(2===r.arguments.length)return S(e,r.arguments[1]);if((r.arguments.length-1)%2==0)throw new Error("Must have a default value result.");var t=S(e,r.arguments[0]);return function e(r,t,n,o){try{var a=S(r,t.arguments[n]);if(l.equalityTest(a,o))return S(r,t.arguments[n+1]);var i=t.arguments.length-n;return 1===i?S(r,t.arguments[n]):2===i?null:3===i?S(r,t.arguments[n+2]):e(r,t,n+2,o)}catch(e){throw e}}(e,r,1,t)}catch(e){throw e}},C.when=function(e,r){try{if(r.arguments.length<3)throw new Error("Missing Parameters");if(r.arguments.length%2==0)throw new Error("Must have a default value result.");var t=S(e,r.arguments[0]);if(!1===l.isBoolean(t))throw new Error("WHEN needs boolean test conditions");return function e(r,t,n,o){try{if(!0===o)return S(r,t.arguments[n+1]);if(3===t.arguments.length-n)return S(r,t.arguments[n+2]);var a=S(r,t.arguments[n+2]);if(!1===l.isBoolean(a))throw new Error("WHEN needs boolean test conditions");return e(r,t,n+2,a)}catch(e){throw e}}(e,r,0,t)}catch(e){throw e}},C.top=function(e,r){return O(e,r,(function(e,r,t){if(l.pcCheck(t,2,2),l.isArray(t[0]))return l.toNumber(t[1])>=t[0].length?t[0].slice(0):t[0].slice(0,l.toNumber(t[1]));if(l.isImmutableArray(t[0]))return l.toNumber(t[1])>=t[0].length()?t[0].slice(0):t[0].slice(0,l.toNumber(t[1]));throw new Error("Top cannot accept this parameter type")}))},C.first=function(e,r){return O(e,r,(function(e,r,t){return l.pcCheck(t,1,1),l.isArray(t[0])?0===t[0].length?null:t[0][0]:l.isImmutableArray(t[0])?0===t[0].length()?null:t[0].get(0):null}))},C.sort=function(e,r){return O(e,r,(function(e,r,t){l.pcCheck(t,1,2);var n=t[0];if(l.isImmutableArray(n)&&(n=n.toArray()),!1===l.isArray(n))throw new Error("Illegal Argument");if(t.length>1){if(!1===l.isFunctionParameter(t[1]))throw new Error("Illegal Argument");var o=n,a=k(t[1]);return o=P(o,(function(e,r){return a(e,r)}))}if(0===(o=n).length)return[];for(var i={},s=0;s<o.length;s++){var u=x(o[s]);""!==u&&(i[u]=!0)}if(!0===i.Array||!0===i.Dictionary||!0===i.Feature||!0===i.Point||!0===i.Polygon||!0===i.Polyline||!0===i.Multipoint||!0===i.Extent||!0===i.Function)return o.slice(0);var c=0,f="";for(var p in i)c++,f=p;return o=c>1||"String"===f?P(o,(function(e,r){if(null==e||e===l.voidOperation)return null==r||r===l.voidOperation?0:1;if(null==r||r===l.voidOperation)return-1;var t=l.toString(e),n=l.toString(r);return t<n?-1:t===n?0:1})):"Number"===f?P(o,(function(e,r){return e-r})):"Boolean"===f?P(o,(function(e,r){return e===r?0:r?-1:1})):"Date"===f?P(o,(function(e,r){return r-e})):o.slice(0)}))},C)C[_]={value:new l.NativeFunction(C[_]),valueset:!0,node:null};var B=function(){};(B.prototype=C).infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},B.prototype.pi={value:Math.PI,valueset:!0,node:null};var V={fixSpatialReference:l.fixSpatialReference,parseArguments:R,standardFunction:O};function Y(e){console.log(e)}r.functionHelper=V,r.extend=function(e){for(var r={mode:"sync",compiled:!1,functions:{},signatures:[],standardFunction:O,evaluateIdentifier:U,arcadeCustomFunctionHandler:k},t=0;t<e.length;t++)e[t].registerFunctions(r);for(var n in r.functions)C[n]={value:new l.NativeFunction(r.functions[n]),valueset:!0,node:null},B.prototype[n]=C[n];for(t=0;t<r.signatures.length;t++)c.addFunctionDeclaration(r.signatures[t],"async")},r.executeScript=function(e,r){var t=r.spatialReference;null==t&&(t=new b({wkid:102100}));var n=S({spatialReference:t,globalScope:function(e,r){var t=new B;e||(e={}),r||(r={});var n=new o({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});for(var i in n.immutable=!1,t.textformatting={value:n,valueset:!0,node:null},r)t[i]={value:new l.NativeFunction(r[i]),native:!0,valueset:!0,node:null};for(var i in e)e[i]&&"esri.Graphic"===e[i].declaredClass?t[i]={value:a.createFromGraphic(e[i]),valueset:!0,node:null}:t[i]={value:e[i],valueset:!0,node:null};return t}(r.vars,r.customfunctions),localScope:null,console:r.console?r.console:Y,lrucache:r.lrucache,depthCounter:1},e.body[0].body);if(n instanceof l.ReturnResult&&(n=n.value),n instanceof l.ImplicitResult&&(n=n.value),n===l.voidOperation&&(n=null),n===l.breakResult)throw new Error("Cannot return BREAK");if(n===l.continueResult)throw new Error("Cannot return CONTINUE");if(n instanceof i)throw new Error("Cannot return FUNCTION");if(n instanceof l.NativeFunction)throw new Error("Cannot return FUNCTION");return n},r.extractFieldLiterals=function(e,r){return void 0===r&&(r=!1),c.findFieldLiterals(e)},r.validateScript=function(e,r){return c.validateScript(e,r,"simple")},r.referencesMember=function(e,r){return c.referencesMember(e,r)},r.referencesFunction=function(e,r){return c.referencesFunction(e,r)},r.findFunctionCalls=function(e){return c.findFunctionCalls(e)}}));