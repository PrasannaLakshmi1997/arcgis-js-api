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

define(["require","exports","tslib","../../../geometry","../../../Graphic","../../../core/Evented","../../../core/Handles","../../../core/maybe","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/support/aaBoundingRect","../../../geometry/support/boundsUtils","../../../geometry/support/coordsUtils","../../../geometry/support/rotate","../../../symbols/SimpleFillSymbol","../../../symbols/SimpleLineSymbol","../../../symbols/SimpleMarkerSymbol","./drawUtils","./GraphicMover","./layerUtils"],(function(t,e,i,r,a,o,s,h,n,c,p,l,u,y,_,v,d,g,G,f){var m=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move-start"},b=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move"},S=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move-stop"},w=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate-start"},k=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate"},x=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate-stop"},M=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale-start"},R=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale"},I=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale-stop"};return function(t){function e(e){var i,r=t.call(this,e)||this;return r._activeHandleGraphic=null,r._centerGraphicSymbol=new d({style:"circle",size:4,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),r._defaultFillSymbol=new _({color:[12,207,255,.075],outline:{join:"round",color:[0,12,207],width:2}}),r._dashedFillSymbol=new _({color:[0,0,0,0],outline:{style:"dash",color:[150,150,150,.5],width:2}}),r._defaultGraphicSymbol=new d({style:"square",size:8,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),r._graphicAttributes={esriSketchTool:"box"},r._handles=new s,r._mover=null,r._rotateGraphicOffset=20,r._rotateGraphicHoverSymbol=new d({style:"circle",size:10,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),r._rotateGraphicSymbol=new d({style:"circle",size:8,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),r._rotationAngle=0,r._rotateLineGraphic=null,r._rotateLineGraphicSymbol=new v({color:[0,12,207],width:2}),r._startInfo=null,r._totalDx=0,r._totalDy=0,r._xScale=1,r._yScale=1,r.type="box",r.callbacks={onMoveStart:function(t){},onMove:function(t){},onMoveStop:function(t){},onScaleStart:function(t){},onScale:function(t){},onScaleStop:function(t){},onRotateStart:function(t){},onRotate:function(t){},onRotateStop:function(t){}},r.centerGraphic=null,r.backgroundGraphic=null,r.enableMovement=!0,r.enableRotation=!0,r.enableScaling=!0,r.graphics=[],r.handleGraphics=[],r.layer=null,r.preserveAspectRatio=!1,r.rotateGraphic=null,r.showCenterGraphic=!0,r.view=null,r._getBounds=(i=p.create(),function(t,e){var r,a,o;t[0]=Number.POSITIVE_INFINITY,t[1]=Number.POSITIVE_INFINITY,t[2]=Number.NEGATIVE_INFINITY,t[3]=Number.NEGATIVE_INFINITY;for(var s=0,h=e;s<h.length;s++){var n=h[s];if(n){var c=void 0,p=void 0,y=void 0,_=void 0;if("point"===n.type)c=y=n.x,p=_=n.y;else if("multipoint"===n.type){var v=u.geometryToCoordinates(n);c=(r=l.getRingsOrPathsBounds(i,[v]))[0],p=r[1],y=r[2],_=r[3]}else"extent"===n.type?(c=(a=[n.xmin,n.ymin,n.xmax,n.ymax])[0],p=a[1],y=a[2],_=a[3]):(v=u.geometryToCoordinates(n),c=(o=l.getRingsOrPathsBounds(i,v))[0],p=o[1],y=o[2],_=o[3]);t[0]=Math.min(c,t[0]),t[1]=Math.min(p,t[1]),t[2]=Math.max(y,t[2]),t[3]=Math.max(_,t[3])}}return t}),r}return i.__extends(e,t),e.prototype.initialize=function(){var t=this;this._setup(),this._handles.add([n.whenOnce(this,"view.ready",(function(){var e=t,i=e.layer,r=e.view;f.addUniqueLayer(r,i)})),n.pausable(this,"preserveAspectRatio",(function(){t._activeHandleGraphic&&(t._scaleGraphic(t._activeHandleGraphic),t._updateGraphics())})),n.pausable(this,"view.scale",(function(){t._updateRotateGraphic(),t._updateRotateLineGraphic()})),n.pausable(this,"graphics",(function(){return t.refresh()})),n.pausable(this,"layer",(function(e,i){i&&t._resetGraphics(i),t.refresh()}))])},e.prototype.destroy=function(){this._reset(),this._handles&&(this._handles.removeAll(),this._handles=null)},Object.defineProperty(e.prototype,"state",{get:function(){var t=!!this.get("view.ready"),e=!(!this.get("graphics.length")||!this.get("layer"));return t&&e?"active":t?"ready":"disabled"},enumerable:!0,configurable:!0}),e.prototype.isUIGraphic=function(t){var e=[];return this.handleGraphics.length&&(e=e.concat(this.handleGraphics)),this.backgroundGraphic&&e.push(this.backgroundGraphic),this.centerGraphic&&e.push(this.centerGraphic),this.rotateGraphic&&e.push(this.rotateGraphic),this._rotateLineGraphic&&e.push(this._rotateLineGraphic),e.length&&e.indexOf(t)>-1},e.prototype.move=function(t,e){if(this._mover&&this.graphics.length){for(var i=0,r=this.graphics;i<r.length;i++){var a=r[i],o=a.geometry,s=g.cloneMove(o,t,e,this.view);a.geometry=s}this.refresh(),this._emitMoveStopEvent(t,e,null)}},e.prototype.scale=function(t,e){if(this._mover&&this.graphics.length){for(var i=0,r=this.graphics;i<r.length;i++){var a=r[i],o=a.geometry,s=g.scale(o,t,e);a.geometry=s}this.refresh(),this._emitScaleStopEvent(t,e,null)}},e.prototype.rotate=function(t,e){if(this._mover&&this.graphics.length){if(!e){var i=this.handleGraphics[1].geometry.x,a=this.handleGraphics[3].geometry.y;e=new r.Point(i,a,this.view.spatialReference)}for(var o=0,s=this.graphics;o<s.length;o++){var h=s[o],n=h.geometry,c=y.default(n,t,e);h.geometry=c}this.refresh(),this._emitRotateStopEvent(t,null)}},e.prototype.refresh=function(){this._reset(),this._setup()},e.prototype.reset=function(){this.graphics=[]},e.prototype._setup=function(){"active"===this.state&&(this._setupGraphics(),this._setupMover(),this._updateGraphics())},e.prototype._reset=function(){this._resetGraphicStateVars(),this._resetGraphics(),this._mover&&this._mover.destroy(),this._mover=null,this.view.cursor="default"},e.prototype._resetGraphicStateVars=function(){this._startInfo=null,this._activeHandleGraphic=null,this._totalDx=0,this._totalDy=0,this._xScale=1,this._yScale=1,this._rotationAngle=0},e.prototype._resetGraphics=function(t){var e=t||this.layer;e&&(e.removeMany(this.handleGraphics),e.remove(this.backgroundGraphic),e.remove(this.centerGraphic),e.remove(this.rotateGraphic),e.remove(this._rotateLineGraphic));for(var i=0,r=this.handleGraphics;i<r.length;i++){r[i].destroy()}this._set("handleGraphics",[]),this.backgroundGraphic&&(this.backgroundGraphic.destroy(),this._set("backgroundGraphic",null)),this.centerGraphic&&(this.centerGraphic.destroy(),this._set("centerGraphic",null)),this.rotateGraphic&&(this.rotateGraphic.destroy(),this._set("rotateGraphic",null)),this._rotateLineGraphic&&(this._rotateLineGraphic.destroy(),this._rotateLineGraphic=null)},e.prototype._setupMover=function(){var t=this,e=[].concat(this.handleGraphics);this.enableMovement&&(e=e.concat(this.graphics,this.backgroundGraphic)),this.enableRotation&&e.push(this.rotateGraphic),this.showCenterGraphic&&e.push(this.centerGraphic),this._mover=new G({enableMoveAllGraphics:!1,view:this.view,graphics:e,callbacks:{onGraphicClick:function(e){return t._onGraphicClickCallback(e)},onGraphicMoveStart:function(e){return t._onGraphicMoveStartCallback(e)},onGraphicMove:function(e){return t._onGraphicMoveCallback(e)},onGraphicMoveStop:function(e){return t._onGraphicMoveStopCallback(e)},onGraphicPointerOver:function(e){return t._onGraphicPointerOverCallback(e)},onGraphicPointerOut:function(e){return t._onGraphicPointerOutCallback(e)}}})},e.prototype._getStartInfo=function(t){var e=this._getBoxBounds(p.create()),i=e[0],r=e[1],a=e[2],o=e[3],s=Math.abs(a-i),h=Math.abs(o-r),n=(a+i)/2,c=(o+r)/2,l=t.geometry;return{width:s,height:h,centerX:n,centerY:c,startX:l.x,startY:l.y,graphicInfos:this._getGraphicInfos(),box:this.backgroundGraphic.geometry,rotate:this.rotateGraphic.geometry}},e.prototype._getGraphicInfos=function(){var t=this;return this.graphics.map((function(e){return t._getGraphicInfo(e)}))},e.prototype._getGraphicInfo=function(t){var e=t.geometry,i=this._getBounds(p.create(),[e]),r=i[0],a=i[1],o=i[2],s=i[3];return{width:Math.abs(o-r),height:Math.abs(s-a),centerX:(o+r)/2,centerY:(s+a)/2,geometry:e}},e.prototype._onGraphicClickCallback=function(t){var e=t.graphic;(e===this.rotateGraphic||this.handleGraphics.indexOf(e)>-1)&&t.viewEvent.stopPropagation()},e.prototype._onGraphicMoveStartCallback=function(t){var e=t.graphic;this._resetGraphicStateVars(),this._hideGraphicsBeforeUpdate(),this.backgroundGraphic.symbol=this._dashedFillSymbol,this._startInfo=this._getStartInfo(e),e===this.rotateGraphic?this._emitRotateStartEvent(this._rotationAngle,e):this.handleGraphics.indexOf(e)>-1?(this._activeHandleGraphic=e,this._emitScaleStartEvent(this._xScale,this._yScale,e)):this._emitMoveStartEvent(t.dx,t.dy,e)},e.prototype._onGraphicMoveCallback=function(t){var e=t.graphic;if(this._startInfo)if(this.handleGraphics.indexOf(e)>-1)this._scaleGraphic(e),this._emitScaleEvent(this._xScale,this._yScale,e);else if(e===this.rotateGraphic)this._rotateGraphic(e),this._emitRotateEvent(this._rotationAngle,e);else{var i=t.dx,r=t.dy;this._totalDx+=i,this._totalDy+=r,this._moveGraphic(e,i,r),this._emitMoveEvent(i,r,e)}},e.prototype._onGraphicMoveStopCallback=function(t){var e=t.graphic;this._startInfo?(this._updateGraphics(),this._showGraphicsAfterUpdate(),this.backgroundGraphic.symbol=this._defaultFillSymbol,e===this.rotateGraphic?this._emitRotateStopEvent(this._rotationAngle,e):this.handleGraphics.indexOf(e)>-1?this._emitScaleStopEvent(this._xScale,this._yScale,e):this._emitMoveStopEvent(this._totalDx,this._totalDy,e),this._resetGraphicStateVars()):this.refresh()},e.prototype._onGraphicPointerOverCallback=function(t){var e,i=this.view.rotation,r=t.index;switch(t.graphic===this.rotateGraphic&&(this.rotateGraphic.symbol=this._rotateGraphicHoverSymbol),r<8&&(i>=0&&i<45?r%=8:r=i>=45&&i<90?(r+1)%8:i>=90&&i<135?(r+2)%8:i>=135&&i<180?(r+3)%8:i>=180&&i<225?(r+4)%8:i>=225&&i<270?(r+5)%8:i>=270&&i<315?(r+6)%8:(r+7)%8),r){case 0:e="nwse-resize";break;case 1:e="ns-resize";break;case 2:e="nesw-resize";break;case 3:e="ew-resize";break;case 4:e="nwse-resize";break;case 5:e="ns-resize";break;case 6:e="nesw-resize";break;case 7:e="ew-resize";break;default:e="pointer"}this.view.cursor=e},e.prototype._onGraphicPointerOutCallback=function(t){t.graphic===this.rotateGraphic&&(this.rotateGraphic.symbol=this._rotateGraphicSymbol),this.view.cursor="default"},e.prototype._scaleGraphic=function(t){var e=this._startInfo,i=this.handleGraphics,a=this.preserveAspectRatio,o=this.view,s=e.centerX,h=e.centerY,n=e.startX,c=e.startY,p=o.state,l=p.resolution,u=p.transform,y=i.indexOf(t);1!==y&&5!==y||this._updateX(t,s),3!==y&&7!==y||this._updateY(t,h);var _=t.geometry,v=_.x,d=_.y,G=u[0]*v+u[2]*d+u[4],f=u[1]*v+u[3]*d+u[5],m=e.graphicInfos.map((function(t){return t.geometry}));if(a){var b=u[0]*s+u[2]*h+u[4],S=u[1]*s+u[3]*h+u[5],w=u[0]*n+u[2]*c+u[4],k=u[1]*n+u[3]*c+u[5];this._xScale=this._yScale=g.getScaleRatio(b,S,w,k,G,f);for(var x=0,M=m;x<M.length;x++){var R=M[x],I=m.indexOf(R);this.graphics[I].geometry=g.scale(R,this._xScale,this._yScale,[s,h])}this._updateBackgroundGraphic()}else{var E=e.width,O=e.height,C=v-n,A=c-d;if(1===y||5===y?C=0:3!==y&&7!==y||(A=0),0===C&&0===A)return;var P=E+(n>s?C:-1*C),B=O+(c<h?A:-1*A),L=s+C/2,Y=h+A/2;this._xScale=P/E||1,this._yScale=B/O||1,1===y||5===y?this._xScale=1:3!==y&&7!==y||(this._yScale=1);var N=(L-s)/l,z=(Y-h)/l,X=g.scale(e.box,this._xScale,this._yScale);this.backgroundGraphic.geometry=g.cloneMove(X,N,z,o,!0);for(var T=this._getGraphicInfo(this.backgroundGraphic),U=T.centerX,F=T.centerY,H=(U-s)/l,D=-1*(F-h)/l,V=0,q=m;V<q.length;V++){R=q[V];var j=m.indexOf(R),J=g.scale(R,this._xScale,this._yScale,[s,h]);this.graphics[j].geometry=g.cloneMove(J,H,D,o,!0)}this.centerGraphic.geometry=new r.Point(U,F,o.spatialReference)}},e.prototype._rotateGraphic=function(t){var e=this._startInfo,i=e.centerX,a=e.centerY,o=e.startX,s=e.startY,h=e.box,n=e.rotate,c=t.geometry,p=c.x,l=c.y,u=new r.Point(i,a,this.view.spatialReference);this._rotationAngle=g.getRotationAngle(i,a,o,s,p,l);for(var _=this._startInfo.graphicInfos.map((function(t){return t.geometry})),v=0,d=_;v<d.length;v++){var G=d[v],f=_.indexOf(G),m=y.default(G,this._rotationAngle,u);this.graphics[f].geometry=m}this.backgroundGraphic.geometry=y.default(h,this._rotationAngle,u),this.rotateGraphic.geometry=y.default(n,this._rotationAngle,u)},e.prototype._moveGraphic=function(t,e,i){if(this.graphics.indexOf(t)>-1){var r=this.backgroundGraphic.geometry;this.backgroundGraphic.geometry=g.cloneMove(r,e,i,this.view);for(var a=0,o=this.graphics;a<o.length;a++){(n=o[a])!==t&&(n.geometry=g.cloneMove(n.geometry,e,i,this.view))}}else if(t===this.centerGraphic){r=this.backgroundGraphic.geometry;this.backgroundGraphic.geometry=g.cloneMove(r,e,i,this.view)}if(t===this.backgroundGraphic||t===this.centerGraphic)for(var s=0,h=this.graphics;s<h.length;s++){var n;(n=h[s]).geometry=g.cloneMove(n.geometry,e,i,this.view)}},e.prototype._setupGraphics=function(){var t=this._graphicAttributes;this._set("centerGraphic",new a(null,this._centerGraphicSymbol,t)),this.showCenterGraphic&&this.layer.add(this.centerGraphic),this._set("backgroundGraphic",new a(null,this._defaultFillSymbol,t)),this.layer.add(this.backgroundGraphic),this._rotateLineGraphic=new a(null,this._rotateLineGraphicSymbol,t),this._set("rotateGraphic",new a(null,this._rotateGraphicSymbol,t)),this.enableRotation&&!this._hasExtentGraphic()&&(this.layer.add(this._rotateLineGraphic),this.layer.add(this.rotateGraphic));for(var e=0;e<8;e++)this.handleGraphics.push(new a(null,this._defaultGraphicSymbol,t));this.enableScaling&&this.layer.addMany(this.handleGraphics)},e.prototype._updateGraphics=function(){this._updateBackgroundGraphic(),this._updateHandleGraphics(),this._updateCenterGraphic(),this._updateRotateGraphic(),this._updateRotateLineGraphic()},e.prototype._hideGraphicsBeforeUpdate=function(){this.centerGraphic.visible=!1,this.rotateGraphic.visible=!1,this._rotateLineGraphic.visible=!1,this.handleGraphics.forEach((function(t){return t.visible=!1}))},e.prototype._showGraphicsAfterUpdate=function(){this.enableRotation&&(this._rotateLineGraphic.visible=!0,this.rotateGraphic.visible=!0),this.showCenterGraphic&&(this.centerGraphic.visible=!0),this.enableScaling&&this.handleGraphics.forEach((function(t){return t.visible=!0}))},e.prototype._updateHandleGraphics=function(){var t=this,e=this._getCoordinates(!0);this.handleGraphics.forEach((function(i,r){var a=e[r],o=a[0],s=a[1];t._updateXY(i,o,s)}))},e.prototype._updateBackgroundGraphic=function(){var t=this._getCoordinates();this.backgroundGraphic.geometry=new r.Polygon({rings:t,spatialReference:this.view.spatialReference})},e.prototype._updateCenterGraphic=function(){var t=this._getBoxBounds(p.create()),e=t[0],i=t[1],a=(t[2]+e)/2,o=(t[3]+i)/2;this.centerGraphic.geometry=new r.Point(a,o,this.view.spatialReference)},e.prototype._updateRotateGraphic=function(){if(this.handleGraphics.length){var t=this.handleGraphics[1].geometry,e=t.x,i=t.y+this.view.state.resolution*this._rotateGraphicOffset;this.rotateGraphic.geometry=new r.Point(e,i,this.view.spatialReference)}},e.prototype._updateRotateLineGraphic=function(){if(this.handleGraphics.length&&this.rotateGraphic&&this.rotateGraphic.geometry){var t=this.handleGraphics[1].geometry,e=this.rotateGraphic.geometry;this._rotateLineGraphic.geometry=new r.Polyline({paths:[[t.x,t.y],[e.x,e.y]],spatialReference:this.view.spatialReference})}},e.prototype._updateXY=function(t,e,i){t.geometry=new r.Point(e,i,this.view.spatialReference)},e.prototype._updateX=function(t,e){var i=t.geometry.y;t.geometry=new r.Point(e,i,this.view.spatialReference)},e.prototype._updateY=function(t,e){var i=t.geometry.x;t.geometry=new r.Point(i,e,this.view.spatialReference)},e.prototype._hasExtentGraphic=function(){return this.graphics.some((function(t){return t&&h.isSome(t.geometry)&&"extent"===t.geometry.type}))},e.prototype._getBoxBounds=function(t){var e=this.graphics.map((function(t){return t.geometry}));return this._getBounds(t,e)},e.prototype._getCoordinates=function(t){var e=this._getBoxBounds(p.create()),i=e[0],r=e[1],a=e[2],o=e[3];if(t){var s=(i+a)/2,h=(o+r)/2;return[[i,o],[s,o],[a,o],[a,h],[a,r],[s,r],[i,r],[i,h]]}return[[i,o],[a,o],[a,r],[i,r]]},e.prototype._emitMoveStartEvent=function(t,e,i){var r=new m(this.graphics,i,t,e);this.emit("move-start",r),this.callbacks.onMoveStart&&this.callbacks.onMoveStart(r)},e.prototype._emitMoveEvent=function(t,e,i){var r=new b(this.graphics,i,t,e);this.emit("move",r),this.callbacks.onMove&&this.callbacks.onMove(r)},e.prototype._emitMoveStopEvent=function(t,e,i){var r=new S(this.graphics,i,t,e);this.emit("move-stop",r),this.callbacks.onMoveStop&&this.callbacks.onMoveStop(r)},e.prototype._emitRotateStartEvent=function(t,e){var i=new w(this.graphics,e,t);this.emit("rotate-start",i),this.callbacks.onRotateStart&&this.callbacks.onRotateStart(i)},e.prototype._emitRotateEvent=function(t,e){var i=new k(this.graphics,e,t);this.emit("rotate",i),this.callbacks.onRotate&&this.callbacks.onRotate(i)},e.prototype._emitRotateStopEvent=function(t,e){var i=new x(this.graphics,e,t);this.emit("rotate-stop",i),this.callbacks.onRotateStop&&this.callbacks.onRotateStop(i)},e.prototype._emitScaleStartEvent=function(t,e,i){var r=new M(this.graphics,i,t,e);this.emit("scale-start",r),this.callbacks.onScaleStart&&this.callbacks.onScaleStart(r)},e.prototype._emitScaleEvent=function(t,e,i){var r=new R(this.graphics,i,t,e);this.emit("scale",r),this.callbacks.onScale&&this.callbacks.onScale(r)},e.prototype._emitScaleStopEvent=function(t,e,i){var r=new I(this.graphics,i,t,e);this.emit("scale-stop",r),this.callbacks.onScaleStop&&this.callbacks.onScaleStop(r)},i.__decorate([c.property()],e.prototype,"_rotateLineGraphic",void 0),i.__decorate([c.property({readOnly:!0})],e.prototype,"type",void 0),i.__decorate([c.property()],e.prototype,"callbacks",void 0),i.__decorate([c.property({readOnly:!0})],e.prototype,"centerGraphic",void 0),i.__decorate([c.property({readOnly:!0})],e.prototype,"backgroundGraphic",void 0),i.__decorate([c.property()],e.prototype,"enableMovement",void 0),i.__decorate([c.property()],e.prototype,"enableRotation",void 0),i.__decorate([c.property()],e.prototype,"enableScaling",void 0),i.__decorate([c.property()],e.prototype,"graphics",void 0),i.__decorate([c.property({readOnly:!0})],e.prototype,"handleGraphics",void 0),i.__decorate([c.property()],e.prototype,"layer",void 0),i.__decorate([c.property()],e.prototype,"preserveAspectRatio",void 0),i.__decorate([c.property({readOnly:!0})],e.prototype,"rotateGraphic",void 0),i.__decorate([c.property()],e.prototype,"showCenterGraphic",void 0),i.__decorate([c.property({dependsOn:["view.ready","graphics.length","layer"],readOnly:!0})],e.prototype,"state",null),i.__decorate([c.property()],e.prototype,"view",void 0),e=i.__decorate([c.subclass("esri.views.draw.support.Box")],e)}(o.EventedAccessor)}));