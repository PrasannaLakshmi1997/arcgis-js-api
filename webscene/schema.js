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

define(["require","exports","./definitions"],(function(e,t,i){Object.defineProperty(t,"__esModule",{value:!0}),t.json={title:"Webscene",type:"object",description:"The web scene data lists the basemap, operational layers, and presentation slides to be used in the web scene. It also contains information about pop-up windows and layer styling overrides to be used in the web scene. A version property allows you to supply the version of the web scene JSON format being used.",properties:{applicationProperties:{type:"object",$ref:"#/definitions/applicationProperties_schema.json"},authoringApp:{type:"string",description:"String value indicating the application which authored the webmap"},authoringAppVersion:{type:"string",description:"String value indicating the authoring App's version number."},baseMap:{type:"object",description:"Basemaps give the web scene a geographic context.",$ref:"#/definitions/baseMap_schema.json"},clippingArea:{type:"object",$ref:"#/definitions/clippingArea_schema.json"},ground:{type:"object",$ref:"#/definitions/ground_schema.json"},heightModelInfo:{type:"object",$ref:"#/definitions/heightModelInfo_schema.json"},initialState:{type:"object",$ref:"#/definitions/initialState_schema.json"},mapRangeInfo:{type:"object",description:"Map Range Information",$ref:"#/definitions/mapRangeInfo_schema.json"},operationalLayers:{type:"array",description:"Operational layers contain business data which are used to make thematic scenes.",items:{type:"object",$ref:"#/definitions/operationalLayers_schema.json"},uniqueItems:!0},presentation:{type:"object",$ref:"#/definitions/presentation_schema.json"},spatialReference:{type:"object",description:"An object used to specify the spatial reference of the given geometry.",$ref:"#/definitions/spatialReference_schema.json"},tables:{type:"array",description:"An array of table objects.",items:{type:"object",$ref:"#/definitions/table_schema.json"}},transportationNetworks:{type:"array",description:"Used to specify the transportation networks of the scene.",items:{type:"object",$ref:"#/definitions/transportationNetwork_schema.json"}},version:{type:"string",description:"Root element in the web scene specifying a string value indicating the web scene version.",$ref:"#/definitions/version_schema.json"},viewingMode:{type:"string",enum:["global","local"]},widgets:{type:"object",description:"the widgets object contains widgets that should be exposed to the user.",$ref:"#/definitions/widgets_schema.json"}},required:["ground","operationalLayers","spatialReference","version","viewingMode"],additionalProperties:!1,definitions:i.schema_definitions}}));