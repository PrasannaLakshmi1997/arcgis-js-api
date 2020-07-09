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

define(["require","exports","tslib","../../../assets","../../../core/asyncUtils","../../../core/Error","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","./StarsTechnique","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/lib/DefaultVertexAttributeLocations","../../webgl/BufferObject","../../webgl/VertexArrayObject"],(function(t,e,r,a,i,s,o,n,u,f,l,c,h,d,_,b,p){var m=o.getLogger("esri.views.3d.environment.Stars"),y=function(){function t(t){this.slot=14,this.numBinaryFloats=2,this.numBinaryUInt8=1,this.bytesPerStar=9,this._loadDataController=n.createAbortController(),this._numStars=0,this._modelMatrix=l.mat4f64.create(),this._destroyed=!1,this.view=t,this._loadDataPromise=this._loadBrightStarCatalogue()}return Object.defineProperty(t.prototype,"canRender",{get:function(){return null!=this._vao},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this._destroyed=!0,this._loadDataController&&(this._loadDataController.abort(),this._loadDataController=null),this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null),this._vao&&(this._vao.dispose(),this._vao=null),this._starsTechnique&&(this._starsTechnique.dispose(),this._starsTechnique=null)},t.prototype.initializeRenderContext=function(t){var e=this;this._initContext=t;var r=t.rctx;this._starsTechnique=new c.StarsTechnique({rctx:r,viewingMode:"local"===this.view.viewingMode?1:0},null),this._dateHandle=u.init(this.view,"environment.lighting.date",(function(t){return e._update(t)})),this._loadDataPromise.then((function(){if(!e._destroyed){e._numStars=e._starData.byteLength/e.bytesPerStar;var a=new Float32Array(e._starData,0,e._numStars*e.numBinaryFloats),i=new Uint8Array(e._starData,e._numStars*e.numBinaryFloats*4,e._numStars*e.numBinaryUInt8);e._vao=e._createVertexArrayObject(r,a,i),t.requestRender()}}))},t.prototype.uninitializeRenderContext=function(){this.destroy()},t.prototype.render=function(t){if(t.slot!==this.slot||0!==t.pass)return!1;var e=t.rctx,r=this._starsTechnique.program;return e.bindProgram(r),this._starsTechnique.bindPass(e,{camera:t.camera,modelMatrix:this._modelMatrix}),this._starsTechnique.bindPipelineState(e),e.bindVAO(this._vao),r.assertCompatibleVertexAttributeLocations(this._vao),e.drawArrays(0,0,this._numStars),!0},t.prototype._computeDayDuration=function(t){var e=t,r=new Date(t.getFullYear(),0,1,11,58,56);return(+e-+r)/(+new Date(t.getFullYear()+1,0,1,11,58,55)-+r)},t.prototype._update=function(t){if(t){var e=(t.getHours()/12+t.getMinutes()/60*(2/24)+t.getSeconds()/60*(2/1440)-.9972222)%2,r=2*this._computeDayDuration(t),a=this._modelMatrix;f.mat4.copy(a,w),f.mat4.rotateZ(a,a,-r*Math.PI),f.mat4.multiply(a,v,a),f.mat4.rotateZ(a,a,-e*Math.PI),this._initContext.requestRender()}},t.prototype._hexToRGB=function(t){return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16)]},t.prototype._unpackUint8Attributes=function(t){return t>=192?[2.9,t-192]:t>=160?[2.5,t-160]:t>=128?[2,t-128]:t>=96?[1.5,t-96]:t>=64?[1,t-64]:t>=32?[.7,t-32]:[.4,t]},t.prototype._createVertexArrayObject=function(t,e,r){for(var a=D.createBuffer(this._numStars),i=a.position,s=a.color,o=a.size,n=0;n<this._numStars;n++){var u=e[2*n+0],f=e[2*n+1];i.set(n,0,-Math.cos(u)*Math.sin(f)),i.set(n,1,-Math.sin(u)*Math.sin(f)),i.set(n,2,-Math.cos(f));var l=this._unpackUint8Attributes(r[n]),c=this._hexToRGB(g[l[1]]);s.set(n,0,255*c[0]),s.set(n,1,255*c[1]),s.set(n,2,255*c[2]),s.set(n,3,255),o.set(n,l[0])}return new p(t,_.Default3D,{geometry:h.glLayout(D)},{geometry:b.createVertex(t,35044,a.buffer)})},t.prototype._verifyStartData=function(t){if(!t)throw new s("stars:no-data-received","Failed to create stars because star catalogue is missing");var e=t.byteLength/this.bytesPerStar;if(e%1!=0||e>5e4||e<5e3)throw new s("stars:invalid-data","Failed to create stars because star catalogue data is invalid")},t.prototype._loadBrightStarCatalogue=function(){return r.__awaiter(this,void 0,void 0,(function(){var t,e,s;return r.__generator(this,(function(r){switch(r.label){case 0:return x?(this._starData=x,[2]):[4,i.result(a.fetchAsset("esri/views/3d/environment/resources/stars.wsv",{responseType:"array-buffer",signal:this._loadDataController.signal}))];case 1:if(t=r.sent(),this._loadDataController=null,!1===t.ok){if(n.isAbortError(t.error))throw t.error;return m.error("loadBrightStarCatalogue",t.error.message),[2]}e=t.value,s=e.data;try{this._verifyStartData(s)}catch(t){throw m.error("loadBrightStarCatalogue",t),t}return x=s,this._starData=s,[2]}}))}))},t}(),g=["9bb2ff","9eb5ff","aabfff","bbccff","ccd8ff ","dae2ff","e4e9ff","eeefff","f8f6ff","fff9fb","fff5ef","fff1e5","ffeddb","ffe9d2","ffe6ca","ffe3c3","ffe0bb","ffddb4","ffdaad","ffd6a5","ffd29c","ffcc8f","ffc178","ffa94b","ff7b00"],v=l.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,.39778850739794974,0,0,-.39778850739794974,.9174771405229186,0,0,0,0,1),w=l.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,-.39778850739794974,0,0,.39778850739794974,.9174771405229186,0,0,0,0,1),D=d.newLayout().vec3f("position").vec4u8("color").f32("size"),x=null;return y}));