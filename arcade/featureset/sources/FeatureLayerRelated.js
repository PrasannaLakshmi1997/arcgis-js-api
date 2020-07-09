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

define(["require","exports","tslib","../../../Graphic","../support/FeatureSet","../support/IdSet","../support/shared","../../../core/promiseUtils","../../../tasks/support/RelationshipQuery"],(function(e,t,r,i,n,a,s,l,o){return function(e){function t(t){var r=e.call(this,t)||this;return r.declaredClass="esri.arcade.featureset.sources.FeatureLayerRelated",r._findObjectId=-1,r._requestStandardised=!1,r._removeGeometry=!1,r._overrideFields=null,r.featureObjectId=null,r.relatedLayer=null,r.relationship=null,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,r._findObjectId=t.objectId,r.featureObjectId=t.objectId,r.relationship=t.relationship,r.relatedLayer=t.relatedLayer,void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return r.__extends(t,e),t.prototype._maxQueryRate=function(){return s.defaultMaxRecords},t.prototype.end=function(){return this._layer},t.prototype.optimisePagingFeatureQueries=function(){},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=l.create((function(t,r){l.all([e._layer.load(),e.relatedLayer.load()]).then((function(){e._initialiseFeatureSet(),t(e)}),r)}))),this._loadPromise},t.prototype.nativeCapabilities=function(){return this.relatedLayer.nativeCapabilities()},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this.relatedLayer.geometryType,this.fields=this.relatedLayer.fields.slice(0),null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{for(var e=[],t=[],r=0,i=this.fields;r<i.length;r++){var n=i[r];if("oid"===n.type)e.push(n),t.push(n.name);else for(var a=0,s=this._overrideFields;a<s.length;a++){if(s[a].toLowerCase()===n.name.toLowerCase()){e.push(n),t.push(n.name);break}}}this.fields=e,this._overrideFields=t}var l=this._layer.nativeCapabilities();l&&(this._databaseType=l.databaseType,this._requestStandardised=l.requestStandardised),this.objectIdField=this.relatedLayer.objectIdField,this.hasM=this.relatedLayer.supportsM,this.hasZ=this.relatedLayer.supportsZ,this.typeIdField=this.relatedLayer.typeIdField,this.types=this.relatedLayer.types},t.prototype.databaseType=function(){var e=this;return this.relatedLayer.databaseType().then((function(){return e._databaseType=e.relatedLayer._databaseType,e._databaseType}))},t.prototype.isTable=function(){return this.relatedLayer.isTable()},t.prototype._isInFeatureSet=function(){return s.IdState.InFeatureSet},t.prototype._candidateIdTransform=function(e){return e},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then((function(){return t._getFilteredSet("",null,null,null,e)})).then((function(e){return t._wset=e,e})):l.resolve(this._wset)},t.prototype._changeFeature=function(e){for(var t={},r=0,n=this.fields;r<n.length;r++){var a=n[r];t[a.name]=e.attributes[a.name]}return new i({geometry:!0===this._removeGeometry?null:e.geometry,attributes:t})},t.prototype._getFilteredSet=function(e,t,r,i,n){var s=this;return this.databaseType().then((function(){if(s.isTable()&&t&&null!==e&&""!==e)return new a([],[],!0,null);var l=s._layer.nativeCapabilities();if(!1===l.canQueryRelated)return new a([],[],!0,null);if(l.capabilities.queryRelated&&l.capabilities.queryRelated.supportsPagination)return s._getFilteredSetUsingPaging(e,t,r,i,n);var d="",u=!1;null!==i&&l.capabilities&&l.capabilities.queryRelated&&!0===l.capabilities.queryRelated.supportsOrderBy&&(d=i.constructClause(),u=!0);var p=new o;p.objectIds=[s._findObjectId];var c=null!==s._overrideFields?s._overrideFields:s._fieldsIncludingObjectId(s.relatedLayer.fields?s.relatedLayer.fields.map((function(e){return e.name})):["*"]);p.outFields=c,p.relationshipId=s.relationship.id,p.where="1=1";var f=!0;return!0===s._removeGeometry&&(f=!1),p.returnGeometry=f,s._requestStandardised&&(p.sqlFormat="standard"),p.outSpatialReference=s.spatialReference,p.orderByFields=""!==d?d.split(","):null,l.source.queryRelatedFeatures(p).then((function(i){s._checkCancelled(n);for(var l=i[s._findObjectId]?i[s._findObjectId].features:[],o=[],d=0;d<l.length;d++)s._featureCache[l[d].attributes[s._layer.objectIdField]]=l[d],o.push(l[d].attributes[s._layer.objectIdField]);var p=t&&null!==e&&""!==e,c=null!=r;return new a(p||c?o:[],p||c?[]:o,u,null)}))}))},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,i=0,n=t;i<n.length;i++){if(n[i].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFilteredSetUsingPaging=function(e,t,r,i,n){var s=this;try{var o="",d=!1,u=this._layer.nativeCapabilities();return null!==i&&u&&u.capabilities.queryRelated&&!0===u.capabilities.queryRelated.supportsOrderBy&&(o=i.constructClause(),d=!0),this.databaseType().then((function(){var i=s._maxQueryRate(),l=u.capabilities.query.maxRecordCount;void 0!==l&&l<i&&(i=l);var p,c=t&&null!==e&&""!==e,f=null!=r,y=!0;!0===s._removeGeometry&&(y=!1);var h=null!==s._overrideFields?s._overrideFields:s._fieldsIncludingObjectId(s.relatedLayer.fields?s.relatedLayer.fields.map((function(e){return e.name})):["*"]);return p=new a(c||f?["GETPAGES"]:[],c||f?[]:["GETPAGES"],d,{outFields:h.join(","),resultRecordCount:i,resultOffset:0,objectIds:[s._findObjectId],where:"1=1",orderByFields:o,returnGeometry:y,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,lastPage:0,fullyResolved:!1}}),s._expandPagedSet(p,i,0,0,n).then((function(){return p}))}))}catch(e){return l.reject(e)}},t.prototype._expandPagedSet=function(e,t,r,i,n){return this._expandPagedSetFeatureSet(e,t,r,i,n)},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,where:e.where,objectIds:e.objectIds,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,objectIds:e.objectIds,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,r){var i=this;try{var n=e.pagesDefinition.internal.lastRetrieved,a=n,s=e.pagesDefinition.internal.lastPage,d=this._layer.nativeCapabilities(),u=new o;return!0===this._requestStandardised&&(u.sqlFormat="standard"),u.relationshipId=this.relationship.id,u.objectIds=e.pagesDefinition.objectIds,u.resultOffset=e.pagesDefinition.internal.lastPage,u.resultRecordCount=e.pagesDefinition.resultRecordCount,u.outFields=e.pagesDefinition.outFields.split(","),u.where=e.pagesDefinition.where,u.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,u.returnGeometry=e.pagesDefinition.returnGeometry,u.outSpatialReference=this.spatialReference,d.source.queryRelatedFeatures(u).then((function(t){if(i._checkCancelled(r),e.pagesDefinition.internal.lastPage!==s)return 0;for(var l=t[i._findObjectId]?t[i._findObjectId].features:[],o=0;o<l.length;o++)e.pagesDefinition.internal.set[a+o]=l[o].attributes[i._layer.objectIdField];for(o=0;o<l.length;o++)i._featureCache[l[o].attributes[i._layer.objectIdField]]=l[o];var d=!t[i._findObjectId]||!1===t[i._findObjectId].exceededTransferLimit;return l.length!==e.pagesDefinition.resultRecordCount&&d&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=n+l.length,e.pagesDefinition.internal.lastPage+=e.pagesDefinition.resultRecordCount,l.length}))}catch(e){return l.reject(e)}},t.prototype._getFeatures=function(e,t,r,i){var n=this,a=[];-1!==t&&void 0===this._featureCache[t]&&a.push(t);var s=this._maxQueryRate();if(!0===this._checkIfNeedToExpandKnownPage(e,s))return this._expandPagedSet(e,s,0,0,i).then((function(){return n._getFeatures(e,t,r,i)}));for(var o=0,d=e._lastFetchedIndex;d<e._known.length&&(++o<=r&&(e._lastFetchedIndex+=1),!("GETPAGES"!==e._known[d]&&void 0===this._featureCache[e._known[d]]&&(e._known[d]!==t&&a.push(e._known[d]),a.length>r)))&&!(o>=r&&0===a.length);d++);return 0===a.length?l.resolve("success"):l.reject(new Error("Unaccounted for Features. Not in Feature Collection"))},t.prototype._refineSetBlock=function(e,t,r){return l.resolve(e)},t.prototype._stat=function(e,t,r,i,n,a,s){return l.resolve({calculated:!1})},t.prototype._canDoAggregates=function(e,t,r,i,n){return l.resolve(!1)},t.prototype.relationshipMetaData=function(){return this.relatedLayer.relationshipMetaData()},t.prototype.serviceUrl=function(){return this.relatedLayer.serviceUrl()},t.prototype.queryAttachments=function(e,t,r,i){return this.relatedLayer.queryAttachments(e,t,r,i)},t.prototype.getFeatureByObjectId=function(e,t){return this.relatedLayer.getFeatureByObjectId(e,t)},t}(n)}));