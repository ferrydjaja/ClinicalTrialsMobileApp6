/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/changeHandler/Base","sap/ui/fl/Utils","sap/ui/core/util/reflection/JsControlTreeModifier"],function(q,B,F,J){"use strict";var M={};M._checkCompleteChangeContentConditions=function(s){if(!s.movedElements){throw new Error("oSpecificChangeInfo.movedElements attribute required");}if(s.movedElements.length===0){throw new Error("MovedElements array is empty");}s.movedElements.forEach(function(m){if(!m.id){throw new Error("MovedElements element has no id attribute");}if(typeof(m.targetIndex)!=="number"){throw new Error("Index attribute at MovedElements element is no number");}});};M._buildStableChangeInfo=function(m){var s=m.source.id;var t=m.target.id;var c={changeType:m.changeType,selector:{id:s},targetId:t!==s?t:null};c[m.changeType]=[];m.movedElements.forEach(function(a){c[m.changeType].push({id:a.id,index:a.targetIndex});});return c;};M.applyChange=function(c,s,p){function a(c,m){if(!c){throw new Error("No change instance");}var C=c.getContent();if(!m.getAggregation(s,"groups")){F.log.error("Object has no smartform elements aggregation",m.getId(s));}if(!C||!C.moveGroups||C.moveGroups.length===0){throw new Error("Change format invalid");}}function g(o,m,A,v){if(!o.selector&&!o.id){throw new Error("Change format invalid - moveGroups element has no id attribute");}if(typeof(o.index)!=="number"){throw new Error("Change format invalid - moveGroups element index attribute is no number");}return m.bySelector(o.selector||o.id,A,v);}var m=p.modifier;var v=p.view;var A=p.appComponent;a(c,m);var C=c.getContent();C.moveGroups.forEach(function(o){var G=g(o,m,A,v);if(!G){F.log.warning("Group to move not found");return;}m.removeAggregation(s,"groups",G,v);m.insertAggregation(s,"groups",G,o.index);});return true;};M.completeChangeContent=function(c,s,p){this._checkCompleteChangeContentConditions(s);s=this._buildStableChangeInfo(s);var C=c.getDefinition();if(!C.content){C.content={};}if(!C.content.moveGroups){C.content.moveGroups=[];}var m=s.moveGroups.map(function(g){var G=sap.ui.getCore().byId(g.id);var S=J.getSelector(G,p.appComponent);C.content.moveGroups.push({selector:S,index:g.index});return G;});c.addDependentControl(m,"movedGroups",p);};return M;},true);
