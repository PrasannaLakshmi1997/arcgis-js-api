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

define(["require","exports","tslib","../../core/Accessor","../../core/Collection","../../core/HandleOwner","../../core/Identifiable","../../core/watchUtils","../../core/accessorSupport/decorators","../../layers/support/Sublayer","../../support/actions/ActionBase","../../support/actions/ActionButton","../../support/actions/ActionSlider","../../support/actions/ActionToggle","./ListItemPanel","./support/layerListUtils"],(function(e,t,r,i,o,n,a,l,s,p,d,c,y,u,h,_){var f=o.ofType({key:"type",defaultKeyValue:"button",base:d,typeMap:{button:c,toggle:u,slider:y}}),v=o.ofType(f);return function(e){function t(t){var r=e.call(this,t)||this;return r.actionsSections=new v,r.actionsOpen=!1,r.children=new(o.ofType(i)),r.childrenSortable=!0,r.error=null,r.layer=null,r.layerView=null,r.open=!1,r.panel=null,r.parent=null,r.sortable=!0,r.view=null,r.visible=null,r}var i;return r.__extends(t,e),i=t,t.prototype.initialize=function(){var e=this;this.handles.add([l.init(this,"layer",(function(t){return e._watchLayerProperties(t)})),l.init(this,"view",(function(t){return e._updateChildren(t)})),l.init(this,"panel",(function(t){return e._setListItemOnPanel(t)})),l.init(this,["layer","view"],(function(){return e._getLayerView()}))])},t.prototype.destroy=function(){this.view=null},t.prototype.castPanel=function(e){return this.get("panel.open")&&!e.hasOwnProperty("open")&&(e.open=!0),e?new h(e):null},Object.defineProperty(t.prototype,"title",{get:function(){var e=this.get("layer.layer");return(!e||e&&this.get("layer.layer.loaded"))&&this.get("layer.title")||""},set:function(e){void 0!==e?this._override("title",e):this._clearOverride("title")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){var e=this.layerView;return e?e.updating:this._isLayerUpdating(this.layer)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visibleAtCurrentScale",{get:function(){return!_.isLayerOutsideScaleRange(this.layer,this.get("view.scale"))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visibilityMode",{get:function(){return _.findLayerVisibilityMode(this.layer)},enumerable:!0,configurable:!0}),t.prototype.clone=function(){return new i({actionsSections:this.actionsSections.clone(),actionsOpen:this.actionsOpen,children:this.children.clone(),layer:this.layer,open:this.open,panel:this.panel,title:this.title,view:this.view,visible:this.visible})},t.prototype._setListItemOnPanel=function(e){e&&(e.listItem=this)},t.prototype._updateChildren=function(e){var t=this.children;t&&t.forEach((function(t){return t.view=e}))},t.prototype._addChildren=function(e){var t=this;if(this.handles.remove("child-list-mode"),this.children.removeAll(),e){e.forEach((function(r){t.handles.add(l.watch(r,"listMode",(function(){return t._addChildren(e)})),"child-list-mode")}));var r=[];e.filter((function(e){return"hide"!==_.findLayerListMode(e)})).forEach((function(e){if(_.canDisplayLayer(e)){var o=new i({layer:e,parent:t,view:t.view});r.unshift(o)}})),this.children.addMany(r)}},t.prototype._watchSublayerChanges=function(e){var t=this;e&&this.handles.add(e.on("change",(function(){t._addChildren(e)})),"layer")},t.prototype._initializeChildLayers=function(e){this._addChildren(e),this._watchSublayerChanges(e)},t.prototype._watchLayerProperties=function(e){var t=this;if(this.handles&&(this.handles.remove("layer"),this.handles.remove("child-list-mode"),e))if(this.handles.add(l.watch(e,"listMode",(function(){return t._watchLayerProperties(e)})),"layer"),"hide-children"!==_.findLayerListMode(e)){var r=_.getNormalizedChildLayerProperty(e);r&&this.handles.add(l.init(e,r,(function(){e.hasOwnProperty(r)&&t._initializeChildLayers(e[r])})),"layer")}else this.children.removeAll()},t.prototype._getLayerView=function(){return r.__awaiter(this,void 0,void 0,(function(){var e,t,i,o;return r.__generator(this,(function(r){switch(r.label){case 0:if(t=(e=this).layer,i=e.view,!t||!i)return[2];r.label=1;case 1:return r.trys.push([1,3,,4]),[4,i.whenLayerView(t)];case 2:return(o=r.sent()).layer!==this.layer?[2]:(this._set("layerView",o),[3,4]);case 3:return r.sent(),[3,4];case 4:return[2]}}))}))},t.prototype._isLayerUpdating=function(e){return!(e instanceof p)&&(e&&"loading"===e.loadStatus)},r.__decorate([s.property({type:v})],t.prototype,"actionsSections",void 0),r.__decorate([s.property()],t.prototype,"actionsOpen",void 0),r.__decorate([s.property({type:o})],t.prototype,"children",void 0),r.__decorate([s.property()],t.prototype,"childrenSortable",void 0),r.__decorate([s.aliasOf("layer.loadError?")],t.prototype,"error",void 0),r.__decorate([s.property()],t.prototype,"layer",void 0),r.__decorate([s.property({readOnly:!0})],t.prototype,"layerView",void 0),r.__decorate([s.property()],t.prototype,"open",void 0),r.__decorate([s.property({type:h})],t.prototype,"panel",void 0),r.__decorate([s.cast("panel")],t.prototype,"castPanel",null),r.__decorate([s.property()],t.prototype,"parent",void 0),r.__decorate([s.property()],t.prototype,"sortable",void 0),r.__decorate([s.property({dependsOn:["layer.layer?.loaded","layer.title"]})],t.prototype,"title",null),r.__decorate([s.property({dependsOn:["layer.loadStatus?","layerView.updating"],readOnly:!0})],t.prototype,"updating",null),r.__decorate([s.property({value:null})],t.prototype,"view",void 0),r.__decorate([s.aliasOf("layer.visible")],t.prototype,"visible",void 0),r.__decorate([s.property({dependsOn:["layer.minScale?","layer.maxScale?","view.scale"],readOnly:!0})],t.prototype,"visibleAtCurrentScale",null),r.__decorate([s.property({dependsOn:["layer.visibilityMode?","layer.capabilities?.exportMap?.supportsSublayerVisibility","layer.layer?.capabilities?.exportMap?.supportsSublayerVisibility"],readOnly:!0})],t.prototype,"visibilityMode",null),t=i=r.__decorate([s.subclass("esri.widgets.LayerList.ListItem")],t)}(a.IdentifiableMixin(n.HandleOwnerMixin(i)))}));