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

define(["require","exports","tslib","../../core/Collection","../../core/has","../../core/promiseUtils","../../layers/support/lazyLayerLoader","../PortalItem","./featureCollectionUtils","./portalLayers","../../renderers/support/styleUtils"],(function(e,r,a,t,n,i,y,o,l,L,c){Object.defineProperty(r,"__esModule",{value:!0});var u=n("esri-debug-messages"),s={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISMapServiceLayer:"MapImageLayer",PointCloudLayer:"PointCloudLayer",ArcGISSceneServiceLayer:"SceneLayer",IntegratedMeshLayer:"IntegratedMeshLayer",BuildingSceneLayer:"BuildingSceneLayer",ArcGISTiledElevationServiceLayer:"ElevationLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",GroupLayer:"GroupLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",VectorTileLayer:"VectorTileLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer",KML:"KMLLayer",RasterDataLayer:"UnsupportedLayer"},p={ArcGISTiledElevationServiceLayer:"ElevationLayer",DefaultTileLayer:"ElevationLayer",RasterDataElevationLayer:"UnsupportedLayer"},d={ArcGISTiledMapServiceLayer:"TileLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",OpenStreetMap:"OpenStreetMapLayer",WebTiledLayer:"WebTileLayer",VectorTileLayer:"VectorTileLayer",ArcGISImageServiceLayer:"UnsupportedLayer",WMS:"UnsupportedLayer",ArcGISMapServiceLayer:"UnsupportedLayer",DefaultTileLayer:"TileLayer"},S={ArcGISFeatureLayer:"FeatureLayer",ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISStreamLayer:"StreamLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",VectorTileLayer:"VectorTileLayer",GroupLayer:"GroupLayer",WebTiledLayer:"WebTileLayer",CSV:"CSVLayer",GeoRSS:"GeoRSSLayer",KML:"KMLLayer",WFS:"UnsupportedLayer",SubtypeGroupLayer:"UnsupportedLayer",WMS:"WMSLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",DefaultTileLayer:"TileLayer"},g={ArcGISImageServiceLayer:"ImageryLayer",ArcGISImageServiceVectorLayer:"UnsupportedLayer",ArcGISMapServiceLayer:"MapImageLayer",ArcGISTiledImageServiceLayer:"ImageryTileLayer",ArcGISTiledMapServiceLayer:"TileLayer",OpenStreetMap:"OpenStreetMapLayer",VectorTileLayer:"VectorTileLayer",WebTiledLayer:"WebTileLayer",BingMapsAerial:"BingMapsLayer",BingMapsRoad:"BingMapsLayer",BingMapsHybrid:"BingMapsLayer",WMS:"WMSLayer",DefaultTileLayer:"TileLayer"};function v(e,r,t){return a.__awaiter(this,void 0,void 0,(function(){var n;return a.__generator(this,(function(a){switch(a.label){case 0:return(n=new e).read(r,t.context),"group"===n.type&&f(r)?[4,G(n,r,t.context)]:[3,2];case 1:a.sent(),a.label=2;case 2:return[4,c.loadStyleRenderer(n,t.context)];case 3:return a.sent(),[2,n]}}))}))}function I(e,r){return a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(a){switch(a.label){case 0:return[4,M(e,r)];case 1:return[2,v(a.sent(),e,r)]}}))}))}function M(e,r){return a.__awaiter(this,void 0,void 0,(function(){var t,n,i,c,u,v,I,M,h;return a.__generator(this,(function(a){switch(a.label){case 0:return t=r.context,n=function(e){var r;switch(e.origin){case"web-scene":switch(e.layerContainerType){case"basemap":r=d;break;case"ground":r=p;break;default:r=s}break;default:switch(e.layerContainerType){case"basemap":r=g;break;default:r=S}}return r}(t),!(i=e.layerType||e.type)&&r&&r.defaultLayerType&&(i=r.defaultLayerType),c=n[i],u=c?y.layerLookupMap[c]:y.layerLookupMap.UnknownLayer,v=t&&t.portal,T(e)?e.itemId?[4,(I=new o({id:e.itemId,portal:v})).load()]:[3,3]:[3,4];case 1:return a.sent(),[4,L.selectLayerClassPath(I)];case 2:M=a.sent(),h=M.className||"UnknownLayer",u=y.layerLookupMap[h],a.label=3;case 3:return[3,8];case 4:return"ArcGISFeatureLayer"!==i?[3,8]:[4,l.isMapNotesLayer(e,v)];case 5:return a.sent()?(u=y.layerLookupMap.MapNotesLayer,[3,8]):[3,6];case 6:return[4,l.isRouteLayer(e,v)];case 7:a.sent()?u=y.layerLookupMap.RouteLayer:f(e)&&(u=y.layerLookupMap.GroupLayer),a.label=8;case 8:return e.wmtsInfo&&e.wmtsInfo.url&&e.wmtsInfo.layerIdentifier&&(u=y.layerLookupMap.WMTSLayer),[2,u()]}}))}))}function f(e){if("ArcGISFeatureLayer"!==e.layerType||T(e))return!1;var r=e.featureCollection;return!!(r&&r.layers&&r.layers.length>1)}function T(e){return"Feature Collection"===e.type}function h(e,r,n){return a.__awaiter(this,void 0,void 0,(function(){var i,y,o;return a.__generator(this,(function(a){switch(a.label){case 0:return i=new t,y=m(i,Array.isArray(r.layers)?r.layers:[],n),[4,e];case 1:return o=a.sent(),[4,y];case 2:return a.sent(),"group"===o.type?(o.layers.addMany(i),[2,o]):[2,void 0]}}))}))}function G(e,r,t){return a.__awaiter(this,void 0,void 0,(function(){var n,i,o,l;return a.__generator(this,(function(a){switch(a.label){case 0:return[4,(0,y.layerLookupMap.FeatureLayer)()];case 1:return n=a.sent(),i=r.featureCollection,o=i.showLegend,l=i.layers.map((function(e){var r=new n;return r.read(e,t),null!=o&&r.read({showLegend:o},t),r})),e.layers.addMany(l),[2]}}))}))}function m(e,r,t){return a.__awaiter(this,void 0,void 0,(function(){var n,y,o,l,L,c,s,p,d;return a.__generator(this,(function(a){switch(a.label){case 0:if(!r)return[2];for(n=[],y=0,o=r;y<o.length;y++)l=o[y],L=I(l,t),"GroupLayer"===l.layerType?n.push(h(L,l,t)):n.push(L);return[4,i.eachAlways(n)];case 1:for(c=a.sent(),s=0,p=c;s<p.length;s++)d=p[s],u&&d.error?console.error(d.error.toString?d.error.toString():d.error):!d.value||t.filter&&!t.filter(d.value)||e.add(d.value);return[2]}}))}))}r.createLayer=I,r.populateOperationalLayers=function(e,r,t){return a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(a){return[2,m(e,r,t)]}))}))}}));