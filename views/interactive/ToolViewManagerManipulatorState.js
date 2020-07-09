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

define(["require","exports","../../core/MapUtils","../../core/mathUtils","../../core/maybe","../../core/screenUtils","./interactiveToolUtils"],(function(e,t,o,i,r,n,a){Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(){this._pointerLocations=new Map,this._hoveredManipulators=new Map,this._grabbedManipulators=new Map,this._draggedManipulators=new Map,this._stopDrag=!1,this._revertToActiveTool=null,this._cursor=null}return Object.defineProperty(e.prototype,"cursor",{get:function(){return this._cursor},enumerable:!0,configurable:!0}),e.prototype.handleInputEvent=function(e,t){var o=function(){return e.stopPropagation()};switch(e.type){case"pointer-move":p(e.pointerType)&&this._pointerLocations.set(e.pointerId,{x:e.x,y:e.y,pointerType:e.pointerType});break;case"drag":this._grabbedManipulators.size>0&&(this._stopDrag=!0),this._stopDrag&&(o(),"end"===e.action&&(this._stopDrag=!1));break;case"pointer-down":if(!l(e)||u(e))break;var a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool);if(r.isNone(s))break;var d=this._findManipulatorByKey(s,t.forEachTool);r.isSome(d)&&d.interactive&&d.grabbable&&!d.grabbing&&(this._grabbedManipulators.set(e.pointerId,{key:s,start:a}),1===this._grabbedManipulators.size&&(this._revertToActiveTool=t.activeTool,t.setActiveTool(s.tool)),d.grabbing=!0,d.events.emit("grab-changed",{action:"start",screenPoint:a}),o());break;case"pointer-up":this._handlePointerEnd(e,t);break;case"pointer-drag":if(!l(e))break;var h=this._grabbedManipulators.get(e.pointerId),y=this._draggedManipulators.get(e.pointerId),f=r.applySome(h||y,(function(e){return e.key})),v=this._findManipulatorByKey(f,t.forEachTool);if(r.isNone(v))break;(a=n.createScreenPointFromEvent(e)).x=i.clamp(a.x,0,t.view.width),a.y=i.clamp(a.y,0,t.view.height);var g=r.unwrap(h||y).start,b={action:e.action,start:g,screenPoint:a};switch(e.action){case"start":case"update":"update"!==b.action&&1!==this._grabbedManipulators.size||(v.dragging=!0,y||(b.action="start"),v.events.emit("drag",b),this._draggedManipulators.set(e.pointerId,{key:r.unwrap(f),start:g}));break;case"end":v.dragging=!1,y&&v.events.emit("drag",b),this._draggedManipulators.delete(e.pointerId),this._handlePointerEnd(e,t)}o();break;case"immediate-click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool);var _=this._findToolAndManipulatorByKey(s,t.forEachTool,c);if(u(e)||t.forEachTool((function(e){if((!_||c.tool!==e||!e.selectionManagementDisabled)&&e.manipulators){var t=!1;e.manipulators.forEach((function(e){var o=e.manipulator;o.selected&&(o.selected=!1,t=!0)})),t&&e.manipulatorSelectionChanged&&e.manipulatorSelectionChanged()}})),!_)break;d=c.manipulator;var m=c.tool;if(!d.interactive)break;d.selectable&&!m.selectionManagementDisabled&&(d.selected=!d.selected,m.manipulatorSelectionChanged&&m.manipulatorSelectionChanged());var M=e.native.shiftKey;d.events.emit("immediate-click",{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M,stopPropagation:o});break;case"click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool),d=this._findManipulatorByKey(s,t.forEachTool);if(r.isNone(d)||!d.interactive)break;M=e.native.shiftKey;d.events.emit(e.type,{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M}),o();break;case"double-click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool),d=this._findManipulatorByKey(s,t.forEachTool);if(r.isNone(d)||!d.interactive)break;M=e.native.shiftKey;d.events.emit("double-click",{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M,stopPropagation:o});break;case"immediate-double-click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool),d=this._findManipulatorByKey(s,t.forEachTool);if(r.isNone(d)||!d.interactive)break;M=e.native.shiftKey;d.events.emit("immediate-double-click",{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M,stopPropagation:o})}this._updateCursor(t.forEachTool)},e.prototype._handlePointerEnd=function(e,t){var o=r.applySome(this._grabbedManipulators.get(e.pointerId),(function(e){return e.key})),i=this._findManipulatorByKey(o,t.forEachTool);if(r.isSome(i)&&!i.dragging){var a=r.isSome(t.creatingTool)&&t.creatingTool===r.unwrap(o).tool;1!==this._grabbedManipulators.size||0!==this._draggedManipulators.size||a||(t.setActiveTool(this._revertToActiveTool),this._revertToActiveTool=null),i.grabbing&&(i.grabbing=!1,i.events.emit("grab-changed",{action:"end",screenPoint:n.createScreenPointFromEvent(e)})),this._grabbedManipulators.delete(e.pointerId)}},e.prototype._cursorFromMap=function(e,t){var i=this,n=null;return o.someMap(e,(function(e){var o=e.key,a=i._findManipulatorByKey(o,t);return!!(r.isSome(a)&&a.interactive&&"cursor"in a&&a.cursor)&&(n=a.cursor,!0)})),n},e.prototype._updateCursor=function(e){this._grabbedManipulators.size>0?this._cursor=this._cursorFromMap(this._grabbedManipulators,e)||"grabbing":this._hoveredManipulators.size>0?this._cursor=this._cursorFromMap(this._hoveredManipulators,e)||"pointer":this._cursor=null},e.prototype.clearPointers=function(e,t,o,i){var n=this;void 0===o&&(o=!0);var a=function(t){return t.tool===e&&(r.isNone(i)||t.manipulatorId===i)};this._grabbedManipulators.forEach((function(e,o){var i=e.key;if(a(i)){n._grabbedManipulators.delete(o);var s=n._findManipulatorByKey(i,t);r.isSome(s)&&(s.grabbing=!1,s.events.emit("grab-changed",{action:"end",screenPoint:null}))}})),this._draggedManipulators.forEach((function(e,o){var i=e.key;if(a(i)){n._draggedManipulators.delete(o);var s=n._findManipulatorByKey(i,t);r.isSome(s)&&(s.dragging=!1,s.events.emit("drag",{action:"cancel",screenPoint:null,start:null}))}})),o&&this._hoveredManipulators.forEach((function(e,o){var i=e.key;if(a(i)){n._hoveredManipulators.delete(o);var s=n._findManipulatorByKey(i,t);r.isSome(s)&&(s.hovering=!1)}})),this._updateCursor(t)},e.prototype._intersect=function(e,t,o){var i=null;return o((function(o){if(null==o.manipulators||!a.areToolManipulatorsEditable(o))return!1;var n=o.manipulators.intersect(e,t);return!r.isNone(n)&&(i={manipulatorId:n,tool:o},!0)})),i},e.prototype.updateHoveredStateFromKnownPointers=function(e){var t=this;this._pointerLocations.forEach((function(o,i){t._updateHoveredStateForPointerAtScreenPosition(n.createScreenPoint(o.x,o.y),i,o.pointerType,e)}))},e.prototype.handleHoverEvent=function(e,t){"pointer-up"!==e.type&&"immediate-click"!==e.type&&"pointer-move"!==e.type||!p(e.pointerType)||this._updateHoveredStateForPointerAtScreenPosition(n.createScreenPointFromEvent(e),e.pointerId,e.pointerType,t)},e.prototype._updateHoveredStateForPointerAtScreenPosition=function(e,t,o,i){var n=this._intersect(e,o,i),a=this._findManipulatorByKey(n,i),s=r.applySome(this._hoveredManipulators.get(t),(function(e){return e.key})),p=this._findManipulatorByKey(s,i);r.isSome(a)&&!a.interactive&&(a=null),p!==a&&(r.isSome(p)&&(p.hovering=!1),r.isSome(a)?(a.hovering=!0,this._hoveredManipulators.set(t,{key:r.unwrap(n)})):this._hoveredManipulators.delete(t),this._updateCursor(i))},e.prototype._findManipulatorByKey=function(e,t){return this._findToolAndManipulatorByKey(e,t,c)?c.manipulator:null},e.prototype._findToolAndManipulatorByKey=function(e,t,o){return r.isNone(e)?null:(o.tool=null,o.manipulator=null,t((function(t){if(t!==e.tool||null==t.manipulators||!a.areToolManipulatorsEditable(t))return!1;var i=t.manipulators.findById(e.manipulatorId);return!!r.isSome(i)&&(o.manipulator=i,o.tool=t,!0)})),null!=o.manipulator)},e}();function p(e){return"mouse"===e}function l(e){return"mouse"!==e.pointerType||0===e.button}function u(e){return!!e.native.shiftKey}t.default=s;var c={manipulator:null,tool:null}}));