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

define(["require","exports","tslib","../../../intl","../../../core/Handles","../../../core/screenUtils","../../../core/accessorSupport/decorators","../../../symbols/support/svgUtils","../../Widget","./support/utils","../support/styleUtils","../../support/widget"],(function(e,t,s,r,i,a,n,o,l,c,d,p){var h="esri-legend--card__carousel-indicator--activated",y="esri-legend--card",_="esri-legend--stacked",g="esri-legend--card__carousel-title",u="esri-legend--card__carousel-indicator",m="esri-legend--card__interval-separator",v="esri-legend--card__imagery-layer-image--stretched",f="esri-legend--card__image-label",x="esri-legend--card__layer-caption",b="esri-legend--card__label-element",L="esri-legend--card__layer-row",w="esri-legend--card__label-cell",S="esri-legend--card__message",I="esri-legend--card__ramp-label",N="esri-legend--card__section",k="esri-legend--card__relationship-section",T="esri-legend--card__service-caption-text",F="esri-legend--card__service-content",C="esri-legend--card__service",E="esri-legend--card__group-layer",z="esri-legend--card__group-layer-child",R="esri-legend--card__symbol",A="esri-legend--card__size-ramp-row",M="esri-legend--card__symbol-row",O="esri-legend--card__symbol-cell",B="esri-legend--card__carousel-indicator-container",P="esri-legend--card__interval-separators-container",U="esri-legend--card__relationship-label-container",H="esri-legend--card__label-container",W="esri-legend--card__service-caption-container",Z="esri-legend--card__symbol-container",q="esri-legend--card__size-ramp-container",G="esri-legend--card__size-ramp-preview",V="esri-widget__heading",j="esri-legend--card__",D=window.devicePixelRatio;return function(e){function t(t,s){var r=e.call(this,t,s)||this;return r._handles=new i,r._hasIndicators=!1,r._selectedSectionName=null,r._sectionNames=[],r._sectionMap=new Map,r.activeLayerInfos=null,r.layout="stack",r.messages=null,r.messagesCommon=null,r.type="card",r.view=null,r}return s.__extends(t,e),t.prototype.initialize=function(){var e=this;this.own([this.watch("activeLayerInfos",(function(t){e._handles.removeAll(),e._watchForSectionChanges(t)}))])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null},t.prototype.render=function(){var e,t=this;this._hasIndicators="auto"===this.layout&&this.view.container.clientWidth<=768||"stack"===this.layout;var s=this.activeLayerInfos,i=s&&s.toArray().map((function(e){return t._renderLegendForLayer(e)})).filter((function(e){return!!e}));this._hasIndicators?this._selectedSectionName&&-1!==this._sectionNames.indexOf(this._selectedSectionName)||(this._selectedSectionName=this._sectionNames&&this._sectionNames[0]):this._selectedSectionName=null;var a=this._sectionNames.length,n=this._sectionNames.map((function(e,s){var i,n=r.substitute(t.messagesCommon.pagination.pageText,{index:s+1,total:a});return p.tsx("div",{key:e,"aria-label":n,title:n,tabIndex:0,onclick:t._selectSection,onkeydown:t._selectSection,bind:t,class:t.classes(u,(i={},i[h]=t._selectedSectionName===e,i)),"data-section-name":e})})),o=this._hasIndicators&&a>1?p.tsx("div",{class:B,key:"carousel-navigation"},n):null,l=this._hasIndicators?this._sectionMap.get(this._selectedSectionName):i&&i.length?i:null,c=((e={})[_]=this._hasIndicators,e);return p.tsx("div",{class:this.classes(y,c)},o,l||p.tsx("div",{class:S},this.messages.noLegend))},t.prototype._selectSection=function(e){var t=e.target.getAttribute("data-section-name");t&&(this._selectedSectionName=t)},t.prototype._watchForSectionChanges=function(e){var t=this;if(this._generateSectionNames(),e){e.forEach((function(e){var s="activeLayerInfo-"+e.layer.uid+"-version-change";t._handles.remove(s),t._watchForSectionChanges(e.children),t._handles.add(e.watch("version",(function(){return t._generateSectionNames()})),s)}));var s="activeLayerInfos-collection-change";this._handles.remove(s),this._handles.add(e.on("change",(function(){return t._watchForSectionChanges(e)})),s)}},t.prototype._generateSectionNames=function(){this._sectionNames.length=0,this.activeLayerInfos&&this.activeLayerInfos.forEach(this._generateSectionNamesForActiveLayerInfo,this)},t.prototype._generateSectionNamesForActiveLayerInfo=function(e){var t=this;e.children.forEach(this._generateSectionNamesForActiveLayerInfo,this),e.legendElements&&e.legendElements.forEach((function(s,r){t._sectionNames.push(""+j+e.layer.uid+"-type-"+s.type+"-"+r)}))},t.prototype._renderLegendForLayer=function(e){var t,s=this;if(!e.ready)return null;if(e.children.length){var r=e.children.map((function(e){return s._renderLegendForLayer(e)})).toArray();return p.tsx("div",{key:e.layer.uid,class:this.classes(C,E)},p.tsx("div",{class:W},e.title),r)}var i=e.legendElements;if(i&&!i.length)return null;var a=i.some((function(e){return"relationship-ramp"===e.type})),n=i.map((function(t,r){return s._renderLegendForElement(t,e,r,a)})).filter((function(e){return!!e}));if(!n.length)return null;var o=((t={})[z]=!!e.parent,t);return p.tsx("div",{key:e.layer.uid,class:this.classes(C,o)},p.tsx("div",{class:W},p.tsx("div",{class:T},e.title)),p.tsx("div",{class:F},n))},t.prototype._renderLegendForElement=function(e,t,s,r){var i,a=this;void 0===r&&(r=!1);var n="color-ramp"===e.type,o="opacity-ramp"===e.type,l="size-ramp"===e.type,h=t.layer,y=e.title,_=null;if("string"==typeof y)_=y;else if(y){var u=d.getTitle(this.messages,y,n||o);_=y.title?y.title+" ("+u+")":u}var m=""+j+h.uid+"-type-"+e.type+"-"+s,v=this._hasIndicators?p.tsx("div",null,p.tsx("h3",{class:this.classes(V,g)},t.title),p.tsx("h4",{class:this.classes(V,x)},_)):_?p.tsx("h4",{class:this.classes(V,x)},_):null,f=null;if("symbol-table"===e.type){var b=e.infos.map((function(s,r){return a._renderLegendForElementInfo(s,t,e.legendType,r)})).filter((function(e){return!!e}));if(b.length){var L=b[0].properties.classes&&b[0].properties.classes[M],w=((i={})[H]=!L&&!r,i[U]=r,i);f=p.tsx("div",{key:m,class:N},v,p.tsx("div",{class:this.classes(w)},b))}}else"color-ramp"===e.type||"opacity-ramp"===e.type||"heatmap-ramp"===e.type?f=p.tsx("div",{key:m,class:N},v,this._renderLegendForRamp(e,h.opacity)):l?f=p.tsx("div",{key:m,class:N},v,this._renderSizeRamp(e,h.opacity)):"relationship-ramp"===e.type&&(f=p.tsx("div",{key:m,class:this.classes(N,k)},v,c.renderRelationshipRamp(e,this.id,h.opacity)));return f?(this._sectionMap.set(m,f),f):null},t.prototype._renderLegendForElementInfo=function(e,t,s,r){var i,a,n,o,l,c=t.layer;if(e.type)return this._renderLegendForElement(e,t,r);var h=d.isImageryStretchedLegend(c,s);if(e.symbol&&e.preview){if(-1===e.symbol.type.indexOf("simple-fill")){if(!e.label)return p.tsx("div",{key:r,bind:e.preview,afterCreate:d.attachToNode});var y=((i={})[O]=this._hasIndicators,i);return p.tsx("div",{key:r,class:this.classes(L,(a={},a[M]=this._hasIndicators,a))},p.tsx("div",{class:this.classes(y),bind:e.preview,afterCreate:d.attachToNode}),p.tsx("div",{class:this.classes(f,(n={},n[w]=this._hasIndicators,n))},d.getTitle(this.messages,e.label,!1)||""))}var _=255,g=255,u=255,m=0,v=255,x=255,S=255,I=0,N=e.symbol.color&&e.symbol.color.a,k=e.symbol.outline&&e.symbol.outline.color&&e.symbol.outline.color.a;N&&(_=e.symbol.color.r,g=e.symbol.color.g,u=e.symbol.color.b,m=e.symbol.color.a*c.opacity),k&&(v=e.symbol.outline.color.r,x=e.symbol.outline.color.g,S=e.symbol.outline.color.b,I=e.symbol.outline.color.a*c.opacity);var T=null===(l=null===(o=e.symbol.color)||void 0===o?void 0:o.isBright)||void 0===l||l,F=T?"rgba(255, 255, 255, .6)":"rgba(0, 0, 0, .6)",C={background:N?"rgba("+_+", "+g+", "+u+", "+m+")":"none",color:T?"black":"white",textShadow:"-1px -1px 0 "+F+",\n                                              1px -1px 0 "+F+",\n                                              -1px 1px 0 "+F+",\n                                              1px 1px 0 "+F,border:k?"1px solid rgba("+v+", "+x+", "+S+", "+I+")":"none"};return p.tsx("div",{key:r,class:L},p.tsx("div",{class:b,styles:C}," ",e.label," "))}if(e.src){var E=this._renderImage(e,c,h);return p.tsx("div",{key:r,class:L},E,p.tsx("div",{class:f},e.label||""))}},t.prototype._renderImage=function(e,t,s){var r,i=e.label,a=e.src,n=e.opacity,o=((r={})[v]=s,r[R]=!s,r),l={opacity:""+(null!=n?n:t.opacity)};return p.tsx("img",{alt:d.getTitle(this.messages,i,!1),src:a,border:0,width:e.width,height:e.height,class:this.classes(o),styles:l})},t.prototype._renderSizeRampLines=function(e){var t=e.infos,s=t[0],r=t[t.length-1],i=s.symbol,n=this._hasIndicators,o=a.pt2px(s.size+s.outlineSize)*D,l=a.pt2px(r.size+r.outlineSize)*D,c=n?o:o+50*D,h=n?o/2+50*D:o,y=function(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var s=e.symbolLayers.getItemAt(t-1).get("resource.primitive");return"triangle"===s||"cone"===s||"tetrahedron"===s}return"triangle"===e.style}}(i),_=function(e){if(e){if(e.type.indexOf("3d")>-1){var t=e.symbolLayers&&e.symbolLayers.length;if(!t)return;var s=e.symbolLayers.getItemAt(t-1),r=s.resource&&s.resource.primitive;return"circle"===r||"cross"===r||"kite"===r||"sphere"===r||"cube"===r||"diamond"===r}var i=e.style;return"circle"===i||"diamond"===i||"cross"===i}}(i),g=document.createElement("canvas");g.width=c,g.height=h,g.style.width=g.width/D+"px",g.style.height=g.height/D+"px";var u=g.getContext("2d");if(n){u.beginPath();var m=c/2-l/2,v=h;u.moveTo(0,0),u.lineTo(m,v);var f=c,x=c/2+l/2,b=h;u.moveTo(f,0),u.lineTo(x,b)}else{u.beginPath();var L=h/2-l/2,w=c;u.moveTo(0,L),u.lineTo(w,0);var S=h/2+l/2,I=c,N=h;u.moveTo(0,S),u.lineTo(I,N)}return u.strokeStyle="#ddd",u.stroke(),p.tsx("div",{bind:g,afterCreate:d.attachToNode,styles:n?{display:"flex",marginTop:"-"+(y?0:_?o/2:0)+"px",marginBottom:"-"+(y?l:_?l/2:0)+"px"}:{display:"flex",marginRight:"-"+(y?0:_?o/2:0)+"px",marginLeft:"-"+(y?0:_?l/2:0)+"px"}})},t.prototype._renderSizeRamp=function(e,t){var s,r=e.infos,i=r[0].label,a=r[r.length-1].label,n=r[0].preview,o=r[r.length-1].preview,l=this._hasIndicators,c={"flex-direction":l?"column":"row-reverse"};n&&((n=n.cloneNode(!0)).style.display="flex"),o&&((o=o.cloneNode(!0)).style.display="flex");var h={opacity:null!=t?""+t:""};return p.tsx("div",{class:this.classes(L,(s={},s[A]=l,s))},p.tsx("div",{class:I},l?i:a),p.tsx("div",{class:q,styles:c},p.tsx("div",{bind:n,afterCreate:d.attachToNode,class:G,styles:h}),this._renderSizeRampLines(e),p.tsx("div",{bind:o,afterCreate:d.attachToNode,class:q,styles:h})),p.tsx("div",{class:I},l?a:i))},t.prototype._renderLegendForRamp=function(e,t){var s=e.infos,r="heatmap-ramp"===e.type,i=s.length-1,a=i>2&&!r?25*i:100,n=a+20,l=s.slice(0).reverse();l.forEach((function(e,t){e.offset=r?e.ratio:t/i}));var c=l.length-1,d=l.length%2!=0&&l[l.length/2|0],h=d&&p.tsx("div",{class:P},p.tsx("div",{class:m},"|"),p.tsx("div",{class:I},d.label)),y=s[s.length-1].label,_=s[0].label,g=null;null!=t&&(g="opacity: "+t);var u=[[{shape:{type:"path",path:"M0 12.5 L10 0 L10 25 Z"},fill:l[0].color,stroke:{width:0}},{shape:{type:"rect",x:10,y:0,width:a,height:25},fill:{type:"linear",x1:10,y1:0,x2:a+10,y2:0,colors:l},stroke:{width:0}},{shape:{type:"path",path:"M"+(a+10)+" 0 L"+n+" 12.5 L"+(a+10)+" 25 Z"},fill:l[c].color,stroke:{width:0}}]],v=o.renderSVG(u,n,25),f=this.messages;return p.tsx("div",{class:L},p.tsx("div",{class:I},r?f[y]:y),p.tsx("div",{class:Z},p.tsx("div",{style:g},v),h),p.tsx("div",{class:I},r?f[_]:_))},s.__decorate([p.renderable(),n.property()],t.prototype,"activeLayerInfos",void 0),s.__decorate([n.property()],t.prototype,"layout",void 0),s.__decorate([n.property(),p.renderable(),p.messageBundle("esri/widgets/Legend/t9n/Legend")],t.prototype,"messages",void 0),s.__decorate([n.property(),p.renderable(),p.messageBundle("esri/t9n/common")],t.prototype,"messagesCommon",void 0),s.__decorate([n.property({readOnly:!0})],t.prototype,"type",void 0),s.__decorate([n.property()],t.prototype,"view",void 0),s.__decorate([p.accessibleHandler()],t.prototype,"_selectSection",null),t=s.__decorate([n.subclass("esri.widgets.Legend.styles.Card")],t)}(l)}));