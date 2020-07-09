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

define(["../quickselect/quickselect"],(function(t){"use strict";function i(t,n){if(!(this instanceof i))return new i(t,n);this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),n&&("function"==typeof n?this.toBBox=n:this._initFormat(n)),this.clear()}function n(t,i,n){if(!n)return i.indexOf(t);for(var h=0;h<i.length;h++)if(n(t,i[h]))return h;return-1}function h(t,i){a(t,0,t.children.length,i,t)}function a(t,i,n,h,a){a||(a=u(null)),a.minX=1/0,a.minY=1/0,a.maxX=-1/0,a.maxY=-1/0;for(var r,o=i;o<n;o++)r=t.children[o],e(a,t.leaf?h(r):r);return a}function e(t,i){return t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY),t}function r(t,i){return t.minX-i.minX}function o(t,i){return t.minY-i.minY}function s(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function l(t){return t.maxX-t.minX+(t.maxY-t.minY)}function c(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function m(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function u(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function f(i,n,h,a,e){for(var r,o=[n,h];o.length;)(h=o.pop())-(n=o.pop())<=a||(r=n+Math.ceil((h-n)/a/2)*a,t(i,r,n,h,e),o.push(n,r,r,h))}return i.prototype={all:function(){return this._all(this.data,[])},search:function(t){var i=this.data,n=[],h=this.toBBox;if(!m(t,i))return n;for(var a,e,r,o,s=[];i;){for(a=0,e=i.children.length;a<e;a++)r=i.children[a],m(t,o=i.leaf?h(r):r)&&(i.leaf?n.push(r):c(t,o)?this._all(r,n):s.push(r));i=s.pop()}return n},collides:function(t){var i=this.data,n=this.toBBox;if(!m(t,i))return!1;for(var h,a,e,r,o=[];i;){for(h=0,a=i.children.length;h<a;h++)if(e=i.children[h],m(t,r=i.leaf?n(e):e)){if(i.leaf||c(t,r))return!0;o.push(e)}i=o.pop()}return!1},load:function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var i=0,n=t.length;i<n;i++)this.insert(t[i]);return this}var h=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===h.height)this._splitRoot(this.data,h);else{if(this.data.height<h.height){var a=this.data;this.data=h,h=a}this._insert(h,this.data.height-h.height-1,!0)}else this.data=h;return this},insert:function(t){return t&&this._insert(t,this.data.height-1),this},clear:function(){return this.data=u([]),this},remove:function(t,i){if(!t)return this;for(var h,a,e,r,o=this.data,s=this.toBBox(t),l=[],m=[];o||l.length;){if(o||(o=l.pop(),a=l[l.length-1],h=m.pop(),r=!0),o.leaf&&-1!==(e=n(t,o.children,i)))return o.children.splice(e,1),l.push(o),this._condense(l),this;r||o.leaf||!c(o,s)?a?(h++,o=a.children[h],r=!1):o=null:(l.push(o),m.push(h),h=0,a=o,o=o.children[0])}return this},toBBox:function(t){return t},compareMinX:r,compareMinY:o,toJSON:function(){return this.data},fromJSON:function(t){return this.data=t,this},_all:function(t,i){for(var n=[];t;)t.leaf?i.push.apply(i,t.children):n.push.apply(n,t.children),t=n.pop();return i},_build:function(t,i,n,a){var e,r=n-i+1,o=this._maxEntries;if(r<=o)return h(e=u(t.slice(i,n+1)),this.toBBox),e;a||(a=Math.ceil(Math.log(r)/Math.log(o)),o=Math.ceil(r/Math.pow(o,a-1))),(e=u([])).leaf=!1,e.height=a;var s,l,c,m,x=Math.ceil(r/o),d=x*Math.ceil(Math.sqrt(o));for(f(t,i,n,d,this.compareMinX),s=i;s<=n;s+=d)for(f(t,s,c=Math.min(s+d-1,n),x,this.compareMinY),l=s;l<=c;l+=x)m=Math.min(l+x-1,c),e.children.push(this._build(t,l,m,a-1));return h(e,this.toBBox),e},_chooseSubtree:function(t,i,n,h){for(var a,e,r,o,l,c,m,u,f,x;h.push(i),!i.leaf&&h.length-1!==n;){for(m=u=1/0,a=0,e=i.children.length;a<e;a++)l=s(r=i.children[a]),f=t,x=r,(c=(Math.max(x.maxX,f.maxX)-Math.min(x.minX,f.minX))*(Math.max(x.maxY,f.maxY)-Math.min(x.minY,f.minY))-l)<u?(u=c,m=l<m?l:m,o=r):c===u&&l<m&&(m=l,o=r);i=o||i.children[0]}return i},_insert:function(t,i,n){var h=this.toBBox,a=n?t:h(t),r=[],o=this._chooseSubtree(a,this.data,i,r);for(o.children.push(t),e(o,a);i>=0&&r[i].children.length>this._maxEntries;)this._split(r,i),i--;this._adjustParentBBoxes(a,r,i)},_split:function(t,i){var n=t[i],a=n.children.length,e=this._minEntries;this._chooseSplitAxis(n,e,a);var r=this._chooseSplitIndex(n,e,a),o=u(n.children.splice(r,n.children.length-r));o.height=n.height,o.leaf=n.leaf,h(n,this.toBBox),h(o,this.toBBox),i?t[i-1].children.push(o):this._splitRoot(n,o)},_splitRoot:function(t,i){this.data=u([t,i]),this.data.height=t.height+1,this.data.leaf=!1,h(this.data,this.toBBox)},_chooseSplitIndex:function(t,i,n){var h,e,r,o,l,c,m,u,f,x,d,p,M,X;for(c=m=1/0,h=i;h<=n-i;h++)e=a(t,0,h,this.toBBox),r=a(t,h,n,this.toBBox),f=e,x=r,d=void 0,p=void 0,M=void 0,X=void 0,d=Math.max(f.minX,x.minX),p=Math.max(f.minY,x.minY),M=Math.min(f.maxX,x.maxX),X=Math.min(f.maxY,x.maxY),o=Math.max(0,M-d)*Math.max(0,X-p),l=s(e)+s(r),o<c?(c=o,u=h,m=l<m?l:m):o===c&&l<m&&(m=l,u=h);return u},_chooseSplitAxis:function(t,i,n){var h=t.leaf?this.compareMinX:r,a=t.leaf?this.compareMinY:o;this._allDistMargin(t,i,n,h)<this._allDistMargin(t,i,n,a)&&t.children.sort(h)},_allDistMargin:function(t,i,n,h){t.children.sort(h);var r,o,s=this.toBBox,c=a(t,0,i,s),m=a(t,n-i,n,s),u=l(c)+l(m);for(r=i;r<n-i;r++)o=t.children[r],e(c,t.leaf?s(o):o),u+=l(c);for(r=n-i-1;r>=i;r--)o=t.children[r],e(m,t.leaf?s(o):o),u+=l(m);return u},_adjustParentBBoxes:function(t,i,n){for(var h=n;h>=0;h--)e(i[h],t)},_condense:function(t){for(var i,n=t.length-1;n>=0;n--)0===t[n].children.length?n>0?(i=t[n-1].children).splice(i.indexOf(t[n]),1):this.clear():h(t[n],this.toBBox)},_initFormat:function(t){var i=["return a"," - b",";"];this.compareMinX=new Function("a","b",i.join(t[0])),this.compareMinY=new Function("a","b",i.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")}},i}));