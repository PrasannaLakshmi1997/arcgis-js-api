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

define(["require","exports"],(function(B,A){Object.defineProperty(A,"__esModule",{value:!0}),A.SwapTable=[["(",")"],[")","("],["<",">"],[">","<"],["[","]"],["]","["],["{","}"],["}","{"],["«","»"],["»","«"],["‹","›"],["›","‹"],["⁽","⁾"],["⁾","⁽"],["₍","₎"],["₎","₍"],["≤","≥"],["≥","≤"],["〈","〉"],["〉","〈"],["﹙","﹚"],["﹚","﹙"],["﹛","﹜"],["﹜","﹛"],["﹝","﹞"],["﹞","﹝"],["﹤","﹥"],["﹥","﹤"]],A.AlefTable=["آ","أ","إ","ا"],A.LamAlefInialTableFE=["ﻵ","ﻷ","ﻹ","ﻻ"],A.LamAlefMedialTableFE=["ﻶ","ﻸ","ﻺ","ﻼ"],A.BaseForm=["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي","إ","أ","آ","ة","ى","ل","م","ن","ه","و","ي","إ","أ","آ","ة","ى","ی","ئ","ؤ"],A.IsolatedForm=["ﺍ","ﺏ","ﺕ","ﺙ","ﺝ","ﺡ","ﺥ","ﺩ","ﺫ","ﺭ","ﺯ","ﺱ","ﺵ","ﺹ","ﺽ","ﻁ","ﻅ","ﻉ","ﻍ","ﻑ","ﻕ","ﻙ","ﻝ","ﻡ","ﻥ","ﻩ","ﻭ","ﻱ","ﺇ","ﺃ","ﺁ","ﺓ","ﻯ","ﯼ","ﺉ","ﺅ","ﹰ","ﹲ","ﹴ","ﹶ","ﹸ","ﹺ","ﹼ","ﹾ","ﺀ","ﺉ","ﺅ"],A.FinalForm=["ﺎ","ﺐ","ﺖ","ﺚ","ﺞ","ﺢ","ﺦ","ﺪ","ﺬ","ﺮ","ﺰ","ﺲ","ﺶ","ﺺ","ﺾ","ﻂ","ﻆ","ﻊ","ﻎ","ﻒ","ﻖ","ﻚ","ﻞ","ﻢ","ﻦ","ﻪ","ﻮ","ﻲ","ﺈ","ﺄ","ﺂ","ﺔ","ﻰ","ﯽ","ﺊ","ﺆ","ﹰ","ﹲ","ﹴ","ﹶ","ﹸ","ﹺ","ﹼ","ﹾ","ﺀ","ﺊ","ﺆ"],A.MedialForm=["ﺎ","ﺒ","ﺘ","ﺜ","ﺠ","ﺤ","ﺨ","ﺪ","ﺬ","ﺮ","ﺰ","ﺴ","ﺸ","ﺼ","ﻀ","ﻄ","ﻈ","ﻌ","ﻐ","ﻔ","ﻘ","ﻜ","ﻠ","ﻤ","ﻨ","ﻬ","ﻮ","ﻴ","ﺈ","ﺄ","ﺂ","ﺔ","ﻰ","ﯿ","ﺌ","ﺆ","ﹱ","ﹲ","ﹴ","ﹷ","ﹹ","ﹻ","ﹽ","ﹿ","ﺀ","ﺌ","ﺆ"],A.InitialForm=["ﺍ","ﺑ","ﺗ","ﺛ","ﺟ","ﺣ","ﺧ","ﺩ","ﺫ","ﺭ","ﺯ","ﺳ","ﺷ","ﺻ","ﺿ","ﻃ","ﻇ","ﻋ","ﻏ","ﻓ","ﻗ","ﻛ","ﻟ","ﻣ","ﻧ","ﻫ","ﻭ","ﻳ","ﺇ","ﺃ","ﺁ","ﺓ","ﻯ","ﯾ","ﺋ","ﺅ","ﹰ","ﹲ","ﹴ","ﹶ","ﹸ","ﹺ","ﹼ","ﹾ","ﺀ","ﺋ","ﺅ"],A.StandAlonForm=["ء","آ","أ","ؤ","إ","ا","ة","د","ذ","ر","ز","و","ى"],A.FETo06Table=["ً","ً","ٌ","؟","ٍ","؟","َ","َ","ُ","ُ","ِ","ِ","ّ","ّ","ْ","ْ","ء","آ","آ","أ","أ","ؤ","ؤ","إ","إ","ئ","ئ","ئ","ئ","ا","ا","ب","ب","ب","ب","ة","ة","ت","ت","ت","ت","ث","ث","ث","ث","ج","ج","ج","ج","ح","ح","ح","ح","خ","خ","خ","خ","د","د","ذ","ذ","ر","ر","ز","ز","س","س","س","س","ش","ش","ش","ش","ص","ص","ص","ص","ض","ض","ض","ض","ط","ط","ط","ط","ظ","ظ","ظ","ظ","ع","ع","ع","ع","غ","غ","غ","غ","ف","ف","ف","ف","ق","ق","ق","ق","ك","ك","ك","ك","ل","ل","ل","ل","م","م","م","م","ن","ن","ن","ن","ه","ه","ه","ه","و","و","ى","ى","ي","ي","ي","ي","ﻵ","ﻶ","ﻷ","ﻸ","ﻹ","ﻺ","ﻻ","ﻼ","؟","؟","؟"],A.ArabicAlefBetIntervalsBegine=["ء","ف"],A.ArabicAlefBetIntervalsEnd=["غ","ي"],A.impTabLtr=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],A.impTabRtl=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],A.UBAT_L=0,A.UBAT_R=1,A.UBAT_EN=2,A.UBAT_AN=3,A.UBAT_ON=4,A.UBAT_B=5,A.UBAT_S=6,A.UBAT_AL=7,A.UBAT_WS=8,A.UBAT_CS=9,A.UBAT_ES=10,A.UBAT_ET=11,A.UBAT_NSM=12,A.UBAT_LRE=13,A.UBAT_RLE=14,A.UBAT_PDF=15,A.UBAT_LRO=16,A.UBAT_RLO=17,A.UBAT_BN=18,A.TYPES_NAMES=["UBAT_L","UBAT_R","UBAT_EN","UBAT_AN","UBAT_ON","UBAT_B","UBAT_S","UBAT_AL","UBAT_WS","UBAT_CS","UBAT_ES","UBAT_ET","UBAT_NSM","UBAT_LRE","UBAT_RLE","UBAT_PDF","UBAT_LRO","UBAT_RLO","UBAT_BN"],A.TBBASE=100;var T=A.TBBASE+0,_=A.TBBASE+1,U=A.TBBASE+2,e=A.TBBASE+3,E=A.TBBASE+4,S=A.TBBASE+5,a=A.TBBASE+6,l=A.TBBASE+7,L=A.UBAT_L,r=A.UBAT_R,i=A.UBAT_EN,N=A.UBAT_AN,R=A.UBAT_ON,n=A.UBAT_B,o=A.UBAT_S,t=A.UBAT_AL,F=A.UBAT_WS,b=A.UBAT_CS,m=A.UBAT_ES,O=A.UBAT_ET,d=A.UBAT_NSM,f=A.UBAT_LRE,M=A.UBAT_RLE,s=A.UBAT_PDF,c=A.UBAT_LRO,p=A.UBAT_RLO,I=A.UBAT_BN;A.MasterTable=[T,L,L,L,L,_,U,e,r,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,E,R,R,R,L,R,L,R,L,R,R,R,L,L,R,R,L,L,L,L,L,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,L,L,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,L,L,R,R,L,L,R,R,L,L,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,L,L,L,S,t,t,a,l],A.UnicodeTable=[[I,I,I,I,I,I,I,I,I,o,n,o,F,n,I,I,I,I,I,I,I,I,I,I,I,I,I,I,n,n,n,o,F,R,R,O,O,O,R,R,R,R,R,m,b,m,b,b,i,i,i,i,i,i,i,i,i,i,b,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,I,I,I,I,I,I,n,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,I,b,R,O,O,O,O,R,R,R,R,L,R,R,I,R,R,O,O,i,i,R,L,R,R,R,i,L,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,L,L,L,L,L,L,L,L],[L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,L,L,L,L,L,L,L,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,L,R,R,R,R,R,R,R,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,r,d,r,d,d,r,d,d,r,d,R,R,R,R,R,R,R,R,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,R,R,R,R,R,r,r,r,r,r,R,R,R,R,R,R,R,R,R,R,R],[N,N,N,N,R,R,R,R,t,O,O,t,b,t,R,R,d,d,d,d,d,d,d,d,d,d,d,t,R,R,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,N,N,N,N,N,N,N,N,N,N,O,N,N,t,t,t,d,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,d,d,d,d,d,d,d,N,R,d,d,d,d,d,d,t,t,d,d,R,d,d,d,d,t,t,i,i,i,i,i,i,i,i,i,i,t,t,t,t,t,t],[t,t,t,t,t,t,t,t,t,t,t,t,t,t,R,t,t,d,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,R,R,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,d,d,d,d,d,d,d,d,d,d,d,t,R,R,R,R,R,R,R,R,R,R,R,R,R,R,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,d,d,d,d,d,d,d,d,d,r,r,R,R,R,R,r,R,R,R,R,R],[F,F,F,F,F,F,F,F,F,F,F,I,I,I,L,r,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,F,n,f,M,s,c,p,b,O,O,O,O,O,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,b,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,F,I,I,I,I,I,R,R,R,R,R,I,I,I,I,I,I,i,L,R,R,i,i,i,i,i,i,m,m,R,R,R,L,i,i,i,i,i,i,i,i,i,i,m,m,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,O,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R],[L,L,L,L,L,L,L,R,R,R,R,R,R,R,R,R,R,R,R,L,L,L,L,L,R,R,R,R,R,r,d,r,r,r,r,r,r,r,r,r,r,m,r,r,r,r,r,r,r,r,r,r,r,r,r,R,r,r,r,r,r,R,r,R,r,r,R,r,r,R,r,r,r,r,r,r,r,r,r,r,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t],[d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,d,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,d,d,d,d,d,d,d,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,b,R,b,R,R,b,R,R,R,R,R,R,R,R,R,O,R,R,m,m,R,R,R,R,R,O,O,R,R,R,R,R,t,t,t,t,t,R,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,t,R,R,I],[R,R,R,O,O,O,R,R,R,R,R,m,b,m,b,b,i,i,i,i,i,i,i,i,i,i,b,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,R,R,R,R,R,R,R,R,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,L,R,R,R,L,L,L,L,L,L,R,R,L,L,L,L,L,L,R,R,L,L,L,L,L,L,R,R,L,L,L,R,R,R,O,O,R,R,R,O,O,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R,R]]}));