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

define(["require","exports","tslib","../../core/Handles","../../core/maybe","../../core/screenUtils","../../core/accessorSupport/decorators","../3d/interactive/editingTools/draw/DrawTool","./DrawAction","./input/DrawEvents","./input/Keys","../input/InputManager","../input/recognizers/PointerClickHoldAndDrag"],(function(e,o,t,r,i,n,s,a,d,c,l,w,p){Object.defineProperty(o,"__esModule",{value:!0});var u=function(e){function o(o){var t=e.call(this,o)||this;return t._clickDelay=p.DefaultParameters.maximumClickDelay,t._cursorMoved=!1,t._cursorScreenPoint=null,t._pointerDownEvent=null,t._viewHandles=new r,t.coordinates=[],t.view=null,t}return t.__extends(o,e),o.prototype.initialize=function(){"2d"===this.view.type?this._addViewHandles():this._addDrawTool(this.view)},o.prototype.destroy=function(){"2d"===this.view.type?(this._removeViewHandles(),this._viewHandles.destroy(),this.emit("destroy")):(this._removeDrawTool(),this.emit("destroy"))},o.prototype.complete=function(){if("2d"===this.view.type){if(this._cursorScreenPoint){var e=this.getCoordsFromScreenPoint(this._cursorScreenPoint);i.isSome(e)&&(this._set("coordinates",e),this._completeDrawing())}}else this._drawTool.completeCreateOperation()},o.prototype._addViewHandles=function(){var e=this;this._removeViewHandles(),this._viewHandles.add([this.view.on("click",(function(o){o.stopPropagation();var t=e.getCoordsFromScreenPoint(o.screenPoint);i.isSome(t)&&(e._set("coordinates",t),e._drawCompleteHandler(o))}),w.ViewEventPriorities.TOOL),this.view.on("pointer-down",(function(o){e._pointerDownEvent=o,e._cursorMoved=!1}),w.ViewEventPriorities.TOOL),this.view.on("pointer-move",(function(o){e._cursorMoved=!0,e._cursorScreenPoint=n.createScreenPointFromEvent(o),e._cursorUpdateHandler(o)}),w.ViewEventPriorities.TOOL),this.view.on("pointer-up",(function(o){if(e._pointerDownEvent&&!e._cursorMoved&&o.timestamp-e._pointerDownEvent.timestamp>e._clickDelay){e._cursorScreenPoint=n.createScreenPointFromEvent(o);var t=e.getCoordsFromScreenPoint(e._cursorScreenPoint);i.isSome(t)&&(e._set("coordinates",t),e._drawCompleteHandler(o))}}),w.ViewEventPriorities.TOOL),this.view.on("key-down",(function(o){if(o.key===l.KEYS.drawCompleteKey&&e._cursorScreenPoint){var t=e.getCoordsFromScreenPoint(e._cursorScreenPoint);i.isSome(t)&&(e._set("coordinates",t),e._drawCompleteHandler(o))}}),w.ViewEventPriorities.TOOL)])},o.prototype._removeViewHandles=function(){this._viewHandles.removeAll()},o.prototype._addDrawTool=function(e){var o=this;this._drawTool=new a.DrawTool({view:e,elevationInfo:this.elevationInfo,hasZ:this.hasZ,geometryType:"point"}),this.view.toolViewManager.tools.push(this._drawTool),this.view.activeTool=this._drawTool,this._drawTool.on("cursor-update",(function(e){1===e.vertices.length&&o.emit("cursor-update",new c.CursorUpdateEvent(o.view,null,e.vertices[0].vertexIndex,o._drawTool.getVertexCoords()))})),this._drawTool.on("complete",(function(e){o.emit("draw-complete",new c.DrawCompleteEvent(null,o._drawTool.getVertexCoords())),o._removeDrawTool()}))},o.prototype._removeDrawTool=function(){i.isSome(this._drawTool)&&(this.view.tools.remove(this._drawTool),this._drawTool.destroy(),this._drawTool=null)},o.prototype._updateCursor=function(e,o){i.isSome(e)?this.emit("cursor-update",new c.CursorUpdateEvent(this.view,o,0,[e])):this.emit("cursor-update",new c.CursorUpdateEvent(this.view,o,null,null))},o.prototype._completeDrawing=function(e){this._cursorMoved=!1,this._pointerDownEvent=null;var o=new c.DrawCompleteEvent(e,[this.coordinates]);this.emit("draw-complete",o),o.defaultPrevented||this._removeViewHandles()},o.prototype._cursorUpdateHandler=function(e){this._updateCursor(this.getCoordsFromScreenPoint(this._cursorScreenPoint),e.native)},o.prototype._drawCompleteHandler=function(e){this._completeDrawing(e.native)},t.__decorate([s.property({readOnly:!0})],o.prototype,"coordinates",void 0),t.__decorate([s.property()],o.prototype,"view",void 0),o=t.__decorate([s.subclass("esri.views.draw.PointDrawAction")],o)}(d);o.PointDrawAction=u}));