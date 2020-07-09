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

define(["require","exports","tslib","../../../../../../core/Error","../../../../../../core/has","../../../../../../core/Logger","../../../../../../core/maybe","../../../../../../core/promiseUtils","../../../../../../geometry/support/jsonUtils","../../../../../../symbols/SimpleLineSymbol","../../definitions","../../enums","../../WGLDisplayObject","../MeshData","../VertexVector","../templates/WGLLabelTemplate","../templates/WGLLineTemplate","../templates/WGLMarkerTemplate","../templates/WGLTemplateStore"],(function(e,t,r,o,l,a,i,n,s,p,y,m,u,c,h,b,f,g,d){Object.defineProperty(t,"__esModule",{value:!0});var L=a.getLogger("esri.views.2d.engine.webgl.WGLMeshFactory"),_={esriGeometryPoint:["above-right","above-center","above-left","center-center","center-left","center-right","below-center","below-left","below-right"],esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null,esriGeometryEnvelope:null},T=function(){function e(e,t,r,o){this._isDD=!1,this._labelsDebugTemplate=null,this._isDD=i.isSome(r)&&"dot-density"===r.type,this._geometryType=e,this._idField=t,this._templateStore=o}return e.prototype.update=function(e,t,r){this._isDD=i.isSome(t)&&"dot-density"===t.type,this._setLabelTemplates(e,t,r)},e.prototype._setLabelTemplates=function(e,t,r){e&&this._validateLabelingInfo(e)&&(this._labelTemplates=e.map((function(e){return b.default.fromLabelClass(t,e.labelClass,r)})))},Object.defineProperty(e.prototype,"templates",{get:function(){return this._templateStore},enumerable:!0,configurable:!0}),e.prototype.createMeshData=function(e){var t=new Array(5),r=new Array,o=this._labelTemplates&&this._labelTemplates.length>0,l="esriGeometryPolyline"===this._geometryType?y.HEURISTIC_GLYPHS_PER_LINE:y.HEURISTIC_GLYPHS_PER_FEATURE;return t[m.WGLGeometryType.MARKER]=new h.VertexVectors(m.WGLGeometryType.MARKER,e),t[m.WGLGeometryType.FILL]=new h.VertexVectors(m.WGLGeometryType.FILL,e,this._isDD),t[m.WGLGeometryType.LINE]=new h.VertexVectors(m.WGLGeometryType.LINE,e),t[m.WGLGeometryType.TEXT]=new h.VertexVectors(m.WGLGeometryType.TEXT,e),t[m.WGLGeometryType.LABEL]=new h.VertexVectors(m.WGLGeometryType.LABEL,o?l:0),new c.MeshData(r,t)},e.prototype.analyze=function(e,t,o,l,a){return r.__awaiter(this,void 0,void 0,(function(){var s,p,y,m,u,c,h,b,f;return r.__generator(this,(function(r){switch(r.label){case 0:return s=e,n.isAborted(a)?[2,[]]:i.isSome(t)?[4,t.analyze(this._idField,e,o,l,a)]:[3,2];case 1:r.sent(),r.label=2;case 2:for(p=0,y=s;p<y.length;p++){if(m=y[p],null!=(u=m.groupId)&&-1!==u||(u=t.match(this._idField,m,this._geometryType,o,l)),d.isDynamicId(u))for(c=this._templateStore.getDynamicTemplateGroup(u),h=0,b=c;h<b.length;h++)(f=b[h])&&f.analyze&&f.analyze(this._templateStore,m,o,l);m.groupId=u}return[2,this._templateStore.finalize(a).then((function(){return s}))]}}))}))},e.prototype.write=function(e,t,r,o,a,n){var p=this._templateStore.getTemplateGroup(t.groupId),y=e,m=t.localId;if(null!=m){var c=new u(m);if(d.isDynamicId(t.groupId))for(var h=0,b=p;h<b.length;h++){(G=b[h])&&G.bindFeature(t,r,o)}if(p&&(t.geometry||t.centroid)){var f=c.displayRecords,g=t.insertAfter;void 0!==g&&(c.insertAfter=g);var L=this._geometryType;L||(L=null!=t.centroid?"esriGeometryPolygon":s.getJsonType(t.geometry));for(var _=0,T=p;_<T.length;_++){var G;if(G=T[_]){var v=y.get(G.geometryType);G.writeMesh(f,v,L,m,t)}}var w=c.displayRecords.length;if(i.isSome(n)&&w){var D=n&&this._findLabelRef(p);this._writeLabels(c,y,m,t,n,D,a)}y.pushDisplayObject(c)}}else l("esri-2d-debug")&&console.debug("Got null id for feature")},e.prototype._hasBadLabelClass=function(e,t){var r=e.labelPlacement,l=_[t];if(!e.symbol)return L.warn("No LabelClass symbol specified."),!0;if(!l)return L.error(new o("mapview-labeling:unsupported-geometry-type","Unable to create labels for Feature Layer, "+t+" is not supported")),!0;if(!l.some((function(e){return e===r}))){var a=l[0];r&&L.warn("Found invalid label placement type "+r+" for "+t+". Defaulting to "+a),e.labelPlacement=a}return!1},e.prototype._validateLabelingInfo=function(e){var t=this;return!e.some((function(e){return t._hasBadLabelClass(e.labelClass,t._geometryType)}))},e.prototype._findLabelRef=function(e){for(var t=0,r=e;t<r.length;t++){var o=r[t];if(o instanceof g.default)return o}return null},e.prototype._writeLabels=function(e,t,r,o,l,a,n){for(var s=e.displayRecords,p=[],m=0,u=l;m<u.length;m++){var c=u[m];if(i.isSome(c)){var h=c.glyphs,b=c.rtl,f=c.classIndex,g=this._labelTemplates[f],d=t.get(g.geometryType);g.bindReferenceTemplate(a),g.bindTextInfo(h,b),g.writeMesh(s,d,this._geometryType,r,o,n,p)}}e.metrics=p,y.DEBUG_LABELS&&this._debugLabels(e,t)},e.prototype._debugLabels=function(e,t){for(var r=e.displayRecords,o=e.id,l=0,a=e.metrics;l<a.length;l++)for(var i=a[l],n=0,s=i.boxes?i.boxes.concat([i.bounds]):[i.bounds];n<s.length;n++){var p=s[n],y=i.anchor[0]+i.offsetX+p.center[0],m=i.anchor[1]+i.offsetY+p.center[1],u={geometry:{paths:[[[y-p.width/2,m+p.height/2],[0,-p.height],[p.width,0],[0,p.height],[-p.width,0]]]},attributes:{}},c=this._getLabelDebugTemplate(),h=t.get(c.geometryType);c.writeMesh(r,h,"esriGeometryPolyline",o,u)}},e.prototype._getLabelDebugTemplate=function(){return this._labelsDebugTemplate||(this._labelsDebugTemplate=this._createLabelsDebugTemplate()),this._labelsDebugTemplate},e.prototype._createLabelsDebugTemplate=function(){var e=new p({style:"solid",width:1,color:[255,0,0,1]});return f.default.fromSimpleLine(null,!1,e,null,!1)},e}();t.WGLMeshFactory=T}));