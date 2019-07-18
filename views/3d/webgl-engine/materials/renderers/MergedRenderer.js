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

define(["require","exports","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../support/buffer/glUtil","../../lib/DefaultVertexAttributeLocations","../../lib/Float32ArrayList","../../lib/IntervalUtilities","../../lib/Util","../WaterGLMaterial","./Instance","./utils","../../../../webgl/BufferObject","../../../../webgl/Util","../../../../webgl/VertexArrayObject"],function(e,t,r,a,n,i,o,s,u,d,g,l,f,h,p){function m(e,t,r,a){for(var n=new Map,i=t.vertexBufferLayout.stride/4,o=function(r,a){var o=r.origin,s=e.get(o.id),u=n.get(o.id);null==u&&(u={optimalCount:null==s?0:s.optimalCount,sparseCount:null==s?0:s.buffer.getSize(),toAdd:[],toRemove:[],origin:o.vec3},n.set(o.id,u));var d=t.elementCount(r.data)*i;a?(u.optimalCount+=d,u.sparseCount+=d,u.toAdd.push(r)):(u.optimalCount-=d,u.toRemove.push(r))},s=0,u=r;s<u.length;s++){var d=u[s];o(d,!0)}for(var g=0,l=a;g<l.length;g++){var d=l[g];o(d,!1)}return n}var c=function(){function e(e,t,r,a){void 0===a&&(a=i.Default3D),this._dataByOrigin=new Map,this._highlightCount=0,this._hasWater=!1,this._rctx=e,this._vertexAttributeLocations=a,this._material=r,this._materialRep=t,this._glMaterials=l.acquireMaterials(this._material,this._materialRep),this._bufferWriter=r.createBufferWriter()}return e.prototype.dispose=function(){l.releaseMaterials(this._material,this._materialRep)},Object.defineProperty(e.prototype,"isEmpty",{get:function(){return 0===this._dataByOrigin.size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hasHighlights",{get:function(){return this._highlightCount>0},enumerable:!0,configurable:!0}),e.prototype.hasWater=function(){return this._hasWater},e.prototype.renderPriority=function(){return this._material.renderPriority},e.prototype.modify=function(e){var t=this,r=_;r.clear(),this.updateGeometries(e.toUpdate,r),this.addAndRemoveGeometries(e.toAdd,e.toRemove,r),this.updateHighlightCount(),r.forEach(function(e){return t.updateDisplayedIndexRanges(e)})},e.prototype.addAndRemoveGeometries=function(e,t,r){var a=this,n=this._material,i=this._bufferWriter,o=i.vertexBufferLayout,s=o.stride/4,d=this._dataByOrigin,g=m(d,i,e,t);g.forEach(function(e,t){g.delete(t);var i=e.optimalCount,l=e.sparseCount,f=d.get(t);if(null==f&&(u.assert(i>0),f=a.createData(o,i,e.origin),d.set(t,f)),0===i)return f.vao.dispose(!0),f.vao=null,void d.delete(t);var h=i<e.sparseCount/2,p=h?i:l,m=v,c=f.buffer.getSize(),b=f.buffer.getArray(),x=f.buffer.resize(p);h||x?a.removeAndRebuild(f,e.toRemove,s,b,m):e.toRemove.length>0?(a.removeByErasing(f,e.toRemove,s,m),e.toAdd.length>0&&(m.end=c)):(m.begin=c,m.end=c,m.eraseEnd=0);var R=y;u.setMatrixTranslation3(R,-e.origin[0],-e.origin[1],-e.origin[2]),a.append(f,n,e.toAdd,s,R,m);var _=f.vao.vertexBuffers.geometry;if(m.eraseEnd>m.end&&(f.buffer.erase(m.end,m.eraseEnd),m.end=m.eraseEnd),_.byteSize!==f.buffer.getArray().buffer.byteLength)_.setData(f.buffer.getArray());else{var C=m.begin,A=m.end;if(C<A){var I=f.buffer.getArray(),E=4*C,w=4*A;_.setSubData(I,E,E,w)}}(m.updatedDisplayedIndexRange||f.displayedIndexRanges)&&r.add(f)})},e.prototype.updateGeometries=function(e,t){for(var r=this._bufferWriter,a=r.vertexBufferLayout.stride/4,n=0,i=e;n<i.length;n++){var o=i[n],s=o.updateType,d=o.renderGeometry,g=this._dataByOrigin.get(d.origin.id),f=g&&g.instances.get(d.uniqueName);if(!f)return;if(1&s&&(f.displayedIndexRange=l.generateRenderGeometryVisibleIndexRanges(d),t.add(g)),17&s&&(f.highlightedIndexRanges=l.generateRenderGeometryHighlightRanges(d),g.highlightCount=null),6&s){var h=g.buffer.getArray(),p=g.vao;l.calculateTransformRelToOrigin(d,b,x),r.write({transformation:b,invTranspTransformation:x},d.data,r.vertexBufferLayout.createView(h.buffer),f.from),u.assert(f.from+r.elementCount(d.data)===f.to,"material VBO layout has changed"),p.vertexBuffers.geometry.setSubData(h,f.from*a*4,f.from*a*4,f.to*a*4)}}},e.prototype.updateDisplayedIndexRanges=function(e){var t=e.instances;e.displayedIndexRanges=[];var r=!0;t.forEach(function(t){t.displayedIndexRange?(e.displayedIndexRanges.push.apply(e.displayedIndexRanges,s.offsetIntervals(t.displayedIndexRange,t.from)),r=!1):e.displayedIndexRanges.push([t.from,t.to-1])}),e.displayedIndexRanges=r?null:s.mergeIntervals(e.displayedIndexRanges)},e.prototype.updateHighlightCount=function(){var e=this;this._highlightCount=0,this._dataByOrigin.forEach(function(t){if(null==t.highlightCount){var r=0;t.instances.forEach(function(e){e.highlightedIndexRanges&&++r}),t.highlightCount=r}e._highlightCount+=t.highlightCount})},e.prototype.updateAnimations=function(e){var t=this,r=!1;return this._hasWater=!1,this._glMaterials.forEach(function(a){a&&(r=a.updateAnimation(e)||r),a instanceof d.WaterGLMaterial&&(t._hasWater=!0)}),r},e.prototype.render=function(e,t,r,a){var n=this,i=this._rctx,o=this._glMaterials.get(t.pass),s=4===t.pass,u=e;if(2===t.pass&&null===u&&(u=20),!o||null!=u&&!o.beginSlot(u)||s&&0===this._highlightCount)return!1;o.bind(i,r);var d=o.getProgram();d.setUniformMatrix4fv("model",R),d.hasUniform("modelNormal")&&d.setUniformMatrix4fv("modelNormal",R);var g=!1;return this._dataByOrigin.forEach(function(e){s&&0===e.highlightCount||(r.origin=e.origin,o.bindView(i,r),g=s?n.renderHighlightPass(o,e,a)||g:n.renderDefaultPass(o,e,a)||g)}),o.release(i,r),g},e.prototype.renderDefaultPass=function(e,t,r){var a=this._rctx,n=e.getProgram(),i=e.getDrawMode(),o=t.displayedIndexRanges;return(!o||0!==o.length)&&(h.assertCompatibleVertexAttributeLocations(t.vao,n),a.bindVAO(t.vao),o?l.drawArraysFaceRange(a,o,0,i,r):l.drawArrays(a,i,0,h.vertexCount(t.vao,"geometry"),r),!0)},e.prototype.renderHighlightPass=function(e,t,r){var a=this._rctx,n=e.getProgram(),i=e.getDrawMode(),o=t.vao;h.assertCompatibleVertexAttributeLocations(o,n),a.bindVAO(o);var s=!1;return t.instances.forEach(function(e){var t=e.highlightedIndexRanges;if(t&&0!==t.length)for(var n=0;n<t.length;n++){var o=t[n],u=o.range?o.range[0]+e.from:e.from,d=o.range?o.range[1]-o.range[0]+1:e.to-e.from;l.drawArrays(a,i,u,d,r),s=!0}}),s},e.prototype.createData=function(e,t,r){return{instances:new Map,vao:new p(this._rctx,this._vertexAttributeLocations,{geometry:n.glLayout(e)},{geometry:f.createVertex(this._rctx,35044)}),buffer:new o(t),optimalCount:0,origin:r,highlightCount:0}},e.prototype.removeAndRebuild=function(e,t,r,a,n){n.eraseEnd=0;for(var i=0,o=t;i<o.length;i++){var s=o[i],u=s.uniqueName,d=e.instances.get(u);e.optimalCount-=(d.to-d.from)*r,e.instances.delete(u),n.eraseEnd=Math.max(n.eraseEnd,d.to*r)}var g=0,l=e.buffer.getArray();n.begin=0,n.end=0;var f=-1,h=-1,p=0;e.instances.forEach(function(e){var t=e.from*r,n=e.to*r,i=n-t;f!==h&&h!==t?(l.set(a.subarray(f,h),p),p+=h-f,f=t):-1===f&&(f=t),h=n,e.from=g/r,g+=i,e.to=g/r}),f!==h&&l.set(a.subarray(f,h),p),n.end=g},e.prototype.removeByErasing=function(e,t,r,a){a.begin=1/0,a.end=-1/0,a.eraseEnd=-1/0;for(var n=-1,i=-1,o=0,s=t;o<s.length;o++){var u=s[o],d=u.uniqueName,g=e.instances.get(d),l=g.from*r,f=g.to*r;n!==i&&i!==l?(e.buffer.erase(n,i),n=l):-1===n&&(n=l),i=f,e.instances.delete(d),e.optimalCount-=f-l,l<a.begin&&(a.begin=l),f>a.end&&(a.end=f)}n!==i&&e.buffer.erase(n,i)},e.prototype.append=function(e,t,a,n,i,o){o.updatedDisplayedIndexRange=!1;for(var s=this._bufferWriter,d=0,f=a;d<f.length;d++){var h=f[d],p=h.data;r.mat4.multiply(b,i,h.transformation),r.mat4.invert(x,b),r.mat4.transpose(x,x);var m=o.end;s.write({transformation:b,invTranspTransformation:x},p,s.vertexBufferLayout.createView(e.buffer.getArray().buffer),o.end/n);var c=s.elementCount(p)*n,v=m+c;u.assert(null==e.instances.get(h.uniqueName));var y=l.generateRenderGeometryVisibleIndexRanges(h),R=l.generateRenderGeometryHighlightRanges(h);R&&(e.highlightCount=null);var _=new g(h.name,m/n,v/n,y,R,void 0,void 0,h.idx);e.instances.set(h.uniqueName,_),y&&(o.updatedDisplayedIndexRange=!0),e.optimalCount+=c,o.end+=c}},e}(),v={updatedDisplayedIndexRange:!1,begin:0,end:0,eraseEnd:0},y=a.mat4f64.create(),b=a.mat4f64.create(),x=a.mat4f64.create(),R=a.mat4f64.create(),_=new Set;return c});