// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/has","../../../../symbols/cim/enums","./Bucket","./style/StyleLayer","../webgl/TurboLine","../webgl/mesh/templates/util"],function(e,t,r,i,n,s,x,d,l){var a=0,u=0,f=0;return i("esri-tiles-performance")&&setInterval(function(){console.log("New (VTL)","feat="+f,"secs="+a,"tris="+u,"tris/sec="+Math.round(u/a))},1e4),function(e){function t(t,r,i,n){var s=e.call(this,t,r)||this;if(s._tessellationOptions={},t.hasDataDrivenLine!==i.isDataDriven())throw new Error("incompatible line buffer");return s._lineVertexBuffer=i,s._lineIndexBuffer=n,s._hasPattern=t.getPaintValue("line-pattern",s.zoom)||t.getPaintValue("line-dasharray",s.zoom),s._isThinLine=t.isThinLine,s._isThinLine?s._tessellationCallbacks={vertex:s._thinVertex.bind(s),bridge:s._thinBridge.bind(s)}:s._tessellationCallbacks={vertex:s._thickVertex.bind(s),bridge:s._thickBridge.bind(s)},s}return r(t,e),Object.defineProperty(t.prototype,"lineIndexStart",{get:function(){return this._lineIndexStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lineIndexCount",{get:function(){return this._lineIndexCount},enumerable:!0,configurable:!0}),t.prototype.assignBufferInfo=function(e){var t=e;t._lineIndexStart=this._lineIndexStart,t._lineIndexCount=this._lineIndexCount},t.prototype.processFeatures=function(e,t){this._lineIndexStart=this._lineIndexBuffer.index,this._lineIndexCount=0;var r=this.layer,i=this.zoom,n=r.hasDataDrivenLine;e&&e.setExtent(this.layerExtent);for(var s=[1,1,1,1],d=1,a=1,u=0,f=this._features;u<f.length;u++){var o=f[u],h=new x.LineLayout(r,i,o);!this._hasPattern&&r.hasDataDrivenColor&&(s=r.getPaintValue("line-color",i,o)),r.hasDataDrivenOpacity&&(d=r.getPaintValue("line-opacity",i,o)),r.hasDataDrivenWidth&&(a=r.getPaintValue("line-width",i,o));var c=void 0;if(!(n&&(c={color:s,opacity:d,size:Math.max(Math.min(a,256),0)},c.size<=0||c.opacity<=0||c.color[3]<=0))){this._capType=h.cap,this._joinType=h.join,this._miterLimitCosine=l.getLimitCosine(h.miterLimit),this._roundLimitCosine=l.getLimitCosine(h.roundLimit);var V=o.getGeometry(e);this._processFeature(h,V,c)}}},t.prototype._processFeature=function(e,t,r){if(t)for(var i=t.length,n=0;n<i;n++)this._processGeometry(t[n],e,r)},t.prototype._processGeometry=function(e,t,r){var n;if(i("esri-tiles-performance")&&(n=performance.now()),!(e.length<2)){for(var s,x,l=e[0],o=1;o<e.length;)s=e[o].x-l.x,x=e[o].y-l.y,s*s+x*x<1e-6?e.splice(o,1):(l=e[o],++o);if(!(e.length<2)){var h=this._lineIndexBuffer.index;this._tessellationOptions.trackDistance=this._hasPattern,this._tessellationOptions.initialDistance=0,this._tessellationOptions.thin=this._isThinLine,this._tessellationOptions.wrapDistance=65535,this._tessellationOptions.outerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableOuterBisectorSplit=this._hasPattern,this._tessellationOptions.innerBisectorAutoSplitThreshold=1/3.8,this._tessellationOptions.enableInnerBisectorSplit=this._hasPattern,this._ddValues=r,d.tessellate(e,this._tessellationOptions,this._tessellationCallbacks),this._lineIndexCount+=3*(this._lineIndexBuffer.index-h),i("esri-tiles-performance")&&(a+=(performance.now()-n)/1e3,u+=this._lineIndexBuffer.index-h,f++)}}},t.prototype._thinVertex=function(e){e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x,e.prevNormal.y,0,-1,e.distance,this._ddValues),e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x,-e.prevNormal.y,0,1,e.distance,this._ddValues),e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.nextNormal.x,e.nextNormal.y,0,-1,e.distance,this._ddValues),e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.nextNormal.x,-e.nextNormal.y,0,1,e.distance,this._ddValues)},t.prototype._thinBridge=function(e){this._lineIndexBuffer.add(e.leftExit0,e.rightEntry0,e.leftExit2),this._lineIndexBuffer.add(e.rightEntry0,e.rightEntry2,e.leftExit2)},t.prototype._thickVertex=function(e){var t=this._joinType===n.JoinType.MITER?this._miterLimitCosine:this._roundLimitCosine,r=e.isCap&&this._capType!==n.CapType.BUTT,i=!1;e.cosine>.97?(e.exit0=e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.bisector.x/e.cosine,e.bisector.y/e.cosine,0,-1,e.distance,this._ddValues),e.exit2=e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.bisector.x/e.cosine,-e.bisector.y/e.cosine,0,1,e.distance,this._ddValues)):e.cosine<1-.97?(e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x,e.prevNormal.y,0,-1,e.distance,this._ddValues),e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x,-e.prevNormal.y,0,1,e.distance,this._ddValues),e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.nextNormal.x,e.nextNormal.y,0,-1,e.distance,this._ddValues),e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.nextNormal.x,-e.nextNormal.y,0,1,e.distance,this._ddValues)):e.canSplit?(d.splitVertex(),e.sign>0?(e.splitInner?(e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.leftInner.x,e.leftInner.y,0,-1,e.distance,this._ddValues),e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.rightInner.x,e.rightInner.y,0,-1,e.distance,this._ddValues)):(e.exit0=e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.bisector.x/e.cosine,e.bisector.y/e.cosine,0,-1,e.distance,this._ddValues)),e.cosine<t?(i=!e.isCap,e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x,-e.prevNormal.y,0,1,e.distance,this._ddValues),e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.nextNormal.x,-e.nextNormal.y,0,1,e.distance,this._ddValues)):e.splitOuter?(i=i||e.gapOuter,e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.leftOuter.x,-e.leftOuter.y,0,1,e.distance,this._ddValues),e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.rightOuter.x,-e.rightOuter.y,0,1,e.distance,this._ddValues)):(e.entry2=e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.bisector.x/e.cosine,-e.bisector.y/e.cosine,0,1,e.distance,this._ddValues))):(e.splitInner?(e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.leftInner.x,-e.leftInner.y,0,1,e.distance,this._ddValues),e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.rightInner.x,-e.rightInner.y,0,1,e.distance,this._ddValues)):(e.exit2=e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.bisector.x/e.cosine,-e.bisector.y/e.cosine,0,1,e.distance,this._ddValues)),e.cosine<t?(i=!e.isCap,e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x,e.prevNormal.y,0,-1,e.distance,this._ddValues),e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.nextNormal.x,e.nextNormal.y,0,-1,e.distance,this._ddValues)):e.splitOuter?(i=i||e.gapOuter,e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.leftOuter.x,e.leftOuter.y,0,-1,e.distance,this._ddValues),e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.rightOuter.x,e.rightOuter.y,0,-1,e.distance,this._ddValues)):(e.exit0=e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.bisector.x/e.cosine,e.bisector.y/e.cosine,0,-1,e.distance,this._ddValues)))):e.sign>0?(e.exit0=e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.bisector.x/e.cosine,e.bisector.y/e.cosine,0,-1,e.distance,this._ddValues),e.cosine<t?(i=!e.isCap,e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x,-e.prevNormal.y,0,1,e.distance,this._ddValues),e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.nextNormal.x,-e.nextNormal.y,0,1,e.distance,this._ddValues)):(e.entry2=e.exit2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.bisector.x/e.cosine,-e.bisector.y/e.cosine,0,1,e.distance,this._ddValues))):(e.exit2=e.entry2=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.bisector.x/e.cosine,-e.bisector.y/e.cosine,0,1,e.distance,this._ddValues),e.cosine<t?(i=!e.isCap,e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x,e.prevNormal.y,0,-1,e.distance,this._ddValues),e.exit0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.nextNormal.x,e.nextNormal.y,0,-1,e.distance,this._ddValues)):(e.exit0=e.entry0=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.bisector.x/e.cosine,e.bisector.y/e.cosine,0,-1,e.distance,this._ddValues)));var s,x=e.canSplit&&(e.splitInner||e.splitOuter);if(x||i||r?(s=e.entry1=e.exit1=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,0,0,0,0,e.distance,this._ddValues)):s=e.entry1=e.exit1=null,i&&this._joinType!==n.JoinType.ROUND)this._lineIndexBuffer.add(s,e.sign>0?e.exit2:e.entry0,e.sign>0?e.entry2:e.exit0);else if(r&&this._capType===n.CapType.ROUND||i&&this._joinType===n.JoinType.ROUND){var l=void 0,a=void 0,u=void 0,f=void 0,o=void 0,h=void 0;if(e.isCap){var c=Math.PI;o=Math.ceil(c/.8),h=c/o,e.isFirstVertex?(l=e.prevNormal.x,a=e.prevNormal.y,u=e.entry0,f=e.entry2):e.isLastVertex&&(l=-e.nextNormal.x,a=-e.nextNormal.y,u=e.exit2,f=e.exit0)}else{var c=2*Math.acos(e.cosine);o=Math.ceil(c/.8),h=c/o,l=e.sign>0?-e.prevNormal.x:e.nextNormal.x,a=e.sign>0?-e.prevNormal.y:e.nextNormal.y,u=e.sign>0?e.entry2:e.exit0,f=e.sign>0?e.exit2:e.entry0}var V=Math.cos(h),_=Math.sin(h),y=V*l-_*a,p=_*l+V*a;l=y,a=p;for(var B=void 0,m=void 0,v=0;v<o;++v){if(B=m,v<o-1)if(e.isCap){var g=e.isFirstVertex?-1:1;m=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,l,a,g,0,e.distance,this._ddValues)}else m=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,l,a,0,e.sign,e.distance,this._ddValues);this._lineIndexBuffer.add(0===v?u:B,s,v===o-1?f:m);var N=V*l-_*a,b=_*l+V*a;l=N,a=b}}else if(r&&this._capType===n.CapType.SQUARE){var I=e.isFirstVertex?1:-1,E=void 0,O=void 0;this._hasPattern?(E=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x-I*e.inbound.x,e.prevNormal.y-I*e.inbound.y,-I,-1,e.distance,this._ddValues),O=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x-I*e.inbound.x,-e.prevNormal.y-I*e.inbound.y,-I,1,e.distance,this._ddValues)):(E=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,e.prevNormal.x-I*e.inbound.x,e.prevNormal.y-I*e.inbound.y,0,-1,e.distance,this._ddValues),O=this._lineVertexBuffer.index,this._lineVertexBuffer.add(e.currentVertex.x,e.currentVertex.y,-e.prevNormal.x-I*e.inbound.x,-e.prevNormal.y-I*e.inbound.y,0,1,e.distance,this._ddValues)),I>0?(this._lineIndexBuffer.add(s,e.entry2,O),this._lineIndexBuffer.add(s,O,E),this._lineIndexBuffer.add(s,E,e.entry0)):(this._lineIndexBuffer.add(s,O,e.exit2),this._lineIndexBuffer.add(s,E,O),this._lineIndexBuffer.add(s,e.exit0,E))}},t.prototype._thickBridge=function(e){this._lineIndexBuffer.add(e.leftExit0,e.rightEntry0,null!=e.leftExit1?e.leftExit1:e.leftExit2),this._lineIndexBuffer.add(e.rightEntry0,null!=e.rightEntry1?e.rightEntry1:e.rightEntry2,null!=e.leftExit1?e.leftExit1:e.leftExit2),null!=e.leftExit1&&null!=e.rightEntry1?(this._lineIndexBuffer.add(e.leftExit1,e.rightEntry1,e.leftExit2),this._lineIndexBuffer.add(e.rightEntry1,e.rightEntry2,e.leftExit2)):null!=e.leftExit1?this._lineIndexBuffer.add(e.leftExit1,e.rightEntry2,e.leftExit2):null!=e.rightEntry1&&this._lineIndexBuffer.add(e.rightEntry1,e.rightEntry2,e.leftExit2)},t}(s)});