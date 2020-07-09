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

define(["require","exports","tslib","../../core/Handles","../../core/maybe","../../core/screenUtils","../../core/accessorSupport/decorators","./DrawAction","./input/DrawEvents","./input/Keys","../input/InputManager"],(function(e,t,r,i,o,n,s,d,v,c,p){Object.defineProperty(t,"__esModule",{value:!0});var u=function(e){function t(t){var r=e.call(this,t)||this;return r._cursorMoved=!1,r._cursorScreenPoint=null,r._dragEnabled=!0,r._pointerDownEvent=null,r._viewHandles=new i,r.vertices=[],r.view=null,r}return r.__extends(t,e),t.prototype.initialize=function(){this._addViewHandles()},t.prototype.destroy=function(){this._removeViewHandles(),this._viewHandles.destroy(),this.emit("destroy")},t.prototype.addVertex=function(e,t){var r=this;isNaN(t)?(t=this.vertices.length,this.vertices.push(e)):this.vertices.splice(t,0,e);var i={vertex:e,vertexIndex:t,undo:function(){return r._undoVertexAdd(null,t)},redo:function(){return r._redoVertexAdd(null,e,t)}};this.history.push(i),this._set("redoHistory",[]);var o=new v.VertexAddEvent(this.view,null,t,this.vertices);this.emit("vertex-add",o),o.defaultPrevented&&(this._cursorMoved=!0,this.history.pop())},t.prototype.removeVertex=function(e){var t=this,r=this.vertices.splice(e,1)[0],i={vertex:r,vertexIndex:e,undo:function(){return t._undoVertexRemove(null,r,e)},redo:function(){return t._redoVertexRemove(null,e)}};this.history.push(i),this._set("redoHistory",[]),this.emit("vertex-remove",new v.VertexRemoveEvent(this.view,null,e,this.vertices))},t.prototype.updateVertex=function(e,t){var r=this,i=this.vertices[t];this.vertices[t]=e;var o={vertex:e,vertexIndex:t,undo:function(){return r._undoVertexUpdate(null,i,t)},redo:function(){return r._redoVertexUpdate(null,e,t)}};this.history.push(o),this._set("redoHistory",[]),this.emit("vertex-update",new v.VertexUpdateEvent(this.view,null,t,this.vertices))},t.prototype.complete=function(){this._completeDrawing()},t.prototype._addViewHandles=function(){var e=this;this._removeViewHandles(),this._viewHandles.add([this.view.on("click",(function(e){e.stopPropagation()}),p.ViewEventPriorities.TOOL),this.view.on("pointer-down",(function(t){e._cursorMoved&&e.vertices.pop(),e._pointerDownEvent=t,e._cursorMoved=!1,e._cursorScreenPoint=n.createScreenPointFromEvent(t)}),p.ViewEventPriorities.TOOL),this.view.on("pointer-move",(function(t){e._cursorMoved&&e.vertices.pop(),e._cursorMoved=!0,e._cursorScreenPoint=n.createScreenPointFromEvent(t),e._cursorUpdateHandler(t)}),p.ViewEventPriorities.TOOL),this.view.on("pointer-up",(function(t){if(e._pointerDownEvent){if(e._cursorMoved)return e.vertices.pop(),void(e._cursorMoved=!1);e._pointerDownEvent=null,e._vertexAddHandler(t)}}),p.ViewEventPriorities.TOOL),this.view.on("drag",(function(t){e._dragEnabled&&e._pointerDownEvent&&t.stopPropagation()}),p.ViewEventPriorities.TOOL),this.view.on("drag",["Shift"],(function(e){e.stopPropagation()}),p.ViewEventPriorities.TOOL),this.view.on("double-click",(function(t){t.stopPropagation(),e._drawCompleteHandler(t)}),p.ViewEventPriorities.TOOL),this.view.on("double-click",["Control"],(function(t){t.stopPropagation(),e._drawCompleteHandler(t)}),p.ViewEventPriorities.TOOL),this.view.on("key-down",(function(t){t.key===c.KEYS.vertexAddKey&&!t.repeat&&e._cursorScreenPoint?(e._cursorMoved&&(e.vertices.pop(),e._cursorMoved=!1),e._vertexAddHandler(t)):t.key===c.KEYS.drawCompleteKey&&!t.repeat&&e._cursorScreenPoint?(e._cursorMoved&&(e.vertices.pop(),e._cursorMoved=!1),e._vertexAddHandler(t),e._drawCompleteHandler(t)):t.key!==c.KEYS.undoKey||e.interactiveUndoDisabled||t.repeat?t.key!==c.KEYS.redoKey||e.interactiveUndoDisabled||t.repeat||(t.stopPropagation(),e.redo()):(t.stopPropagation(),e.undo())}),p.ViewEventPriorities.TOOL)])},t.prototype._removeViewHandles=function(){this._viewHandles.removeAll()},t.prototype._addVertex=function(e,t){var r=this;this.vertices.push(e);var i=this.vertices.indexOf(e),o={vertex:e,vertexIndex:i,undo:function(){return r._undoVertexAdd(t,i)},redo:function(){return r._redoVertexAdd(t,e,i)}};this.history.push(o),this._set("redoHistory",[]);var n=new v.VertexAddEvent(this.view,t,i,this.vertices);this.emit("vertex-add",n),n.defaultPrevented&&(this._cursorMoved=!0,this.history.pop())},t.prototype._updateCursor=function(e,t){this.vertices.push(e);var r=this.vertices.indexOf(e),i=new v.CursorUpdateEvent(this.view,t,r,this.vertices);this.emit("cursor-update",i)},t.prototype._completeDrawing=function(e){if(this._cursorMoved=!1,this._pointerDownEvent=null,!(this.vertices.length<1)){var t=new v.DrawCompleteEvent(e,this.vertices);this.emit("draw-complete",t),t.defaultPrevented?this._cursorMoved=!0:this._removeViewHandles()}},t.prototype._undoVertexAdd=function(e,t){this.vertices.splice(t,1),this.emit("undo",new v.VertexRemoveEvent(this.view,e,t,this.vertices))},t.prototype._redoVertexAdd=function(e,t,r){this.vertices.splice(r,0,t),this.emit("redo",new v.VertexAddEvent(this.view,e,r,this.vertices))},t.prototype._undoVertexRemove=function(e,t,r){this.vertices.splice(r,0,t),this.emit("undo",new v.VertexAddEvent(this.view,e,r,this.vertices))},t.prototype._redoVertexRemove=function(e,t){this.vertices.splice(t,1),this.emit("redo",new v.VertexRemoveEvent(this.view,e,t,this.vertices))},t.prototype._undoVertexUpdate=function(e,t,r){this.vertices[r]=t,this.emit("undo",new v.VertexUpdateEvent(this.view,e,r,this.vertices))},t.prototype._redoVertexUpdate=function(e,t,r){this.vertices[r]=t,this.emit("redo",new v.VertexUpdateEvent(this.view,e,r,this.vertices))},t.prototype._vertexAddHandler=function(e){var t=this.getCoordsFromScreenPoint(this._cursorScreenPoint);o.isSome(t)&&this._addVertex(t,e.native)},t.prototype._cursorUpdateHandler=function(e){var t=this.getCoordsFromScreenPoint(this._cursorScreenPoint);o.isSome(t)&&this._updateCursor(t,e.native)},t.prototype._drawCompleteHandler=function(e){this._completeDrawing(e.native)},r.__decorate([s.property({readOnly:!0})],t.prototype,"vertices",void 0),r.__decorate([s.property()],t.prototype,"view",void 0),t=r.__decorate([s.subclass("esri.views.draw.MultipointDrawAction")],t)}(d);t.MultipointDrawAction=u}));