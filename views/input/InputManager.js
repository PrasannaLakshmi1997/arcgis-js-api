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

define(["require","exports","tslib","../../core/Accessor","../../core/Logger","../../core/accessorSupport/decorators","./keys","./handlers/LatestPointerType"],(function(e,t,r,n,i,o,a,s){Object.defineProperty(t,"__esModule",{value:!0});var p=i.getLogger("esri.views.input.InputManager"),d=function(e){function n(t){var r=e.call(this,t)||this;return r._pointerCaptures=new Map,r._nameToGroup={},r._handlers=[],r._currentPropagation=null,r._sourceEvents=new Set,r._keyModifiers=new Set,r._activeKeyModifiers=new Set,r._stoppedPropagationEventIds=new Set,r.primaryKey=a.primaryKey,r.latestPointerType="mouse",r.test={timestamp:void 0},r}return r.__extends(n,e),n.prototype.initialize=function(){this.eventSource.onEventReceived=this._onEventReceived.bind(this),this._installRecognizers()},n.prototype.destroy=function(){for(var e=0,t=Object.keys(this._nameToGroup);e<t.length;e++){var r=t[e];this.uninstallHandlers(r)}this.eventSource=null},Object.defineProperty(n.prototype,"hasPendingInputs",{get:function(){return this._handlers.some((function(e){return e.handler.hasPendingInputs}))},enumerable:!0,configurable:!0}),n.prototype.installHandlers=function(e,r,n){var i=this;if(void 0===n&&(n=t.ViewEventPriorities.INTERNAL),this._nameToGroup[e])p.error("There is already an InputHandler group registered under the name `"+e+"`");else if(0!==r.length){var o={name:e,handlers:r.map((function(e){return{handler:e,active:!0,removed:!1,priorityIndex:0,groupPriority:n,eventCallback:null,uninstallCallback:null}}))};this._nameToGroup[e]=o;for(var a=function(e){var t=o.handlers[e];s._handlers.push(t),t.handler.onInstall({updateDependencies:function(){i.updateDependencies()},emit:function(e,r,n,o,a){i._emitInputEvent(t.priorityIndex,e,r,n,a,o)},setPointerCapture:function(e,r){i._setPointerCapture(o,t,e,r)},setEventCallback:function(e){t.eventCallback=e},setUninstallCallback:function(e){t.uninstallCallback=e},refreshHasPendingInputs:function(){i.notifyChange("hasPendingInputs")}})},s=this,d=o.handlers.length-1;d>=0;d--)a(d);this.updateDependencies()}else p.error("Can't register a group of zero handlers")},n.prototype.uninstallHandlers=function(e){var t=this._nameToGroup[e];t?(t.handlers.forEach((function(e){e.removed=!0,e.uninstallCallback()})),delete this._nameToGroup[e],this._currentPropagation?this._currentPropagation.needsHandlerGarbageCollect=!0:this._garbageCollectRemovedHandlers()):p.error("There is no InputHandler group registered under the name `"+e+"`")},n.prototype.hasHandlers=function(e){return void 0!==this._nameToGroup[e]},n.prototype.updateDependencies=function(){var e=new Set,t=new Set;this._handlersPriority=[];for(var r=this._handlers.length-1;r>=0;r--){var n=this._handlers[r];n.priorityIndex=r,this._handlersPriority.push(n)}this._handlersPriority=this._sortHandlersPriority(this._handlersPriority);for(r=this._handlersPriority.length-1;r>=0;r--){var i=this._handlersPriority[r];i.priorityIndex=r;var o=i.handler.hasSideEffects;if(!o)for(var s=0,p=i.handler.outgoingEventTypes;s<p.length;s++){var d=p[s];if(e.has(d)){o=!0;break}}if(o)for(var l=0,u=i.handler.incomingEventMatches;l<u.length;l++){var h=u[l];e.add(h.eventType);for(var c=0,v=h.keyModifiers;c<v.length;c++){var f=v[c];a.isSystemModifier(f)||t.add(f)}}i.active=o}this._sourceEvents=e,this._keyModifiers=t,this._pointerCaptures.size>0&&this._sourceEvents.add("pointer-capture-lost"),this._keyModifiers.size>0&&(this._sourceEvents.add("key-down"),this._sourceEvents.add("key-up")),this.eventSource&&(this.eventSource.activeEvents=this._sourceEvents)},n.prototype._setLatestPointerType=function(e){this._set("latestPointerType",e)},n.prototype._onEventReceived=function(e,t){if("pointer-capture-lost"===e){var r=t;this._pointerCaptures.delete(r.native.pointerId)}this._updateKeyModifiers(e,t);var n=null!=this.test.timestamp?this.test.timestamp:t.native?t.native.timestamp:void 0,i=t.native?t.native.cancelable:void 0;this._emitInputEventFromSource(e,t,n,i)},n.prototype._updateKeyModifiers=function(e,t){var r=this;if(t){var n=!1,i=function(){if(!n){var e=new Set;r._activeKeyModifiers.forEach((function(t){e.add(t)})),r._activeKeyModifiers=e,n=!0}},o=function(e,t){t&&!r._activeKeyModifiers.has(e)?(i(),r._activeKeyModifiers.add(e)):!t&&r._activeKeyModifiers.has(e)&&(i(),r._activeKeyModifiers.delete(e))};if("key-down"===e||"key-up"===e){var a=t.key;this._keyModifiers.has(a)&&o(a,"key-down"===e)}var s=t.native;o("Alt",!(!s||!s.altKey)),o("Ctrl",!(!s||!s.ctrlKey)),o("Shift",!(!s||!s.shiftKey)),o("Meta",!(!s||!s.metaKey)),o("Primary",this._activeKeyModifiers.has(this.primaryKey))}},n.prototype._installRecognizers=function(){var e=this;this._latestPointerTypeHandler=new s.LatestPointerType((function(t){return e._setLatestPointerType(t)})),this.recognizers.length>0&&this.installHandlers("default",this.recognizers,t.ViewEventPriorities.INTERNAL),this.installHandlers("input-manager-logic",[this._latestPointerTypeHandler],t.ViewEventPriorities.INTERNAL)},n.prototype._setPointerCapture=function(e,t,r,n){var i=e.name+"-"+t.priorityIndex,o=this._pointerCaptures.get(r.pointerId)||new Set;this._pointerCaptures.set(r.pointerId,o),n?(o.add(i),1===o.size&&this.eventSource&&this.eventSource.setPointerCapture(r,!0)):o.has(i)&&(o.delete(i),0===o.size&&(this._pointerCaptures.delete(r.pointerId),this.eventSource&&this.eventSource.setPointerCapture(r,!1)))},n.prototype._garbageCollectRemovedHandlers=function(){this._handlers=this._handlers.filter((function(e){return!e.removed})),this.updateDependencies()},n.prototype._emitInputEventFromSource=function(e,t,r,n){this._emitInputEvent(0,e,t,r,n)},n.prototype._emitInputEvent=function(e,t,r,n,i,o){var a=void 0!==n?n:this._currentPropagation?this._currentPropagation.timestamp:performance.now(),s=void 0!==i&&i,p=new l(t,r,a,o||this._activeKeyModifiers,s);this._currentPropagation?this._currentPropagation.addedEvents.push(p):this._doNewPropagation(e,p)},n.prototype._doNewPropagation=function(e,t){this._currentPropagation={events:[t],addedEvents:[],currentHandler:this._handlersPriority[e],needsHandlerGarbageCollect:!1,timestamp:t.timestamp};for(var r=this._currentPropagation;r.currentHandler;){if(r.currentHandler.removed)r.needsHandlerGarbageCollect=!0;else{var n=r.events,i=[];r.addedEvents=[];for(var o=0;o<n.length;o++){var a=n[o],s=a.data&&a.data.eventId;null!=s&&this._stoppedPropagationEventIds.has(s)||(r.currentHandler.active&&r.currentHandler.eventCallback(a),a.shouldStopPropagation()?null!=s&&this._stoppedPropagationEventIds.add(s):i.push(a))}r.events=i.concat(r.addedEvents)}r.currentHandler=this._handlersPriority[r.currentHandler.priorityIndex+1]}r.needsHandlerGarbageCollect&&this._garbageCollectRemovedHandlers(),this.hasPendingInputs||this._stoppedPropagationEventIds.clear(),this._currentPropagation=null},n.prototype._compareHandlerPriority=function(e,t){if(e.handler.hasSideEffects!==t.handler.hasSideEffects)return e.handler.hasSideEffects?1:-1;if(e.groupPriority!==t.groupPriority)return e.groupPriority>t.groupPriority?-1:1;for(var r=0,n=e.handler.incomingEventMatches;r<n.length;r++)for(var i=n[r],o=function(e){if(i.eventType!==e.eventType)return"continue";var t=i.keyModifiers.filter((function(t){return-1!==e.keyModifiers.indexOf(t)}));return t.length===i.keyModifiers.length!==(t.length===e.keyModifiers.length)?{value:i.keyModifiers.length>e.keyModifiers.length?-1:1}:void 0},a=0,s=t.handler.incomingEventMatches;a<s.length;a++){var p=o(s[a]);if("object"==typeof p)return p.value}return e.priorityIndex>t.priorityIndex?-1:1},n.prototype._sortHandlersPriority=function(e){for(var t=[],r=0,n=e;r<n.length;r++){for(var i=n[r],o=0;o<t.length&&this._compareHandlerPriority(i,t[o])>=0;)o++;t.splice(o,0,i)}return t},Object.defineProperty(n.prototype,"debug",{get:function(){var e=this,t=function(t){var r=e._setPointerCapture;e._setPointerCapture=function(){},t(),e._setPointerCapture=r};return{injectEvent:function(r,n){t((function(){e._onEventReceived(r,n)}))},disablePointerCapture:t}},enumerable:!0,configurable:!0}),r.__decorate([o.property({readOnly:!0})],n.prototype,"hasPendingInputs",null),r.__decorate([o.property()],n.prototype,"eventSource",void 0),r.__decorate([o.property()],n.prototype,"recognizers",void 0),r.__decorate([o.property({readOnly:!0})],n.prototype,"latestPointerType",void 0),n=r.__decorate([o.subclass("esri.views.input.InputManager")],n)}(n);t.InputManager=d;var l=function(){function e(e,t,r,n,i){this.type=e,this.data=t,this.timestamp=r,this.modifiers=n,this.cancelable=i,this._stopPropagation=!1}return e.prototype.stopPropagation=function(){this._stopPropagation=!0},e.prototype.shouldStopPropagation=function(){return this._stopPropagation},e.prototype.preventDefault=function(){this.data.native.preventDefault()},e}();t.ViewEventPriorities={DEFAULT:0,TOOL:-1,WIDGET:-2,INTERNAL:-3}}));