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

define(["require","exports","tslib","../../../../../../core/has","../../definitions","../../enums","../../number","../../TileClipper","../../TurboLine","../../WGLDisplayRecord","../../materialKey/MaterialKey","./util"],(function(t,e,i,r,n,s,o,l,a,h,u,f){Object.defineProperty(e,"__esModule",{value:!0});var p=n.TILE_SIZE+16,_=new l.TileClipper(0,0,0,1,16);_.setExtent(n.TILE_SIZE);var d=0,c=0,x=0;r("esri-tiles-performance")&&setInterval((function(){console.log("New (FL)","feat="+x,"secs="+d,"tris="+c,"tris/sec="+Math.round(c/d))}),1e4);var v=new Uint32Array(9),y=new Uint32Array(36),m=new Uint32Array(3),C=new Uint32Array(6),M=function(t){return function(e){var i=Math.ceil(1024*t._halfWidth),r=Math.ceil(1024*t._halfReferenceWidth);e.entry0=t.offset+t.vertexCount++;var n=o.i1616to32(e.distance,i),s=o.i8888to32(Math.round(31*e.prevNormal.x),Math.round(31*e.prevNormal.y),Math.round(0),Math.round(-31)),l=o.i8888to32(0,0,0,t._bitset);y[0]=o.i1616to32(8*e.currentVertex.x,8*e.currentVertex.y),y[1]=t.id,y[2]=t._fillColor,y[3]=s,y[4]=n,y[5]=t._tl,y[6]=t._br,y[7]=l,y[8]=o.i1616to32(r,0),e.entry2=t.offset+t.vertexCount++;n=o.i1616to32(e.distance,i),s=o.i8888to32(Math.round(31*-e.prevNormal.x),Math.round(31*-e.prevNormal.y),Math.round(0),Math.round(31)),l=o.i8888to32(0,0,0,t._bitset);y[9]=o.i1616to32(8*e.currentVertex.x,8*e.currentVertex.y),y[10]=t.id,y[11]=t._fillColor,y[12]=s,y[13]=n,y[14]=t._tl,y[15]=t._br,y[16]=l,y[17]=o.i1616to32(r,0),e.exit0=t.offset+t.vertexCount++;n=o.i1616to32(e.distance,i),s=o.i8888to32(Math.round(31*e.nextNormal.x),Math.round(31*e.nextNormal.y),Math.round(0),Math.round(-31)),l=o.i8888to32(0,0,0,t._bitset);y[18]=o.i1616to32(8*e.currentVertex.x,8*e.currentVertex.y),y[19]=t.id,y[20]=t._fillColor,y[21]=s,y[22]=n,y[23]=t._tl,y[24]=t._br,y[25]=l,y[26]=o.i1616to32(r,0),e.exit2=t.offset+t.vertexCount++;n=o.i1616to32(e.distance,i),s=o.i8888to32(Math.round(31*-e.nextNormal.x),Math.round(31*-e.nextNormal.y),Math.round(0),Math.round(31)),l=o.i8888to32(0,0,0,t._bitset);y[27]=o.i1616to32(8*e.currentVertex.x,8*e.currentVertex.y),y[28]=t.id,y[29]=t._fillColor,y[30]=s,y[31]=n,y[32]=t._tl,y[33]=t._br,y[34]=l,y[35]=o.i1616to32(r,0),t.geometryBuf.writeRegion(y)}},g=function(t){return function(e){C[0]=e.leftExit0,C[1]=e.rightEntry0,C[2]=e.leftExit2,C[3]=e.rightEntry0,C[4]=e.rightEntry2,C[5]=e.leftExit2,t.indexCount+=6,t.indexBuf.writeRegion(C)}},b=function(t){return function(e,i,r,n,s,l,a,h,u){var f=o.i1616to32(u,Math.ceil(1024*t._halfWidth)),p=o.i8888to32(Math.round(31*s),Math.round(31*l),Math.round(31*a),Math.round(31*h)),_=o.i8888to32(31*r,31*n,0,t._bitset);return v[0]=o.i1616to32(8*e,8*i),v[1]=t.id,v[2]=t._fillColor,v[3]=p,v[4]=f,v[5]=t._tl,v[6]=t._br,v[7]=_,v[8]=o.i1616to32(Math.ceil(1024*t._halfReferenceWidth),0),t.geometryBuf.writeRegion(v),t.offset+t.vertexCount++}},T=function(t){return function(e,i,r){m[0]=e,m[1]=i,m[2]=r,t.indexCount+=3,t.indexBuf.writeRegion(m)}};e.default=function(t){return function(t){function e(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var r=t.apply(this,e)||this;return r.tessellationProperties={_fillColor:null,_tl:null,_br:null,_halfWidth:null,_bitset:null,_halfReferenceWidth:null,id:null,indexBuf:null,indexCount:null,geometryBuf:null,vertexCount:null,offset:null},r._tessellationOptions={},r.geometryType=s.WGLGeometryType.LINE,r}return i.__extends(e,t),e.prototype.writeMeshWithGeometry=function(t,e,i,r,n,s){var o=e.indexVector,l=e.get("geometry"),a=new h(r,this.geometryType,this._materialKey),u=e.getVector("geometry").vertexCount;if(a.vertexFrom=u,a.indexFrom=o.length,f.isPolyline(s)){var p=s.paths;if(0===(_=this._clipLines(p)).length)return;return this._write(a,o,l,u,r,_),void t.push(a)}if(f.isPolygon(s)){var _,d=s.rings;if(0===(_=this._clipLines(d)).length)return;return this._write(a,o,l,u,r,_),void t.push(a)}},e.prototype._clipLines=function(t){for(var e=[],i=!1,r=0;r<t.length;){var n=[],s=t[r];_.reset(2);var o=s[0],l=o[0],a=o[1];if(i)_.moveTo(l,a);else{if(l<-16||l>p||a<-16||a>p){i=!0;continue}n.push({x:l,y:a})}for(var h=!1,u=s.length,f=1;f<u;++f)if(l+=s[f][0],a+=s[f][1],i)_.lineTo(l,a);else{if(l<-16||l>p||a<-16||a>p){h=!0;break}n.push({x:l,y:a})}if(h)i=!0;else{if(i){var d=_.resultWithStarts();if(d)for(var c=0,x=d;c<x.length;c++){var v=x[c];e.push(v)}}else e.push({line:n,start:0});r++,i=!1}}return e},e.prototype._write=function(t,e,i,n,s,o){var l;r("esri-tiles-performance")&&(l=performance.now()),this.tessellationProperties.id=s,this.tessellationProperties.indexBuf=e,this.tessellationProperties.indexCount=0,this.tessellationProperties.geometryBuf=i,this.tessellationProperties.vertexCount=0,this.tessellationProperties.offset=n;for(var h=0,u=o;h<u.length;h++){var f=u[h],p=f.line;p.length<2||(this._tessellationOptions.initialDistance=f.start%65535,this._tessellationCallbacks instanceof a.StandardTessellationCallbacks&&(this._tessellationCallbacks.capType=this._capType,this._tessellationCallbacks.joinType=this._joinType),a.tessellate(p,this._tessellationOptions,this._tessellationCallbacks),a.cleanup(),r("esri-tiles-performance")&&x++)}t.vertexCount=this.tessellationProperties.vertexCount,t.indexCount=this.tessellationProperties.indexCount,t.zOrder=this._zOrder,r("esri-tiles-performance")&&(d+=(performance.now()-l)/1e3,c+=t.indexCount/3)},e.prototype._initializeTessellator=function(t){var e=u.LineMaterialKey.load(this._materialKey);if(this._tessellationOptions.trackDistance=this._isDashed||this._hasPattern,this._tessellationOptions.thin=!t&&this.tessellationProperties._halfWidth<n.THIN_LINE_THRESHOLD/2&&!(e.vvSizeFieldStops||e.vvSizeMinMaxValue||e.vvSizeScaleStops||e.vvSizeUnitValue),this._tessellationOptions.wrapDistance=65535,this._tessellationOptions.outerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableOuterBisectorSplit=this._isDashed||this._hasPattern,this._tessellationOptions.innerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableInnerBisectorSplit=this._isDashed||this._hasPattern,this._tessellationOptions.thin)this._tessellationCallbacks={vertex:M(this.tessellationProperties),bridge:g(this.tessellationProperties)};else{var i=new a.StandardTessellationCallbacks(b(this.tessellationProperties),T(this.tessellationProperties));i.miterLimitCosine=this._miterLimitCosine,i.textured=this._isDashed||this._hasPattern,i.joinOnUTurn=this._joinOnUTurn,this._tessellationCallbacks=i}},e}(t)}}));