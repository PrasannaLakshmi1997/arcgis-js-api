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

define(["require","exports","tslib","../../../../core/Error","../../../../core/lang","../../../../core/Logger","./LEPCC"],(function(e,t,r,n,a,o,u){Object.defineProperty(t,"__esModule",{value:!0});var i=o.getLogger("esri.views.3d.layers.i3s.I3SBinaryReader");function s(e,t,r){for(var a="",o=0;o<r;){var u=e[t+o];if(u<128)a+=String.fromCharCode(u),o++;else if(u>=192&&u<224){if(o+1>=r)throw new n("utf8-decode-error","UTF-8 Decode failed. Two byte character was truncated.");var i=(31&u)<<6|63&e[t+o+1];a+=String.fromCharCode(i),o+=2}else if(u>=224&&u<240){if(o+2>=r)throw new n("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");i=(15&u)<<12|(63&e[t+o+1])<<6|63&e[t+o+2];a+=String.fromCharCode(i),o+=3}else{if(!(u>=240&&u<248))throw new n("utf8-decode-error","UTF-8 Decode failed. Invalid multi byte sequence.");if(o+3>=r)throw new n("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");if((i=(7&u)<<18|(63&e[t+o+1])<<12|(63&e[t+o+2])<<6|63&e[t+o+3])>=65536){var s=55296+(i-65536>>10),c=56320+(1023&i);a+=String.fromCharCode(s,c)}else a+=String.fromCharCode(i);o+=4}}return a}function c(e,r){for(var n={byteOffset:0,byteCount:0,fields:Object.create(null)},a=0,o=0;o<r.length;o++){var u=r[o],i=u.valueType||u.type,s=t.valueType2ArrayBufferReader[i];n.fields[u.property]=s(e,a),a+=t.valueType2TypedArrayClassMap[i].BYTES_PER_ELEMENT}return n.byteCount=a,n}function f(e,t,r){var a,o,u=[],i=0;for(o=0;o<e;o+=1){if((a=t[o])>0){if(u.push(s(r,i,a-1)),0!==r[i+a-1])throw new n("string-array-error","Invalid string array: missing null termination.")}else u.push(null);i+=a}return u}function l(e,r){return new(0,t.valueType2TypedArrayClassMap[r.valueType])(e,r.byteOffset,r.count*r.valuesPerElement)}function y(e,t){return new Uint8Array(e,t.byteOffset,t.byteCount)}function d(e,t,r){for(var o=null!=t.header?c(e,t.header):{byteOffset:0,byteCount:0,fields:{count:r}},u={header:o,byteOffset:o.byteCount,byteCount:0,entries:Object.create(null)},i=o.byteCount,s=0;s<t.ordering.length;s++){var f=t.ordering[s],l=a.clone(t[f]);if(l.count=o.fields.count,"String"===l.valueType){if(l.byteOffset=i,l.byteCount=o.fields[f+"ByteCount"],"UTF-8"!==l.encoding)throw new n("unsupported-encoding","Unsupported String encoding.",{encoding:l.encoding})}else{if(!C(l.valueType))throw new n("unsupported-value-type","Unsupported binary valueType",{valueType:l.valueType});var y=h(l.valueType);i+=i%y!=0?y-i%y:0,l.byteOffset=i,l.byteCount=y*l.valuesPerElement*l.count}i+=l.byteCount,u.entries[f]=l}return u.byteCount=i-u.byteOffset,u}function b(e,t,r){if(t!==e&&i.error("Invalid "+r+" buffer size\n expected: "+e+", actual: "+t+")"),t<e)throw new n("buffer-too-small","Binary buffer is too small",{expectedSize:e,actualSize:t})}function g(e){return{isDraco:!1,isLegacy:!1,color:null!=e.color,normal:null!=e.normal,uv0:null!=e.uv0,uvRegion:null!=e.uvRegion,featureIndex:null!=e.faceRange&&null!=e.featureId}}function v(e){for(var t={isDraco:!1,isLegacy:!0,color:!1,normal:!1,uv0:!1,uvRegion:!1,featureIndex:!1},r=0,n=e.ordering;r<n.length;r++){var a=n[r];if(e.vertexAttributes[a])switch(a){case"position":break;case"normal":t.normal=!0;break;case"color":t.color=!0;break;case"uv0":t.uv0=!0;break;case"region":t.uvRegion=!0}}return e.featureAttributes&&e.featureAttributeOrder&&(t.featureIndex=!0),t}function p(e){for(var t={isDraco:!0,isLegacy:!1,color:!1,normal:!1,uv0:!1,uvRegion:!1,featureIndex:!1},r=0,n=e;r<n.length;r++){switch(n[r]){case"position":break;case"normal":t.normal=!0;break;case"uv0":t.uv0=!0;break;case"color":t.color=!0;break;case"uv-region":t.uvRegion=!0;break;case"feature-index":t.featureIndex=!0}}return t}t.readHeader=c,t.readStringArray=f,t.createTypedView=l,t.createRawView=y,t.createAttributeDataIndex=d,t.createGeometryDescriptorFromDefinition=g,t.createGeometryIndexFromSchema=function(e,t){for(var n=c(e,t&&t.header),a=n.byteCount,o={isDraco:!1,header:n,byteOffset:n.byteCount,byteCount:0,vertexAttributes:{}},u=n.fields,i=null!=u.vertexCount?u.vertexCount:u.count,s=0,f=t.ordering;s<f.length;s++){var l=f[s];if(t.vertexAttributes[l]){var y=r.__assign(r.__assign({},t.vertexAttributes[l]),{byteOffset:a,count:i}),d=w[l]?w[l]:"_"+l;o.vertexAttributes[d]=y,a+=h(y.valueType)*y.valuesPerElement*i}}var g=u.faceCount;if(t.faces&&g){o.faces={};for(var v=0,p=t.ordering;v<p.length;v++){var C=p[v];if(t.faces[C]){y=r.__assign(r.__assign({},t.faces[C]),{byteOffset:a,count:g});o.faces[C]=y,a+=h(y.valueType)*y.valuesPerElement*g}}}var m=u.featureCount;if(t.featureAttributes&&t.featureAttributeOrder&&m){o.featureAttributes={};for(var I=0,T=t.featureAttributeOrder;I<T.length;I++){var A=T[I];if(t.featureAttributes[A]){y=r.__assign(r.__assign({},t.featureAttributes[A]),{byteOffset:a,count:m});o.featureAttributes[A]=y,a+=("UInt64"===y.valueType?8:h(y.valueType))*y.valuesPerElement*m}}}return b(a,e.byteLength,"geometry"),o.byteCount=a-o.byteOffset,o},t.createGeometryDescriptor=function(e,t){return!(!e||!e.compressedAttributes||"draco"!==e.compressedAttributes.encoding)?p(e.compressedAttributes.attributes):e?g(e):v(t)},t.createGeometryDescriptorFromSchema=v,t.createGeometryDescriptorForDraco=p;var w={position:"position",normal:"normal",color:"color",uv0:"uv0",region:"uvRegion"};function C(e){return t.valueType2TypedArrayClassMap.hasOwnProperty(e)}function h(e){return C(e)?t.valueType2TypedArrayClassMap[e].BYTES_PER_ELEMENT:0}t.readBinaryAttribute=function(e,t,r){if("lepcc-rgb"===e.encoding)return u.decodeRGB(t);if("lepcc-intensity"===e.encoding)return u.decodeIntensity(t);if(null!=e.encoding&&""!==e.encoding)throw new n("unknown-attribute-storage-info-encoding","Unknown Attribute Storage Info Encoding");e["attributeByteCounts "]&&!e.attributeByteCounts&&(i.warn("Warning: Trailing space in 'attributeByteCounts '."),e.attributeByteCounts=e["attributeByteCounts "]),"ObjectIds"===e.ordering[0]&&e.hasOwnProperty("objectIds")&&(i.warn("Warning: Case error in objectIds"),e.ordering[0]="objectIds");var a=d(t,e,r);b(a.byteOffset+a.byteCount,t.byteLength,"attribute");var o=a.entries.attributeValues||a.entries.objectIds;if(o){if("String"===o.valueType){var s=a.entries.attributeByteCounts,c=l(t,s),g=y(t,o);return f(s.count,c,g)}return l(t,o)}throw new n("bad-attribute-storage-info","Bad attributeStorageInfo specification.")},t.valueType2TypedArrayClassMap={Float32:Float32Array,Float64:Float64Array,UInt8:Uint8Array,Int8:Int8Array,UInt16:Uint16Array,Int16:Int16Array,UInt32:Uint32Array,Int32:Int32Array},t.valueType2ArrayBufferReader={Float32:function(e,t){return new DataView(e,0).getFloat32(t,!0)},Float64:function(e,t){return new DataView(e,0).getFloat64(t,!0)},UInt8:function(e,t){return new DataView(e,0).getUint8(t)},Int8:function(e,t){return new DataView(e,0).getInt8(t)},UInt16:function(e,t){return new DataView(e,0).getUint16(t,!0)},Int16:function(e,t){return new DataView(e,0).getInt16(t,!0)},UInt32:function(e,t){return new DataView(e,0).getUint32(t,!0)},Int32:function(e,t){return new DataView(e,0).getInt32(t,!0)}},t.isValueType=C,t.getBytesPerValue=h}));