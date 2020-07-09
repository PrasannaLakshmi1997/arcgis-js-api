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

define(["require","exports","tslib","../../../../core/pbf","../../../../core/promiseUtils","./BackgroundBucket","./CircleBucket","./Feature","./FillBucket","./LineBucket","./SourceLayerData","./SymbolBucket","../webgl/TileClipper","../../tiling/enums"],(function(e,t,r,i,n,l,s,a,u,o,f,c,h,p){return function(){function e(e,t,r){this._pbfTiles={},this._tileClippers={},this._client=r,this._tile=t,this._layers=t.getLayers();var n=t.tileKey.split("/").map(parseFloat),l=n[0],s=n[1],a=n[2];this._level=l;for(var u=Math.max(8,Math.round(1*this._level)-8),o=0,f=Object.keys(e);o<f.length;o++){var c=f[o],p=e[c];if(this._pbfTiles[c]=new i(new Uint8Array(p.protobuff),new DataView(p.protobuff)),p.refKey){var _=l-p.refKey.split("/").map(parseFloat)[0];if(_>0){var y=(1<<_)-1,v=s&y,B=a&y;this._tileClippers[c]=new h.TileClipper(_,v,B,8,u)}}this._tileClippers[c]||(this._tileClippers[c]=new h.SimpleBuilder)}}return e.prototype.parse=function(e){return r.__awaiter(this,void 0,void 0,(function(){var t,i,l,s,u,o,f,c,h,_,y,v,B,x,g,d,k,D,m,b,w,I,C,V,F,L,T,S,z,M,O,j,K,A,E,H,U,W,q,G,N,R,J,P,Q,X,Y,Z,$,ee,te,re,ie,ne,le,se,ae,ue;return r.__generator(this,(function(r){for(t=e&&e.signal,i=this._parseTileData(this._pbfTiles),l=this._layers,s=this._level,o=[],f=this._tileClippers,c={},h={},_=l.length-1;_>=0;_--)(u=l[_]).minzoom&&s<Math.floor(u.minzoom)||u.maxzoom&&s>=u.maxzoom||u.layout&&u.layout.visibility&&"none"===u.layout.visibility||0!==u.type&&i[u.source]&&f[u.source]&&(z=i[u.source],y=f[u.source],Q=u.sourceLayer,(M=z[Q])&&((v=h[u.source])||(v=h[u.source]=new Set),v.add(u.sourceLayer),(te=this._createBucket(u))&&(te.layerIndex=_,te.layerExtent=M.extent,te.tileClipper=y,(O=c[u.source])||(O=c[u.source]={}),(B=O[Q])||(B=O[Q]=[]),B.push(te))));for(x=10*this._level,g=10*(this._level+1),d=[],k=[],D=[],m=[],b=new Set,w={},I=[],C=[],V=function(e){h[e].forEach((function(t){I.push(t),C.push(e)}))},F=0,L=Object.keys(h);F<L.length;F++)J=L[F],V(J);for(T=0;T<I.length;T++)if(J=C[T],S=I[T],i[J]&&c[J]&&(z=i[J],M=z[S],O=c[J],(X=O[S])&&0!==X.length)){if(n.isAborted(t))return[2,void 0];for(j=M.getData();j.next(2);){if(K=j.getMessage(),A=new a(K,M),K.release(),E=A.values){if((H=E._minzoom)&&H>=g)continue;if((U=E._maxzoom)&&U<=x)continue}for(W=0,q=X;W<q.length;W++)(te=q[W]).pushFeature(A)}}for(G=this._tile,N=0,R=Object.keys(c);N<R.length;N++)for(Q in J=R[N],P=c[J])for(X=P[Q],Y=0,Z=X;Y<Z.length;Y++)(te=Z[Y]).hasFeatures()&&(3===te.layer.type?(d.push(te),G.addBucket(te)):te.layer.refLayerId?D.push(te):(k.push(te),m[te.layer.id]=te));for($=0,ee=d;$<ee.length;$++)te=ee[$],(re=te).getResources(re.tileClipper,b,w);if(this._tile.status===p.TileStatus.INVALID)return[2,n.resolve([])];for(ae in ie=[],ne=this._tile.getWorkerTileHandler(),b.size>0&&(le=ne.fetchSprites(b,this._client,e),ie.push(le)),w)(ue=w[ae]).size>0&&(se=ne.fetchGlyphs(this._tile.tileKey,ae,ue,this._client,e),ie.push(se));return[2,n.all(ie).then((function(){for(var e=0,t=k;e<t.length;e++){var r=t[e];r.processFeatures(r.tileClipper),o.push(r)}for(var i=0,n=D;i<n.length;i++){var l=n[i],s=m[l.layer.refLayerId];s&&(s.assignBufferInfo(l),o.push(l))}for(var a=0,u=d;a<u.length;a++){var f=u[a];f.processFeatures(f.tileClipper),o.push(f)}return o.sort((function(e,t){return e.layerIndex-t.layerIndex})),o}))]}))}))},e.prototype._parseTileData=function(e){for(var t={},r=0,i=Object.keys(e);r<i.length;r++){for(var n=i[r],l=e[n],s={};l.next();)switch(l.tag()){case 3:var a=l.getMessage(),u=new f(a);a.release(),s[u.name]=u;break;default:l.skip()}t[n]=s}return t},e.prototype._createBucket=function(e){switch(e.type){case 0:return this._createBackgroundBucket(e);case 1:return this._createFillBucket(e);case 2:return this._createLineBucket(e);case 4:return this._createCircleBucket(e);case 3:return this._createSymbolBucket(e)}},e.prototype._createBackgroundBucket=function(e){return new l(e,this._level)},e.prototype._createFillBucket=function(e){var t=this._tile;return new u(e,this._level,e.hasDataDrivenFill?t.fillDDVertexBuffer:t.fillVertexBuffer,t.fillIndexBuffer,e.hasDataDrivenOutline?t.outlineDDVertexBuffer:t.outlineVertexBuffer,t.outlineIndexBuffer)},e.prototype._createLineBucket=function(e){var t=this._tile;return new o(e,this._level,e.hasDataDrivenLine?t.lineDDVertexBuffer:t.lineVertexBuffer,t.lineIndexBuffer)},e.prototype._createCircleBucket=function(e){var t=this._tile;return new s(e,this._level,t.circleVertexBuffer,t.circleIndexBuffer)},e.prototype._createSymbolBucket=function(e){var t=this._tile;return new c(e,this._level,e.hasDataDrivenIcon?t.iconDDVertexBuffer:t.iconVertexBuffer,t.iconIndexBuffer,e.hasDataDrivenText?t.textDDVertexBuffer:t.textVertexBuffer,t.textIndexBuffer,t.placementEngine,t.getWorkerTileHandler())},e}()}));