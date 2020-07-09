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

define(["require","exports","tslib","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat2","../../../../core/libs/gl-matrix-2/mat2f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","./GeometryData","./GeometryUtil","./Util","../materials/PathTechnique","../materials/internal/MaterialUtil"],(function(t,e,i,r,s,o,a,n,h,l,u,v,c,f,p,d,x,m){var g;!function(t){function e(){return{up:v.vec3f64.create(),right:v.vec3f64.create()}}t.makeFrame=e,t.profileSpaceToVertexSpace=function(t,e,i){t[0]=i[0]*e.right[0]+i[1]*e.up[0],t[1]=i[0]*e.right[1]+i[1]*e.up[1],t[2]=i[0]*e.right[2]+i[1]*e.up[2]},t.vertexSpaceToProfileSpace=function(t,e,i){h.vec2.set(t,u.vec3.dot(i,e.right),u.vec3.dot(i,e.up))};var g=function(){function t(){this.pos=v.vec3f64.create(),this.posES=v.vec3f64.create(),this.posGS=v.vec3f64.create(),this.vRight=v.vec3f64.create(),this.vLeft=v.vec3f64.create(),this.frame=e(),this.rotationFrame=e(),this.rotationRight=l.vec2f64.create(),this.rotationAngle=0,this.miterStretch=o.mat2f64.create()}return t.prototype.setFrameFromUpVector=function(t){u.vec3.copy(this.frame.up,t),u.vec3.add(D,this.vLeft,this.vRight),u.vec3.normalize(D,D),u.vec3.scale(y,this.frame.up,u.vec3.dot(D,this.frame.up)),u.vec3.subtract(R,D,y),u.vec3.normalize(R,R),u.vec3.cross(this.frame.right,R,this.frame.up)},t.prototype.computeRotationAxisAndAngleFromUpVector=function(){u.vec3.copy(this.rotationFrame.up,this.frame.up),u.vec3.copy(this.rotationFrame.right,this.frame.right),h.vec2.set(this.rotationRight,1,0),u.vec3.scale(y,this.frame.up,u.vec3.dot(this.frame.up,this.vLeft)),u.vec3.subtract(y,this.vLeft,y),u.vec3.negate(y,y),u.vec3.normalize(y,y),u.vec3.scale(D,this.frame.up,u.vec3.dot(this.frame.up,this.vRight)),u.vec3.subtract(D,this.vRight,D),u.vec3.normalize(D,D),u.vec3.cross(I,this.rotationFrame.up,this.vLeft);var t=r.sign(u.vec3.dot(I,this.vRight));if(this.rotationAngle=t*(Math.PI-r.acosClamped(u.vec3.dot(y,D))),Math.abs(this.rotationAngle)>0){var e=r.reciprocalClamped(Math.cos(.5*this.rotationAngle));s.mat2.set(this.miterStretch,e-1+1,0,0,1)}var i=Math.PI-this.rotationAngle;this.maxStretchDistance=Math.abs(Math.min(this.vLeftLength,this.vRightLength)/Math.cos(.5*i))},t}();t.PathVertex=g;var U=function(){function t(){this.vertices=[],this.vertexIndices=[],this.vertexNormals=[],this.poles=[],this.poleIndices=[],this.uvs=null,this.uvIndices=null}return t.prototype.addVertex=function(t,e){return this.vertices.push(l.vec2f64.clone(t)),this.vertexNormals.push(l.vec2f64.clone(e)),this.vertices.length-1},t.prototype.addUV=function(t){return this.uvs||(this.uvs=[],this.uvIndices=[]),this.uvs.push(t),this.uvs.length-1},t.prototype.addPole=function(t,e){return void 0===e&&(e=null),this.poles.push({position:l.vec2f64.clone(t),normal:e?l.vec2f64.clone(e):null}),this.poles.length-1},t.prototype.addSegment=function(t,e,i){void 0===e&&(e=null),void 0===i&&(i=null),this.vertexIndices.push(t.v0),this.vertexIndices.push(t.v1),e&&(this.uvIndices.push(e.v0),this.uvIndices.push(e.v1)),i&&(this.poleIndices.push(i.v0),this.poleIndices.push(i.v1))},Object.defineProperty(t.prototype,"numSegments",{get:function(){return this.vertexIndices.length/2},enumerable:!0,configurable:!0}),t.prototype.hasUV=function(){return null!=this.uvs},t.prototype.translate=function(t,e){for(var i=0,r=this.vertices;i<r.length;i++){var s=r[i];s[0]+=t,s[1]+=e}for(var o=0,a=this.poles;o<a.length;o++){var n=a[o];n.position[0]+=t,n.position[1]+=e}},t.circle=function(e){void 0===e&&(e=20);var i=new t,r={v0:0,v1:0};i.addPole(l.vec2f64.fromValues(0,0));for(var s=0;s<e;++s){var o=2*s*Math.PI/e,a=Math.cos(o),n=Math.sin(o),h=l.vec2f64.fromValues(.5*a,.5*n),u=l.vec2f64.fromValues(a,n);i.addVertex(h,u),i.addUV(s/e)}i.addUV(1);for(s=0;s<e-1;++s){var v={v0:s,v1:s+1},c=v;i.addSegment(v,c,r)}var f={v0:e-1,v1:0},p={v0:e-1,v1:e};return i.addSegment(f,p,r),i},t.rect=function(){var e=new t,i=l.vec2f64.fromValues(-.5,-.5),r=l.vec2f64.fromValues(.5,-.5),s=l.vec2f64.fromValues(.5,.5),o=l.vec2f64.fromValues(-.5,.5),a=l.vec2f64.fromValues(0,-1),n=l.vec2f64.fromValues(1,0),h=l.vec2f64.fromValues(0,1),u=l.vec2f64.fromValues(-1,0);e.addUV(0),e.addUV(1),e.addPole(l.vec2f64.fromValues(0,.5),h),e.addPole(l.vec2f64.fromValues(0,.5)),e.addPole(l.vec2f64.fromValues(0,-.5)),e.addPole(l.vec2f64.fromValues(0,-.5),a);var v={v0:0,v1:1};return e.addVertex(i,a),e.addVertex(r,a),e.addSegment({v0:0,v1:1},v,{v0:3,v1:3}),e.addVertex(r,n),e.addVertex(s,n),e.addSegment({v0:2,v1:3},v,{v0:2,v1:1}),e.addVertex(s,h),e.addVertex(o,h),e.addSegment({v0:4,v1:5},v,{v0:0,v1:0}),e.addVertex(o,u),e.addVertex(i,u),e.addSegment({v0:6,v1:7},v,{v0:1,v1:2}),e},t}();t.Profile=U;var _=function(){function t(t){this.vertices=[],this.offset=v.vec3f64.create(),this.xform=n.mat4f64.create(),this.vertices=t;var e=Math.floor((t.length-1)/2);u.vec3.copy(this.offset,this.vertices[e].pos);for(var i=0,r=this.vertices;i<r.length;i++){var s=r[i];u.vec3.subtract(s.pos,s.pos,this.offset)}a.mat4.translate(this.xform,this.xform,this.offset),this.updatePathVertexInformation()}return t.prototype.updatePathVertexInformation=function(){var t=this.vertices.length,e=this.vertices[0];e.index=0,u.vec3.set(e.vLeft,0,0,0),e.vLeftLength=0,u.vec3.subtract(e.vRight,this.vertices[1].pos,e.pos),e.vRightLength=u.vec3.length(e.vRight),u.vec3.normalize(e.vRight,e.vRight);for(var i=e,r=1;r<t;++r)(e=this.vertices[r]).index=r,u.vec3.copy(e.vLeft,i.vRight),e.vLeftLength=i.vRightLength,r<t-1?(u.vec3.subtract(e.vRight,this.vertices[r+1].pos,e.pos),e.vRightLength=u.vec3.length(e.vRight),u.vec3.normalize(e.vRight,e.vRight)):(u.vec3.copy(e.vRight,e.vLeft),e.vRightLength=e.vLeftLength),i=e},t}();t.Path=_,t.computeMinimumRotationTangentFrame=function(t,e){var i=null,r=t.vertices.length,s=v.vec3f64.create(),o=v.vec3f64.create(),a=v.vec3f64.create(),n=v.vec3f64.create(),h=v.vec3f64.create(),l=v.vec3f64.create(),f=c.plane.create(),d=t.vertices[0];u.vec3.copy(o,e),u.vec3.set(s,0,1,0),p.makeOrthoBasisDirUpFallback(d.vRight,o,s,s,a,o,.99619469809),u.vec3.copy(d.frame.up,o),u.vec3.copy(d.frame.right,a),i=d;for(var x=1;x<r;++x){d=t.vertices[x],u.vec3.add(h,d.vLeft,d.vRight);var m=u.vec3.length(h);m>0?(m=1/Math.sqrt(m),h[0]=h[0]*m,h[1]=h[1]*m,h[2]=h[2]*m):(h[0]=d.vRight[0],h[1]=d.vRight[1],h[2]=d.vRight[2]),u.vec3.add(l,i.pos,i.frame.up),c.plane.fromPositionAndNormal(d.pos,h,f),c.plane.intersectRay(f,c.ray.wrap(l,d.vLeft),n)?(u.vec3.subtract(n,n,d.pos),u.vec3.normalize(o,n),u.vec3.cross(a,h,o),u.vec3.normalize(a,a)):p.makeOrthoBasisDirUpFallback(h,i.frame.up,i.frame.right,s,a,o,.99619469809),u.vec3.copy(d.frame.up,o),u.vec3.copy(d.frame.right,a),i=d}};var T=function(){};t.Extruder=T;var L=function(){function t(){}return t.prototype.numProfilesPerJoin=function(){return 1},t.prototype.extrude=function(t,e,i){for(var r=0;r<e.vertices.length;++r)i(t.index,t.frame,e.vertices[r],e.vertexNormals[r],!1)},t}();t.SimpleExtruder=L;var F=function(){function t(t,e){void 0===t&&(t=.8*Math.PI),void 0===e&&(e=1),this.cutoffAngle=t,this.numBendSubdivisions=e}return t.prototype.numProfilesPerJoin=function(){return this.numBendSubdivisions+1},t.prototype.extrude=function(t,e,i){var r,s,o,n=N;if(Math.abs(t.rotationAngle)>=this.cutoffAngle)for(var l=0;l<this.numBendSubdivisions+1;++l){a.mat4.identity(S),a.mat4.rotate(S,S,.5*-t.rotationAngle+l*t.rotationAngle/this.numBendSubdivisions,t.rotationFrame.up),r=n,s=t.frame,o=S,u.vec3.transformMat4(r.up,s.up,o),u.vec3.transformMat4(r.right,s.right,o);for(var v=0;v<e.vertices.length;++v){(c=h.vec2.dot(e.vertices[v],t.rotationRight)*t.rotationAngle>=0)?i(t.index,n,e.vertices[v],e.vertexNormals[v],!1):(h.vec2.transformMat2(b,e.vertices[v],t.miterStretch),i(t.index,t.frame,b,e.vertexNormals[v],!0))}}else for(l=0;l<this.numBendSubdivisions+1;++l)for(v=0;v<e.vertices.length;++v){var c=h.vec2.dot(e.vertices[v],t.rotationRight)*t.rotationAngle>=0;h.vec2.transformMat2(b,e.vertices[v],t.miterStretch),i(t.index,t.frame,b,e.vertexNormals[v],!c)}},t}();t.MiterExtruder=F;var O={generateUV:!1},M=function(){function t(){}return t.prototype.rebuildConnectingProfileGeometry=function(t,e,i){for(var r=0;r<e.vertices.length;++r)i(t.index,t.frame,e.vertices[r],e.vertexNormals[r],0,0)},t}();t.CapBuilder=M;var E=function(t){function e(){return t.call(this)||this}return i.__extends(e,t),e.prototype.getNumVertices=function(){return 0},e.prototype.getNumIndices=function(){return 0},e.prototype.rebuildCapGeometry=function(){},e.prototype.buildTopology=function(){},e}(M);t.NoCapBuilder=E;var B=function(t){function e(e,i,r){void 0===i&&(i=0),void 0===r&&(r=!1);var s=t.call(this)||this;return s.profile=e,s.profilePlaneOffset=i,s.flip=r,s}return i.__extends(e,t),e.prototype.getNumVertices=function(){return this.profile.vertices.length},e.prototype.getNumIndices=function(){return 3*this.profile.numSegments},e.prototype.rebuildConnectingProfileGeometry=function(t,e,i){for(var r=0;r<e.vertices.length;++r)i(t.index,t.frame,e.vertices[r],e.vertexNormals[r],this.profilePlaneOffset,0)},e.prototype.rebuildCapGeometry=function(t,e){var i=A;h.vec2.set(i,0,0);for(var r=this.flip?1:-1,s=0;s<this.profile.vertices.length;++s)e(t.index,t.frame,this.profile.vertices[s],i,this.profilePlaneOffset,r)},e.prototype.buildTopology=function(t,e){for(var i=this.vertexBufferStart+this.profile.vertexIndices[0],r=1;r<this.profile.numSegments;++r){var s=this.profile.vertexIndices[2*r+0],o=this.profile.vertexIndices[2*r+1],a=this.vertexBufferStart+s,n=this.vertexBufferStart+o;this.flip?e(n,a,i):e(i,a,n)}},e}(M);t.TriangulationCapBuilder=B;var G=function(t){function e(e){var i=t.call(this)||this;return i.flip=!1,i.sign=0,i.breakNormals=!1,i.numSegments=3,i.profile=e.profile,i.flip=e.flip,i.sign=i.flip?1:-1,i.breakNormals=e.breakNormals,i.numSegments=e.subdivisions,i}return i.__extends(e,t),e.prototype.getNumVertices=function(){var t=0;return t=this.profile.vertices.length*(this.numSegments-1),this.breakNormals&&(t+=this.profile.vertices.length),t+=this.profile.poles.length},e.prototype.getNumIndices=function(){var t=0;t+=2*this.profile.numSegments*(this.numSegments-1);for(var e=0;e<this.profile.numSegments;++e){var i=this.profile.vertexIndices[2*e+0],r=this.profile.vertexIndices[2*e+1];this.profile.poleIndices[i]===this.profile.poleIndices[r]?t+=1:t+=2}return 3*t},e.prototype.rebuildCapGeometry=function(t,e){var i=t.frame,r=.5*this.sign,s=b,o=A;h.vec2.set(o,0,0);for(var a=0;a<this.profile.poles.length;++a){(c=this.profile.poles[a]).normal?e(t.index,i,c.position,c.normal,r,0):e(t.index,i,c.position,o,r,this.sign)}if(this.breakNormals)for(a=0;a<this.profile.vertices.length;++a)e(t.index,i,this.profile.vertices[a],this.profile.vertexNormals[a],0,0);for(a=0;a<this.numSegments-1;++a)for(var n=(1-(a+1)/this.numSegments)*Math.PI*.5,l=Math.sin(n),u=Math.cos(n),v=0;v<this.profile.vertices.length;++v){var c=this.profile.poles[this.profile.poleIndices[v]];h.vec2.subtract(s,this.profile.vertices[v],c.position),h.vec2.scale(s,s,l),c.normal?(h.vec2.add(s,s,c.position),e(t.index,i,s,c.normal,r*u,0)):(h.vec2.normalize(o,s),h.vec2.scale(o,o,l),h.vec2.add(s,s,c.position),e(t.index,i,s,o,r*u,this.sign*u))}},e.prototype.buildTopology=function(t,e){for(var i=this.breakNormals?this.vertexBufferStart+this.profile.poles.length:this.firstProfileVertexIndex,r=this.breakNormals?this.vertexBufferStart+this.profile.poles.length+this.profile.vertices.length:this.vertexBufferStart+this.profile.poles.length,s=0;s<this.profile.numSegments;++s){for(var o=this.profile.vertexIndices[2*s+0],a=this.profile.vertexIndices[2*s+1],n=this.vertexBufferStart+this.profile.poleIndices[o],h=this.vertexBufferStart+this.profile.poleIndices[a],l=i+o,u=i+a,v=0;v<this.numSegments-1;++v){var c=r+v*this.profile.vertices.length+o,f=r+v*this.profile.vertices.length+a;this.flip?(e(c,u,l),e(u,c,f)):(e(l,u,c),e(f,c,u)),l=c,u=f}this.flip?(e(n,u,l),n!==h&&e(n,h,u)):(e(l,u,n),n!==h&&e(u,h,n))}},e}(M);t.RoundCapBuilder=G;var z=function(){function t(t,e,i,r,s,o){void 0===o&&(o=O),this.options=o,this._extrusionVertexCount=0,this._triangleCount=0,this.numExtrusionProfiles=0,this.numVerticesTotal=0,this.numNormalsTotal=0,this.numUVTotal=0,this.profile=e,this.path=t,this.extruder=i,this.startCap=r,this.endCap=s;var a=this.path.vertices.length-2;this.numExtrusionProfiles=i.numProfilesPerJoin()*a+2,this.numVerticesTotal=e.vertices.length*this.numExtrusionProfiles,this.numNormalsTotal=this.numVerticesTotal,this.startCap.vertexBufferStart=this.numVerticesTotal;var n=this.startCap.getNumVertices();this.numVerticesTotal+=n,this.numNormalsTotal+=n,this.endCap.vertexBufferStart=this.numVerticesTotal;var h=this.endCap.getNumVertices();this.numVerticesTotal+=h,this.numNormalsTotal+=h,this.pathVertexData=new Float32Array(1*this.numVerticesTotal),this.profileRightAxisData=new Float32Array(4*this.numVerticesTotal),this.profileUpAxisData=new Float32Array(4*this.numVerticesTotal),this.profileVertexAndNormalData=new Float32Array(4*this.numVerticesTotal),this.profile.hasUV()&&this.options.generateUV&&(this.numUVTotal=this.profile.uvs.length,this.uvData=new Float32Array(2*this.numUVTotal)),this.originData=new Float32Array(3*this.path.vertices.length),this.rebuildGeometry(),this.buildTopology()}return t.prototype.emitVertex=function(t,e,i,r,s){if(this.profileRightAxisData[4*this._extrusionVertexCount+0]=e.right[0],this.profileRightAxisData[4*this._extrusionVertexCount+1]=e.right[1],this.profileRightAxisData[4*this._extrusionVertexCount+2]=e.right[2],this.profileUpAxisData[4*this._extrusionVertexCount+0]=e.up[0],this.profileUpAxisData[4*this._extrusionVertexCount+1]=e.up[1],this.profileUpAxisData[4*this._extrusionVertexCount+2]=e.up[2],this.profileVertexAndNormalData[4*this._extrusionVertexCount+0]=i[0],this.profileVertexAndNormalData[4*this._extrusionVertexCount+1]=i[1],this.profileVertexAndNormalData[4*this._extrusionVertexCount+2]=r[0],this.profileVertexAndNormalData[4*this._extrusionVertexCount+3]=r[1],this.pathVertexData[this._extrusionVertexCount]=t,s){var o=this.path.vertices[t];this.profileRightAxisData[4*this._extrusionVertexCount+3]=o.rotationRight[0]*o.maxStretchDistance,this.profileUpAxisData[4*this._extrusionVertexCount+3]=o.rotationRight[1]*o.maxStretchDistance}else this.profileRightAxisData[4*this._extrusionVertexCount+3]=0,this.profileUpAxisData[4*this._extrusionVertexCount+3]=0;++this._extrusionVertexCount},t.prototype.emitCapVertex=function(t,e,i,r,s,o){this.profileRightAxisData[4*this._extrusionVertexCount+0]=e.right[0],this.profileRightAxisData[4*this._extrusionVertexCount+1]=e.right[1],this.profileRightAxisData[4*this._extrusionVertexCount+2]=e.right[2],this.profileUpAxisData[4*this._extrusionVertexCount+0]=e.up[0],this.profileUpAxisData[4*this._extrusionVertexCount+1]=e.up[1],this.profileUpAxisData[4*this._extrusionVertexCount+2]=e.up[2],this.profileVertexAndNormalData[4*this._extrusionVertexCount+0]=i[0],this.profileVertexAndNormalData[4*this._extrusionVertexCount+1]=i[1],this.profileVertexAndNormalData[4*this._extrusionVertexCount+2]=r[0],this.profileVertexAndNormalData[4*this._extrusionVertexCount+3]=r[1],this.pathVertexData[this._extrusionVertexCount]=t,this.profileRightAxisData[4*this._extrusionVertexCount+3]=s,this.profileUpAxisData[4*this._extrusionVertexCount+3]=o,++this._extrusionVertexCount},t.prototype.emitTriangle=function(t,e,i){this.vertexIndices[3*this._triangleCount+0]=t,this.vertexIndices[3*this._triangleCount+1]=e,this.vertexIndices[3*this._triangleCount+2]=i,this.pathVertexIndices[3*this._triangleCount+0]=this.pathVertexData[t],this.pathVertexIndices[3*this._triangleCount+1]=this.pathVertexData[e],this.pathVertexIndices[3*this._triangleCount+2]=this.pathVertexData[i],this.normalIndices[3*this._triangleCount+0]=t,this.normalIndices[3*this._triangleCount+1]=e,this.normalIndices[3*this._triangleCount+2]=i,++this._triangleCount},t.prototype.rebuildGeometry=function(){var t=this,e=function(e,i,r,s,o){return t.emitVertex(e,i,r,s,o)},i=function(e,i,r,s,o,a){return t.emitCapVertex(e,i,r,s,o,a)};this._extrusionVertexCount=0;for(var r=0,s=this.path.vertices;r<s.length;r++){var o=s[r];this.originData[3*o.index+0]=o.pos[0],this.originData[3*o.index+1]=o.pos[1],this.originData[3*o.index+2]=o.pos[2]}this.startCap.rebuildConnectingProfileGeometry(this.path.vertices[0],this.profile,i);for(var a=1;a<this.path.vertices.length-1;++a)this.extruder.extrude(this.path.vertices[a],this.profile,e);if(this.endCap.rebuildConnectingProfileGeometry(this.path.vertices[this.path.vertices.length-1],this.profile,i),this.startCap.rebuildCapGeometry(this.path.vertices[0],i),this.endCap.rebuildCapGeometry(this.path.vertices[this.path.vertices.length-1],i),this.profile.hasUV()&&this.options.generateUV)for(a=0;a<this.profile.uvs.length;++a)this.uvData[2*a+0]=this.profile.uvs[a],this.uvData[2*a+1]=0},t.prototype.buildTopology=function(){var t=this,e=function(e,i,r){return t.emitTriangle(e,i,r)};this._triangleCount=0;var i=this.profile.vertices.length,r=this.profile.numSegments,s=this.numExtrusionProfiles-1,o=3*(2*(r*s));this.startCap.indexBufferStart=o,this.startCap.firstProfileVertexIndex=0,o+=this.startCap.getNumIndices(),this.endCap.indexBufferStart=o,this.endCap.firstProfileVertexIndex=i*(this.numExtrusionProfiles-1),o+=this.endCap.getNumIndices(),this.vertexIndices=new Uint32Array(o),this.normalIndices=new Uint32Array(o),this.pathVertexIndices=new Uint32Array(o),this.profile.hasUV()&&this.options.generateUV&&(this.uvIndices=new Uint32Array(o));for(var a=0;a<r;++a)for(var n=this.profile.vertexIndices[2*a],h=this.profile.vertexIndices[2*a+1],l=0;l<s;++l){var u=l*i+n,v=(l+1)*i+h,c=l*i+h;e(u,(l+1)*i+n,v),e(u,v,c)}this.startCap.buildTopology(this.path.vertices[0],e),this.endCap.buildTopology(this.path.vertices[this.path.vertices.length-1],e)},t.prototype.onPathChanged=function(){this.rebuildGeometry()},t}();t.Builder=z;var w=function(){function t(t){this.builder=t}return Object.defineProperty(t.prototype,"xform",{get:function(){return this.builder.path.xform},enumerable:!0,configurable:!0}),t.prototype.onPathChanged=function(){this.builder.onPathChanged()},t}();t.PathGeometry=w;var k=function(t){function e(e){var i=t.call(this,e)||this;return i.vertexAttributePosition=null,i.vertexAttributeNormal=null,i.vertexAttributeColor=null,i.vertexAttributePosition=new Float32Array(3*i.builder.numVerticesTotal),i.vertexAttributeNormal=new Float32Array(3*i.builder.numNormalsTotal),i.vertexAttributeColor=new Uint8Array(4),i.vertexAttributeColor[0]=255,i.vertexAttributeColor[1]=255,i.vertexAttributeColor[2]=255,i.vertexAttributeColor[3]=255,i}return i.__extends(e,t),e.prototype.bakeVertexColors=function(t){this.vertexAttributeColor[0]=255*t[0],this.vertexAttributeColor[1]=255*t[1],this.vertexAttributeColor[2]=255*t[2],this.vertexAttributeColor[3]=255*(t.length>3?t[3]:1)},e.prototype.bake=function(t){this.size=t;for(var e=0;e<this.builder.numVerticesTotal;++e){var i=this.builder.pathVertexData[e],s=0===i||i===this.builder.path.vertices.length-1,o=V;u.vec3.set(o,this.builder.originData[3*i+0],this.builder.originData[3*i+1],this.builder.originData[3*i+2]);var a=y,n=b,l=D,v=I,c=P,f=0,p=0;if(u.vec3.set(v,this.builder.profileRightAxisData[4*e+0],this.builder.profileRightAxisData[4*e+1],this.builder.profileRightAxisData[4*e+2]),u.vec3.set(c,this.builder.profileUpAxisData[4*e+0],this.builder.profileUpAxisData[4*e+1],this.builder.profileUpAxisData[4*e+2]),h.vec2.set(n,this.builder.profileVertexAndNormalData[4*e+0]*t[0],this.builder.profileVertexAndNormalData[4*e+1]*t[1]),s)u.vec3.cross(l,c,v),f=this.builder.profileRightAxisData[4*e+3]*t[0],p=this.builder.profileUpAxisData[4*e+3];else{var d=A,x=C;h.vec2.set(d,this.builder.profileRightAxisData[4*e+3],this.builder.profileUpAxisData[4*e+3]);var m=h.vec2.length(d);h.vec2.normalize(d,d);var g=h.vec2.dot(n,d);if(Math.abs(g)>m){h.vec2.set(x,-d[1],d[0]);var R=h.vec2.dot(n,x);h.vec2.scale(d,d,m*r.sign(g)),h.vec2.scale(x,x,R),h.vec2.add(n,d,x)}u.vec3.set(l,0,0,0)}u.vec3.set(a,v[0]*n[0]+c[0]*n[1],v[1]*n[0]+c[1]*n[1],v[2]*n[0]+c[2]*n[1]),this.vertexAttributePosition[3*e+0]=o[0]+a[0]+l[0]*f,this.vertexAttributePosition[3*e+1]=o[1]+a[1]+l[1]*f,this.vertexAttributePosition[3*e+2]=o[2]+a[2]+l[2]*f;var N=b;h.vec2.set(N,this.builder.profileVertexAndNormalData[4*e+2],this.builder.profileVertexAndNormalData[4*e+3]),this.vertexAttributeNormal[3*e+0]=v[0]*N[0]+c[0]*N[1]+l[0]*p,this.vertexAttributeNormal[3*e+1]=v[1]*N[0]+c[1]*N[1]+l[1]*p,this.vertexAttributeNormal[3*e+2]=v[2]*N[0]+c[2]*N[1]+l[2]*p}},e.prototype.createGeometryData=function(){var t={};if(t[d.VertexAttrConstants.POSITION]=this.builder.vertexIndices,t[d.VertexAttrConstants.NORMAL]=this.builder.normalIndices,this.vertexAttributeColor){var e=t[d.VertexAttrConstants.POSITION].length;t[d.VertexAttrConstants.COLOR]=new Uint32Array(e)}var i={};return i[d.VertexAttrConstants.POSITION]={size:3,data:this.vertexAttributePosition},i[d.VertexAttrConstants.NORMAL]={size:3,data:this.vertexAttributeNormal},this.vertexAttributeColor&&(i[d.VertexAttrConstants.COLOR]={size:4,data:this.vertexAttributeColor}),new f.GeometryData(i,t,"triangle")},e.prototype.onPathChanged=function(){t.prototype.onPathChanged.call(this),this.bake(this.size)},e.prototype.intersect=function(t,e,i){var r=this.builder.vertexIndices,s={size:3,offsetIdx:0,strideIdx:3,data:this.vertexAttributePosition},o=r.length/3;m.intersectTriangles(t,e,0,o,r,s,void 0,void 0,i)},e}(w);t.StaticPathGeometry=k;var q=function(t){function e(e,i,r,s){var o=t.call(this,e)||this;o.sizeAttributeValue=i,o.colorAttributeValue=r,o.opacityAttributeValue=s,o.vvData=null,o.baked=new k(e),o.vvData=new Float32Array(4*o.builder.path.vertices.length);for(var a=0;a<o.builder.path.vertices.length;++a){o.vvData[4*a+0]=i,o.vvData[4*a+1]=r,o.vvData[4*a+2]=s;var n=0===a||a===o.builder.path.vertices.length-1;o.vvData[4*a+3]=n?1:0}return o}return i.__extends(e,t),e.prototype.createGeometryData=function(){var t={};t[x.PathVertexAttrConstants.POSITION]=this.builder.pathVertexIndices,t[x.PathVertexAttrConstants.PROFILERIGHT]=this.builder.vertexIndices,t[x.PathVertexAttrConstants.PROFILEUP]=this.builder.vertexIndices,t[x.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL]=this.builder.vertexIndices,t[x.PathVertexAttrConstants.FEATUREVALUE]=this.builder.pathVertexIndices;var e={};return e[x.PathVertexAttrConstants.POSITION]={size:3,data:this.builder.originData},e[x.PathVertexAttrConstants.PROFILERIGHT]={size:4,data:this.builder.profileRightAxisData},e[x.PathVertexAttrConstants.PROFILEUP]={size:4,data:this.builder.profileUpAxisData},e[x.PathVertexAttrConstants.PROFILEVERTEXANDNORMAL]={size:4,data:this.builder.profileVertexAndNormalData},e[x.PathVertexAttrConstants.FEATUREVALUE]={size:4,data:this.vvData},new f.GeometryData(e,t,"triangle")},e}(w);t.FastUpdatePathGeometry=q}(g||(g={}));var V=v.vec3f64.create(),b=l.vec2f64.create(),A=l.vec2f64.create(),C=l.vec2f64.create(),y=v.vec3f64.create(),D=v.vec3f64.create(),I=v.vec3f64.create(),P=v.vec3f64.create(),R=v.vec3f64.create(),N=g.makeFrame(),S=n.mat4f64.create();return g}));