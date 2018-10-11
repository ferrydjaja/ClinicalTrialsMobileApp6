/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','./ColumnWrapper'],function(q,E,C){"use strict";var a=E.extend("sap.ui.comp.personalization.ChartWrapper",{constructor:function(i,s){E.apply(this,arguments);},metadata:{library:"sap.ui.comp",properties:{externalFilters:{type:"sap.m.P13nFilterItem[]",defaultValue:[]}},aggregations:{columns:{type:"sap.ui.comp.personalization.ColumnWrapper",multiple:true,singularName:"column"}},associations:{chart:{type:"sap.chart.Chart",multiple:false}},events:{externalFiltersSet:{parameters:{filters:{type:"sap.m.P13nFilterItem[]"}}}}}});a.prototype.getChartObject=function(){var c=this.getAssociation("chart");if(typeof c==="string"){c=sap.ui.getCore().byId(c);}return c;};a.prototype.getDomRef=function(){var c=this.getChartObject();return c.getDomRef();};a.createChartWrapper=function(c,A,b){var p;var o={};c.getDimensions().forEach(function(d){p=d.data("p13nData");o[p.columnKey]=new C({label:d.getLabel(),tooltip:d.getTooltip(),selected:c.getVisibleDimensions().indexOf(d.getName())>-1,aggregationRole:sap.ui.comp.personalization.AggregationRole.Dimension,role:d.getRole()?d.getRole():d.getMetadata().getProperty("role").getDefaultValue(),sorted:p.sorted,sortOrder:p.sortOrder,customData:new sap.ui.core.CustomData({key:"p13nData",value:p}),hierarchyLevel:p.hierarchyLevel,chart:c});});c.getMeasures().forEach(function(m){p=m.data("p13nData");o[p.columnKey]=new C({label:m.getLabel(),tooltip:m.getTooltip(),selected:c.getVisibleMeasures().indexOf(m.getName())>-1,aggregationRole:sap.ui.comp.personalization.AggregationRole.Measure,role:m.getRole()?m.getRole():m.getMetadata().getProperty("role").getDefaultValue(),sorted:p.sorted,sortOrder:p.sortOrder,customData:new sap.ui.core.CustomData({key:"p13nData",value:p}),chart:c});});if(A){A.forEach(function(p){o[p.columnKey]=new C({label:p.label,tooltip:p.tooltip,selected:false,aggregationRole:sap.ui.comp.personalization.AggregationRole.NotDimeasure,sorted:p.sorted,sortOrder:p.sortOrder,customData:new sap.ui.core.CustomData({key:"p13nData",value:p}),chart:c});if(!o[p.columnKey].getParent()){c.addDependent(o[p.columnKey]);}});}return new a({chart:c,columns:b.map(function(s){return o[s];})});};return a;},true);
