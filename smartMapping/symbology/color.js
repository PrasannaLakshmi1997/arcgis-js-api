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

define(["require","exports","tslib","../../Color","./support/colors","./support/SymbologyBase","./support/utils"],(function(e,r,g,i,t,l,a){var h={light:{color:[153,153,153,.25],width:"0.5px"},lighter:{color:[194,194,194,.25],width:"0.5px"},lightest:{color:[153,153,153,.25],width:"0.5px"}},o={lightBasemaps:{outline:h.lighter,fillOpacity:.8,width:"2px",size:"8px"},darkBasemaps:{outline:h.light,fillOpacity:.6,width:"2px",size:"8px"},grayBasemaps:{outline:h.lightest,fillOpacity:.8,width:"2px",size:"8px"}},n=["highlight-red-gray-bright","highlight-purple-gray-bright","highlight-blue-bright-gray-bright","highlight-green-gray-bright","highlight-yellow-gray-bright"],s=["highlight-pink-gray-dark","highlight-purple-gray-dark","highlight-blue-bright-gray-dark","highlight-green-gray-dark","highlight-brown-gray-dark"],b=["extremes-red-gray-bright","extremes-purple-gray-bright","extremes-blue-bright-gray-bright","extremes-green-gray-bright","extremes-yellow-gray-bright"],d=["extremes-pink-gray-dark","extremes-purple-gray-dark","extremes-blue-bright-gray-dark","extremes-green-gray-dark","extremes-brown-gray-dark"],y=["highlight-orange-gray","highlight-bluegreen-gray","highlight-purple-gray","highlight-pink-gray","highlight-blue-gray","highlight-red-gray","highlight-orange-gray-dark","highlight-blue-gray-dark","highlight-orange-gray-bright","highlight-blue-gray-bright","extremes-orange-gray","extremes-bluegreen-gray","extremes-purple-gray","extremes-pink-gray","extremes-blue-gray","extremes-red-gray","extremes-orange-gray-dark","extremes-blue-gray-dark","extremes-orange-gray-bright","extremes-blue-gray-bright"].concat(n).concat(s).concat(b).concat(d),u=["seq-single-blues","seq-single-greens","seq-single-grays","seq-single-oranges","seq-single-purples","seq-single-reds","seq-multi-bugn","seq-multi-bupu","seq-multi-gnbu","seq-multi-orrd","seq-multi-pubu","seq-multi-pubugn","seq-multi-purd","seq-multi-rdpu","seq-multi-ylgn","seq-multi-ylgnbu","seq-multi-ylorbr","seq-multi-ylorrd"],p=["div-brbg","div-piyg","div-prgn","div-puor","div-rdbu","div-rdgy","div-rdylbu","div-rdylgn","div-spectral"],m=["seq-blue-bright-1","seq-green-bright-1","seq-green-bright-2","seq-green-bright-3","seq-blue-bright-2","seq-blue-bright-3","seq-blue-bright-4","seq-blue-bright-5","seq-red-purple-bright","seq-red-magenta-bright","seq-red-bright-3","seq-red-bright-4","seq-yellow-bright-1","seq-yellow-bright-2","seq-yellow-bright-3","seq-yellow-bright-4","seq-yellow-gray-bright","seq-green-gray-bright","seq-blue-gray-bright","seq-red-gray-bright","seq-gray-redbright","seq-gray-green-bright","seq-gray-blue-bright","seq-gray-purple-bright","seq-plaingray-bright","seq-greengray-bright","seq-coolgray-bright","seq-warmgray-bright","seq-yellow-green-combo-bright","seq-cyan-blue-combo-bright","seq-magenta-purple-combo-bright"],c=["div-yellow-orange-purple-bright","div-yellow-blue-bright-1","div-yellow-blue-bright-2","div-yellow-blue-bright","div-yellow-blue-bright-3","div-yellow-purple-bright-1","div-yellow-purple-bright-2","div-yellow-red-bright-1","div-yellow-red-bright-2","div-yellow-gray-bright-1","div-yellow-gray-bright-2","div-yellow-gray-bright-3","div-purple-green-bright-1","div-purple-green-bright-2","div-pink-yellow-bright-1","div-pink-yellow-bright-2","div-red-blue-bright-1","div-red-blue-bright-2","div-orange-blue-bright-3","div-orange-blue-bright-4","div-red-purple-bright","div-red-gray-bright-1","div-red-gray-bright-2","div-red-gray-bright-3","div-teal-yellow-bright-1","div-teal-yellow-bright-2","div-teal-orange-bright","div-green-red-bright","div-green-magenta-bright","div-green-purple-bright-1","div-green-purple-bright-2","div-green-blue-bright-1","div-green-blue-bright-2","div-green-gray-bright-1","div-green-gray-bright-2","div-green-gray-bright-3","div-blue-green-bright-1","div-blue-yellow-bright-2","div-blue-lightorange-bright","div-blue-orange-bright-1","div-blue-orange-bright-2","div-blue-red-bright-1","div-blue-red-bright-2","div-blue-tan-bright","div-blue-gray-bright-1","div-blue-gray-bright-2","div-blue-gray-bright-3"],v=["div-blue-yellow-brown","div-purple-yellow-brown","div-purple-beige-green","div-teal-yellow-brown"],q={streets:["streets","streets-vector","streets-relief-vector","streets-navigation-vector"],light:["gray","gray-vector"],topo:["topo","topo-vector"],terrain:["terrain"],"national-geographic":["national-geographic"],oceans:["oceans"],osm:["osm"],satellite:["satellite"],hybrid:["hybrid"],dark:["dark-gray","dark-gray-vector","streets-night-vector"]},w=["extremesdiv-orange-gray-blue","extremesdiv-yellow-gray-purple","extremesdiv-red-gray-blue","extremesdiv-green-gray-purple"],k=["point-cloud-elevation-scheme","point-cloud-intensity-scheme"],x={"high-to-low":{name:"high-to-low",label:"TODO",description:"TODO",basemapGroups:q,schemes:{default:{streets:{common:o.lightBasemaps,primary:"seq-yellow-red-purple",secondary:["seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-green-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},light:{common:o.grayBasemaps,primary:"seq-single-blues",secondary:["seq-yellow-red-purple","seq-orange-red-light","seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-blue-red-yellow-bright","seq-blue-tan-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k).filter((function(e){return"seq-single-blues"!==e}))},topo:{common:o.lightBasemaps,primary:"seq-yellow-green-blue",secondary:["seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-red-purple","seq-yellow-orange-red","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},terrain:{common:o.lightBasemaps,primary:"seq-pink-red",secondary:["seq-yellow-pink-purple","seq-yellow-red-purple","seq-yellow-orange-red","seq-orange-red-light","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-orange-lightgray-bright","seq-blue-red-yellow-bright","seq-blue-tan-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},"national-geographic":{common:o.lightBasemaps,primary:"seq-yellow-orange-red",secondary:["seq-yellow-red-purple","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-yellow-green-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},oceans:{common:o.lightBasemaps,primary:"seq-yellow-green-blue",secondary:["seq-yellow-red-purple","seq-yellow-orange-red","seq-yellow-pink-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-green-lightgray-bright","seq-red-lightgray-bright","seq-blue-lightgray-bright","seq-blue-red-yellow-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},osm:{common:o.lightBasemaps,primary:"seq-red-blue-green",secondary:["seq-yellow-pink-purple","seq-yellow-red-purple","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-blue-red-yellow-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright"].concat(m).concat(u).concat(k)},satellite:{common:o.darkBasemaps,primary:"seq-orange-red-dark",secondary:["seq-yellow-green-blue","seq-red-blue-green","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(m).concat(u).concat(k)},hybrid:{common:o.darkBasemaps,primary:"seq-orange-red-dark",secondary:["seq-yellow-green-blue","seq-red-blue-green","seq-yellow-purple-blue","seq-teal-lightgreen-bright","seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-teal-lightbrown-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(m).concat(u).concat(k)},dark:{common:o.grayBasemaps,primary:"seq-blue-gray-bright",secondary:["seq-blue-lightgray-bright","seq-gray-lightgreen-bright","seq-reds-bright","seq-purples-bright","seq-blues-bright","seq-greens-bright","seq-browns-bright","seq-dark-to-light-magenta-bright","seq-dark-to-light-purple-bright","seq-dark-to-light-blue-bright","seq-dark-to-light-green-bright","seq-brown-to-tan-bright","seq-lightgray-blue-bright","seq-lightgray-green-bright","seq-lightgray-darkmagenta-bright","seq-yellow-darkblue-bright","seq-teal-lightgreen-bright","seq-lightred-darkgray-bright","seq-lightmagenta-darkgray-bright","seq-lightblue-darkgray-bright"].concat(m).concat(u).concat(k).filter((function(e){return"seq-blue-gray-bright"!==e}))}}}},"above-and-below":{name:"above-and-below",label:"TODO",description:"TODO",basemapGroups:q,schemes:{default:{streets:{common:o.lightBasemaps,primary:"div-bluegreen-yellow-orange",secondary:["div-orange-yellow-blue-light","div-green-yellow-redpurple","div-green-yellow-orange","div-green-gray-bright","div-red-blue-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright"].concat(c).concat(v).concat(p)},light:{common:o.grayBasemaps,primary:"div-rdbu",secondary:["div-bluegreen-orange","div-orange-purple","div-bluegreen-purple","div-orange-pink","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},topo:{common:o.lightBasemaps,primary:"div-orange-pink",secondary:["div-redpurple-blue","div-orange-blue","div-green-pink","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},terrain:{common:o.lightBasemaps,primary:"div-bluegreen-orange",secondary:["div-bluegreen-redpurple","div-green-redpurple","div-green-orange","div-blue-yellow-red-bright","div-green-gray-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},"national-geographic":{common:o.lightBasemaps,primary:"div-orange-yellow-blue-light",secondary:["div-bluegreen-yellow-orange","div-green-yellow-redpurple","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},oceans:{common:o.lightBasemaps,primary:"div-red-yellow-pink",secondary:["div-blue-green","div-bluegreen-yellow-redpurple","div-bluegreen-yellow-orange","div-blue-yellow-red-bright","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},osm:{common:o.lightBasemaps,primary:"div-bluegreen-pink",secondary:["div-bluegreen-redpurple","div-bluegreen-orange","div-orange-pink","div-green-gray-bright","div-red-blue-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-blue-green-bright","div-purple-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightred-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},satellite:{common:o.darkBasemaps,primary:"div-blue-green-bright",secondary:["div-red-yellow-purple","div-orange-yellow-pink","div-orange-yellow-blue-light","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-orange-yellow-blue-dark","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-lightblue-yellow-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},hybrid:{common:o.darkBasemaps,primary:"div-blue-green-bright",secondary:["div-red-yellow-purple","div-orange-yellow-pink","div-orange-yellow-blue-light","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-orange-yellow-blue-dark","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-green-teal-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-lightblue-yellow-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)},dark:{common:o.grayBasemaps,primary:"div-blue-red-bright-1",secondary:["div-blue-green-bright","div-yellow-gray-purple","div-lightblue-yellow-bright","div-red-gray-blue","div-green-gray-purple","div-orange-gray-blue","div-green-gray-bright","div-red-green-bright","div-red-blue-bright","div-orange-gray-bright","div-blue-orange-bright","div-blue-lightgreen-bright","div-red-gray-bright","div-blue-gray-bright","div-red-lightgreen-bright","div-green-teal-bright","div-purple-brown-bright","div-blue-brown-bright","div-teal-brown-bright","div-lightgreen-yellow-bright","div-lightblue-gray-bright","div-lightgreen-gray-bright","div-lightred-gray-bright","div-lightmagenta-gray-bright","div-yellow-green-bright","div-green-darkgray-bright"].concat(c).concat(v).concat(p)}}}},"centered-on":{name:"centered-on",label:"TODO",description:"TODO",basemapGroups:q,schemes:{default:{streets:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-orange",primaryGray:"highlight-orange-gray",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"].concat(s)},light:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-orange",primaryGray:"highlight-orange-gray",secondary:["highlight-purple","highlight-orange-gray","highlight-purple-gray"].concat(s)},topo:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-orange",primaryGray:"highlight-orange-gray",secondary:["highlight-pink","highlight-orange-gray","highlight-pink-gray"].concat(s)},terrain:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-orange",primaryGray:"highlight-orange-gray",secondary:["highlight-bluegreen","highlight-orange-gray","highlight-bluegreen-gray"].concat(s)},"national-geographic":{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-orange",primaryGray:"highlight-orange-gray",secondary:["highlight-blue","highlight-orange-gray","highlight-blue-gray"].concat(s)},oceans:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-red",primaryGray:"highlight-red-gray",secondary:["highlight-pink","highlight-red-gray","highlight-pink-gray"].concat(s)},osm:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"highlight-pink",primaryGray:"highlight-pink-gray",secondary:["highlight-bluegreen","highlight-pink-gray","highlight-bluegreen-gray"].concat(s)},satellite:{common:{outline:h.light,width:"2px",size:"8px"},primary:"highlight-orange-dark",primaryGray:"highlight-orange-gray-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark","highlight-blue-gray-dark"].concat(n)},hybrid:{common:{outline:h.light,width:"2px",size:"8px"},primary:"highlight-orange-dark",primaryGray:"highlight-orange-gray-dark",secondary:["highlight-blue-dark","highlight-orange-gray-dark","highlight-blue-gray-dark"].concat(n)},dark:{common:{outline:h.light,width:"2px",size:"8px"},primary:"highlight-orange-bright",primaryGray:"highlight-orange-gray-bright",secondary:["highlight-blue-bright","highlight-orange-gray-bright","highlight-blue-gray-bright"].concat(n)}}}},extremes:{name:"extremes",label:"TODO",description:"TODO",basemapGroups:q,schemes:{default:{streets:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-bluegreen-yellow-orange",primaryGray:"extremes-bluegreen-gray",secondary:["extremesdiv-orange-yellow-blue-light","extremesdiv-green-yellow-redpurple","extremesdiv-green-yellow-orange","extremes-orange","extremes-bluegreen","extremes-orange-gray","extremes-bluegreen-gray"].concat(d)},light:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-orange-purple",primaryGray:"extremes-orange-gray",secondary:["extremesdiv-bluegreen-purple","extremesdiv-bluegreen-orange","extremesdiv-orange-pink","extremes-orange","extremes-purple","extremes-orange-gray","extremes-purple-gray"].concat(d)},topo:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-orange-pink",primaryGray:"extremes-orange-gray",secondary:["extremesdiv-redpurple-blue","extremesdiv-orange-blue","extremesdiv-green-pink","extremes-orange","extremes-pink","extremes-orange-gray","extremes-pink-gray"].concat(d)},terrain:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-bluegreen-orange",primaryGray:"extremes-bluegreen-gray",secondary:["extremesdiv-bluegreen-redpurple","extremesdiv-green-redpurple","extremesdiv-green-orange","extremes-orange","extremes-bluegreen","extremes-orange-gray","extremes-bluegreen-gray"].concat(d)},"national-geographic":{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-orange-yellow-blue-light",primaryGray:"extremes-orange-gray",secondary:["extremesdiv-bluegreen-yellow-orange","extremesdiv-green-yellow-redpurple","extremes-orange","extremes-blue","extremes-orange-gray","extremes-blue-gray"].concat(d)},oceans:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-red-yellow-pink",primaryGray:"extremes-red-gray",secondary:["extremesdiv-blue-green","extremesdiv-bluegreen-yellow-redpurple","extremesdiv-bluegreen-yellow-orange","extremes-red","extremes-pink","extremes-red-gray","extremes-pink-gray"].concat(d)},osm:{common:{outline:h.lighter,width:"2px",size:"8px"},primary:"extremesdiv-bluegreen-pink",primaryGray:"extremes-bluegreen-gray",secondary:["extremesdiv-bluegreen-redpurple","extremesdiv-bluegreen-orange","extremesdiv-orange-pink","extremes-pink","extremes-bluegreen","extremes-pink-gray","extremes-bluegreen-gray"].concat(d)},satellite:{common:{outline:h.light,width:"2px",size:"8px"},primary:"extremesdiv-orange-yellow-blue-dark",primaryGray:"extremes-orange-gray-dark",secondary:["extremesdiv-red-yellow-purple","extremesdiv-orange-yellow-pink","extremesdiv-orange-yellow-blue-light","extremes-orange-dark","extremes-blue-dark","extremes-orange-gray-dark","extremes-blue-gray-dark"].concat(b)},hybrid:{common:{outline:h.light,width:"2px",size:"8px"},primary:"extremesdiv-orange-yellow-blue-dark",primaryGray:"extremes-orange-gray-dark",secondary:["extremesdiv-red-yellow-purple","extremesdiv-orange-yellow-pink","extremesdiv-orange-yellow-blue-light","extremes-orange-dark","extremes-blue-dark","extremes-orange-gray-dark","extremes-blue-gray-dark"].concat(b)},dark:{common:{outline:h.light,width:"2px",size:"8px"},primary:"extremesdiv-orange-gray-blue",primaryGray:"extremes-orange-gray-bright",secondary:["extremesdiv-yellow-gray-purple","extremesdiv-red-gray-blue","extremesdiv-green-gray-purple","extremes-orange-bright","extremes-blue-bright","extremes-orange-gray-bright","extremes-blue-gray-bright"].concat(b)}}}}};function f(e,r,l){var h=t[r];if(h){var o=e.theme,n="mesh"!==e.geometryType&&e.worldScale?e.view:null,s=l.fillOpacity;null==s&&-1!==y.indexOf(r)&&(s=.8);var b=h.stops,d=[];for(var u in h)if("stops"!==u&&"name"!==u&&"tags"!==u){var p=+u;d.push({numClasses:p,colors:h[p]})}var m,c=-1!==y.indexOf(r)?"#ffffff":"#aaaaaa",v=o+"/"+e.basemap+"/"+r,q=s||1;switch(e.geometryType){case"point":case"multipoint":return function(e,r){return{id:e.id,name:e.name,tags:g.__spreadArrays(e.tags),theme:e.theme,colors:e.colors.map((function(e){return new i(e)})),colorsForClassBreaks:B(e.colorsForClassBreaks),noDataColor:new i(e.noDataColor),outline:{color:new i(e.outline.color),width:e.outline.width},size:r&&"3d"===r.type?a.toWorldScale(e.size,r):e.size,opacity:e.opacity}}({id:v,name:h.name,tags:h.tags,theme:o,opacity:q,colors:b,colorsForClassBreaks:d,noDataColor:c,outline:l.outline,size:l.size},n);case"polyline":return function(e,r){return{id:e.id,name:e.name,tags:g.__spreadArrays(e.tags),theme:e.theme,colors:e.colors.map((function(e){return new i(e)})),colorsForClassBreaks:B(e.colorsForClassBreaks),noDataColor:new i(e.noDataColor),width:r&&"3d"===r.type?a.toWorldScale(e.width,r):e.width,opacity:e.opacity}}({id:v,name:h.name,tags:h.tags,theme:o,opacity:q,colors:b,colorsForClassBreaks:d,noDataColor:c,width:l.width},n);case"polygon":return function(e,r){return{id:e.id,name:e.name,tags:g.__spreadArrays(e.tags),theme:e.theme,colors:e.colors.map((function(e){return new i(e)})),colorsForClassBreaks:B(e.colorsForClassBreaks),noDataColor:new i(e.noDataColor),outline:{color:new i(e.outline.color),width:e.outline.width},opacity:e.opacity,size:r&&"3d"===r.type?a.toWorldScale(e.size,r):e.size}}({id:v,name:h.name,tags:h.tags,theme:o,opacity:q,colors:b,colorsForClassBreaks:d,noDataColor:c,outline:l.outline,size:"12px"},n);case"mesh":var w={id:v,name:h.name,tags:h.tags,theme:o,opacity:q,colors:b,colorsForClassBreaks:d,noDataColor:c};return{id:(m=w).id,name:m.name,tags:g.__spreadArrays(m.tags),theme:m.theme,colors:m.colors.map((function(e){return new i(e)})),colorsForClassBreaks:B(m.colorsForClassBreaks),noDataColor:new i(m.noDataColor),opacity:m.opacity};default:return}}}function B(e){return e.map((function(e){return{numClasses:e.numClasses,colors:e.colors.map((function(e){return new i(e)}))}}))}return new(function(e){function r(){return e.call(this,{themeDictionary:x})||this}return g.__extends(r,e),r.prototype.getSchemes=function(e){var r=e.theme,i=this.getRawSchemes({theme:r,basemap:e.basemap,basemapTheme:e.basemapTheme});if(i){var t=i.schemesInfo,l=t.common,a=i.basemapId,h=i.basemapTheme;!e.worldScale||"centered-on"!==r&&"extremes"!==r||((t=g.__assign({},t)).secondary=t.secondary.slice(0),t.secondary.push(t.primary),t.primary=t.primaryGray,delete t.primaryGray,t.secondary=t.secondary.filter((function(e){var r=e.indexOf("gray")>-1,g=w.indexOf(e)>-1;return e!==t.primary&&r&&!g})));var o=g.__assign(g.__assign({},e),{basemap:a});return{primaryScheme:f(o,t.primary,l),secondarySchemes:t.secondary.map((function(e){return f(o,e,l)})).filter(Boolean),basemapId:a,basemapTheme:h}}},r.prototype.getSchemeByName=function(e){return this.filterSchemesByName(e)},r.prototype.getSchemesByTag=function(e){return this.filterSchemesByTag(e)},r.prototype.getSchemeById=function(e){var r,g,i,t=e.id;if(t){var l=t.split("/");l&&(r=l[0],g=l[1],i=l[2])}var a=this.getRawSchemes({basemap:g,theme:r});if(a){var h=a.schemesInfo;return f({theme:r,basemap:g,geometryType:e.geometryType,worldScale:e.worldScale,view:e.view},i,h.common)}},r.prototype.cloneScheme=function(e){if(e){var r=g.__assign({},e);return r.colors=r.colors.map((function(e){return new i(e)})),r.colorsForClassBreaks=r.colorsForClassBreaks.map((function(e){return{numClasses:e.numClasses,colors:e.colors.map((function(e){return new i(e)}))}})),r.noDataColor&&(r.noDataColor=new i(r.noDataColor)),"outline"in r&&r.outline&&(r.outline={color:r.outline.color&&new i(r.outline.color),width:r.outline.width}),r}},r.prototype.flipColors=function(e){var r=e;return r.colors.reverse(),r.colorsForClassBreaks.forEach((function(e){e.colors.reverse()})),r},r.prototype.getMatchingSchemes=function(e){var r=this,g=e.theme,i=e.colors,t=this.themes.get(g).supportedBasemaps,l=[],a={theme:g,basemap:null,geometryType:e.geometryType,worldScale:e.worldScale,view:e.view};return t.forEach((function(e){var t=r.getRawSchemes({basemap:e,theme:g}).schemesInfo;if(a.basemap=e,t){var h=r._compareColors(f(a,t.primary,t.common),i);h&&l.push(h),t.secondary.forEach((function(e){var g=r._compareColors(f(a,e,t.common),i);g&&l.push(g)}))}})),l},r.prototype._compareColors=function(e,r){var g,i,t;(i=a.hasIdenticalColors(e.colors,r))?g=i>0?e:this.flipColors(e):(e.colorsForClassBreaks.some((function(e){return e.numClasses===r.length&&(t=e.colors),!!t})),t&&(i=a.hasIdenticalColors(t,r))&&(g=i>0?e:this.flipColors(e)));return g},r}(l))}));