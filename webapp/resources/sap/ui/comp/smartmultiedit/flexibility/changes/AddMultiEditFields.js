/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Utils","sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/comp/smartmultiedit/Container"],function(q,U,B,J,C){"use strict";var A={};A.applyChange=function(c,g,p){var o=c.getDefinition(),m=p.modifier,v=p.view,f,a,b=function(o){var d=o.content,M=false;if(d){M=o.content.field&&(o.content.field.selector||o.content.field.id)&&o.content.field.jsType&&o.content.field.propertyName;}return d&&M;};if(b(o)){var F=o.content.field.selector;var s=o.content.field.id;var i=o.content.field.index;var G=m.createControl("sap.ui.comp.smartform.GroupElement",p.appComponent,v,F||s);var j=o.content.field.jsType;var P=o.content.field.propertyName;var e=o.content.field.entitySet;f=this.addElementIntoGroupElement(m,v,G,j,P,e,p.appComponent);m.insertAggregation(g,"groupElements",G,i);if(g&&g.getParent()&&g.getParent().getParent()&&g.getParent().getParent().getParent()){a=g.getParent().getParent().getParent();if(a instanceof C){a.indexField(f);}}return true;}else{U.log.error("Change does not contain sufficient information to be applied: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);}};A.addElementIntoGroupElement=function(m,v,g,j,p,e,a){var V=m.createControl(j,a,v);m.setProperty(V,"propertyName",p);m.insertAggregation(g,"elements",V,0,v,true);if(e){m.setProperty(V,"entitySet",e);}return V;};A.completeChangeContent=function(c,s,p){var a=p.appComponent;var o=c.getDefinition();if(!o.content){o.content={};}if(!o.content.field){o.content.field={};}if(s.bindingPath){o.content.field.propertyName=s.bindingPath;}else{throw new Error("oSpecificChangeInfo.bindingPath or bindingPath attribute required");}if(s.newControlId){o.content.field.selector=J.getSelector(s.newControlId,a);}else{throw new Error("oSpecificChangeInfo.newControlId attribute required");}if(s.jsTypes){o.content.field.jsType=s.jsType;}else if(s.bindingPath){o.content.field.jsType="sap.ui.comp.smartmultiedit.Field";}else{throw new Error("oSpecificChangeInfo.jsTypes or bindingPath attribute required");}if(s.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required");}else{o.content.field.index=s.index;}if(s.entitySet){o.content.field.entitySet=s.entitySet;}};return A;},true);
