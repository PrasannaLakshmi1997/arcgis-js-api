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

define(["require","exports","tslib","../../../../core/maybe","../../../../core/promiseUtils","./BackgroundBucket","./CircleBucket","./FillBucket","./GeometryUtils","./IndexMemoryBuffer","./LineBucket","./Placement","./SymbolBucket","./TileParser","./VertexMemoryBuffer","../../tiling/enums"],(function(e,t,r,f,s,n,i,u,o,a,l,B,h,x,I,c){return function(){function e(){this.rotation=0,this.status=c.TileStatus.INITIALIZED,this._symbolBuckets=[],this.placementEngine=new B.PlacementEngine,this.fillVertexBuffer=new I.FillVertexBuffer(!1),this.fillDDVertexBuffer=new I.FillVertexBuffer(!0),this.fillIndexBuffer=new a.TriangleIndexBuffer,this.outlineVertexBuffer=new I.OutlineVertexBuffer(!1),this.outlineDDVertexBuffer=new I.OutlineVertexBuffer(!0),this.outlineIndexBuffer=new a.TriangleIndexBuffer,this.lineVertexBuffer=new I.LineVertexBuffer(!1),this.lineDDVertexBuffer=new I.LineVertexBuffer(!0),this.lineIndexBuffer=new a.TriangleIndexBuffer,this.iconVertexBuffer=new I.SymbolVertexBuffer(!1),this.iconDDVertexBuffer=new I.SymbolVertexBuffer(!0),this.iconIndexBuffer=new a.TriangleIndexBuffer,this.textVertexBuffer=new I.SymbolVertexBuffer(!1),this.textDDVertexBuffer=new I.SymbolVertexBuffer(!0),this.textIndexBuffer=new a.TriangleIndexBuffer,this.circleVertexBuffer=new I.CircleVertexBuffer,this.circleIndexBuffer=new a.TriangleIndexBuffer}return e.prototype.initialize=function(e,t,r,f){void 0===f&&(f=0),this.tileKey=e,this.refKeys=t,this._workerTileHandler=r,this.rotation=f,this.placementEngine.setAngle(o.C_DEG_TO_RAD*f)},e.prototype.release=function(){this.tileKey="",this.refKeys=null,this.status=c.TileStatus.INITIALIZED,this.rotation=0,this.resetData(),this._workerTileHandler=null},e.prototype.resetData=function(){this.fillVertexBuffer.reset(),this.fillDDVertexBuffer.reset(),this.fillIndexBuffer.reset(),this.outlineVertexBuffer.reset(),this.outlineDDVertexBuffer.reset(),this.outlineIndexBuffer.reset(),this.lineVertexBuffer.reset(),this.lineDDVertexBuffer.reset(),this.lineIndexBuffer.reset(),this.iconVertexBuffer.reset(),this.iconDDVertexBuffer.reset(),this.iconIndexBuffer.reset(),this.textVertexBuffer.reset(),this.textDDVertexBuffer.reset(),this.textIndexBuffer.reset(),this.circleVertexBuffer.reset(),this.circleIndexBuffer.reset(),this.placementEngine.reset(),this._symbolBuckets.length=0},e.prototype.reparse=function(e){return this.resetData(),this.setDataAndParse(this._data,e)},e.prototype.setDataAndParse=function(e,t){var r=this,s=t&&t.signal;if(f.isSome(s)){var o=function(){s.removeEventListener("abort",o),r.status=c.TileStatus.INVALID};s.addEventListener("abort",o)}return this._data=e,this._parse(e,t).then((function(e){r.status=c.TileStatus.READY;for(var t=[1,r.fillVertexBuffer.sizeInBytes,2,r.fillDDVertexBuffer.sizeInBytes,3,r.fillIndexBuffer.sizeInBytes,4,r.outlineVertexBuffer.sizeInBytes,5,r.outlineDDVertexBuffer.sizeInBytes,6,r.outlineIndexBuffer.sizeInBytes,7,r.lineVertexBuffer.sizeInBytes,8,r.lineDDVertexBuffer.sizeInBytes,9,r.lineIndexBuffer.sizeInBytes,10,r.iconVertexBuffer.sizeInBytes,11,r.iconDDVertexBuffer.sizeInBytes,12,r.iconIndexBuffer.sizeInBytes,13,r.textVertexBuffer.sizeInBytes,14,r.textDDVertexBuffer.sizeInBytes,15,r.textIndexBuffer.sizeInBytes,16,r.circleVertexBuffer.sizeInBytes,17,r.circleIndexBuffer.sizeInBytes],f=new Uint32Array(t),s=[],o=e.length,a=0;a<o;a++){var B=e[a];if(B instanceof u)s.push(B.layerIndex),s.push(1),s.push(B.fillIndexStart),s.push(B.fillIndexCount),s.push(B.outlineIndexStart),s.push(B.outlineIndexCount);else if(B instanceof l)s.push(B.layerIndex),s.push(2),s.push(B.lineIndexStart),s.push(B.lineIndexCount);else if(B instanceof h){s.push(B.layerIndex),s.push(3),s.push(B.sdfMarker?1:0);var x=B.markerPageMap;s.push(x.size),x.forEach((function(e,t){s.push(t),s.push(e[0]),s.push(e[1])}));var I=B.glyphsPageMap;s.push(I.size),I.forEach((function(e,t){s.push(t),s.push(e[0]),s.push(e[1])}))}else B instanceof i?(s.push(B.layerIndex),s.push(4),s.push(B.circleIndexStart),s.push(B.circleIndexCount)):B instanceof n&&(s.push(B.layerIndex),s.push(0))}var p=new Uint32Array(s),y=r.fillVertexBuffer.toBuffer(),D=r.fillDDVertexBuffer.toBuffer(),d=r.fillIndexBuffer.toBuffer(),V=r.outlineVertexBuffer.toBuffer(),v=r.outlineDDVertexBuffer.toBuffer(),z=r.outlineIndexBuffer.toBuffer(),b=r.lineVertexBuffer.toBuffer(),g=r.lineDDVertexBuffer.toBuffer(),m=r.lineIndexBuffer.toBuffer(),w=r.iconVertexBuffer.toBuffer(),T=r.iconDDVertexBuffer.toBuffer(),k=r.iconIndexBuffer.toBuffer(),S=r.textVertexBuffer.toBuffer(),_=r.textDDVertexBuffer.toBuffer(),E=r.textIndexBuffer.toBuffer(),A=r.circleVertexBuffer.toBuffer(),L=r.circleIndexBuffer.toBuffer();return{result:{bufferDataInfo:f.buffer,bucketDataInfo:p.buffer,bufferData:[y,D,d,V,v,z,b,g,m,w,T,k,S,_,E,A,L]},transferList:[y,D,d,V,v,z,b,g,m,w,T,k,S,_,E,A,L,f.buffer,p.buffer]}}))},e.prototype.addBucket=function(e){this._symbolBuckets.push(e)},e.prototype.updateSymbols=function(e,t){var r=this,n=this._symbolBuckets;if(!n||0===n.length)return s.resolve();var i=t&&t.signal;if(f.isSome(i)){var u=function(){i.removeEventListener("abort",u),r.status=c.TileStatus.INVALID};i.addEventListener("abort",u)}this.rotation=e;var a=this.placementEngine;a.reset(),a.setAngle(e/256*360*o.C_DEG_TO_RAD);var l=this.iconVertexBuffer;l.reset();var B=this.iconDDVertexBuffer;B.reset();var h=this.iconIndexBuffer;h.reset();var x=this.textVertexBuffer;x.reset();var I=this.textDDVertexBuffer;I.reset();var p=this.textIndexBuffer;p.reset();for(var y=[],D=0;D<n.length;D++){var d=n[D];if(d&&d.layer){var V=d.layer,v=d.copy(V.hasDataDrivenIcon?B:l,h,V.hasDataDrivenText?I:x,p,a);v&&(y.push(v),v.updateSymbols())}}if(this.status===c.TileStatus.INVALID||this.status===c.TileStatus.INITIALIZED||0===l.sizeInBytes&&0===B.sizeInBytes&&0===h.sizeInBytes&&0===x.sizeInBytes&&0===I.sizeInBytes&&0===p.sizeInBytes)return s.reject();var z=[10,l.sizeInBytes,11,B.sizeInBytes,12,h.sizeInBytes,13,x.sizeInBytes,14,I.sizeInBytes,15,p.sizeInBytes],b=new Uint32Array(z),g=[];for(D=0;D<y.length;D++){var m=y[D];g.push(m.layerIndex),g.push(3),g.push(m.sdfMarker?1:0);var w=m.markerPageMap;g.push(w.size),w.forEach((function(e,t){g.push(t),g.push(e[0]),g.push(e[1])}));var T=m.glyphsPageMap;g.push(T.size),T.forEach((function(e,t){g.push(t),g.push(e[0]),g.push(e[1])}))}var k=new Uint32Array(g),S=l.toBuffer(),_=B.toBuffer(),E=h.toBuffer(),A=x.toBuffer(),L=I.toBuffer(),M=p.toBuffer();return s.resolve({result:{bufferDataInfo:b.buffer,bucketDataInfo:k.buffer,bufferData:[S,_,E,A,L,M]},transferList:[S,_,E,A,L,M,b.buffer,k.buffer]})},e.prototype.setObsolete=function(){this.status=c.TileStatus.INVALID},e.prototype.getLayers=function(){return this._workerTileHandler.getLayers()},e.prototype.getWorkerTileHandler=function(){return this._workerTileHandler},e.prototype._parse=function(e,t){return r.__awaiter(this,void 0,void 0,(function(){return r.__generator(this,(function(r){return 0===Object.keys(e).length?[2,[]]:(this.status=c.TileStatus.MODIFIED,[2,new x(e,this,t.client).parse(t)])}))}))},e}()}));