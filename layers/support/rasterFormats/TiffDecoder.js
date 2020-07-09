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

define(["require","exports","tslib","../rasterDatasets/byteStreamUtils","./Jpg","./TiffTags","./Zlib"],(function(e,t,a,n,r,i,s){Object.defineProperty(t,"__esModule",{value:!0});var l,f,u=(l=new ArrayBuffer(4),f=new Uint8Array(l),new Uint32Array(l)[0]=1,1===f[0]),o=[0,1,1,2,4,8,1,1,2,4,8,4,8];function h(e,t){var a="unknown";return 3===e?a="f32":1===e?1===t?a="u1":2===t?a="u2":4===t?a="u4":t<=8?a="u8":t<=16?a="u16":t<=32&&(a="u32"):2===e&&(t<=8?a="s8":t<=16?a="s16":t<=32&&(a="s32")),a}function g(e){var t=null;switch(e?e.toLowerCase():"f32"){case"u1":case"u2":case"u4":case"u8":t=Uint8Array;break;case"u16":t=Uint16Array;break;case"u32":t=Uint32Array;break;case"s8":t=Int8Array;break;case"s16":t=Int16Array;break;case"s32":t=Int32Array;break;default:t=Float32Array}return t}function c(e,t){return{x:t[0]*e.x+t[1]*e.y+t[2],y:t[3]*e.x+t[4]*e.y+t[5]}}function d(e,t){var a=e.get(t);return a&&a.values}function w(e,t){var a=e.get(t);return a&&a.values[0]}function p(e,t,a,n,r,s){void 0===n&&(n=0),void 0===r&&(r=i.TIFF_TAGS),void 0===s&&(s=4);var l=new DataView(e,a,2).getUint16(0,t),f=4+2*s,u=2+l*f;if(a+u>e.byteLength)return{success:!1,ifd:null,nextIFD:null,requiredBufferSize:u};for(var o,h,g,c,d,w,p,I=a+u+4<=e.byteLength?new DataView(e,a+u,4).getUint32(0,t):null,y=a+2,E=new Map,v=0;v<l;v++){if(g=(h=new DataView(e,y+f*v,f)).getUint16(0,t),d=h.getUint16(2,t),c=i.getTagName(g,r),2===s)w=h.getUint16(4,t),p=h.getUint16(6,t);else if(4===s)w=h.getUint32(4,t),p=h.getUint32(8,t);else if(8===s)if(w=0,p=0,t)for(var A=0;A<8;A++)w+=h.getUint8(4+A)*Math.pow(2,8*A),p+=h.getUint8(12+A)*Math.pow(2,8*A);else for(A=0;A<8;A++)w+=h.getUint8(4+A)*Math.pow(2,8*(7-A)),p+=h.getUint8(12+A)*Math.pow(2,8*(7-A));T(e,t,o={id:g,type:d,valueCount:w,valueOffset:p,values:null},n),E.set(c,o)}return{success:!0,ifd:E,nextIFD:I,requiredBufferSize:u}}var I=function(e,t,a,n,i){var l,f,o,c,d,p,I=u===t,T=w(a,"BITSPERSAMPLE"),y=h(w(a,"SAMPLEFORMAT")||1,T),E=w(a,"COMPRESSION")[0]||1,v=g(y);if(1===E)o=e.slice(n,n+i),c=new Uint8Array(o);else if(8===E||32946===E)c=new Uint8Array(e,n,i),p=new s(c).getBytes(),o=new ArrayBuffer(p.length),(c=new Uint8Array(o)).set(p);else if(6===E){c=new Uint8Array(e,n,i);var A=new r;A.parse(c);var S=A.getData(A.width,A.height,!0);o=new ArrayBuffer(S.length),(c=new Uint8Array(o)).set(S)}if("u8"===y||"s8"===y||I)f=new v(o);else{switch(o=new ArrayBuffer(c.length),d=new Uint8Array(o),y){case"u16":case"s16":for(l=0;l<c.length;l+=2)d[l]=c[l+1],d[l+1]=c[l];break;case"u32":case"s32":case"f32":for(l=0;l<c.length;l+=4)d[l]=c[l+3],d[l+1]=c[l+2],d[l+2]=c[l+1],d[l+3]=c[l]}f=new v(o)}return f};function T(e,t,a,n,r){if(void 0===n&&(n=0),a.values)return!0;var i,s,l=a.type,f=a.valueCount,u=a.valueOffset,h=[],g=o[l],c=8*g,d=f*g,w=f*o[l]*8;if(w>32&&d>(r?e.byteLength:e?e.byteLength-u+n:0))return a.offlineOffsetSize=[u,d],a.values=null,!1;if(w<=32)if(t||(u>>>=32-w),1===f)h=[u];else for(s=0;s<f;s++)h.push(u<<c*s>>>32-c);else{u-=n,r&&(u=0);for(var p=u;p<u+d;p+=g){switch(l){case 1:case 2:i=new DataView(e,p,1).getUint8(0);break;case 3:i=new DataView(e,p,2).getUint16(0,t);break;case 4:i=new DataView(e,p,4).getUint32(0,t);break;case 5:i=new DataView(e,p,4).getUint32(0,t)/new DataView(e,p+4,4).getUint32(0,t);break;case 6:i=new DataView(e,p,1).getInt8(0);break;case 7:i=new DataView(e,p,1).getUint8(0);break;case 8:i=new DataView(e,p,2).getInt16(0,t);break;case 9:i=new DataView(e,p,4).getInt32(0,t);break;case 10:i=new DataView(e,p,4).getInt32(0,t)/new DataView(e,p+4,4).getInt32(0,t);break;case 11:i=new DataView(e,p,4).getFloat32(0,t);break;case 12:i=new DataView(e,p,8).getFloat64(0,t);break;default:i=null}h.push(i)}}if(2===l){var I="",T=h;for(h=[],s=0;s<T.length;s++)0===T[s]&&""!==I?(h.push(I),I=""):I+=String.fromCharCode(T[s]);""===I&&0!==h.length||h.push(I)}return a.values=h,!0}function y(e){var t,a=e[0],n=w(a,"TILEWIDTH"),r=w(a,"TILELENGTH"),i=w(a,"IMAGEWIDTH"),s=w(a,"IMAGELENGTH"),l=w(a,"BITSPERSAMPLE"),f=w(a,"SAMPLESPERPIXEL"),u=w(a,"SAMPLEFORMAT")||1,o=h(u,l),g=!!d(a,"PLANARCONFIGURATION")&&2===d(a,"PLANARCONFIGURATION")[0],p=d(a,"GDAL_NODATA");null!=p&&("string"==typeof p[0]?(t=p.map((function(e){return parseFloat(e)}))).some((function(e){return isNaN(e)}))&&(t=null):"number"==typeof p[0]&&(t=p));var I,T=w(a,"COMPRESSION")||1;switch(T){case 1:I="NONE";break;case 2:case 3:case 4:case 32771:I="CCITT";break;case 5:I="LZW";break;case 6:case 7:I="JPEG";break;case 32773:I="PACKBITS";break;case 8:case 32946:I="DEFLATE";break;case 34712:I="JPEG2000";break;default:I=String(T)}var y=!0,E="";1!==T&&6!==T&&8!==T&&32946!==T&&(y=!1,E+="unsupported tag compression "+T),u>3&&(y=!1,E+="unsupported tag sampleFormat "+u),l%8!=0&&(y=!1,E+="unsupported tag bitsPerSample "+l);var v,A=w(a,"GEOASCIIPARAMS");if(A){var S=A.split("|").filter((function(e){return e.indexOf("ESRI PE String = ")>-1}))[0],m=S?S.replace("ESRI PE String = ",""):"";v=0===m.indexOf("PROJCS")||0===m.indexOf("GEOGCS")?{wkid:null,wkt:m}:null}var M,x,O=d(a,"GEOTIEPOINTS"),b=d(a,"GEOPIXELSCALE"),U=d(a,"GEOTRANSMATRIX"),D=a.has("GEOKEYDIRECTORY")?a.get("GEOKEYDIRECTORY").data:null,N=!1;if(D){N=2===w(D,"GTRasterTypeGeoKey");var P=w(D,"GTModelTypeGeoKey");if(2===P){var L=w(D,"GeographicTypeGeoKey");L>1024&&L<32766&&(v={wkid:L})}else if(1===P){var G=w(D,"ProjectedCSTypeGeoKey");G>1024&&G<32766&&(v={wkid:G})}}if(b&&O&&O.length>=6?(M=[b[0],0,O[3]-O[0]*b[0],0,-Math.abs(b[1]),O[4]-O[1]*b[1]],N&&(M[2]-=.5*M[0]+.5*M[1],M[5]-=.5*M[3]+.5*M[4])):U&&16===U.length&&(M=[U[0],U[1],U[3],U[4],U[5],U[7]]),M){for(var k=[{x:0,y:s},{x:0,y:0},{x:i,y:s},{x:i,y:0}],R=void 0,F=Number.POSITIVE_INFINITY,C=Number.POSITIVE_INFINITY,B=Number.NEGATIVE_INFINITY,V=Number.NEGATIVE_INFINITY,H=0;H<k.length;H++)F=(R=c(k[H],M)).x>F?F:R.x,B=R.x<B?B:R.x,C=R.y>C?C:R.y,V=R.y<V?V:R.y;x={xmin:F,xmax:B,ymin:C,ymax:V,spatialReference:v}}var W,_,Y,K,X,z=e.filter((function(e){return 1===w(e,"NEWSUBFILETYPE")}));z.length>0&&(W=Math.round(Math.log(i/w(z[0],"IMAGEWIDTH"))/Math.LN2),_=Math.round(Math.log(i/w(z[z.length-1],"IMAGEWIDTH"))/Math.LN2),Y=w(z[z.length-1],"TILEWIDTH"),K=w(z[z.length-1],"TILEHEIGHT")),Y=_>0?Y||n:null,K=_>0?K||r:null,n&&(X=[{maxCol:Math.ceil(i/n)-1,maxRow:Math.ceil(s/r)-1,minRow:0,minCol:0}],z.forEach((function(e){X.push({maxCol:Math.ceil(w(e,"IMAGEWIDTH")/w(e,"TILEWIDTH"))-1,maxRow:Math.ceil(w(e,"IMAGELENGTH")/w(e,"TILELENGTH"))-1,minRow:0,minCol:0})})));var J=function(e){if(!e)return null;var t=e.match(/<Item(.*?)Item>/gi);if(!t||0===t.length)return null;for(var a,n,r,i,s,l=new Map,f=0;f<t.length;f++)n=(a=t[f]).slice("<Item ".length,a.indexOf(">")),(i=a.indexOf("sample="))>-1&&(s=a.slice(i+'sample="'.length,a.indexOf('"',i+'sample="'.length))),(i=a.indexOf("name="))>-1&&(n=a.slice(i+'name="'.length,a.indexOf('"',i+'name="'.length))),n&&(r=a.slice(a.indexOf(">")+1,a.indexOf("</Item>")).trim(),null!=s?l.has(n)?l.get(n)[s]=r:l.set(n,[r]):l.set(n,r)),s=null;var u=l.get("STATISTICS_MINIMUM"),o=l.get("STATISTICS_MAXIMUM"),h=l.get("STATISTICS_MEAN"),g=l.get("STATISTICS_STDDEV"),c=null;if(u&&o){c=[];for(f=0;f<u.length;f++)c.push({min:parseFloat(u[f]),max:parseFloat(o[f]),avg:h&&parseFloat(h[f]),stddev:g&&parseFloat(g[f])})}var d=l.get("BandName"),w=l.get("WavelengthMin"),p=l.get("WavelengthMax"),I=null;if(d){I=[];for(f=0;f<d.length;f++)I.push({BandName:d[f],WavelengthMin:w&&parseFloat(w[f]),WavelengthMax:p&&parseFloat(p[f])})}return{statistics:c,bandProperties:I,dataType:l.get("DataType"),rawMetadata:l}}(w(e[0],"GDAL_METADATA"));return{width:i,height:s,tileWidth:n,tileHeight:r,planes:f,isBSQ:g,pixelType:o,compression:I,noData:t,isSupported:y,message:E,extent:x,firstPyramidLevel:W,maximumPyramidLevel:_,pyramidBlockWidth:Y,pyramidBlockHeight:K,tileBoundary:X,metadata:J}}function E(e){var t=new DataView(e,0,8),n=t.getUint16(0,!1),r=null;if(18761===n)r=!0;else{if(19789!==n)throw"unexpected endianess byte";r=!1}if(42!==t.getUint16(2,r))throw"unexpected tiff identifier";var i,s=t.getUint32(4,r),l=[];do{if(!(i=v(e,r,s)).success)break;l.push(i.ifd),s=i.nextIFD}while(s>0);var f=y(l);return a.__assign(a.__assign({},f),{littleEndian:r,ifds:l})}function v(e,t,a,r,s,l){void 0===r&&(r=0),void 0===s&&(s=i.TIFF_TAGS),void 0===l&&(l=4);var f,u=p(e,t,a,r,s,l),o=u.ifd;if(o){var h;if(i.ifdTags.forEach((function(a,n){o.has(n)&&((f=o.get(n)).data=p(e,t,f.valueOffset-r,r,a).ifd)})),o.has("GEOKEYDIRECTORY"))if((h=(f=o.get("GEOKEYDIRECTORY")).values)&&h.length>4){var g=h[0]+"."+h[1]+"."+h[2];f.data=p(e,t,f.valueOffset+6-r,r,i.GEO_KEYS,2).ifd,f.data&&f.data.set("GEOTIFFVersion",{id:0,type:2,valueCount:1,valueOffset:null,values:[g]})}if(o.has("XMP"))"number"==typeof(h=(f=o.get("XMP")).values)[0]&&7===f.type&&(f.values=[n.bytesToUTF8(new Uint8Array(h))])}return u}t.parseFieldValues=T,t.getImageInfo=y,t.parseHeader=E,t.parseSignature=function(e){var t=new DataView(e,0,8),a=t.getUint16(0,!1),n=null;if(18761===a)n=!0;else{if(19789!==a)throw"unexpected endianess byte";n=!1}if(42!==t.getUint16(2,n))throw"unexpected tiff identifier";return{littleEndian:n,firstIFD:t.getUint32(4,n)}},t.parseIFD=v,t.decodeTileOrStrip=function(e,t){for(var a,n=t.headerInfo,r=t.ifd,i=I(e,n.littleEndian,r,t.offset||0,t.size||e.byteLength),s=n.pixelType,l=n.isBSQ,f=n.planes,u=g(s),o=i.length/f,h=[],c=0;c<f;c++){if(a=new u(o),l)a=i.slice(o*c,o*(c+1));else for(var d=0;d<o;d++)a[d]=i[d*f+c];h.push(a)}var p,T,y=w(r,"TILEWIDTH"),E=w(r,"TILELENGTH"),v=n.noData?n.noData[0]:null,A=n.metadata?n.metadata.statistics:null,S=A?A.map((function(e){return e.min})):null,m=A?A.map((function(e){return e.max})):null;if(null!=v)if(p=new Uint8Array(o),Math.abs(v)>1e24)for(T=0;T<o;T++)Math.abs((h[0][T]-v)/v)<1e-6?p[T]=0:p[T]=1;else for(T=0;T<o;T++)h[0][T]===v?p[T]=0:p[T]=1;else S&&m&&t.applyMinMaxConstraint&&(p=function(e,t,a){if(!(e&&e.length>0&&t&&a))return null;for(var n,r,i,s=e[0].length,l=e.length,f=new Uint8Array(s),u=0;u<l;u++)if(n=e[u],r=t[u],i=a[u],0===u)for(var o=0;o<s;o++)f[o]=n[o]<r||n[o]>i?0:1;else for(o=0;o<s;o++)f[o]&&(f[o]=n[o]<r||n[o]>i?0:1);return f}(h,S,m));return{pixelType:s,width:y,height:E,pixels:h,mask:p,noDataValue:v}},t.decode=function(e,t){var a,n,i=(t=t||E(e)).ifds,l=t.noData;if(0===i.length)throw"no valid image file directory";var f=i[0],o=l?l[0]:null;if(n=t.tileWidth?function(e,t,a){var n=d(a,"TILEOFFSETS");if(void 0===n)return null;for(var r,i,s,l,f,u,o,h,c,w,p,T,y,E=d(a,"TILEBYTECOUNTS"),v=t.tileWidth,A=t.tileHeight,S=t.width,m=t.height,M=t.pixelType,x=t.isBSQ,O=t.planes,b=S*m,U=d(a,"BITSPERSAMPLE")[0],D=g(M),N=[],P=0;P<O;P++)N.push(new D(b));var L=Math.ceil(S/v);if(U%8==0)for(r=0;r<n.length;r++)for(h=(u=Math.floor(r/L)*A)*S+(o=r%L*v),s=I(e,t.littleEndian,a,n[r],E[r]),w=0,c=h,T=Math.min(v,S-o),p=Math.min(A,m-u),i=0;i<O;i++)if(y=N[i],x)for(l=0;l<p;l++)for(c=h+l*S,w=v*A*i+l*v,f=0;f<T;f++,c++,w++)y[c]=s[w];else for(l=0;l<p;l++)for(c=h+l*S,w=l*v*O+i,f=0;f<T;f++,c++,w+=O)y[c]=s[w];return{width:S,height:m,pixelType:M,pixels:N}}(e,t,f):function(e,t,a){var n=u===t.littleEndian,i=d(a,"STRIPOFFSETS");if(void 0===i)return null;var l,f,o,h,c,w,p,I,T,y,E=t.width,v=t.height,A=t.pixelType,S=t.planes,m=E*v,M=d(a,"BITSPERSAMPLE")[0],x=g(A),O=new x(m*S),b=d(a,"STRIPBYTECOUNTS"),U=d(a,"ROWSPERSTRIP")[0],D=d(a,"COMPRESSION")?d(a,"COMPRESSION")[0]:1,N=U;if(M%8==0)for(l=0;l<i.length;l++){if(c=l*(U*E)*S,N=(l+1)*U>v?v-l*U:U,"u8"===A||"s8"===A||n){if(8===D||32946===D)p=new Uint8Array(e,i[l],b[l]),y=new s(p).getBytes(),w=new ArrayBuffer(y.length),(p=new Uint8Array(w)).set(y),p.length!==N*E*S*M/8&&console.log("strip byte counts is different than expected");else if(6===D){p=new Uint8Array(e,i[l],b[l]);var P=new r;P.parse(p);var L=P.getData(P.width,P.height,!0);w=new ArrayBuffer(L.length),(p=new Uint8Array(w)).set(L)}else 1===D&&(b[l]!==N*E*S*M/8&&console.log("strip byte counts is different than expected"),w=e.slice(i[l],i[l]+b[l]));h=new x(w)}else{switch(6===D||8===D||32946===D?(p=new Uint8Array(e,i[l],b[l]),p=new s(p).getBytes(),w=new ArrayBuffer(p.length),I=new Uint8Array(w),p.length!==N*E*S*M/8&&console.log("strip byte counts is different than expected")):1===D&&(b[l]!==N*E*S*M/8&&console.log("strip byte counts is different than expected"),w=new ArrayBuffer(b[l]),p=new Uint8Array(e,i[l],b[l]),I=new Uint8Array(w)),A){case"u16":case"s16":for(o=0;o<p.length;o+=2)I[o]=p[o+1],I[o+1]=p[o];break;case"u32":case"s32":case"f32":for(o=0;o<p.length;o+=4)I[o]=p[o+3],I[o+1]=p[o+2],I[o+2]=p[o+1],I[o+3]=p[o]}h=new x(w)}O.set(h,c)}var G=[];if(1===S)G.push(O);else for(l=0;l<S;l++){for(T=new x(m),f=0;f<m;f++)T[f]=O[f*S+l];G.push(T)}return{width:E,height:v,pixelType:A,pixels:G}}(e,t,f),null!==o){if(n.mask=new Uint8Array(n.width*n.height),Math.abs(o)>1e24)for(a=0;a<n.width*n.height;a++)Math.abs((n.pixels[0][a]-o)/o)<1e-6?n.mask[a]=0:n.mask[a]=1;else for(a=0;a<n.width*n.height;a++)n.pixels[0][a]===o?n.mask[a]=0:n.mask[a]=1;n.noDataValue=o}return n}}));