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

define(["require","exports","../../../../core/mathUtils","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/earthUtils","../../support/geometryUtils","../../support/mathUtils","../../support/stack","../../support/geometryUtils/coordinateSystem","../../webgl-engine/lib/Camera"],(function(e,t,a,r,c,n,o,i,s,l,v,d,m,h,u,p){function f(e,t,a){var r=h.sm4d.get();c.mat4.identity(r),c.mat4.rotate(r,r,a[3],a),s.vec3.subtract(e.eye,e.eye,t),s.vec3.transformMat4(e.eye,e.eye,r),s.vec3.add(e.eye,e.eye,t),s.vec3.subtract(e.center,e.center,t),s.vec3.transformMat4(e.center,e.center,r),s.vec3.add(e.center,e.center,t),s.vec3.transformMat4(e.up,e.up,r),e.markViewDirty()}Object.defineProperty(t,"__esModule",{value:!0}),t.Earth=d.sphere.fromValues(v.earthRadius,l.vec3f64.create()),t.normalizeCoordinate=function(e,t,a){return a[0]=t[0]/(e.fullWidth/e.pixelRatio),a[1]=t[1]/(e.fullHeight/e.pixelRatio),a},t.rotationFromPointsAroundAxis=function(e,t,a){var r=h.sv3d.get(),c=h.sv3d.get(),n=h.sv3d.get();s.vec3.copy(c,e),s.vec3.copy(n,t);var o=s.vec3.dot(c,a),i=s.vec3.dot(n,a);s.vec3.scale(r,a,o),s.vec3.subtract(c,c,r),s.vec3.normalize(c,c),s.vec3.scale(r,a,i),s.vec3.subtract(n,n,r),s.vec3.normalize(n,n);var l=s.vec3.dot(c,n);s.vec3.cross(r,a,c);var v=s.vec3.dot(n,r);return Math.atan2(v,l)},t.normalizeRotationDelta=function(e){for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},t.applyRotation=f,t.intersectPlaneFromScreenPoint=function(e,t,a,r){return d.plane.intersectRay(e,d.ray.fromScreen(t,a,ae),r)},t.applyZoomToPoint=function(e,t,a,r){var c=h.sv3d.get(),n=1-a;s.vec3.subtract(c,t,e.eye);var o=s.vec3.length(c),i=o*(1-n);n>=0&&i<r&&(n=-((i=r)-o)/o),Math.abs(o-i)<1e-6||(s.vec3.scale(c,c,n),s.vec3.add(e.eye,e.eye,c),s.vec3.lerp(e.center,e.center,t,n))},t.applyZoomOnSphere=function(e,t,a){t.getScreenCenter(y),d.sphere.intersectScreen(e,t,y,t.center),t.markViewDirty();var r=t.distance,c=r*a;if(!(Math.abs(r-c)<1e-6)){var n=s.vec3.scale(h.sv3d.get(),t.viewForward,c);s.vec3.subtract(t.eye,t.center,n),t.markViewDirty()}};var g,y=r.createScreenPointArray();function M(e,t){s.vec3.set(t,0,0,0);for(var a=0,r=e;a<r.length;a++){var c=r[a];s.vec3.add(t,t,c)}s.vec3.scale(t,t,1/e.length)}function P(e,t,a){return Math.sin(e/s.vec3.length(t))*(a+v.earthRadius)}t.centroidOnSphere=function(e,t,a){M(t,a),s.vec3.normalize(a,a),s.vec3.scale(a,a,e)},t.centroid=M,t.onSurfaceTiltToEyeTiltGlobal=P,t.offSurfaceTiltToEyeTiltGlobal=function(e,t,a){return P(Math.PI/2,t,a)+(e-Math.PI/2)},function(e){e[e.Vertical=0]="Vertical",e[e.Horizontal=1]="Horizontal"}(g=t.PanMode||(t.PanMode={})),t.VerticalPanTresholds={Elevation:3e4,Angle:a.deg2rad(8)},t.PreservingHeadingThreshold={Pole:.95,Angle:a.deg2rad(18),Tilt:45},t.TiltThresholdPanningSpeed=a.deg2rad(80),t.pickPointAndInitSphere=function(e,a,r,c){var n=l.vec3f64.create(),o=d.sphere.create(),i=!0;return e.intersectScreen(r,n)?o.radius=s.vec3.length(n):(a.aboveGround?o.radius=Math.max(s.vec3.length(a.center),.9*t.Earth.radius):o.radius=s.vec3.length(a.eye)-a.relativeElevation,c?A(o,a,r,n):i=d.sphere.intersectScreen(o,a,r,n)),{sphere:o,scenePickPoint:i?n:null}},t.decidePanMode=function(e,r,c){var n=s.vec3.length(e.eye),o=n-t.Earth.radius;if(Math.abs(o)>t.VerticalPanTresholds.Elevation)return g.Horizontal;var i=r.radius>n;return e.aboveGround===i?g.Vertical:(s.vec3.subtract(b,e.eye,c),s.vec3.normalize(b,b),Math.abs(.5*Math.PI-a.acosClamped(s.vec3.dot(c,b)/s.vec3.length(c)))<t.VerticalPanTresholds.Angle?g.Vertical:g.Horizontal)};var b=l.vec3f64.create();t.applyPanPlanar=function(e,t,a){s.vec3.subtract(x,a,t),s.vec3.subtract(e.eye,e.eye,x),s.vec3.subtract(e.center,e.center,x),e.markViewDirty()};var x=l.vec3f64.create();function A(e,t,a,r){var c=d.ray.fromScreenAtEye(t,a,ae);return d.sphere.closestPointOnSilhouette(e,c,z),d.sphere.intersectRay(e,c,r)?!(s.vec3.squaredDistance(z,c.origin)<s.vec3.squaredDistance(r,c.origin))||(s.vec3.copy(r,z),!1):(s.vec3.subtract(T,t.eye,t.center),s.vec3.normalize(T,T),d.plane.fromNormalAndOffset(T,-s.vec3.dot(s.vec3.normalize(T,T),z),S),d.plane.intersectRay(S,c,r),!1)}t.sphereOrPlanePointFromScreenPoint=A;var z=l.vec3f64.create(),T=l.vec3f64.create(),S=d.plane.create();function w(e,r,c,n,o,i){var l;if(s.vec3.cross(ee,e,r),s.vec3.subtract(Y,e,r),s.vec3.length(e)<=o||!n.aboveGround){s.vec3.cross(c,Y,n.eye);var v=s.vec3.dot(e,r)/(s.vec3.length(e)*s.vec3.length(r)),d=Math.cos(a.clamp(m.cyclicalPI.normalize(a.deg2rad(i)),0,t.TiltThresholdPanningSpeed));l=-a.acosClamped(v)-Math.max(0,s.vec3.length(r)-o)/(d*o)}else s.vec3.subtract(I,n.eye,n.center),s.vec3.cross(c,Y,I),l=-s.vec3.length(Y)/o;return s.vec3.normalize(c,c),s.vec3.scale(c,c,s.vec3.length(ee)),l}t.rotationAngleAndAxisDirectRotation=w;var I=l.vec3f64.create();function V(e,r,c,n){var o,i=Math.cos(a.clamp(m.cyclicalPI.normalize(a.deg2rad(n)),0,t.TiltThresholdPanningSpeed));return o=r>c?-(r-c)/(i*c):r<-c?Math.PI-(r+c)/(i*c):a.acosClamped(r/c),((e>c?-(e-c)/(i*c):e<-c?Math.PI-(e+c)/(i*c):a.acosClamped(e/c))-o)*c}function H(e,t,a,r,c,n,i,l,v,d){var m=V(e[2],t[2],i.radius,v),h=d?V(e[0],t[0],i.radius,180):t[0]-e[0],u=Math.sin(l)*h-Math.cos(l)*m,p=Math.cos(l)*h+Math.sin(l)*m;s.vec3.normalize(X,c);var f=d?u/Math.sqrt(Math.abs(Math.pow(i.radius,2)-Math.pow(s.vec3.dot(a,X),2))):u/i.radius,g=p/Math.sqrt(Math.abs(Math.pow(i.radius,2)-Math.pow(s.vec3.dot(a,r),2)));o.vec2.set(n,f,g)}function R(e,t,a,r,c,n,o,i,l,v){s.vec3.cross(ee,e,t),u.coordinateSystemFromOneAxisAndNormalVector(n.up,n.eye,U,N,W),u.coordinateSystemFromOneAxisAndNormalVector([0,0,1],n.eye,E,O,G),s.vec3.copy(a,O),s.vec3.copy(r,E),s.vec3.normalize(a,a),s.vec3.scale(a,a,s.vec3.length(ee)),u.vectorCoordinates(e,s.vec3.normalize(N,N),s.vec3.normalize(W,W),s.vec3.normalize(U,U),Z),u.vectorCoordinates(t,N,W,U,_),H(Z,_,e,E,O,c,o,i,l,v)}function D(e,t,a,r,n,o,i){c.mat4.identity(J),c.mat4.identity(K),c.mat4.identity(L),c.mat4.rotate(J,J,n,r),c.mat4.rotate(K,K,i,o),c.mat4.multiply(L,J,K),s.vec3.subtract(t,e,a),s.vec3.transformMat4(t,t,L),s.vec3.add(t,t,a)}function k(e,t,a,r,n,o){c.mat4.identity(J),c.mat4.identity(K),c.mat4.identity(L),c.mat4.rotate(J,J,r,a),c.mat4.rotate(K,K,o,n),c.mat4.multiply(L,J,K),s.vec3.subtract(e.eye,e.eye,t),s.vec3.transformMat4(e.eye,e.eye,L),s.vec3.add(e.eye,e.eye,t),s.vec3.subtract(e.center,e.center,t),s.vec3.transformMat4(e.center,e.center,L),s.vec3.add(e.center,e.center,t),s.vec3.subtract(e.up,e.up,t),s.vec3.transformMat4(e.up,e.up,L),s.vec3.add(e.up,e.up,t),e.markViewDirty()}function F(e,a,r,c,n,o,i,s){void 0===i&&(i=t.PreservingHeadingThreshold.Pole),void 0===s&&(s=t.PreservingHeadingThreshold.Angle);var l=Math.abs(c)>Math.PI-s||Math.abs(c)<s,v=Math.abs(e[2])<r*i||Math.abs(a)>r;return!!(l&&v&&o.aboveGround&&n<t.PreservingHeadingThreshold.Tilt)}function q(e,t,a,r,c,n){if(n)d.axisAngle.fromPoints(a,r,B),f(t,e.center,B);else{var o=w(a,r,te,t,e.radius,c);f(t,e.center,d.axisAngle.wrapAxisAngle(te,o))}}function C(e,t,a,r,c,n,o){var i,l=o?20:1;s.vec3.copy(Q,r),$.copyFrom(t);for(var v=0;v<l&&s.vec3.squaredDistance(a,Q)>1e-12&&(i=s.vec3.squaredDistance(a,Q),R(a,Q,O,E,j,$,e,c,n,o),k($,e.center,E,j[1],O,j[0]),D(Q,Q,e.center,E,j[1],O,j[0]),s.vec3.squaredDistance(a,Q)<i||0===v);v++)t.copyFrom($)}t.lengthFromPoints=V,t.rotationAnglesHeadingPreserving=H,t.rotationAnglesAndAxesHeadingPreserving=R,t.rotatePointAroundTwoAxes=D,t.applyRotationWithTwoAxes=k,t.preserveHeadingThreshold=F,t.applyPanSphericalDirectRotation=q,t.applyPanSphericalPreserveHeading=C,t.panToPosition=function(e,r,c,n,o,i,l){F(c,s.vec3.dot(r.up,c),e.radius,-m.cyclicalPI.normalize(a.deg2rad(o)),i,r,t.PreservingHeadingThreshold.Pole,t.PreservingHeadingThreshold.Angle)?C(e,r,c,n,-m.cyclicalPI.normalize(a.deg2rad(o)),i,l):q(e,r,c,n,i,l)},t.panMotionToRotationMatrix=function(e,t,r,n,o,i,l,v,d){F(e.center,s.vec3.dot(e.up,e.center),s.vec3.length(e.center),-m.cyclicalPI.normalize(a.deg2rad(i)),l,t)?function(e,t,a,r,n,o){var i=e.eye;u.coordinateSystemFromOneAxisAndNormalVector([0,0,1],i,E,O,G);var l=t.translation[0]*a.pan,v=t.translation[1]*a.pan,d=Math.max(Math.sqrt(Math.abs(1-Math.pow(s.vec3.dot(e.center,E),2)/Math.pow(s.vec3.length(e.center),2))),.5),m=(Math.sin(o)*v+Math.cos(o)*l)/d,h=-Math.cos(o)*v+Math.sin(o)*l;switch(c.mat4.rotate(r.pan.matrix,r.pan.matrix,m,E),r.pan.enabled=!0,n.mode){case"pan":c.mat4.rotate(r.pan.matrix,r.pan.matrix,h,O),r.pan.enabled=!0;break;case"zoom":r.zoom=-t.translation[1]*a.zoom}}(t,r,n,v,d,-m.cyclicalPI.normalize(a.deg2rad(o))):function(e,t,a,r,n){var o=e.eye,i=e.viewRight,l=s.vec3.cross(h.sv3d.get(),i,o),v=t.translation[0]*a.pan;switch(0!==v&&(c.mat4.rotate(r.pan.matrix,r.pan.matrix,-v,l),r.pan.enabled=!0),n.mode){case"pan":var d=t.translation[1]*a.pan;0!==d&&(c.mat4.rotate(r.pan.matrix,r.pan.matrix,d,i),r.pan.enabled=!0);break;case"zoom":r.zoom=-t.translation[1]*a.zoom}}(t,r,n,v,d)};var E=l.vec3f64.create(),O=l.vec3f64.create(),G=l.vec3f64.create(),U=l.vec3f64.create(),N=l.vec3f64.create(),W=l.vec3f64.create(),Z=l.vec3f64.create(),_=l.vec3f64.create(),j=i.vec2f64.create(),B=d.axisAngle.create(),J=n.mat4f64.create(),K=n.mat4f64.create(),L=n.mat4f64.create(),Q=l.vec3f64.create(),X=l.vec3f64.create(),Y=l.vec3f64.create(),$=new p.default,ee=l.vec3f64.create(),te=l.vec3f64.create(),ae={origin:l.vec3f64.create(),direction:l.vec3f64.create()}}));