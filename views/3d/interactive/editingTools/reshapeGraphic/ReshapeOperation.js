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

define(["require","exports","tslib","../../../../../core/compilerUtils","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/handleUtils","../../../../../core/maybe","../../../../../core/watchUtils","../../../../../core/accessorSupport/decorators","../../../../../core/libs/gl-matrix-2/vec3","../../../../../layers/graphics/dehydratedFeatures","../../../../../support/elevationInfoUtils","../../Manipulator3D","../../manipulatorUtils","../dragEventPipeline3D","../manipulatorUtils","../settings","../visualElementUtils","../editGeometry/EditGeometryHelper","../manipulations/config","../manipulations/MoveManipulation","../manipulations/moveUtils","../manipulations/MoveXYGraphicManipulation","../../visualElements/OutlineVisualElement","../../../layers/graphics/GraphicState","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../../interactive/dragEventPipeline"],(function(e,t,a,i,n,r,o,l,s,p,u,h,c,d,m,v,g,_,M,y,f,x,b,G,S,E,O,w,H,I){Object.defineProperty(t,"__esModule",{value:!0});var P=function(e){function t(t){var a=e.call(this,t)||this;return a._vertexManipulatorMaterial=m.createManipulatorMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.vertex.color),_.settings.reshapeManipulators.vertex.renderOccludedFlag),a._vertexManipulatorOutlineMaterial=m.createManipulatorOutlineMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.vertex.outlineColor),_.settings.reshapeManipulators.vertex.renderOccludedFlag),a._vertexManipulatorHoverOutlineMaterial=m.createManipulatorOutlineMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.vertex.hoverOutlineColor),_.settings.reshapeManipulators.vertex.renderOccludedFlag),a._edgeManipulatorMaterial=m.createManipulatorMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.edge.color),_.settings.reshapeManipulators.edge.renderOccludedFlag),a._edgeManipulatorOutlineMaterial=m.createManipulatorOutlineMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.edge.outlineColor),_.settings.reshapeManipulators.edge.renderOccludedFlag),a._selectedManipulatorMaterial=m.createManipulatorMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.selected.color),_.settings.reshapeManipulators.selected.renderOccludedFlag),a._selectedManipulatorOutlineMaterial=m.createManipulatorOutlineMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.selected.outlineColor),_.settings.reshapeManipulators.selected.renderOccludedFlag),a._selectedManipulatorHoverOutlineMaterial=m.createManipulatorOutlineMaterial(_.settings.colorToVec4(_.settings.reshapeManipulators.selected.hoverOutlineColor),_.settings.reshapeManipulators.selected.renderOccludedFlag),a._selectedIndex=0,a._vertexManipulatorGeometry=null,a._vertexManipulatorOutlineGeometry=null,a._edgeManipulatorGeometry=null,a._edgeManipulatorOutlineGeometry=null,a._handles=new r,a._manipulatorHandles=new r,a._manipulatorInfos=[],a._reshapeHelper=null,a._graphicMoveManipulation=null,a._moveManipulation=null,a._numGrabbing=0,a._numDragging=0,a._reshapeEventState=0,a._outlineVisualElement=null,a.tool=null,a.outputGeometry=null,a._vertexLaserLineVisualElement=null,a}return a.__extends(t,e),t.prototype.initialize=function(){var e=this,t=new E.GraphicState({graphic:this.graphic});this._graphicState=t,this._handles.add([t.watch("displaying",(function(t){for(var a=0,i=e._manipulatorInfos;a<i.length;a++){i[a].manipulator.available=t}})),this.view.trackGraphicState(t)])},t.prototype.destroy=function(){this._clear(),this._handles.destroy()},Object.defineProperty(t.prototype,"inputGeometry",{get:function(){return l.isSome(this._reshapeHelper)?this._reshapeHelper.geometry:null},set:function(e){this._recreateManipulators(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"manipulators",{get:function(){return this.tool.manipulators},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"view",{get:function(){return this.tool.view},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"graphic",{get:function(){return this.tool.graphic},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"enableZ",{get:function(){return this.tool.enableZ},enumerable:!0,configurable:!0}),t.prototype.removeSelectedVertices=function(){var e=this._manipulatorInfos.filter((function(e){return e.manipulator.selected&&"vertex"===e.handle.type}));this._removeVertices(e)},t.prototype.manipulatorSelectionChanged=function(){this.emit("manipulators-changed")},t.prototype._clear=function(){this._moveManipulation&&this._moveManipulation.destroy(),this._graphicMoveManipulation&&this._graphicMoveManipulation.destroy(),this._manipulatorHandles.removeAll(),this.manipulators.removeAll(),this._manipulatorInfos=[],this._graphicMoveManipulation=null,this._moveManipulation=null,this._reshapeHelper=null,this._numGrabbing=0,this._numDragging=0},t.prototype._recreateManipulators=function(e){if(void 0===e&&(e=this.inputGeometry),this._clear(),!l.isNone(e)){this._reshapeHelper=new F(y.EditGeometry.fromGeometry(e,this.view.viewingMode),e.type);for(var t=c.getGraphicEffectiveElevationInfo(this.graphic),a=0,i=this._reshapeHelper.data.components;a<i.length;a++){for(var n=i[a],r=0,o=n.vertices;r<o.length;r++){var s=o[r];this._createPerVertexManipulator(s,t)}for(var p=0,u=n.edges;p<u.length;p++){var h=u[p];this._createPerVertexManipulator(h,t)}}this._createGraphicMoveManipulators(t)}},t.prototype._perGraphicManipulatorDragAction=function(e,t){if("end"!==t.action){for(var a=[],i=this._manipulatorInfos.some((function(e){return"vertex"===e.handle.type&&e.manipulator.selected})),n=1===e&&i,r=l.unwrap(this._reshapeHelper),o=0,s=this._manipulatorInfos;o<s.length;o++){"vertex"===(c=s[o]).handle.type&&(c.manipulator.grabbing||n&&!c.manipulator.selected||(l.unwrap(r).moveVertices([c.handle],t.mapDeltaX,t.mapDeltaY,t.mapDeltaZ),a.push(c.handle.pos),this._updateManipulatorPosition(c)))}if(0!==a.length){for(var p=0,u=0,h=this._manipulatorInfos;u<h.length;u++){var c;"vertex"===(c=h[u]).handle.type&&p++}if(this.outputGeometry=r.geometry,a.length===p){if(this._updateEventState(1),this.destroyed)return;if(this.emit("move",{type:"move",dx:t.screenDeltaX,dy:t.screenDeltaY,mover:this.graphic}),this.destroyed)return}else{if(this._updateEventState(2),this.destroyed)return;if(this.emit("reshape",{type:"reshape",mover:this.graphic}),this.destroyed)return}}}},t.prototype._perVertexManipulatorDragAction=function(e,t){if(this._updateEventState(2),!this.destroyed){var a=t.mapDeltaX,i=t.mapDeltaY,n=t.mapDeltaZ;if(a||i||n){for(var r=[],o=0,s=this._manipulatorInfos;o<s.length;o++){var p=s[o];V(p)&&(p.manipulator.selected&&!p.manipulator.grabbing||p===e)&&r.push(p)}for(var u=l.unwrap(this._reshapeHelper),h=0,c=r;h<c.length;h++){var d=c[h];u.moveVertices([d.handle],a,i,n)}this.outputGeometry=u.geometry;for(var m=0,v=r;m<v.length;m++){d=v[m];this._updateManipulatorPosition(d)}this.emit("reshape",{type:"reshape",mover:this.graphic})}}},t.prototype._updateEventState=function(e){if(e===this._reshapeEventState)return!1;switch(e){case 0:if(0!==this._numGrabbing||0!==this._numDragging)return!1;switch(this._reshapeEventState){case 1:this.emit("move",{type:"move-stop",dx:0,dy:0,mover:this.graphic});break;case 2:this.emit("reshape",{type:"reshape-stop",mover:this.graphic})}break;case 1:switch(this._reshapeEventState){case 0:this.emit("move",{type:"move-start",dx:0,dy:0,mover:this.graphic});break;case 2:this.emit("reshape",{type:"reshape-stop",mover:this.graphic}),this.destroyed||this.emit("move",{type:"move-start",dx:0,dy:0,mover:this.graphic})}break;case 2:switch(this._reshapeEventState){case 0:this.emit("reshape",{type:"reshape-start",mover:this.graphic});break;case 1:this.emit("move",{type:"move-stop",dx:0,dy:0,mover:this.graphic}),this.destroyed||this.emit("reshape",{type:"reshape-start",mover:this.graphic})}}if(this.destroyed)return!1;var t=this._reshapeEventState!==e;return this._reshapeEventState=e,t},t.prototype._createGraphicMoveManipulators=function(e){var t=this;this._graphicMoveManipulation=new G.MoveXYGraphicManipulation({tool:this.tool,view:this.view,graphicState:this._graphicState}),this._manipulatorHandles.add(this._graphicMoveManipulation.createDragPipeline((function(e,a,i){a.next((function(e){return t._trackNumDragging(e)})).next((function(e){t._perGraphicManipulatorDragAction(0,e)})),i.next(t._cancelDragOperation())}))),this._graphicMoveManipulation.forEachManipulator((function(e){return t._manipulatorHandles.add([t._watchAndUpdateGrabState(e,!1),e.events.on("immediate-click",(function(e){t._manipulatorInfos.some((function(e){return e.manipulator.selected}))?t._clearSelection():t.emit("immediate-click"),e.stopPropagation()}))])})),this._moveManipulation=new x.MoveManipulation({tool:this.tool,view:this.view,xyAvailable:!0,xyAxisAvailable:!0,zAvailable:this.enableZ&&g.canMoveZ(this.graphic),snapToScene:!1,radius:x.MoveManipulation.radiusForSymbol(this.graphic.symbol)}),this._moveManipulation.forEachManipulator((function(e){t._handles.add([t._watchAndUpdateGrabState(e,!1),e.events.on("immediate-click",(function(a){t._moveManipulation.zManipulation.hasManipulator(e)||t._manipulatorInfos.some((function(e){return e.manipulator.selected}))||t.emit("immediate-click"),a.stopPropagation()}))])})),this._moveManipulation.elevationInfo={mode:"absolute-height",offset:0};var a=l.unwrap(this.graphic.geometry).spatialReference;this._handles.add([this._moveManipulation.createDragPipeline((function(e,a,i){a.next((function(e){return t._trackNumDragging(e)})).next(I.addMapDelta()).next((function(e){t._perGraphicManipulatorDragAction(1,e)})),i.next(t._cancelDragOperation())}),e,a),s.init(this._graphicState,"displaying",(function(e){t._moveManipulation.xyManipulation.available=e,t._moveManipulation.xyAxisManipulation.available=!0,t._moveManipulation.zManipulation.available=e&&t.enableZ&&g.canMoveZ(t.graphic),t._updateMoveManipulationPosition()})),this._graphicState.on("changed",(function(){return t._updateMoveManipulationPosition()}))]),this._updateMoveManipulationPosition();var i=M.createVisualElements({view:this.view,graphic:this.graphic,forEachManipulator:function(e){if(!t.destroyed){t._graphicMoveManipulation.forEachManipulator(e);for(var a=0,i=t._manipulatorInfos;a<i.length;a++){e(i[a].manipulator,1)}t._moveManipulation.forEachManipulator(e)}},onManipulatorsChanged:function(e){return t.on("manipulators-changed",e)}});this._outlineVisualElement=i.visualElement instanceof S.OutlineVisualElement?i.visualElement:null,l.isSome(this._outlineVisualElement)&&this._manipulatorHandles.add([this._outlineVisualElement.events.on("attachment-origin-changed",(function(){t._graphicState.isDraped||t._updateMoveManipulationPosition()})),this._graphicState.watch("isDraped",(function(){return t._updateMoveManipulationPosition()}))]),this._manipulatorHandles.add(i)},t.prototype._createPerVertexManipulator=function(e,t){var a=this;if(void 0===t&&(t=c.getGraphicEffectiveElevationInfo(this.graphic)),l.isNone(this._vertexManipulatorGeometry)||l.isNone(this._vertexManipulatorOutlineGeometry)){var i=_.settings.reshapeManipulators.vertex,n=(s=i.size/2)/(p=s+i.collisionPadding);this._vertexManipulatorGeometry=new w(H.createSphereGeometry(n,16,16),"reshape-manipulator");var r=(s+i.outlineSize)/p;this._vertexManipulatorOutlineGeometry=new w(H.createSphereGeometry(r,16,16),"reshape-manipulator-outline")}if(l.isNone(this._edgeManipulatorGeometry)||l.isNone(this._edgeManipulatorOutlineGeometry)){var s,p,u=_.settings.reshapeManipulators.edge;n=(s=u.size/2)/(p=s+u.collisionPadding);this._edgeManipulatorGeometry=new w(H.createSphereGeometry(n,16,16),"reshape-manipulator");r=(s+u.outlineSize)/p;this._edgeManipulatorOutlineGeometry=new w(H.createSphereGeometry(r,16,16),"reshape-manipulator-outline")}var h=new d.Manipulator3D({view:this.view,renderObjects:[{geometry:this._vertexManipulatorGeometry,material:this._vertexManipulatorMaterial,stateMask:4|A.Vertex},{geometry:this._vertexManipulatorOutlineGeometry,material:this._vertexManipulatorOutlineMaterial,stateMask:5|A.Vertex},{geometry:this._vertexManipulatorOutlineGeometry,material:this._vertexManipulatorHoverOutlineMaterial,stateMask:6|A.Vertex},{geometry:this._edgeManipulatorGeometry,material:this._vertexManipulatorMaterial,stateMask:6|A.Edge},{geometry:this._vertexManipulatorOutlineGeometry,material:this._vertexManipulatorHoverOutlineMaterial,stateMask:6|A.Edge},{geometry:this._edgeManipulatorGeometry,material:this._edgeManipulatorMaterial,stateMask:5|A.Edge},{geometry:this._edgeManipulatorOutlineGeometry,material:this._edgeManipulatorOutlineMaterial,stateMask:5|A.Edge},{geometry:this._vertexManipulatorGeometry,material:this._selectedManipulatorMaterial,stateMask:8},{geometry:this._vertexManipulatorOutlineGeometry,material:this._selectedManipulatorOutlineMaterial,stateMask:9},{geometry:this._vertexManipulatorOutlineGeometry,material:this._selectedManipulatorHoverOutlineMaterial,stateMask:10}],elevationInfo:t,focusMultiplier:1,touchMultiplier:1,available:!(!this.graphic.visible||!this.graphic.layer.visible)});this._setTypeSpecificManipulatorSettings(h,e,t);var m="edge"===e.type?{manipulator:h,handle:e,locationUpdateHandle:null,type:"edge",selectedIndex:0}:{manipulator:h,handle:e,type:"vertex",selectedIndex:0};if(this._manipulatorInfos.push(m),this.manipulators.add(h),this._updateManipulatorPosition(m),"edge"===m.type){var g=this._getManipulatorInfoFromHandle(m.handle.left).manipulator.events.on("location-update",(function(){return a._updateManipulatorPosition(m)})),M=this._getManipulatorInfoFromHandle(m.handle.right).manipulator.events.on("location-update",(function(){return a._updateManipulatorPosition(m)}));m.locationUpdateHandle=o.handlesGroup([g,M]),this._manipulatorHandles.add(m.locationUpdateHandle,h)}this._manipulatorHandles.add(this._watchAndUpdateGrabState(h,!0),h);var y=I.createManipulatorDragEventPipeline(h,(function(e,t,i){t.next((function(e){return a._trackNumDragging(e)})).next((function(e){return k(m)&&a._splitEdgeManipulator(m),e})).next(v.screenToMapXYForGraphicAtLocation(a.view,a.graphic,e.elevationAlignedLocation,e.location.spatialReference)).next(I.addMapDelta()).next((function(e){"vertex"===m.type?a._perVertexManipulatorDragAction(m,e):console.error("drag operation on non-vertex manipulator not allowed")})),i.next(a._cancelDragOperation())}));return this._manipulatorHandles.add(y,h),this._manipulatorHandles.add([h.events.on("immediate-click",(function(e){return a._manipulatorClickCallback(e,m)})),h.events.on("select-changed",(function(){m.selectedIndex=++a._selectedIndex,a._updateMoveManipulationPosition()}))]),this.emit("manipulators-changed"),h},t.prototype._trackNumDragging=function(e){switch(e.action){case"start":this._numDragging++;break;case"end":this._numDragging--}return e},t.prototype._cancelDragOperation=function(){var e=this,t=l.isSome(this._reshapeHelper)?this._reshapeHelper.geometry.clone():null;return function(){switch(e._numDragging--,e.inputGeometry=t,e.outputGeometry=t,e._reshapeEventState){case 0:break;case 1:e.emit("move",{type:"move",dx:0,dy:0,mover:e.graphic});break;case 2:e.emit("reshape",{type:"reshape",mover:e.graphic})}e.destroyed||e._updateEventState(0)}},t.prototype._setTypeSpecificManipulatorSettings=function(e,t,a){switch(t.type){case"vertex":e.state=A.Vertex,e.selectable=!0,e.cursor="move",e.collisionPriority=2,e.radius=_.settings.reshapeManipulators.vertex.size/2+_.settings.reshapeManipulators.vertex.collisionPadding,e.elevationInfo=a;break;case"edge":e.state=A.Edge,e.selectable=!1,e.cursor="copy",e.collisionPriority=-1,e.radius=_.settings.reshapeManipulators.edge.size/2+_.settings.reshapeManipulators.edge.collisionPadding,e.elevationInfo={mode:"absolute-height",offset:0};break;default:i.neverReached(t)}},t.prototype._watchAndUpdateGrabState=function(e,t){var a=this;return e.events.on("grab-changed",(function(i){if("start"===i.action)t&&a._updateSelection(e),a._numGrabbing++;else if(a._numGrabbing--,a._updateEventState(0),a.destroyed)return;a._moveManipulation.interactive=!a._numGrabbing}))},t.prototype._clearSelection=function(){for(var e=0,t=this._manipulatorInfos;e<t.length;e++){var a=t[e];a.manipulator.grabbing||(a.manipulator.selected=!1)}},t.prototype._updateSelection=function(e){e.grabbing&&!e.selected&&e.selectable&&(this._clearSelection(),e.selected=!0,this.emit("manipulators-changed"))},t.prototype._removeManipulator=function(e){e&&(this._manipulatorHandles.remove(e.manipulator),this._manipulatorInfos.splice(this._manipulatorInfos.indexOf(e),1),this.manipulators.remove(e.manipulator),this.emit("manipulators-changed"))},t.prototype._getManipulatorInfoFromHandle=function(e){if(e)for(var t=0,a=this._manipulatorInfos;t<a.length;t++){var i=a[t];if(e===i.handle)return i}return null},t.prototype._updateManipulatorPosition=function(e){if(e){var t=l.unwrap(this._reshapeHelper);if("vertex"===e.handle.type)e.manipulator.location=t.data.coordinateHelper.toPoint(e.handle.pos,U),e.manipulator.grabbing&&l.isSome(this._vertexLaserLineVisualElement)&&(this._vertexLaserLineVisualElement.visualElement.intersectsWorldUpAtLocation=e.manipulator.renderLocation);else if("edge"===e.handle.type){var a=this._getManipulatorInfoFromHandle(e.handle.left).manipulator.elevationAlignedLocation,i=this._getManipulatorInfoFromHandle(e.handle.right).manipulator.elevationAlignedLocation,n=a.x+.5*(i.x-a.x),r=a.y+.5*(i.y-a.y),o=a.hasZ&&i.hasZ?a.z+.5*(i.z-a.z):void 0;e.manipulator.elevationAlignedLocation=h.makeDehydratedPoint(n,r,o,t.geometry.spatialReference)}}},t.prototype._splitEdgeManipulator=function(e){var t=l.unwrap(this._reshapeHelper),a=l.unwrap(t.splitEdge(e.handle,.5).createdVertex);e.locationUpdateHandle.remove(),e.locationUpdateHandle=void 0;var i=e;i.handle=a,i.type="vertex";var n=c.getGraphicEffectiveElevationInfo(this.graphic);this._setTypeSpecificManipulatorSettings(e.manipulator,e.handle,n),a.left&&this._createPerVertexManipulator(a.left),a.right&&this._createPerVertexManipulator(a.right),this.outputGeometry=t.geometry,this._updateManipulatorPosition(i),this._updateSelection(e.manipulator);var r=t.data.coordinateHelper.toArray(i.handle.pos),o=t.data.components.indexOf(a.component);this.emit("vertex-add",{type:"vertex-add",vertices:[{coordinates:r,componentIndex:o,vertexIndex:l.unwrap(a.index)}],added:r})},t.prototype._updateMoveManipulationPosition=function(){var e=this,t=O.sv3d.get();u.vec3.set(t,0,0,0);for(var a=0,i=!1,n=null,r=null,o=0,s=this._manipulatorInfos;o<s.length;o++){var p=s[o];V(p)&&(p.manipulator.selected?(a++,u.vec3.add(t,t,p.manipulator.renderLocation),l.isNone(n)||p.selectedIndex>n.selectedIndex?(r=n,n=p):(l.isNone(r)||p.selectedIndex>r.selectedIndex)&&(r=p)):i=!0)}if(this._moveManipulation.xyAxisManipulation.orthogonalAvailable=!0,this._moveManipulation.xyAxisManipulation.available=!0,0!==a){var h=0;if(l.isSome(n)){var c=n.handle.pos,d=l.isSome(r)?r.handle.pos:n.handle.left&&n.handle.left.left?n.handle.left.left.pos:null,v=!l.isSome(r)&&n.handle.right&&n.handle.right.right?n.handle.right.right.pos:null;d&&v?this._moveManipulation.xyAxisManipulation.available=!1:d?h=D(d,c):v&&(h=D(c,v))}this._moveManipulation.xyAxisManipulation.orthogonalAvailable=1!==a,this._moveManipulation.angle=h,this._moveManipulation.radius=f.DISC_RADIUS_SMALL}else this._moveManipulation.angleDeferred=function(){return b.primaryShapeOrientation(l.unwrap(e.graphic.geometry))},this._moveManipulation.radius=x.MoveManipulation.radiusForSymbol(this.graphic.symbol);0!==a&&i?(u.vec3.scale(t,t,1/a),U.spatialReference=l.unwrap(this._reshapeHelper).geometry.spatialReference,this.view.renderCoordsHelper.fromRenderCoords(t,U),this._moveManipulation.elevationAlignedLocation=U):l.isSome(this._outlineVisualElement)&&!this._graphicState.isDraped&&l.isSome(this._outlineVisualElement.attachmentOrigin)?this._moveManipulation.elevationAlignedLocation=this._outlineVisualElement.attachmentOrigin:m.placeAtGraphic(this.view,this._moveManipulation,this.graphic)},t.prototype._removeVertices=function(e){for(var t=[],a=l.unwrap(this._reshapeHelper),i=0,n=e;i<n.length;i++){var r=n[i];if("vertex"===r.handle.type&&a.canRemoveVertex()){t.push(r.handle),this._removeManipulator(r),this._removeManipulator(this._getManipulatorInfoFromHandle(r.handle.left)),this._removeManipulator(this._getManipulatorInfoFromHandle(r.handle.right));var o=l.unwrap(a.removeVertices([r.handle]).removedVertices[0].createdEdge);o&&this._createPerVertexManipulator(o)}}if(t.length>0){var s=t.map((function(e){var t=a.data.components.indexOf(e.component);return{coordinates:a.data.coordinateHelper.toArray(e.pos),componentIndex:t,vertexIndex:l.unwrap(e.index)}}));this.outputGeometry=a.geometry;var p=this._updateEventState(2);if(this.destroyed)return;if(this.emit("vertex-remove",{type:"vertex-remove",removed:s.map((function(e){return e.coordinates})),vertices:s}),this.destroyed)return;if(p&&(this._updateEventState(0),this.destroyed))return;this._updateMoveManipulationPosition()}},t.prototype._manipulatorClickCallback=function(e,t){e.shiftKey||this._clearSelection(),"vertex"===t.handle.type&&(t.manipulator.selected=!t.manipulator.selected),"vertex"===t.handle.type&&2===e.button&&this._removeVertices([t]),k(t)&&0===e.button&&this._splitEdgeManipulator(t),e.stopPropagation()},a.__decorate([p.property({constructOnly:!0})],t.prototype,"tool",void 0),a.__decorate([p.property()],t.prototype,"inputGeometry",null),a.__decorate([p.property()],t.prototype,"outputGeometry",void 0),t=a.__decorate([p.subclass("esri.views.3d.interactive.editingTools.graphicReshape3D.ReshapeOperation")],t)}(n.EventedAccessor);function D(e,t){return Math.atan2(t[1]-e[1],t[0]-e[0])+Math.PI/2}function V(e){return"vertex"===e.handle.type}function k(e){return"edge"===e.handle.type}t.ReshapeOperation=P;var A,U=h.makeDehydratedPoint(0,0,null,null);!function(e){e.Vertex=16,e.Edge=32}(A||(A={}));var F=function(e){function t(t,a){var i=e.call(this,t,a)||this;return i.type=a,i._geometry=null,i}return a.__extends(t,e),Object.defineProperty(t.prototype,"geometry",{get:function(){if(this._dirty){switch(this.type){case"polyline":this._geometry=this.data.toPolyline();break;case"polygon":this._geometry=this.data.toPolygon()}this._dirty=!1}return this._geometry},enumerable:!0,configurable:!0}),t}(y.EditGeometryHelper);t.ReshapeGeometryHelper=F}));