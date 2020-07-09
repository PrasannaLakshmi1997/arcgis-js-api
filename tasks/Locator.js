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

define(["require","exports","tslib","../request","../core/accessorSupport/decorators","../geometry/SpatialReference","./Task","./support/AddressCandidate"],(function(e,t,n,o,s,r,a,i){function u(e){return e?e.clone().normalize():null}function c(e){return e?e.shiftCentralMeridian():null}return function(e){function t(t){var n=e.call(this,t)||this;return n.outSpatialReference=null,n.url=null,n}return n.__extends(t,e),t.prototype.addressToLocations=function(e,t){var s=e.address,r=e.categories,a=e.countryCode,i=e.forStorage,l=e.location,d=e.locationType,p=e.magicKey,_=e.maxLocations,f=e.outFields,y=e.searchExtent,g=u(l),h=c(y),S=this.outSpatialReference,m=this.parsedUrl,R=this.requestOptions,v={f:"json",outSR:S?JSON.stringify(S.toJSON()):null,outFields:f?f.join(","):null,searchExtent:h?JSON.stringify(h.toJSON()):null,category:r?r.join(","):null,countryCode:a||null,magicKey:p||null,location:g,locationType:d||null,maxLocations:_||null,forStorage:i||null},O={query:this._encode(n.__assign(n.__assign(n.__assign({},m.query),s),v))},x=n.__assign(n.__assign(n.__assign({},R),t),O),T=m.path+"/findAddressCandidates";return o(T,x).then(this._handleAddressToLocationsResponse)},t.prototype.suggestLocations=function(e,t){var s=this.parsedUrl,r=this.requestOptions,a=e.location,i=e.searchExtent,l=u(a),d=c(i),p={f:"json",text:e.text,maxSuggestions:e.maxSuggestions,searchExtent:d?JSON.stringify(d.toJSON()):null,category:e.categories?e.categories.join(","):null,countryCode:e.countryCode||null,location:l},_={query:this._encode(n.__assign(n.__assign({},s.query),p))},f=n.__assign(n.__assign(n.__assign({},r),t),_),y=s.path+"/suggest";return o(y,f).then(this._handleSuggestLocationsResponse)},t.prototype.addressesToLocations=function(e,t){var s=this.outSpatialReference,r=this.parsedUrl,a=this.requestOptions,i=e.addresses,u=e.categories,c=e.locationType,l=e.countryCode,d=[];Array.isArray(i)&&i.forEach((function(e){d.push({attributes:e})}));var p={category:u?u.join(","):null,sourceCountry:l||null,addresses:JSON.stringify({records:d}),locationType:c||null,f:"json",outSR:s?JSON.stringify(s):null},_={query:this._encode(n.__assign(n.__assign({},r.query),p))},f=n.__assign(n.__assign(n.__assign({},a),t),_),y=r.path+"/geocodeAddresses";return o(y,f).then(this._handleAddressesToLocationsResponse)},t.prototype.locationToAddress=function(e,t){var s=e.locationType,r=u(e.location),a=void 0!==r,i=this.outSpatialReference,c=this.parsedUrl,l=this.requestOptions,d={outSR:i?JSON.stringify(i.toJSON()):null,location:a?JSON.stringify(r.toJSON()):null,locationType:s||null,f:"json"},p={query:this._encode(n.__assign(n.__assign({},c.query),d))},_=n.__assign(n.__assign(n.__assign({},l),t),p),f=c.path+"/reverseGeocode";return o(f,_).then(this._handleLocationToAddressResponse)},t.prototype._handleAddressToLocationsResponse=function(e){var t=e.data;if(!t)return[];var n=t.candidates,o=t.spatialReference;return n?n.map((function(e){if(e){var t=e.extent,n=e.location,s=!t||function(e){return e&&"number"==typeof e.xmin&&"number"==typeof e.ymin&&"number"==typeof e.xmax&&"number"==typeof e.ymax}(t);if(function(e){return e&&"number"==typeof e.x&&"number"==typeof e.y}(n)&&s)return t&&(t.spatialReference=o),n.spatialReference=o,i.fromJSON(e)}})):[]},t.prototype._handleSuggestLocationsResponse=function(e){var t=e.data;return t&&t.suggestions||[]},t.prototype._handleAddressesToLocationsResponse=function(e){var t=e.data;if(!t)return[];var n=t.locations,o=t.spatialReference;return n?n.map((function(e){var t=e.location;return t&&(t.spatialReference=o),i.fromJSON(e)})):[]},t.prototype._handleLocationToAddressResponse=function(e){var t=e.data;if(t){var n=t.address,o=t.location,s=n&&n.Match_addr||"";return i.fromJSON({address:s,attributes:n||{},location:o,score:100})}},n.__decorate([s.property({type:r})],t.prototype,"outSpatialReference",void 0),n.__decorate([s.property()],t.prototype,"url",void 0),t=n.__decorate([s.subclass("esri.tasks.Locator")],t)}(a)}));