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

define(["require","exports","../../../core/number","./Format"],(function(t,e,n,i){Object.defineProperty(e,"__esModule",{value:!0});var r=n.getCustoms().decimal,a={N:"north",S:"south",E:"east",W:"west"},u=new RegExp("-?\\d+[\\.|\\"+r+"]?\\d*"),s=/^[\\0]+(?=\d)/;function o(t){var e=t.match(s),i=e?e[0]:"",r=t.indexOf(".")>=0?t.split(".")[1].length:0;return i+n.format(Number(t),{pattern:"###0.###",places:r,round:-1})}function d(t){return n.parse(t)}e.generateDefaultFormats=function(t){var e=t.abbreviatedDirections.north,n=t.abbreviatedDirections.south,s=t.abbreviatedDirections.east,c=t.abbreviatedDirections.west,p={};p[e]="N",p[n]="S",p[s]="E",p[c]="W";var l=new RegExp("N|S|"+e+"|"+n,"i"),b=new RegExp("E|W|"+s+"|"+c,"i");return[new i({name:"basemap",coordinateSegments:[{alias:"X",description:"easting",searchPattern:u,substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"Y",description:"northing",searchPattern:u,substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}}],defaultPattern:"X, Y",viewModel:null}),new i({name:"dd",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+r+"]?\\d*(?=\\D*?[N|S|"+e+"|"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.north,description:"north/south indicator",searchPattern:l,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}[\\.|\\"+r+"]?\\d*(?=\\D*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.east,description:"east/west indicator",searchPattern:b,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}}],defaultPattern:"Y°"+t.abbreviatedDirections.north+", X°"+t.abbreviatedDirections.east,viewModel:null}),new i({name:"ddm",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+e+"|"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}[\\.\\"+r+"]?\\d*(?=.*?[N|S|"+e+"||"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.north,description:"north/south indicator",searchPattern:l,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=\\D*?\\s+.*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"B",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\|"+r+"]?\\d*(?=.*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.east,description:"east/west indicator",searchPattern:b,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}}],defaultPattern:"Y° A'"+t.abbreviatedDirections.north+", X° B'"+t.abbreviatedDirections.east,viewModel:null}),new i({name:"dms",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+e+"|"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[N|S|"+e+"|"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"B",description:"seconds latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+r+"]?\\d*(?=.*?[N|S|"+e+"|"+n+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.north,description:"north/south indicator",searchPattern:l,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=.*?\\s+.*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"C",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"D",description:"seconds longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+r+"]?\\d*(?=.*?[E|W|"+s+"|"+c+"])","i"),substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:t.abbreviatedDirections.east,description:"east/west indicator",searchPattern:b,substitution:{input:function(t){return p[t]},output:function(e){return t.abbreviatedDirections[a[e]]}}}],defaultPattern:"Y° A' B\""+t.abbreviatedDirections.north+", X° C' D\""+t.abbreviatedDirections.east,viewModel:null}),new i({name:"xy",coordinateSegments:[{alias:"X",description:"longitude",searchPattern:u,substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}},{alias:"Y",description:"latitude",searchPattern:u,substitution:{input:function(t){return d(t)},output:function(t){return o(t)}}}],defaultPattern:"X°, Y°",viewModel:null}),new i({name:"mgrs",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y",viewModel:null}),new i({name:"usng",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y",viewModel:null}),new i({name:"utm",coordinateSegments:[{alias:"Z",description:"zone number",searchPattern:/\d{1,2}|[abyz]/i},{alias:"B",description:"latitude band",searchPattern:/^\D/},{alias:"X",description:"easting",searchPattern:/\d{1,7}(?=\s*\d{7}$)/},{alias:"Y",description:"northing",searchPattern:/\d{1,7}/}],defaultPattern:"ZB X Y",viewModel:null})]}}));