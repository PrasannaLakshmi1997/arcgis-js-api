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

define(["require","exports","tslib","./internals/Mat3","./internals/Mat4","./internals/Scalar","./internals/Vec2","./internals/Vec3","./internals/Vec4"],(function(e,t,r,n,f,u,i,y,a){Object.defineProperty(t,"__esModule",{value:!0});var l=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(u.BufferViewScalarImpl);t.BufferViewFloat=l;var c=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(i.BufferViewVec2Impl);t.BufferViewVec2f=c;var o=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(y.BufferViewVec3Impl);t.BufferViewVec3f=o;var s=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(a.BufferViewVec4Impl);t.BufferViewVec4f=s;var b=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(n.BufferViewMat3Impl);t.BufferViewMat3f=b;var p=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(n.BufferViewMat3Impl);t.BufferViewMat3f64=p;var m=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float32Array,t,r,n,f)||this;return u.elementType="f32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f32",t}(f.BufferViewMat4Impl);t.BufferViewMat4f=m;var V=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(f.BufferViewMat4Impl);t.BufferViewMat4f64=V;var d=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(u.BufferViewScalarImpl);t.BufferViewFloat64=d;var v=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(i.BufferViewVec2Impl);t.BufferViewVec2f64=v;var h=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(y.BufferViewVec3Impl);t.BufferViewVec3f64=h;var w=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Float64Array,t,r,n,f)||this;return u.elementType="f64",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="f64",t}(a.BufferViewVec4Impl);t.BufferViewVec4f64=w;var T=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint8Array,t,r,n,f)||this;return u.elementType="u8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u8",t}(u.BufferViewScalarImpl);t.BufferViewUint8=T;var _=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint8Array,t,r,n,f)||this;return u.elementType="u8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u8",t}(i.BufferViewVec2Impl);t.BufferViewVec2u8=_;var O=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint8Array,t,r,n,f)||this;return u.elementType="u8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u8",t}(y.BufferViewVec3Impl);t.BufferViewVec3u8=O;var A=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint8Array,t,r,n,f)||this;return u.elementType="u8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u8",t}(a.BufferViewVec4Impl);t.BufferViewVec4u8=A;var B=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint16Array,t,r,n,f)||this;return u.elementType="u16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u16",t}(u.BufferViewScalarImpl);t.BufferViewUint16=B;var I=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint16Array,t,r,n,f)||this;return u.elementType="u16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u16",t}(i.BufferViewVec2Impl);t.BufferViewVec2u16=I;var x=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint16Array,t,r,n,f)||this;return u.elementType="u16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u16",t}(y.BufferViewVec3Impl);t.BufferViewVec3u16=x;var g=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint16Array,t,r,n,f)||this;return u.elementType="u16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u16",t}(a.BufferViewVec4Impl);t.BufferViewVec4u16=g;var E=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint32Array,t,r,n,f)||this;return u.elementType="u32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u32",t}(u.BufferViewScalarImpl);t.BufferViewUint32=E;var L=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint32Array,t,r,n,f)||this;return u.elementType="u32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u32",t}(i.BufferViewVec2Impl);t.BufferViewVec2u32=L;var U=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint32Array,t,r,n,f)||this;return u.elementType="u32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u32",t}(y.BufferViewVec3Impl);t.BufferViewVec3u32=U;var F=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Uint32Array,t,r,n,f)||this;return u.elementType="u32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="u32",t}(a.BufferViewVec4Impl);t.BufferViewVec4u32=F;var M=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int8Array,t,r,n,f)||this;return u.elementType="i8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i8",t}(u.BufferViewScalarImpl);t.BufferViewInt8=M;var S=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int8Array,t,r,n,f)||this;return u.elementType="i8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i8",t}(i.BufferViewVec2Impl);t.BufferViewVec2i8=S;var j=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int8Array,t,r,n,f)||this;return u.elementType="i8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i8",t}(y.BufferViewVec3Impl);t.BufferViewVec3i8=j;var q=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int8Array,t,r,n,f)||this;return u.elementType="i8",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i8",t}(a.BufferViewVec4Impl);t.BufferViewVec4i8=q;var P=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int16Array,t,r,n,f)||this;return u.elementType="i16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i16",t}(u.BufferViewScalarImpl);t.BufferViewInt16=P;var k=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int16Array,t,r,n,f)||this;return u.elementType="i16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i16",t}(i.BufferViewVec2Impl);t.BufferViewVec2i16=k;var z=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int16Array,t,r,n,f)||this;return u.elementType="i16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i16",t}(y.BufferViewVec3Impl);t.BufferViewVec3i16=z;var C=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int16Array,t,r,n,f)||this;return u.elementType="i16",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i16",t}(a.BufferViewVec4Impl);t.BufferViewVec4i16=C;var D=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int32Array,t,r,n,f)||this;return u.elementType="i32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i32",t}(u.BufferViewScalarImpl);t.BufferViewInt32=D;var G=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int32Array,t,r,n,f)||this;return u.elementType="i32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i32",t}(i.BufferViewVec2Impl);t.BufferViewVec2i32=G;var H=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int32Array,t,r,n,f)||this;return u.elementType="i32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i32",t}(y.BufferViewVec3Impl);t.BufferViewVec3i32=H;var J=function(e){function t(t,r,n,f){void 0===r&&(r=0);var u=e.call(this,Int32Array,t,r,n,f)||this;return u.elementType="i32",u}return r.__extends(t,e),t.fromTypedArray=function(e,r){return new t(e.buffer,e.byteOffset,r,e.byteOffset+e.byteLength)},t.ElementType="i32",t}(a.BufferViewVec4Impl);t.BufferViewVec4i32=J}));