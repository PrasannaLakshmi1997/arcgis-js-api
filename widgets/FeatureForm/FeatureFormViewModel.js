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

define(["require","exports","tslib","../../intl","../../core/arrayUtils","../../core/Evented","../../core/HandleOwner","../../core/lang","../../core/Logger","../../core/ReentrantObjectPool","../../core/watchUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/decorators/cast","../../form/FormTemplate","../../support/arcadeOnDemand","./FieldConfig","./FieldGroupConfig","./InputField","./InputFieldGroup","./support/formTemplateUtils"],(function(e,t,r,n,i,o,a,l,u,s,p,d,f,c,y,h,_,g,m,v){function b(e){return!!e.inputFields}function F(e){return!!e.fieldConfig}var O="esri.widgets.FeatureForm.FeatureFormViewModel",C=u.getLogger(O);return function(e){function t(t){var r=e.call(this,t)||this;return r._arcade=null,r._fieldPool=new s.ReentrantObjectPool(g),r._fieldGroupPool=new s.ReentrantObjectPool(m),r._featureClone=null,r._needsArcade=!1,r.messages=null,r.strict=!1,r}return r.__extends(t,e),t.prototype.initialize=function(){var e=this,t=function(){return r.__awaiter(e,void 0,void 0,(function(){var e;return r.__generator(this,(function(t){switch(t.label){case 0:return e=this,[4,n.loadMessageBundle("esri/widgets/FeatureForm/t9n/FeatureForm")];case 1:return[2,e.messages=t.sent()]}}))}))};t(),this.handles.add(n.onLocaleChange(t));var i=p.init(this,"fieldConfig",(function(t){return r.__awaiter(e,void 0,void 0,(function(){var e,n,o,a,l;return r.__generator(this,(function(r){switch(r.label){case 0:return e=[],t&&t.forEach((function(t){e.push(t.visibilityExpression),F(t)?t.fieldConfig.forEach((function(t){var r=t.visibilityExpression;e.push(r)})):e.push(t.requiredExpression)})),n=e.filter((function(e){return!!e})),(o=n.length>0)?[4,y.loadArcade()]:[3,4];case 1:return a=r.sent(),l=a.arcadeUtils,n.some((function(e){return l.hasGeometryOperations(e)}))?[4,l.enableGeometryOperations()]:[3,3];case 2:r.sent(),i.remove(),r.label=3;case 3:this._arcade=a,this.notifyChange("inputFields"),r.label=4;case 4:return this._needsArcade=o,[2]}}))}))}));this.handles.add(i)},t.prototype.destroy=function(){this.fieldConfig=null,this.feature=null,this.layer=null,this._fieldPool.destroy(),this._fieldGroupPool.destroy()},Object.defineProperty(t.prototype,"_allInputFields",{get:function(){return this.inputFields.reduce((function(e,t){return b(t)?r.__spreadArrays(e,t.inputFields):r.__spreadArrays(e,[t])}),[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_inputFieldCache",{get:function(){var e=this,t=this._get("_inputFieldCache")||new Map;return t.forEach((function(t){return e._disposeInputOrGroup(t)})),t.clear(),(this.get("layer.fields")||[]).forEach((function(r){return t.set(r,e._fieldPool.acquire())})),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_inputFieldGroupCache",{get:function(){var e=this,t=this._get("_inputFieldGroupCache")||new Map;return t.forEach((function(t){return e._disposeInputOrGroup(t)})),t.clear(),(this.fieldConfig||[]).filter(F).forEach((function(r){return t.set(r,e._fieldGroupPool.acquire())})),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"description",{get:function(){var e;return null===(e=this.formTemplate)||void 0===e?void 0:e.description},set:function(e){void 0===e?this._clearOverride("description"):this._override("description",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"feature",{get:function(){return this._get("feature")},set:function(e){this._featureClone=e?e.clone():null,this._set("feature",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fieldConfig",{get:function(){var e=this.formTemplate;if(!e)return null;var t=v.fieldConfigsFromFormTemplate(e),r=t.config,n=t.encounteredUnsupportedTypes;return n.length>0&&C.warn("form-info::unsupported-type","encountered unsupported elements/types when parsing form info",n),r},set:function(e){e?this._override("fieldConfig",e):this._clearOverride("fieldConfig")},enumerable:!0,configurable:!0}),t.prototype.castFieldConfig=function(e){return e?e.map((function(e){return e instanceof h||e instanceof _?e:F(e)?new _(e):new h(e)})):null},Object.defineProperty(t.prototype,"formTemplate",{get:function(){var e;return null===(e=this.layer)||void 0===e?void 0:e.formTemplate},set:function(e){void 0===e?this._clearOverride("formTemplate"):this._override("formTemplate",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inputFields",{get:function(){var e=this,t=this,r=t._arcade,n=t._inputFieldCache,o=t._inputFieldGroupCache,a=t._featureClone,l=t.messages,u=t._needsArcade,s=t.layer,p=t.state,d=a&&a.clone();if("ready"!==p||u&&!r)return[];var f=this.get("layer.fields")||[],c=this.fieldConfig||[];return(0!==c.length?c.map((function(t){if(F(t)){var a=o.get(t),u=t.fieldConfig.map((function(t){var o=i.find(f,(function(e){return e.name===t.name})),u=n.get(o);return u.set({arcade:r,field:o,config:t,feature:d,group:a,layer:s,messages:l,value:e.getValue(o.name)}),u})).filter((function(e){return e.visible}));return a.set({arcade:r,config:t,feature:d,inputFields:u}),a}var p=i.find(f,(function(e){return e.name===t.name})),c=n.get(p);return c.set({arcade:r,field:p,config:t,feature:d,group:null,layer:s,messages:l,value:e.getValue(p.name)}),c})):f.map((function(t){var i=n.get(t);return i.set({arcade:r,config:null,field:t,feature:d,group:null,layer:s,messages:l,value:e.getValue(t.name)}),i}))).filter((function(e){return e.visible}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"layer",{get:function(){return this.get("feature.layer")},set:function(e){e?this._override("layer",e):this._clearOverride("layer")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.messages&&this.get("layer.loaded")&&this.feature?"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"title",{get:function(){var e;return null===(e=this.formTemplate)||void 0===e?void 0:e.title},set:function(e){void 0===e?this._clearOverride("title"):this._override("title",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"valid",{get:function(){var e=this._allInputFields;return e.length>0&&e.every((function(e){return e.valid}))},enumerable:!0,configurable:!0}),t.prototype.findField=function(e){return i.find(this._allInputFields,(function(t){return t.name===e}))},t.prototype.getValue=function(e){var t=this._featureClone;return t&&t.get("attributes."+e)},t.prototype.setValue=function(e,t){var r=this,n=this._featureClone,i=this.strict;if(n&&n.attributes){var o=this.findField(e);if(t=""===t?null:t,o&&n.attributes[e]!==t){if(o.value=t,this.get("layer.typeIdField")===o.name){var a=new Set;this.layer.types.forEach((function(e){return Object.keys(e.domains).forEach((function(e){return a.add(e)}))})),a.forEach((function(e){var t=r.findField(e);t&&t.notifyChange("domain")}))}i&&!o.valid||(n.attributes[e]=t,this.notifyChange("inputFields"),this._emitChangeEvent(o))}}},t.prototype.getValues=function(){var e=this._featureClone;return e&&l.clone(e.attributes)||null},t.prototype.submit=function(){var e=this._allInputFields,t=e.filter((function(e){return e.valid})).map((function(e){return e.name})),r=e.filter((function(e){return!e.valid})).map((function(e){return e.name})),n=this.getValues();this.emit("submit",{valid:t,invalid:r,values:n})},t.prototype._disposeInputOrGroup=function(e){b(e)?this._disposeGroup(e):this._disposeInput(e)},t.prototype._disposeGroup=function(e){var t=this;e.inputFields.forEach((function(e){return t._disposeInput(e)})),this._fieldGroupPool.release(e)},t.prototype._disposeInput=function(e){this._fieldPool.release(e)},t.prototype._emitChangeEvent=function(e){var t=e.name,r=e.valid,n=e.value;this.emit("value-change",{layer:this.layer,feature:this.feature,fieldName:t,value:n,valid:r})},r.__decorate([d.property({readOnly:!0,dependsOn:["inputFields"]})],t.prototype,"_allInputFields",null),r.__decorate([d.property({dependsOn:["layer.fields"],readOnly:!0})],t.prototype,"_inputFieldCache",null),r.__decorate([d.property({dependsOn:["fieldConfig"],readOnly:!0})],t.prototype,"_inputFieldGroupCache",null),r.__decorate([d.property({dependsOn:["formTemplate"]})],t.prototype,"description",null),r.__decorate([d.property()],t.prototype,"feature",null),r.__decorate([d.property({dependsOn:["formTemplate"]})],t.prototype,"fieldConfig",null),r.__decorate([f.cast("fieldConfig")],t.prototype,"castFieldConfig",null),r.__decorate([d.property({dependsOn:["layer?.formTemplate"],type:c})],t.prototype,"formTemplate",null),r.__decorate([d.property({readOnly:!0,dependsOn:["messages","feature","fieldConfig","layer.fields","layer.loaded"]})],t.prototype,"inputFields",null),r.__decorate([d.property({dependsOn:["feature.layer"]})],t.prototype,"layer",null),r.__decorate([d.property()],t.prototype,"messages",void 0),r.__decorate([d.property({dependsOn:["messages","layer.loaded","feature"]})],t.prototype,"state",null),r.__decorate([d.property()],t.prototype,"strict",void 0),r.__decorate([d.property({dependsOn:["formTemplate"]})],t.prototype,"title",null),r.__decorate([d.property({dependsOn:["_allInputFields"]})],t.prototype,"valid",null),r.__decorate([d.property()],t.prototype,"getValues",null),r.__decorate([d.property()],t.prototype,"submit",null),t=r.__decorate([d.subclass(O)],t)}(a.HandleOwnerMixin(o.EventedAccessor))}));