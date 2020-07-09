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

define(["require","exports","tslib","../../../core/clock","../../../core/MapUtils","../../../core/screenUtils","../DragEventSeparator","../InputHandler","./SingleAndDoubleClick","./support"],(function(e,t,a,r,o,n,i,u,p,l){Object.defineProperty(t,"__esModule",{value:!0});var s=function(e){function t(t,a,o,u,l){void 0===t&&(t=p.DefaultParameters.maximumDoubleClickDelay),void 0===a&&(a=p.DefaultParameters.maximumDoubleClickDistance),void 0===o&&(o=p.DefaultParameters.maximumDoubleTouchDelay),void 0===u&&(u=p.DefaultParameters.maximumDoubleTouchDistance),void 0===l&&(l=r.default);var s=e.call(this,!1)||this;return s.maximumDoubleClickDelay=t,s.maximumDoubleClickDistance=a,s.maximumDoubleTouchDelay=o,s.maximumDoubleTouchDistance=u,s._clock=l,s._doubleTapDragReady=!1,s._doubleTapDragActive=!1,s._dragStartCenter=n.createScreenPoint(0,0),s._pointerState=new Map,s._doubleTapDrag=s.registerOutgoing("double-tap-drag"),s._dragEventSeparator=new i.DragEventSeparator({start:function(e,t){return s._dragStart(e,t)},update:function(e,t){return s._dragUpdate(t)},end:function(e,t){return s._dragEnd(t)}}),s.registerIncoming("drag",(function(e){return s._dragEventSeparator.handle(e)})),s.registerIncoming("pointer-down",(function(e){return s._handlePointerDown(e)})),s.registerIncoming("pointer-up",(function(){return s._handlePointerUp()})),s}return a.__extends(t,e),t.prototype.onUninstall=function(){this._pointerState.forEach((function(e){null!=e.doubleTapTimeout&&(e.doubleTapTimeout.remove(),e.doubleTapTimeout=null)}))},Object.defineProperty(t.prototype,"hasPendingInputs",{get:function(){return o.someMap(this._pointerState,(function(e){return null!=e.doubleTapTimeout}))},enumerable:!0,configurable:!0}),t.prototype._clearPointerDown=function(e){var t=this._pointerState.get(e);t&&(t.doubleTapTimeout.remove(),t.doubleTapTimeout=null,this._pointerState.delete(e),this.refreshHasPendingInputs())},t.prototype._createDoubleTapDragData=function(e,t,a){return{action:e,delta:t,button:a.button,buttons:a.buttons,pointer:a.pointer,pointers:a.pointers,pointerType:a.pointerType,timestamp:a.timestamp}},t.prototype._dragStart=function(e,t){if(this._doubleTapDragReady&&1===e){this._doubleTapDragReady=!1,this._doubleTapDragActive=!0;var a=t.data,r=t.modifiers,o=a.center;this._dragStartCenter=o;var i=this._createDoubleTapDragData("begin",n.createScreenPoint(0,0),a);this._doubleTapDrag.emit(i,void 0,r),t.stopPropagation()}},t.prototype._dragUpdate=function(e){if(this._doubleTapDragActive){var t=e.data,a=e.modifiers,r=t.center,o=n.createScreenPoint(r.x-this._dragStartCenter.x,r.y-this._dragStartCenter.y),i=this._createDoubleTapDragData("update",o,t);this._doubleTapDrag.emit(i,void 0,a),e.stopPropagation()}},t.prototype._dragEnd=function(e){if(this._doubleTapDragActive){var t=e.data,a=e.modifiers,r=t.center,o=n.createScreenPoint(r.x-this._dragStartCenter.x,r.y-this._dragStartCenter.y),i=this._createDoubleTapDragData("end",o,t);this._doubleTapDrag.emit(i,void 0,a),this._doubleTapDragActive=!1,e.stopPropagation()}},t.prototype._handlePointerDown=function(e){var t=e.data,a=this._pointerId(t),r=this._pointerState.get(a),o=t.native.pointerType;if(r){var n="touch"===o?this.maximumDoubleTouchDistance:this.maximumDoubleClickDistance;this._clearPointerDown(a),l.manhattanDistance(r.event.data,t)>n?this._storePointerDown(e):this._doubleTapDragReady=!0}else this._storePointerDown(e)},t.prototype._handlePointerUp=function(){this._doubleTapDragReady=!1},t.prototype._pointerId=function(e){var t=e.native,a=t.pointerId,r=t.button,o=t.pointerType;return"mouse"===o?a+":"+r:""+o},t.prototype._storePointerDown=function(e){var t=this,a=e.data,r=a.native.pointerType,o=this._pointerId(a),n="touch"===r?this.maximumDoubleTouchDelay:this.maximumDoubleClickDelay,i=this._clock.setTimeout((function(){return t._clearPointerDown(o)}),n);this._pointerState.set(o,{event:e,doubleTapTimeout:i}),this.refreshHasPendingInputs()},t}(u.InputHandler);t.DoubleTapDrag=s}));