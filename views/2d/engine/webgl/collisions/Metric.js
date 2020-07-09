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

define(["require","exports","../../../../../core/Logger","../../../../../core/libs/gl-matrix-2/vec2f32","../definitions","./BoundingBox","../util/serializationUtils"],(function(t,e,i,s,o,n,h){Object.defineProperty(e,"__esModule",{value:!0});var r=i.getLogger("esri/views/2d/engine/webgl/collisions/Metric"),a=function(){function t(t,e,i,o,n){this.id=t,this.range=e,this.boxes=null,this.minZoom=-1,this.size=0,this.directionX=0,this.directionY=0,this.offsetX=0,this.offsetY=0,this.placementPadding=0,this.anchor=s.vec2f32.fromValues(i,o),this.baseZoom=n}return t.prototype.add=function(t,e,i){t.x=t.x+e,t.y=t.y+i,this.bounds?this.boxes?(this.boxes.push(t),this.bounds.extend(t)):(this.boxes=[this.bounds,t],this.bounds=this.bounds.clone(),this.bounds.extend(t)):this.bounds=t},t.prototype.computeIndex=function(){var t=this.anchor[0],e=this.anchor[1],i=Math.floor(t/o.COLLISION_BUCKET_SIZE),s=Math.floor(e/o.COLLISION_BUCKET_SIZE);this.xBucket=i,this.yBucket=s;var n=o.TILE_SIZE/o.COLLISION_BUCKET_SIZE;if(this.hasVV)return this.xOverflow=n,void(this.yOverflow=n);this.xOverflow=Math.min(n,Math.ceil(2*this.bounds.width/o.COLLISION_BUCKET_SIZE)),this.yOverflow=Math.min(n,Math.ceil(2*this.bounds.height/o.COLLISION_BUCKET_SIZE))},t.prototype.findCollisionDelta=function(t){var e=this.bounds.findCollisionDelta(t.bounds),i=this.boxes&&this.boxes.length,s=t.boxes&&t.boxes.length;return Math.abs(e)>o.COLLISION_MAX_ZOOM_DELTA||!i&&!s?e:i&&s?this._boxesToBoxes(t):i?this._boxesToBox(t):this._boxToBoxes(t)},t.prototype.computeVVOffset=function(t,e){e||r.error("mapview-labeling","Unable to compute label offset. Expected an evaluator function but found "+e);var i=this.size;if(this.hasVV){var s=e(t);i=isNaN(s)||null==s||s===1/0?this.size:s}this._computeOffset(i)},t.prototype.setPlacementOffset=function(t,e,i,s,o){this.hasVV=t,this.size=e,this.placementPadding=Math.round(i),this.directionX=s,this.directionY=o},t.prototype.clone=function(){var e=new t(this.id,this.range,this.anchor[0],this.anchor[1],this.baseZoom);return e.minZoom=this.minZoom,this.bounds&&(e.bounds=this.bounds.clone()),this.boxes&&(e.boxes=this.boxes.map((function(t){return t.clone()}))),e.xBucket=this.xBucket,e.yBucket=this.yBucket,e.xOverflow=this.xOverflow,e.yOverflow=this.yOverflow,e.hasVV=this.hasVV,e.size=this.size,e.directionX=this.directionX,e.directionY=this.directionY,e.offsetX=this.offsetX,e.offsetY=this.offsetY,e},t.prototype._boxToBoxes=function(t){for(var e=-1/0,i=0,s=t.boxes;i<s.length;i++){var o=s[i],n=this.bounds.findCollisionDelta(o);e=Math.max(n,e)}return e},t.prototype._boxesToBox=function(t){for(var e=this.boxes[0].findCollisionDelta(t.bounds),i=1;i<this.boxes.length;i++){var s=this.boxes[i].findCollisionDelta(t.bounds);e=Math.max(s,e)}return e},t.prototype._boxesToBoxes=function(t){for(var e=-1/0,i=0;i<this.boxes.length;i++)for(var s=this.boxes[i],o=0,n=t.boxes;o<n.length;o++){var h=n[o],r=s.findCollisionDelta(h);e=Math.max(r,e)}return e},t.prototype._computeOffset=function(t){this.offsetX=this.directionX*(t/2+this.placementPadding),this.offsetY=this.directionY*(t/2+this.placementPadding)},t.prototype.serialize=function(t){return t.push(this.id),this.bounds.serialize(t),t.push(this.range.from),t.push(this.range.count),t.push(this.anchor[0]),t.push(this.anchor[1]),t.push(this.baseZoom),t.push(this.hasVV?1:0),t.push(this.size),t.writeF32(this.directionX),t.writeF32(this.directionY),t.push(this.offsetX),t.push(this.offsetY),t.push(this.placementPadding),h.serializeList(t,this.boxes),t},t.deserialize=function(e){var i=e.readInt32(),s=n.default.deserialize(e),o={from:e.readInt32(),count:e.readInt32()},r=e.readInt32(),a=e.readInt32(),f=e.readInt32(),u=e.readInt32(),d=e.readInt32(),l=e.readF32(),c=e.readF32(),b=e.readInt32(),x=e.readInt32(),p=e.readInt32(),m=h.deserializeList(e,n.default),I=new t(i,o,r,a,f);return I.bounds=s,I.boxes=m,I.setPlacementOffset(!!u,d,p,l,c),I.offsetX=b,I.offsetY=x,I.computeIndex(),u||I._computeOffset(d),I},t}();e.default=a}));