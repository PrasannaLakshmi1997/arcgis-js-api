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

define(["require","exports","tslib","../../geometry","../../Viewpoint","../../core/JSONSupport","../../core/accessorSupport/decorators","../../core/libs/gl-matrix-2/common","../../core/libs/gl-matrix-2/mat2d","../../core/libs/gl-matrix-2/mat2df32","../../core/libs/gl-matrix-2/mat2df64","../../core/libs/gl-matrix-2/mat3","../../core/libs/gl-matrix-2/mat3f32","../../core/libs/gl-matrix-2/vec2","../../core/libs/gl-matrix-2/vec2f32","../../core/libs/gl-matrix-2/vec2f64","../../core/libs/gl-matrix-2/types/vec2","./viewpointUtils"],(function(t,e,i,r,o,a,s,n,c,p,l,f,m,h,d,v,u,y){var w=[0,0];return function(t){function e(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];var o=t.apply(this,e)||this;return o._viewpoint2D={center:v.vec2f64.create(),rotation:0,scale:0,spatialReference:null},o.center=[0,0],o.extent=new r.Extent,o.id=0,o.inverseTransform=l.mat2df64.create(),o.resolution=0,o.rotation=0,o.scale=0,o.transform=l.mat2df64.create(),o.transformNoRotation=l.mat2df64.create(),o.displayMat3=m.mat3f32.create(),o.displayViewMat3=m.mat3f32.create(),o.viewMat3=m.mat3f32.create(),o.viewMat2d=p.mat2df32.create(),o.worldScreenWidth=0,o.size=[0,0],o}var a;return i.__extends(e,t),a=e,Object.defineProperty(e.prototype,"pixelRatio",{set:function(t){this._set("pixelRatio",t),this._update()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{set:function(t){this._set("size",t),this._update()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"viewpoint",{set:function(t){if(t){var e=this._viewpoint2D,i=t.targetGeometry;e.center[0]=i.x,e.center[1]=i.y,e.rotation=t.rotation,e.scale=t.scale,e.spatialReference=i.spatialReference}this._update()},enumerable:!0,configurable:!0}),e.prototype.copy=function(t){var e=this.size,i=this.viewpoint;return i&&e?(this.viewpoint=y.copy(i,t.viewpoint),this._set("size",h.vec2.copy(e,t.size))):(this.viewpoint=t.viewpoint.clone(),this._set("size",[t.size[0],t.size[1]])),this._set("pixelRatio",t.pixelRatio),this},e.prototype.clone=function(){return new a({size:this.size,viewpoint:this.viewpoint.clone(),pixelRatio:this.pixelRatio})},e.prototype.toMap=function(t,e,i){return u.isVec2(e)?h.vec2.transformMat2d(t,e,this.inverseTransform):(w[0]=e,w[1]=i,h.vec2.transformMat2d(t,w,this.inverseTransform))},e.prototype.toScreen=function(t,e,i){return u.isVec2(e)?h.vec2.transformMat2d(t,e,this.transform):(w[0]=e,w[1]=i,h.vec2.transformMat2d(t,w,this.transform))},e.prototype.toScreenNoRotation=function(t,e,i){return u.isVec2(e)?h.vec2.transformMat2d(t,e,this.transformNoRotation):(w[0]=e,w[1]=i,h.vec2.transformMat2d(t,w,this.transformNoRotation))},e.prototype.getScreenTransform=function(t,e){var i=this._viewpoint2D.center,r=this._get("pixelRatio")||1,o=this._get("size");return y.getMatrix(t,i,o,e,0,r),t},e.prototype._update=function(){var t=this._viewpoint2D,e=t.center,i=t.spatialReference,a=t.scale,s=t.rotation,p=this._get("pixelRatio")||1,l=this._get("size"),m=new o({targetGeometry:new r.Point(e[0],e[1],i),scale:a,rotation:s});if(this._set("viewpoint",m),l&&i&&a){this.resolution=y.getResolution(m),this.rotation=s,this.scale=a,this.spatialReference=i,h.vec2.copy(this.center,e);var v=0!==l[0]?2/l[0]:0,u=0!==l[1]?-2/l[1]:0;f.mat3.set(this.displayMat3,v,0,0,0,u,0,-1,1,1);var w=f.mat3.identity(this.viewMat3),_=d.vec2f32.fromValues(l[0]/2,l[1]/2),g=d.vec2f32.fromValues(-l[0]/2,-l[1]/2),x=n.common.toRadian(s);f.mat3.translate(w,w,_),f.mat3.rotate(w,w,x),f.mat3.translate(w,w,g),f.mat3.multiply(this.displayViewMat3,this.displayMat3,w);var R=c.mat2d.identity(this.viewMat2d);return c.mat2d.translate(R,R,_),c.mat2d.rotate(R,R,x),c.mat2d.translate(R,R,g),y.getExtent(this.extent,m,l),y.getTransform(this.transform,m,l,p),c.mat2d.invert(this.inverseTransform,this.transform),y.getTransformNoRotation(this.transformNoRotation,m,l,p),this.worldScreenWidth=y.getWorldScreenWidth(this.spatialReference,this.resolution),this._set("id",this.id+1),this}},i.__decorate([s.property({readOnly:!0})],e.prototype,"id",void 0),i.__decorate([s.property({value:1,json:{write:!0}})],e.prototype,"pixelRatio",null),i.__decorate([s.property({json:{write:!0}})],e.prototype,"size",null),i.__decorate([s.property({type:o,json:{write:!0}})],e.prototype,"viewpoint",null),e=a=i.__decorate([s.subclass("esri.views.2d.ViewState")],e)}(a.JSONSupport)}));