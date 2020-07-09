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

define(["require","exports","tslib","../../../../core/has","./Bucket","./style/StyleLayer","../webgl/TurboLine","../webgl/mesh/templates/util"],(function(e,t,r,n,i,x,l,s){var a=0,d=0,u=0;n("esri-tiles-performance")&&setInterval((function(){console.log("New (VTL)","feat="+u,"secs="+a,"tris="+d,"tris/sec="+Math.round(d/a))}),1e4);var o=function(e){function t(t,r,n,i){var x=e.call(this,t,r)||this;if(x._tessellationOptions={},x.tessellationProperties={_lineVertexBuffer:null,_lineIndexBuffer:null,_hasPattern:null,_ddValues:null,_capType:null,_joinType:null,_miterLimitCosine:null,_roundLimitCosine:null},t.hasDataDrivenLine!==n.isDataDriven())throw new Error("incompatible line buffer");return x.tessellationProperties._lineVertexBuffer=n,x.tessellationProperties._lineIndexBuffer=i,x.tessellationProperties._hasPattern=t.getPaintValue("line-pattern",x.zoom)||t.getPaintValue("line-dasharray",x.zoom).length>0,x._isThinLine=t.isThinLine,x._isThinLine?x._tessellationCallbacks={vertex:f(x.tessellationProperties),bridge:c(x.tessellationProperties)}:x._tessellationCallbacks={vertex:V(x.tessellationProperties),bridge:_(x.tessellationProperties)},x}return r.__extends(t,e),Object.defineProperty(t.prototype,"lineIndexStart",{get:function(){return this._lineIndexStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lineIndexCount",{get:function(){return this._lineIndexCount},enumerable:!0,configurable:!0}),t.prototype.assignBufferInfo=function(e){var t=e;t._lineIndexStart=this._lineIndexStart,t._lineIndexCount=this._lineIndexCount},t.prototype.processFeatures=function(e){this._lineIndexStart=this.tessellationProperties._lineIndexBuffer.index,this._lineIndexCount=0;var t=this.layer,r=this.zoom,n=t.hasDataDrivenLine;e&&e.setExtent(this.layerExtent);for(var i=[1,1,1,1],a=1,d=1,u=0,o=this._features;u<o.length;u++){var f=o[u],c=new x.LineLayout(t,r,f);!this.tessellationProperties._hasPattern&&t.hasDataDrivenColor&&(i=t.getPaintValue("line-color",r,f)),t.hasDataDrivenOpacity&&(a=t.getPaintValue("line-opacity",r,f)),t.hasDataDrivenWidth&&(d=t.getPaintValue("line-width",r,f));var V=void 0;if(!n||!((V={color:i,opacity:a,size:Math.max(Math.min(d,256),0)}).size<=0||V.opacity<=0||V.color[3]<=0)){this.tessellationProperties._capType=c.cap,this.tessellationProperties._joinType=c.join,this.tessellationProperties._miterLimitCosine=s.getLimitCosine(c.miterLimit),this.tessellationProperties._roundLimitCosine=s.getLimitCosine(c.roundLimit);var _=f.getGeometry(e);this._processFeature(_,V)}}l.cleanup()},t.prototype._processFeature=function(e,t){if(e)for(var r=e.length,n=0;n<r;n++)this._processGeometry(e[n],t)},t.prototype._processGeometry=function(e,t){var r;if(n("esri-tiles-performance")&&(r=performance.now()),!(e.length<2)){for(var i,x,s=e[0],o=1;o<e.length;)(i=e[o].x-s.x)*i+(x=e[o].y-s.y)*x<1e-6?e.splice(o,1):(s=e[o],++o);if(!(e.length<2)){var f=this.tessellationProperties._lineIndexBuffer.index;this._tessellationOptions.trackDistance=this.tessellationProperties._hasPattern,this._tessellationOptions.initialDistance=0,this._tessellationOptions.thin=this._isThinLine,this._tessellationOptions.wrapDistance=65535,this._tessellationOptions.outerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableOuterBisectorSplit=this.tessellationProperties._hasPattern,this._tessellationOptions.innerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableInnerBisectorSplit=this.tessellationProperties._hasPattern,this.tessellationProperties._ddValues=t,l.tessellate(e,this._tessellationOptions,this._tessellationCallbacks),this._lineIndexCount+=3*(this.tessellationProperties._lineIndexBuffer.index-f),n("esri-tiles-performance")&&(a+=(performance.now()-r)/1e3,d+=this.tessellationProperties._lineIndexBuffer.index-f,u++)}}},t}(i),f=function(e){return function(t){t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)}},c=function(e){return function(t){e._lineIndexBuffer.add(t.leftExit0,t.rightEntry0,t.leftExit2),e._lineIndexBuffer.add(t.rightEntry0,t.rightEntry2,t.leftExit2)}},V=function(e){return function(t){var r,n=2===e._joinType?e._miterLimitCosine:e._roundLimitCosine,i=t.isCap&&0!==e._capType,x=!1;if(t.cosine>.97?(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues),t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues)):t.cosine<1-.97?(t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):t.canSplit?(l.splitVertex(),t.sign>0?(t.splitInner?(t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.leftInner.x,t.leftInner.y,0,-1,t.distance,e._ddValues),t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.rightInner.x,t.rightInner.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues)),t.cosine<n?(x=!t.isCap,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):t.splitOuter?(x=x||t.gapOuter,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.leftOuter.x,-t.leftOuter.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.rightOuter.x,-t.rightOuter.y,0,1,t.distance,e._ddValues)):(t.entry2=t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues))):(t.splitInner?(t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.leftInner.x,-t.leftInner.y,0,1,t.distance,e._ddValues),t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.rightInner.x,-t.rightInner.y,0,1,t.distance,e._ddValues)):(t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues)),t.cosine<n?(x=!t.isCap,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues)):t.splitOuter?(x=x||t.gapOuter,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.leftOuter.x,t.leftOuter.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.rightOuter.x,t.rightOuter.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues)))):t.sign>0?(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues),t.cosine<n?(x=!t.isCap,t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x,-t.prevNormal.y,0,1,t.distance,e._ddValues),t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.nextNormal.x,-t.nextNormal.y,0,1,t.distance,e._ddValues)):(t.entry2=t.exit2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues))):(t.exit2=t.entry2=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.bisector.x/t.cosine,-t.bisector.y/t.cosine,0,1,t.distance,e._ddValues),t.cosine<n?(x=!t.isCap,t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x,t.prevNormal.y,0,-1,t.distance,e._ddValues),t.exit0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.nextNormal.x,t.nextNormal.y,0,-1,t.distance,e._ddValues)):(t.exit0=t.entry0=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.bisector.x/t.cosine,t.bisector.y/t.cosine,0,-1,t.distance,e._ddValues))),t.canSplit&&(t.splitInner||t.splitOuter)||x||i?(r=t.entry1=t.exit1=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,0,0,0,0,t.distance,e._ddValues)):r=t.entry1=t.exit1=null,x&&1!==e._joinType)e._lineIndexBuffer.add(r,t.sign>0?t.exit2:t.entry0,t.sign>0?t.entry2:t.exit0);else if(i&&1===e._capType||x&&1===e._joinType){var s,a=void 0,d=void 0,u=void 0,o=void 0,f=void 0,c=void 0;if(t.isCap)c=(s=Math.PI)/(f=Math.ceil(s/.8)),t.isFirstVertex?(a=t.prevNormal.x,d=t.prevNormal.y,u=t.entry0,o=t.entry2):t.isLastVertex&&(a=-t.nextNormal.x,d=-t.nextNormal.y,u=t.exit2,o=t.exit0);else c=(s=2*Math.acos(t.cosine))/(f=Math.ceil(s/.8)),a=t.sign>0?-t.prevNormal.x:t.nextNormal.x,d=t.sign>0?-t.prevNormal.y:t.nextNormal.y,u=t.sign>0?t.entry2:t.exit0,o=t.sign>0?t.exit2:t.entry0;var V=Math.cos(c),_=Math.sin(c),y=_*a+V*d;a=V*a-_*d,d=y;for(var p=void 0,B=void 0,h=0;h<f;++h){if(p=B,h<f-1)if(t.isCap){var m=t.isFirstVertex?-1:1;B=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,a,d,m,0,t.distance,e._ddValues)}else B=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,a,d,0,t.sign,t.distance,e._ddValues);e._lineIndexBuffer.add(0===h?u:p,r,h===f-1?o:B);var v=_*a+V*d;a=V*a-_*d,d=v}}else if(i&&2===e._capType){var g=t.isFirstVertex?1:-1,N=void 0,I=void 0;e._hasPattern?(N=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x-g*t.inbound.x,t.prevNormal.y-g*t.inbound.y,-g,-1,t.distance,e._ddValues),I=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x-g*t.inbound.x,-t.prevNormal.y-g*t.inbound.y,-g,1,t.distance,e._ddValues)):(N=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,t.prevNormal.x-g*t.inbound.x,t.prevNormal.y-g*t.inbound.y,0,-1,t.distance,e._ddValues),I=e._lineVertexBuffer.index,e._lineVertexBuffer.add(t.currentVertex.x,t.currentVertex.y,-t.prevNormal.x-g*t.inbound.x,-t.prevNormal.y-g*t.inbound.y,0,1,t.distance,e._ddValues)),g>0?(e._lineIndexBuffer.add(r,t.entry2,I),e._lineIndexBuffer.add(r,I,N),e._lineIndexBuffer.add(r,N,t.entry0)):(e._lineIndexBuffer.add(r,I,t.exit2),e._lineIndexBuffer.add(r,N,I),e._lineIndexBuffer.add(r,t.exit0,N))}}},_=function(e){return function(t){e._lineIndexBuffer.add(t.leftExit0,t.rightEntry0,null!=t.leftExit1?t.leftExit1:t.leftExit2),e._lineIndexBuffer.add(t.rightEntry0,null!=t.rightEntry1?t.rightEntry1:t.rightEntry2,null!=t.leftExit1?t.leftExit1:t.leftExit2),null!=t.leftExit1&&null!=t.rightEntry1?(e._lineIndexBuffer.add(t.leftExit1,t.rightEntry1,t.leftExit2),e._lineIndexBuffer.add(t.rightEntry1,t.rightEntry2,t.leftExit2)):null!=t.leftExit1?e._lineIndexBuffer.add(t.leftExit1,t.rightEntry2,t.leftExit2):null!=t.rightEntry1&&e._lineIndexBuffer.add(t.rightEntry1,t.rightEntry2,t.leftExit2)}};return o}));