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

define(["require","exports","tslib","../../../Graphic","../../../request","../../Attachment","../support/FeatureSet","../support/IdSet","../support/shared","../support/sqlUtils","../support/sqlUtils","../support/stats","../../../core/MD5","../../../core/promiseUtils","../../../geometry/support/jsonUtils","../../../layers/FeatureLayer","../../../layers/graphics/featureConversionUtils","../../../tasks/QueryTask","../../../tasks/operations/query","../../../tasks/support/FeatureSet","../../../tasks/support/Query","../../../tasks/support/StatisticDefinition"],(function(e,t,r,i,a,n,s,l,o,u,d,p,c,y,f,h,_,g,m,v,F,S){return function(e){function t(t){var r=e.call(this,t)||this;return r.declaredClass="esri.arcade.featureset.sources.FeatureLayerDynamic",r._removeGeometry=!1,r._overrideFields=null,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return r.__extends(t,e),t.prototype._maxQueryRate=function(){return o.defaultMaxRecords},t.prototype.end=function(){return this._layer},t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype.convertQueryToLruCacheKey=function(e){var t=o.stableStringify(e.toJSON());return c.createMD5Hash(t,c.outputTypes.String)},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=y.create((function(t,r){try{if(!0===e._layer.loaded)return e._initialiseFeatureSet(),void t(e);e._layer.when().then((function(){try{e._initialiseFeatureSet(),t(e)}catch(e){r(e)}}),r),e._layer.load()}catch(e){r(e)}}))),this._loadPromise},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0),this._layer.outFields)if(1===this._layer.outFields.length&&"*"===this._layer.outFields[0]);else{for(var e=[],t=0,r=this.fields;t<r.length;t++){if("oid"===(u=r[t]).type)e.push(u);else for(var i=0,a=this._layer.outFields;i<a.length;i++){if(a[i].toLowerCase()===u.name.toLowerCase()){e.push(u);break}}}this.fields=e}else;if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{e=[];for(var n=[],s=0,l=this.fields;s<l.length;s++){var u;if("oid"===(u=l[s]).type)e.push(u),n.push(u.name);else for(var d=0,p=this._overrideFields;d<p.length;d++){if(p[d].toLowerCase()===u.name.toLowerCase()){e.push(u),n.push(u.name);break}}}this.fields=e,this._overrideFields=n}if(this._layer.source&&this._layer.source.sourceJSON){var c=this._layer.source.sourceJSON.currentVersion;!0===this._layer.source.sourceJSON.useStandardizedQueries?(this._databaseType=o.FeatureServiceDatabaseType.StandardisedNoInterval,null!=c&&c>=10.61&&(this._databaseType=o.FeatureServiceDatabaseType.Standardised)):null!=c&&(c>=10.5&&(this._databaseType=o.FeatureServiceDatabaseType.StandardisedNoInterval,this._requestStandardised=!0),c>=10.61&&(this._databaseType=o.FeatureServiceDatabaseType.Standardised))}this.objectIdField=this._layer.objectIdField,this.hasM=this._layer.supportsM,this.hasZ=this._layer.supportsZ,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(){return o.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e){return y.resolve(e)},t.prototype._candidateIdTransform=function(e){return e},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then((function(){return t._getFilteredSet("",null,null,null,e)})).then((function(e){return t._wset=e,e})):y.resolve(this._wset)},t.prototype._runDatabaseProbe=function(e){var t=this;return y.create((function(r,i){try{t._ensureLoaded().then((function(){try{var a=new F;a.where=e.replace("OBJECTID",t._layer.objectIdField),t._layer.queryObjectIds(a).then((function(){r(!0)}),(function(){try{r(!1)}catch(e){i(e)}}))}catch(e){i(e)}}))}catch(e){i(e)}}))},t.prototype._canUsePagination=function(){return!(!this._layer.capabilities||!this._layer.capabilities.query||!0!==this._layer.capabilities.query.supportsPagination)},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype.pbfSupportedForQuery=function(e){return!e.outStatistics&&this._layer&&this._layer.capabilities&&this._layer.capabilities.query&&!0===this._layer.capabilities.query.supportsFormatPBF&&!0===this._layer.capabilities.query.supportsQuantizationEditMode},t.prototype.queryPBF=function(e){return e.quantizationParameters={mode:"edit"},m.executeQueryPBF(this._layer.parsedUrl,e,{type:"optimized"}).then((function(e){return v.fromJSON(_.convertToFeatureSet(e.data)).unquantize()}))},t.prototype.nativeCapabilities=function(){return{title:this._layer.title,source:this,canQueryRelated:!0,capabilities:this._layer.capabilities,databaseType:this._databaseType,requestStandardised:this._requestStandardised}},t.prototype.executeQuery=function(e,t){var r=this,i=new g({url:this._layer.parsedUrl.path}),a="execute"===t&&this.pbfSupportedForQuery(e),n=null;if(this.recentlyUsedQueries){var s=this.convertQueryToLruCacheKey(e);null===(n=this.recentlyUsedQueries.getFromCache(s))&&(n=!0!==a?i[t](e):this.queryPBF(e),this.recentlyUsedQueries.addToCache(s,n),n=n.catch((function(e){throw r.recentlyUsedQueries.removeFromCache(s),e})))}return null===n&&(n=!0!==a?i[t](e):this.queryPBF(e)),n},t.prototype._getFilteredSet=function(e,t,r,i,a){var n=this;return this.databaseType().then((function(s){if(n.isTable()&&t&&null!==e&&""!==e)return new l([],[],!0,null);if(n._canUsePagination())return n._getFilteredSetUsingPaging(e,t,r,i,a);var o="",d=!1;null!==i&&n._layer.capabilities&&n._layer.capabilities.query&&!0===n._layer.capabilities.query.supportsOrderBy&&(o=i.constructClause(),d=!0);var p=new F;return p.where=null===r?null===t?"1=1":"":u.toWhereClause(r,s),n._requestStandardised&&(p.sqlFormat="standard"),p.spatialRelationship=n._makeRelationshipEnum(e),p.outSpatialReference=n.spatialReference,p.orderByFields=""!==o?o.split(","):null,p.geometry=null===t?null:t,p.relationParameter=n._makeRelationshipParam(e),n.executeQuery(p,"executeForIds").then((function(e){return null===e&&(e=[]),n._checkCancelled(a),new l([],e,d,null)}))}))},t.prototype._expandPagedSet=function(e,t,r,i,a){return this._expandPagedSetFeatureSet(e,t,r,i,a)},t.prototype._getFilteredSetUsingPaging=function(e,t,r,i,a){var n=this;try{var s="",o=!1;return null!==i&&this._layer.capabilities&&this._layer.capabilities.query&&!0===this._layer.capabilities.query.supportsOrderBy&&(s=i.constructClause(),o=!0),this.databaseType().then((function(i){var d=null===r?null===t?"1=1":"":u.toWhereClause(r,i);n._layer.definitionExpression&&(d=""!==d?"(("+n._layer.definitionExpression+") AND ("+d+"))":n._layer.definitionExpression);var p=n._maxQueryRate(),c=n._layer.capabilities.query.maxRecordCount;void 0!==c&&c<p&&(p=c);var y=null;if(!0===n._pageJustIds)y=new l([],["GETPAGES"],o,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:n._layer.objectIdField,resultRecordCount:p,resultOffset:0,geometry:null===t?null:t,where:d,orderByFields:s,returnGeometry:!1,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,lastPage:0,fullyResolved:!1}});else{var f=!0;!0===n._removeGeometry&&(f=!1);var h=null!==n._overrideFields?n._overrideFields:n._fieldsIncludingObjectId(n._layer.outFields?n._layer.outFields:["*"]);y=new l([],["GETPAGES"],o,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:h.join(","),resultRecordCount:p,resultOffset:0,geometry:null===t?null:t,where:d,orderByFields:s,returnGeometry:f,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,lastPage:0,fullyResolved:!1}})}return n._expandPagedSet(y,p,0,1,a).then((function(){return y}))}))}catch(e){return y.reject(e)}},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,r){var i=this;try{var a=e.pagesDefinition.internal.lastRetrieved,n=a,s=e.pagesDefinition.internal.lastPage,l=new F;return this._requestStandardised&&(l.sqlFormat="standard"),l.spatialRelationship=e.pagesDefinition.spatialRel,l.relationParameter=e.pagesDefinition.relationParam,l.outFields=e.pagesDefinition.outFields.split(","),l.num=e.pagesDefinition.resultRecordCount,l.start=e.pagesDefinition.internal.lastPage,l.geometry=e.pagesDefinition.geometry,l.where=e.pagesDefinition.where,l.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,l.returnGeometry=e.pagesDefinition.returnGeometry,l.outSpatialReference=this.spatialReference,this.executeQuery(l,"execute").then((function(t){if(i._checkCancelled(r),e.pagesDefinition.internal.lastPage!==s)return"done";for(var l=0;l<t.features.length;l++)e.pagesDefinition.internal.set[n+l]=t.features[l].attributes[i._layer.objectIdField];if(!1===i._pageJustIds)for(l=0;l<t.features.length;l++)i._featureCache[t.features[l].attributes[i._layer.objectIdField]]=t.features[l];return(void 0===t.exceededTransferLimit&&t.features.length!==e.pagesDefinition.resultRecordCount||!1===t.exceededTransferLimit)&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=a+t.features.length,e.pagesDefinition.internal.lastPage+=e.pagesDefinition.resultRecordCount,"done"}))}catch(e){return y.reject(e)}},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,i=0,a=t;i<a.length;i++){if(a[i].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,r,i){var a=this,n=[];try{if(-1!==t&&void 0===this._featureCache[t]&&n.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate()))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,i).then((function(){return a._getFeatures(e,t,r,i)}));for(var s=0,l=e._lastFetchedIndex;l<e._known.length;l++){if(e._lastFetchedIndex+=1,s++,void 0===this._featureCache[e._known[l]]){var o=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var u=this._layer._mode;if(void 0!==u._featureMap[e._known[l]]){var d=u._featureMap[e._known[l]];null!==d&&(o=!0,this._featureCache[e._known[l]]=d)}}if(!1===o&&(e._known[l]!==t&&n.push(e._known[l]),n.length>=this._maxProcessingRate()-1))break}if(s>=r&&0===n.length)break}if(0===n.length)return y.resolve("success");try{var p=new F;return this._requestStandardised&&(p.sqlFormat="standard"),p.objectIds=n,p.outFields=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this._layer.outFields?this._layer.outFields:["*"]),p.returnGeometry=!0,!0===this._removeGeometry&&(p.returnGeometry=!1),p.outSpatialReference=this.spatialReference,this.executeQuery(p,"execute").then((function(e){if(a._checkCancelled(i),void 0!==e.error)return y.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)a._featureCache[e.features[t].attributes[a._layer.objectIdField]]=e.features[t];return"success"}))}catch(e){return y.reject(e)}}catch(e){return y.reject(e)}},t.prototype._getDistinctPages=function(e,t,r,i,a,n,s,l,o){var d=this;return this._ensureLoaded().then((function(){return d.databaseType()})).then((function(p){for(var c=r.parseTree.column,f=0;f<d._layer.fields.length;f++)if(d._layer.fields[f].name.toLowerCase()===c.toLowerCase()){c=d._layer.fields[f].name;break}var h=new F;d._requestStandardised&&(h.sqlFormat="standard");var _=null===n?null===a?"1=1":"":u.toWhereClause(n,p);return d._layer.definitionExpression&&(_=""!==_?"(("+d._layer.definitionExpression+") AND ("+_+"))":d._layer.definitionExpression),h.where=_,h.spatialRelationship=d._makeRelationshipEnum(i),h.relationParameter=d._makeRelationshipParam(i),h.geometry=null===a?null:a,h.returnDistinctValues=!0,h.returnGeometry=!1,h.outFields=[c],d.executeQuery(h,"execute").then((function(u){if(d._checkCancelled(o),!u.hasOwnProperty("features"))return y.reject(new Error("Unnexected Result querying statistics from layer"));for(var p=!1,f=0;f<d._layer.fields.length;f++)if(d._layer.fields[f].name===c){"date"===d._layer.fields[f].type&&(p=!0);break}for(f=0;f<u.features.length;f++){if(p){var h=u.features[f].attributes[c];null!==h?l.push(new Date(h)):l.push(h)}else l.push(u.features[f].attributes[c]);if(l.length>=s)break}return 0===u.features.length?l:u.features.length===d._layer.capabilities.query.maxRecordCount&&l.length<s?d._getDistinctPages(e+u.features.length,t,r,i,a,n,s,l,o).then((function(e){return{calculated:!0,result:e}})):l}))}))},t.prototype._distinctStat=function(e,t,r,i,a,n,s){return this._getDistinctPages(0,e,t,r,i,a,n,[],s).then((function(e){return{calculated:!0,result:e}}))},t.prototype.isTable=function(){return this._layer.isTable||null===this._layer.geometryType||"table"===this._layer.type||""===this._layer.geometryType},t.prototype._countstat=function(e,t,r,i){var a=this;return this.databaseType().then((function(e){var n=new F;if(a._requestStandardised&&(n.sqlFormat="standard"),a.isTable()&&r&&null!==t&&""!==t)return{calculated:!0,result:0};var s=null===i?null===r?"1=1":"":u.toWhereClause(i,e);return a._layer.definitionExpression&&(s=""!==s?"(("+a._layer.definitionExpression+") AND ("+s+"))":a._layer.definitionExpression),n.where=s,n.where=s,n.spatialRelationship=a._makeRelationshipEnum(t),n.relationParameter=a._makeRelationshipParam(t),n.geometry=null===r?null:r,n.returnGeometry=!1,a.executeQuery(n,"executeForCount").then((function(e){return{calculated:!0,result:e}}))}))},t.prototype._stats=function(e,t,r,i,a,n,s){var l=this;return this._ensureLoaded().then((function(){var o=l._layer.capabilities&&l._layer.capabilities.query&&!0===l._layer.capabilities.query.supportsSqlExpression,c=l._layer.capabilities&&l._layer.capabilities.query&&!0===l._layer.capabilities.query.supportsStatistics,f=l._layer.capabilities&&l._layer.capabilities.query&&!0===l._layer.capabilities.query.supportsDistinct;return"count"===e?f?l._countstat(e,r,i,a):{calculated:!1}:!1===c||!1===d.isSingleField(t)&&!1===o||!1===t.isStandardized?""!==r||null!==a?{calculated:!1}:l._manualStat(e,t,n,s):"distinct"===e?!1===f?""!==r||null!==a?{calculated:!1}:l._manualStat(e,t,n,s):l._distinctStat(e,t,r,i,a,n,s):l.databaseType().then((function(n){if(l.isTable()&&i&&null!==r&&""!==r)return{calculated:!0,result:null};var s=new F;l._requestStandardised&&(s.sqlFormat="standard");var o=null===a?null===i?"1=1":"":u.toWhereClause(a,n);l._layer.definitionExpression&&(o=""!==o?"(("+l._layer.definitionExpression+") AND ("+o+"))":l._layer.definitionExpression),s.where=o,s.spatialRelationship=l._makeRelationshipEnum(r),s.relationParameter=l._makeRelationshipParam(r),s.geometry=null===i?null:i;var d=new S;d.statisticType=p.decodeStatType(e),d.onStatisticField=u.toWhereClause(t,n),d.outStatisticFieldName="ARCADE_STAT_RESULT",s.returnGeometry=!1;var c="ARCADE_STAT_RESULT";return s.outStatistics=[d],l.executeQuery(s,"execute").then((function(e){if(!e.hasOwnProperty("features")||0===e.features.length)return y.reject(new Error("Unnexected Result querying statistics from layer"));for(var t=!1,r=0;r<e.fields.length;r++)if("ARCADE_STAT_RESULT"===e.fields[r].name.toUpperCase()){c=e.fields[r].name,"date"===e.fields[r].type&&(t=!0);break}if(t){var i=e.features[0].attributes[c];return null!==i&&(i=new Date(e.features[0].attributes[c])),{calculated:!0,result:i}}return{calculated:!0,result:e.features[0].attributes[c]}}))}))}))},t.prototype._stat=function(e,t,r,i,a,n,s){return this._stats(e,t,r,i,a,n,s)},t.prototype._canDoAggregates=function(e,t){var r=this;return this._ensureLoaded().then((function(){var e=!1,i=r._layer.capabilities&&r._layer.capabilities.query&&!0===r._layer.capabilities.query.supportsSqlExpression;if(void 0!==r._layer.capabilities&&null!==r._layer.capabilities.query&&!0===r._layer.capabilities.query.supportsStatistics&&!0===r._layer.capabilities.query.supportsOrderBy&&(e=!0),e)for(var a=0;a<t.length-1;a++)null!==t[a].workingexpr&&(!1===t[a].workingexpr.isStandardized?e=!1:!1===d.isSingleField(t[a].workingexpr)&&!1===i&&(e=!1));return!1!==e}))},t.prototype._makeRelationshipEnum=function(e){if(e.indexOf("esriSpatialRelRelation")>=0)return"relation";switch(e){case"esriSpatialRelRelation":return"relation";case"esriSpatialRelIntersects":return"intersects";case"esriSpatialRelContains":return"contains";case"esriSpatialRelOverlaps":return"overlaps";case"esriSpatialRelWithin":return"within";case"esriSpatialRelTouches":return"touches";case"esriSpatialRelCrosses":return"crosses";case"esriSpatialRelEnvelopeIntersects":return"envelope-intersects"}return e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,i,a,n,s){var o=this;return this._ensureLoaded().then((function(){return o.databaseType()})).then((function(d){var p="",c=!1,y=!1;null!==n&&o._layer.capabilities&&o._layer.capabilities.query&&!0===o._layer.capabilities.query.supportsOrderBy&&(p=n.constructClause(),y=!0),o._layer.capabilities&&o._layer.capabilities.query&&!1===o._layer.capabilities.query.supportsPagination&&(y=!1,c=!0,p=o._layer.objectIdField);for(var f=[],h=0;h<t.length;h++){var _=new S;_.onStatisticField=null!==t[h].workingexpr?u.toWhereClause(t[h].workingexpr,d):"",_.outStatisticFieldName=t[h].field,_.statisticType=t[h].toStatisticsName(),f.push(_)}""===p&&(p=e.join(","));var g=o._maxQueryRate(),m=o._layer.capabilities.query.maxRecordCount;void 0!==m&&m<g&&(g=m);var v=null===a?null===i?"1=1":"":u.toWhereClause(a,d);return o._layer.definitionExpression&&(v=""!==v?"(("+o._layer.definitionExpression+") AND ("+v+"))":o._layer.definitionExpression),new l([],["GETPAGES"],y,{groupbypage:!0,spatialRel:o._makeRelationshipEnum(r),relationParam:o._makeRelationshipParam(r),outFields:["*"],useOIDpagination:c,generatedOid:s,resultRecordCount:g,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:f,geometry:null===i?null:i,where:v,orderByFields:p,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,lastPage:0,fullyResolved:!1}})}))},t.prototype._getAgregagtePhysicalPage=function(e,t,r){var a=this;try{var n=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(n=""!==n?"("+n+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var s=e.pagesDefinition.internal.lastRetrieved,l=s,o=e.pagesDefinition.internal.lastPage,u=new F;return this._requestStandardised&&(u.sqlFormat="standard"),u.where=n,u.spatialRelationship=e.pagesDefinition.spatialRel,u.relationParameter=e.pagesDefinition.relationParam,u.outFields=e.pagesDefinition.outFields,u.outStatistics=e.pagesDefinition.outStatistics,u.geometry=e.pagesDefinition.geometry,u.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,u.num=e.pagesDefinition.resultRecordCount,u.start=e.pagesDefinition.internal.lastPage,u.returnGeometry=e.pagesDefinition.returnGeometry,u.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&u.geometry&&u.spatialRelationship?y.resolve([]):this.executeQuery(u,"execute").then((function(t){if(a._checkCancelled(r),!t.hasOwnProperty("features"))return y.reject(new Error("Unnexected Result querying aggregates from layer"));var n=[];if(e.pagesDefinition.internal.lastPage!==o)return[];for(var u=0;u<t.features.length;u++)e.pagesDefinition.internal.set[l+u]=t.features[u].attributes[e.pagesDefinition.generatedOid];for(u=0;u<t.features.length;u++)n.push(new i({attributes:t.features[u].attributes,geometry:null}));return!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:(void 0===t.exceededTransferLimit&&t.features.length!==e.pagesDefinition.resultRecordCount||!1===t.exceededTransferLimit)&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=s+t.features.length,e.pagesDefinition.internal.lastPage+=e.pagesDefinition.resultRecordCount,n}))}catch(e){return y.reject(e)}},t.create=function(e,r,i,a){return new t({layer:new h({url:e,outFields:null===r?["*"]:r}),spatialReference:i,lrucache:a})},t.prototype.relationshipMetaData=function(){return this._layer&&this._layer.source&&this._layer.source.sourceJSON&&this._layer.source.sourceJSON.relationships?this._layer.source.sourceJSON.relationships:[]},t.prototype.serviceUrl=function(){return o.extractServiceUrl(this._layer.parsedUrl.path)},t.prototype.queryAttachments=function(e,t,r,i){var a=this;if(this._layer.capabilities.data.supportsAttachment&&this._layer.capabilities.operations.supportsQueryAttachments){var s={objectIds:[e]};return(t&&t>0||r&&r>0)&&(s.size=[t&&t>0?t:0,r&&r>0?r:t+1]),i&&i.length>0&&(s.attachmentTypes=i),this._layer.queryAttachments(s).then((function(t){var r=[];return t&&t[e]&&t[e].forEach((function(t){var i=a._layer.parsedUrl.path+"/"+e.toString()+"/attachments/"+t.id.toString();r.push(new n(t.id,t.name,t.contentType,t.size,i))})),r}))}return y.resolve([])},t.prototype.queryRelatedFeatures=function(e){var t={f:"json",relationshipId:e.relationshipId.toString(),definitionExpression:e.where,outFields:e.outFields.join(","),returnGeometry:e.returnGeometry.toString()};return void 0!==e.resultOffset&&null!==e.resultOffset&&(t.resultOffset=e.resultOffset.toString()),void 0!==e.resultRecordCount&&null!==e.resultRecordCount&&(t.resultRecordCount=e.resultRecordCount.toString()),e.orderByFields&&(t.orderByFields=e.orderByFields.join(",")),e.objectIds.length>0&&(t.objectIds=e.objectIds.join(",")),e.outSpatialReference&&(t.outSR=JSON.stringify(e.outSpatialReference.toJSON())),a(this._layer.parsedUrl.path+"/queryRelatedRecords",{responseType:"json",query:t}).then((function(e){if(e.data){var t={},r=e.data;if(r&&r.relatedRecordGroups)for(var a=r.spatialReference,n=0,s=r.relatedRecordGroups;n<s.length;n++){for(var l=s[n],o=l.objectId,u=[],d=0,p=l.relatedRecords;d<p.length;d++){var c=p[d];c.geometry&&(c.geometry.spatialReference=a);var h=new i({geometry:c.geometry?f.fromJSON(c.geometry):null,attributes:c.attributes});u.push(h)}t[o]={features:u,exceededTransferLimit:!0===r.exceededTransferLimit}}return t}return y.reject("Invalid Request")}))},t.prototype.getFeatureByObjectId=function(e,t){var r=new g({url:this._layer.parsedUrl.path}),i=new F;return i.outFields=t,i.returnGeometry=!1,i.outSpatialReference=this.spatialReference,i.where=this.objectIdField+"="+e.toString(),r.execute(i).then((function(e){return 1===e.features.length?e.features[0]:null}))},t}(s)}));