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

define(["require","exports","tslib","../request","../core/compilerUtils","../core/promiseUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/SpatialReference","../geometry/support/normalizeUtils","../layers/support/Field","../layers/support/MapImage","./Task","./support/DataFile","./support/FeatureSet","./support/GPMessage","./support/JobInfo","./support/LinearUnit","./support/ParameterValue","./support/RasterData","@dojo/framework/shim/Promise"],(function(e,t,r,a,n,o,s,u,i,c,l,p,_,f,d,v,m,h,g,b){return function(t){function _(e){var r=t.call(this,e)||this;return r._timers=new Map,r.outSpatialReference=null,r.processExtent=null,r.processSpatialReference=null,r.returnFeatureCollection=!1,r.returnM=!1,r.returnZ=!1,r}return r.__extends(_,t),_.prototype.destroy=function(){this._timers.forEach((function(e){clearInterval(e)}))},_.prototype.cancelJob=function(e,t){var n=this.parsedUrl.path,o=r.__assign(r.__assign(r.__assign({},this.requestOptions),t),{query:{f:"json"}});return this._clearTimer(e),a(n+"/jobs/"+e+"/cancel",o).then((function(e){return m.fromJSON(e.data)}))},_.prototype.checkJobStatus=function(e,t){var n=this.parsedUrl.path,o=r.__assign(r.__assign(r.__assign({},this.requestOptions),t),{query:{f:"json"}});return a(n+"/jobs/"+e,o).then((function(e){return m.fromJSON(e.data)}))},_.prototype.execute=function(e,t){var r=this;return this._constructRequest("execute",e,t).then((function(e){var t=e.data.results||[],a=e.data.messages||[];return{results:t.map(r._decode),messages:a.map((function(e){return v.fromJSON(e)}))}}))},_.prototype.getResultData=function(e,t,n){var o=this,s=this,u=s.returnFeatureCollection,i=s.returnM,c=s.returnZ,l=s.outSpatialReference,p=s.parsedUrl.path,_={returnFeatureCollection:u||void 0,returnM:i||void 0,returnZ:c||void 0,outSR:l,returnType:"data",f:"json"},f=this._gpEncode(_,null),d=r.__assign(r.__assign(r.__assign({},this.requestOptions),n),{query:f});return a(p+"/jobs/"+e+"/results/"+t,d).then((function(e){return o._decode(e.data)}))},_.prototype.getResultImage=function(e,t,n,o){var s=this,u=this.parsedUrl.path,i=r.__assign(r.__assign({},n.toJSON()),{f:"json"}),c=this._gpEncode(i),l=r.__assign(r.__assign(r.__assign({},this.requestOptions),o),{query:c});return a(u+"/jobs/"+e+"/results/"+t,l).then((function(e){return s._decode(e.data)}))},_.prototype.getResultMapImageLayer=function(t){return r.__awaiter(this,void 0,void 0,(function(){var a,n,o,s;return r.__generator(this,(function(r){switch(r.label){case 0:return a=this.parsedUrl.path,n=a.indexOf("/GPServer/"),o=a.substring(0,n),s=o+"/MapServer/jobs/"+t,[4,new Promise((function(t,r){e(["../layers/MapImageLayer"],t,r)}))];case 1:return[2,new(r.sent())({url:s})]}}))}))},_.prototype.submitJob=function(e,t){return this._constructRequest("submitJob",e,t).then((function(e){return m.fromJSON(e.data)}))},_.prototype.waitForJobCompletion=function(e,t){var r=this;void 0===t&&(t={});var a=t.interval,s=void 0===a?1e3:a,u=t.signal,i=t.statusCallback;return o.create((function(t,a){o.onAbort(u,(function(){r._clearTimer(e),a(o.createAbortError())})),r._clearTimer(e);var c=setInterval((function(){r._timers.has(e)||a(o.createAbortError()),r._getJobStatus(e,r.requestOptions).then((function(o){var s=o.jobStatus;switch(s){case"job-succeeded":r._clearTimer(e),t(o);break;case"job-submitted":case"job-executing":case"job-waiting":case"job-new":i&&i(o);break;case"job-cancelled":case"job-cancelling":case"job-deleted":case"job-deleting":case"job-timed-out":case"job-failed":r._clearTimer(e),a(o);break;default:n.neverReached(s)}}))}),s);r._timers.set(e,c)}))},_.prototype._clearTimer=function(e){this._timers.has(e)&&(clearInterval(this._timers.get(e)),this._timers.delete(e))},_.prototype._constructRequest=function(e,t,n){var o=this,s={},u={},i=[];return this._collectGeometries(t,i,s),c.normalizeCentralMeridian(i).then((function(i){var c=o,l=c.outSpatialReference,p=c.parsedUrl,_=c.processExtent,f=c.processSpatialReference,d=c.returnFeatureCollection,v=c.returnM,m=c.returnZ,h=p.path;for(var g in s){var b=s[g];u[g]=i.slice(b[0],b[1])}var y=l?l.wkid||l:null,S=f?f.wkid||f:null,G=_?{context:{extent:_,outSR:y,processSR:S}}:{"env:outSR":y,"env:processSR":S},P="execute"===e?{returnFeatureCollection:d||void 0,returnM:v||void 0,returnZ:m||void 0}:null,R=r.__assign(r.__assign(r.__assign(r.__assign({},G),t),P),{f:"json"}),J=o._gpEncode(R,null,u),O=r.__assign(r.__assign(r.__assign({},o.requestOptions),n),{query:J});return a(h+"/"+e,O)}))},_.prototype._collectGeometries=function(e,t,r){for(var a in e){var n=e[a];if(n&&"object"==typeof n&&n instanceof d){var o=n.features;r[a]=[t.length,t.length+o.length],o.forEach((function(e){t.push(e.geometry)}))}}},_.prototype._decode=function(e){var t=e.dataType,r=g.fromJSON(e);switch(t){case"GPBoolean":case"GPDouble":case"GPLong":case"GPString":return r;case"GPDate":r.value=new Date(r.value);break;case"GPDataFile":r.value=f.fromJSON(r.value);break;case"GPLinearUnit":r.value=h.fromJSON(r.value);break;case"GPFeatureRecordSetLayer":case"GPRecordSet":var a=e.value.url;r.value=a?f.fromJSON(r.value):d.fromJSON(r.value);break;case"GPRasterData":case"GPRasterDataLayer":var o=e.value.mapImage;r.value=o?p.fromJSON(o):b.fromJSON(r.value);break;case"GPField":r.value=l.fromJSON(r.value);break;case"GPMultiValue:GPBoolean":case"GPMultiValue:GPDouble":case"GPMultiValue:GPLong":case"GPMultiValue:GPString":return r;case"GPMultiValue:GPDate":var s=r.value;r.value=s.map((function(e){return new Date(e)}));break;case"GPMultiValue:GPDataFile":r.value=r.value.map((function(e){return f.fromJSON(e)}));break;case"GPMultiValue:GPLinearUnit":r.value=r.value.map((function(e){return h.fromJSON(e)}));break;case"GPMultiValue:GPFeatureRecordSetLayer":case"GPMultiValue:GPRecordSet":r.value=r.value.map((function(e){return d.fromJSON(e)}));break;case"GPMultiValue:GPRasterData":case"GPMultiValue:GPRasterDataLayer":r.value=r.value.map((function(e){return e?p.fromJSON(e):b.fromJSON(r.value)}));break;case"GPMultiValue:GPField":r.value=r.value.map((function(e){return l.fromJSON(e)}));break;default:n.neverReached(t)}return r},_.prototype._gpEncode=function(e,t,r){var a=this;for(var n in e){var o=e[n];Array.isArray(o)?e[n]=JSON.stringify(o.map((function(e){return a._gpEncode({item:e},!0).item}),this)):o instanceof Date&&(e[n]=o.getTime())}return this._encode(e,t,r)},_.prototype._getJobStatus=function(e,t){var n=this.parsedUrl.path+"/jobs/"+e,o=r.__assign(r.__assign(r.__assign({},this.requestOptions),t),{query:{f:"json"}});return a(n,o).then((function(e){return m.fromJSON(e.data)}))},r.__decorate([s.property({type:i})],_.prototype,"outSpatialReference",void 0),r.__decorate([s.property({type:u})],_.prototype,"processExtent",void 0),r.__decorate([s.property({type:i})],_.prototype,"processSpatialReference",void 0),r.__decorate([s.property({nonNullable:!0})],_.prototype,"returnFeatureCollection",void 0),r.__decorate([s.property({nonNullable:!0})],_.prototype,"returnM",void 0),r.__decorate([s.property({nonNullable:!0})],_.prototype,"returnZ",void 0),_=r.__decorate([s.subclass("esri/tasks/Geoprocessor")],_)}(_)}));