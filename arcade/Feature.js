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

define(["require","exports","tslib","./Dictionary","./ImmutableArray","./languageUtils","../geometry/Geometry","../geometry/Point","../geometry/support/jsonUtils","./featureset/support/shared","../layers/graphics/featureConversionUtils","../core/maybe"],(function(t,e,i,r,s,a,n,o,l,u,f,y){return function(){function t(){this.declaredClass="esri.arcade.Feature",this._optimizedGeomDefinition=null,this._geometry=null,this.attributes=null,this._layer=null,this._datesfixed=!0,this.immutable=!0,this._datefields=null,this.immutable=!0}return t.createFromGraphic=function(e){var i=new t;return i._geometry=y.isSome(e.geometry)?e.geometry:null,void 0===e.attributes?i.attributes={}:null===e.attributes?i.attributes={}:i.attributes=e.attributes,e._sourceLayer?(i._layer=e._sourceLayer,i._datesfixed=!1):e._layer?(i._layer=e._layer,i._datesfixed=!1):e.layer?(i._layer=e.layer,i._datesfixed=!1):e.sourceLayer&&(i._layer=e.sourceLayer,i._datesfixed=!1),i},t.createFromArcadeFeature=function(e){var i=new t;return i._datesfixed=e._datesfixed,i.attributes=e.attributes,i._geometry=e._geometry,i._optimizedGeomDefinition=e._optimizedGeomDefinition,e._layer&&(i._layer=e._layer),i},t.createFromOptimisedFeature=function(e,i,r){var s=new t;return s._geometry=e.geometry?{geometry:e.geometry}:null,s._optimizedGeomDefinition=r,s.attributes=e.attributes||{},s._layer=i,s._datesfixed=!1,s},t.createFromArcadeDictionary=function(e){var i=new t;return i.attributes=e.field("attributes"),null!==i.attributes&&i.attributes instanceof r?(i.attributes=i.attributes.attributes,null===i.attributes&&(i.attributes={})):i.attributes={},i._geometry=e.field("geometry"),null!==i._geometry&&(i._geometry instanceof r?i._geometry=t.parseGeometryFromDictionary(i._geometry):i._geometry instanceof n||(i._geometry=null)),i},t.createFromGraphicLikeObject=function(e,i,r){void 0===r&&(r=null);var s=new t;return null===i&&(i={}),s.attributes=i,s._geometry=y.isSome(e)?e:null,s._layer=r,s._layer&&(s._datesfixed=!1),s},t.prototype.repurposeFromGraphicLikeObject=function(t,e,i){void 0===i&&(i=null),null===e&&(e={}),this.attributes=e,this._geometry=t||null,this._layer=i,this._layer?this._datesfixed=!1:this._datesfixed=!0},t.prototype.castToText=function(){var t="";for(var e in!1===this._datesfixed&&this._fixDates(),this.attributes){""!==t&&(t+=",");var i=this.attributes[e];null==i?t+=JSON.stringify(e)+":null":a.isBoolean(i)||a.isNumber(i)||a.isString(i)?t+=JSON.stringify(e)+":"+JSON.stringify(i):i instanceof n?t+=JSON.stringify(e)+":"+a.toStringExplicit(i):i instanceof s?t+=JSON.stringify(e)+":"+a.toStringExplicit(i):i instanceof Array?t+=JSON.stringify(e)+":"+a.toStringExplicit(i):i instanceof Date?t+=JSON.stringify(e)+":"+JSON.stringify(i):null!==i&&"object"==typeof i&&void 0!==i.castToText&&(t+=JSON.stringify(e)+":"+i.castToText())}return'{"geometry":'+(null===this.geometry()?"null":a.toStringExplicit(this.geometry()))+',"attributes":{'+t+"}}"},t.prototype._fixDates=function(){if(null!==this._datefields)return this._datefields.length>0&&this._fixDateFields(this._datefields),void(this._datesfixed=!0);for(var t=[],e=0;e<this._layer.fields.length;e++){var i=this._layer.fields[e];"date"!==i.type&&"esriFieldTypeDate"!==i.type||t.push(i.name)}this._datefields=t,t.length>0&&this._fixDateFields(t),this._datesfixed=!0},t.prototype._fixDateFields=function(t){this.attributes=i.__assign({},this.attributes);for(var e=0;e<t.length;e++){var r=this.attributes[t[e]];if(null===r);else if(void 0===r){for(var s in this.attributes)if(s.toLowerCase()===t[e].toLowerCase()){null!==(r=this.attributes[s])&&(r instanceof Date||(this.attributes[s]=new Date(r)));break}}else r instanceof Date||(this.attributes[t[e]]=new Date(r))}},t.prototype.geometry=function(){return null===this._geometry?this._geometry:this._geometry instanceof n?this._geometry:(this._optimizedGeomDefinition?(this._geometry=y.unwrap(l.fromJSON(f.convertToGeometry(this._geometry,this._optimizedGeomDefinition.geometryType,this._optimizedGeomDefinition.hasZ,this._optimizedGeomDefinition.hasM))),this._geometry.spatialReference=this._optimizedGeomDefinition.spatialReference):this._geometry=y.unwrap(l.fromJSON(this._geometry)),this._geometry)},t.prototype.field=function(t){!1===this._datesfixed&&this._fixDates();var e=this.attributes[t];if(void 0!==e)return e;var i=t.toLowerCase();for(var r in this.attributes)if(r.toLowerCase()===i)return this.attributes[r];if(this._hasFieldDefinition(i))return null;throw new Error("Field not Found")},t.prototype._hasFieldDefinition=function(t){if(null===this._layer)return!1;for(var e=0;e<this._layer.fields.length;e++){if(this._layer.fields[e].name.toLowerCase()===t)return!0}return!1},t.prototype._field=function(t){!1===this._datesfixed&&this._fixDates();var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var r in this.attributes)if(r.toLowerCase()===e)return this.attributes[r];return null},t.prototype.setField=function(t,e){if(this.immutable)throw new Error("Feature is Immutable");if(!1===a.isSimpleType(e))throw new Error("Illegal Value Assignment to Feature");var i=t.toLowerCase();if(void 0===this.attributes[t]){for(var r in this.attributes)if(r.toLowerCase()===i)return void(this.attributes[r]=e);this.attributes[t]=e}else this.attributes[t]=e},t.prototype.hasField=function(t){var e=t.toLowerCase();if(void 0!==this.attributes[t])return!0;for(var i in this.attributes)if(i.toLowerCase()===e)return!0;return!!this._hasFieldDefinition(e)},t.prototype.keys=function(){var t=[],e={};for(var i in this.attributes)t.push(i),e[i.toLowerCase()]=1;if(null!==this._layer)for(var r=0;r<this._layer.fields.length;r++){var s=this._layer.fields[r];1!==e[s.name.toLowerCase()]&&t.push(s.name)}return t=t.sort()},t.parseGeometryFromDictionary=function(e){var i=t.convertDictionaryToJson(e,!0);return void 0!==i.spatialreference&&(i.spatialReference=i.spatialreference,delete i.spatialreference),void 0!==i.rings&&(i.rings=this.fixPathArrays(i.rings,!0===i.hasZ,!0===i.hasM)),void 0!==i.paths&&(i.paths=this.fixPathArrays(i.paths,!0===i.hasZ,!0===i.hasM)),void 0!==i.points&&(i.points=this.fixPointArrays(i.points,!0===i.hasZ,!0===i.hasM)),l.fromJSON(i)},t.fixPathArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var a=0;a<t.length;a++)r.push(this.fixPointArrays(t[a],e,i));else if(t instanceof s)for(a=0;a<t.length();a++)r.push(this.fixPointArrays(t.get(a),e,i));return r},t.fixPointArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var a=0;a<t.length;a++){(n=t[a])instanceof o?e&&i?r.push([n.x,n.y,n.z,n.m]):e?r.push([n.x,n.y,n.z]):i?r.push([n.x,n.y,n.m]):r.push([n.x,n.y]):n instanceof s?r.push(n.toArray()):r.push(n)}else if(t instanceof s)for(a=0;a<t.length();a++){var n;(n=t.get(a))instanceof o?e&&i?r.push([n.x,n.y,n.z,n.m]):e?r.push([n.x,n.y,n.z]):i?r.push([n.x,n.y,n.m]):r.push([n.x,n.y]):n instanceof s?r.push(n.toArray()):r.push(n)}return r},t.convertDictionaryToJson=function(e,i){void 0===i&&(i=!1);var s={};for(var a in e.attributes){var n=e.attributes[a];n instanceof r&&(n=t.convertDictionaryToJson(n)),i?s[a.toLowerCase()]=n:s[a]=n}return s},t.parseAttributesFromDictionary=function(t){var e={};for(var i in t.attributes){var r=t.attributes[i];if(!a.isSimpleType(r))throw new Error("Illegal Argument");e[i]=r}return e},t.fromJson=function(e){var i=null;null!==e.geometry&&void 0!==e.geometry&&(i=l.fromJSON(e.geometry));var r={};if(null!==e.attributes&&void 0!==e.attributes)for(var s in e.attributes){var n=e.attributes[s];if(null===n)r[s]=n;else{if(!(a.isString(n)||a.isNumber(n)||a.isBoolean(n)||a.isDate(n)))throw new Error("Illegal Argument");r[s]=n}}return t.createFromGraphicLikeObject(i,r,null)},t.prototype.fullDomain=function(t,e){return null===this._layer?null:this._layer.fields?a.getDomain(t,this._layer,this,e):null},t.prototype.subtypes=function(){return null===this._layer?null:this._layer.fields&&this._layer.typeIdField?{subtypeField:this._layer.typeIdField,subtypes:this._layer.types?this._layer.types.map((function(t){return{name:t.name,code:t.id}})):[]}:null},t.prototype.domainValueLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=a.getDomain(t,this._layer,this,i);if(void 0===e)try{e=this.field(t)}catch(t){return null}return a.getDomainValue(r,e)},t.prototype.domainCodeLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;if(void 0===e){try{e=this.field(t)}catch(t){return null}return e}var r=a.getDomain(t,this._layer,this,i);return a.getDomainCode(r,e)},t.prototype.schema=function(){if(null===this._layer)return null;if(!this._layer.fields)return null;for(var t=[],e=0,i=this._layer.fields;e<i.length;e++){var r=i[e];t.push(u.esriFieldToJson(r))}return{objectIdField:this._layer.objectIdField,typeIdField:this._layer.typeIdField,geometryType:void 0===u.layerGeometryEsriRestConstants[this._layer.geometryType]?"":u.layerGeometryEsriRestConstants[this._layer.geometryType],hasZ:!0===this._layer.hasZ,hasM:!0===this._layer.hasM,fields:t}},t}()}));