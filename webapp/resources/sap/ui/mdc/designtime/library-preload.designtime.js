/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.predefine('sap/ui/mdc/designtime/FilterBar.designtime',["sap/m/Dialog","sap/m/Button",'sap/ui/mdc/base/ConditionModel','sap/ui/mdc/experimental/P13nFilterPanel','sap/ui/mdc/experimental/P13nFilterItem',"sap/ui/mdc/FilterField","sap/ui/mdc/internal/common/Helper"],function(D,B,C,P,a,F,b){"use strict";return{actions:{settings:function(){return{"addFilter":{name:"Add Filter",isEnabled:function(s){return true;},handler:function(f){return new Promise(function(r,R){var c=f.getModel(f.getConditionModelName());var o=c.clone();var d,A,e,h,g,j,s,H;var p=new P();f.oAdaptUIAddFiltersDialog=g=new D({title:"Add Filter",contentHeight:"75%",content:p,verticalScrolling:true,resizable:true,draggable:true,endButton:new B({text:'{$i18n>filterbar.ADAPT_CANCEL}',press:function(){g.close();}}),beginButton:new B({text:'{$i18n>filterbar.ADAPT_OK}',type:'Emphasized',press:function(){var d=j.getObject("/filters");var I=p.getItems();var S,k;I.forEach(function(l){if(!!l.getSelected()){S=l;}});d.forEach(function(l){if(S.getColumnKey()===l.columnKey){k=l;}});g.close();r(k);}}),afterClose:function(){g.getModel("p13n").destroy();g.destroyContent();g.destroy();}});H=[];s=[];h=[];e=[];j=f._getAdaptFilterModel(g);A=j.getObject("/filters");A.forEach(function(k){e.push(k.columnKey);});d=f._getFilterFieldControls();d.forEach(function(k){s.push(k.getFieldPath());});e.forEach(function(k){if(s.indexOf(k)===-1){H.push(k);}});g.setModel(j,"p13n");p.bindAggregation("items",{path:"/filters",model:"p13n",template:new a({columnKey:"{p13n>columnKey}",text:"{p13n>text}",position:"{p13n>position}",tooltip:"{p13n>tooltip}",selected:"{p13n>selected}",control:"{p13n>control}",required:"{p13n>required}"})});for(var i=0;i<A.length;i++){if(H.indexOf(A[i].columnKey)>-1){h.push(A[i]);}}j.setProperty("/filters",h);f.oAdaptUIAddFiltersDialog.setModel(o,f.getConditionModelName());f.oAdaptUIAddFiltersDialog.open();}).then(function(o){return[{selectorControl:f,changeSpecificData:{changeType:"addFilter",content:o}}];});}}};}},aggregations:{_content:{domRef:":sap-domref",propagateMetadata:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.mdc.FilterField"){return{actions:{remove:{changeType:"removeFilter",changeOnRelevantContainer:true},reveal:{changeType:"addFilter",changeOnRelevantContainer:true}}};}else if(t==="sap.ui.layout.AlignedFlowLayout"){return{aggregations:{content:{domRef:":sap-domref",actions:{move:{changeType:"moveFilters",changeOnRelevantContainer:false}}}}};}else{return{actions:null};}},propagateRelevantContainer:function(e){var t=e.getMetadata().getName();if(t==="sap.ui.layout.AlignedFlowLayout"){return e.getParent()?e.getParent():null;}else if(t==="sap.ui.mdc.FilterBar"){return e;}else if(t==="sap.ui.mdc.FilterField"){if(e.getParent()&&e.getParent().getParent()){return e.getParent().getParent();}else{return null;}}else{return null;}}}}};},false);
sap.ui.predefine('sap/ui/mdc/designtime/Table.designtime',[],function(){"use strict";return{aggregations:{columns:{actions:{addODataProperty:"addColumn",move:"moveColumns",remove:"removeColumn"}},actions:{},_content:{ignore:true}},name:"{name}",description:"{description}",properties:{context:{ignore:true},tableBindingPath:{ignore:true},type:{ignore:false},interactionType:{ignore:false},filterBarId:{ignore:true},enabled:{ignore:true}}};},false);
sap.ui.predefine('sap/ui/mdc/designtime/library.designtime',[],function(){"use strict";return{};});
//# sourceMappingURL=library-preload.designtime.js.map