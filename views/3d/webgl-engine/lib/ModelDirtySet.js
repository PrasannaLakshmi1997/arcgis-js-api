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

define(["require","exports","../../../../core/arrayUtils","../../../../core/MapUtils","./Util"],(function(e,t,r,o,n){return function(){function e(e){this._residentGeomRecords=new Map,this._dirtyGeomRecords=new Map,this._model=e}return Object.defineProperty(e.prototype,"residentLayerCount",{get:function(){return this._residentGeomRecords.size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"residentObjectCount",{get:function(){var e=0;return this._residentGeomRecords.forEach((function(t){e+=t.size})),e},enumerable:!0,configurable:!0}),e.prototype.hasDirtyGeometryRecords=function(){return o.someMap(this._dirtyGeomRecords,(function(e){return o.someMap(e,(function(e){return e&&e.size>0}))}))},e.prototype.handleUpdate=function(e,t,r){return n.assert(this[t],"ModelDirtySet doesn't know how to process "+t),this[t](e,r)},e.prototype.shaderTransformationChanged=function(e){var t=this,r=this._residentGeomRecords.get(e.id);r&&r.forEach((function(e,r){var o=t._model.get(1,r);o&&o.hasVolativeTransformation()&&e.forEach((function(e){for(var t=0,r=e[1];t<r.length;t++){r[t].shaderTransformationChanged()}}))}))},e.prototype.commit=function(){return this.commitLayers(r.keysOfMap(this._dirtyGeomRecords))},e.prototype.commitLayers=function(e){for(var t=this,r=[],o=[],i=[],d=function(d){var a=e[d],c=s._dirtyGeomRecords.get(a);if(!c)return"continue";c.forEach((function(e,d){var s=t._ensureGeomRecord(a,d);e.forEach((function(e,a){var c,p=e[0],y=e[1],f=e[2],h=!1;if(2&y)if(c=s.get(a)){var u=c[1];if(4&f)for(var m=t._model.get(1,d),l=0,g=u;l<g.length;l++){var R=g[l];if(t._model.updateRenderGeometryTransformation(m,p,R)){h=!0;break}}if(!h)for(var v=0,_=u;v<_.length;v++){R=_[v];i.push({renderGeometry:R,updateType:f})}}else n.assert(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid update");(4&y||h)&&((c=s.get(a))?o.push.apply(o,c[1]):4===y&&n.assert(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid remove"),c&&s.delete(a));if(1&y||h){var G=[p,[]];m=t._model.get(1,d);t._model.getGeometryRenderGeometries(m,p,G[1]),r.push.apply(r,G[1]),s.set(a,G)}})),0===s.size&&t._residentGeomRecords.get(a).delete(d)})),0===s._residentGeomRecords.get(a).size&&s._residentGeomRecords.delete(a),s._dirtyGeomRecords.delete(a)},s=this,a=0;a<e.length;a++)d(a);return[r,o,i]},e.prototype.getResidentRenderGeometries=function(){return this.getResidentRenderGeometriesFilteredByLayers(r.keysOfMap(this._residentGeomRecords))},e.prototype.getResidentRenderGeometriesFilteredByLayers=function(e){for(var t=[],r=0;r<e.length;r++){var o=e[r],n=this._residentGeomRecords.get(o);n&&n.forEach((function(e){e.forEach((function(e){t.push.apply(t,e[1])}))}))}return t},e.prototype._objectStateChanged=function(e,t,r,o){if(null!=r)this._componentPropertyChanged(t,r,o,e);else for(var n=0,i=t.geometryRecords;n<i.length;n++){var d=i[n];this._componentPropertyChanged(t,d,o,e)}},e.prototype.visibilityChanged=function(e,t,r){this._objectStateChanged(1,e,t,r)},e.prototype.highlightChanged=function(e,t,r){this._objectStateChanged(8,e,t,r)},e.prototype.occlusionChanged=function(e,t,r){this._objectStateChanged(16,e,t,r)},e.prototype.vertexAttrsUpdated=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,2)},e.prototype.layerAdded=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layerObjectAdded(e,t[r])},e.prototype.layerRemoved=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layerObjectRemoved(e,t[r])},e.prototype.layerObjectAdded=function(e,t){for(var r=e.id,o=t.geometryRecords,n=0;n<o.length;n++)this.objGeometryAdded(t,o[n],r)},e.prototype.layerObjectRemoved=function(e,t){for(var r=e.id,o=t.geometryRecords,n=0;n<o.length;n++)this.objGeometryRemoved(t,o[n],r)},e.prototype.layObjectReplaced=function(e,t){this.layerObjectRemoved(e,t[0]),this.layerObjectAdded(e,t[1])},e.prototype.objTransformation=function(e,t){var r=this;t=t||this._getParentLayerId(e);var o=e.id;this._ensureGeomRecord(t,o).forEach((function(o){r._updateOrCreateDirtyRecord(e,o[0],t,2,0,0,2,5,4)}))},e.prototype.objGeometryAdded=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,1,4,0,0,0)},e.prototype.objGeometryRemoved=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,4,1,2,0,0)},e.prototype.objGeometryReplaced=function(e,t){this.objGeometryRemoved(e,t[0]),this.objGeometryAdded(e,t[1])},e.prototype.objGeometryTransformation=function(e,t){this.objGeometryReplaced(e,t)},e.prototype._componentPropertyChanged=function(e,t,r,o){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,o)},e.prototype._updateOrCreateDirtyRecord=function(e,t,r,o,i,d,s,a,c){r=r||this._getParentLayerId(e);var p=e.id,y=t.id,f=this._ensureDirtyRecord(r,p),h=f.get(y);if(h){var u=h[1];u&i?f.delete(y):u&d?(h[1]=o,h[2]=c):u&s?h[2]|=c:u&a||n.assert(!1,"ModelDirtySet.objGeometryAdded: inconsistent state")}else f.set(y,[t,o,c])},e.prototype._ensureGeomRecord=function(e,t){var r=this._residentGeomRecords.get(e);r||(r=new Map,this._residentGeomRecords.set(e,r));var o=r.get(t);return o||(o=new Map,r.set(t,o)),o},e.prototype._ensureDirtyRecord=function(e,t){var r=this._dirtyGeomRecords.get(e);r||(r=new Map,this._dirtyGeomRecords.set(e,r));var o=r.get(t);return o||(o=new Map,r.set(t,o)),o},e.prototype._getParentLayerId=function(e){return e.parentLayer.id},e.prototype.formatDebugInfo=function(){var e=["ADD","UPD",void 0,"REM"],t="";return this._dirtyGeomRecords.forEach((function(r,o){r.forEach((function(r,n){t.length>0&&(t+="\n"),t+=o+"."+n;var i=[];r.forEach((function(e){var t=e[1];i[t]||(i[t]=[]),i[t].push(e[0].geometry.id)}));for(var d=0;d<i.length;d++)if(i[d]){t+=" "+e[d-1]+": ";for(var s=0;s<i[d].length;s++)t+=i[d][s]+", "}}))})),t},e}()}));