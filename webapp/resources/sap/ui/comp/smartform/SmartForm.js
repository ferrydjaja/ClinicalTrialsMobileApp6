/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2018 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/comp/library','sap/ui/core/Control','sap/ui/layout/form/Form','sap/ui/base/ManagedObjectObserver'],function(q,l,C,F,M){"use strict";var P;var T;var O;var a;var b;var B;var c;var f={ResponsiveGridLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveGridLayout",name:"sap.ui.layout.form.ResponsiveGridLayout",requested:false,loaded:b1},ResponsiveLayout:{layout:undefined,path:"sap/ui/layout/form/ResponsiveLayout",name:"sap.ui.layout.form.ResponsiveLayout",requested:false,loaded:c1},ColumnLayout:{layout:undefined,path:"sap/ui/layout/form/ColumnLayout",name:"sap.ui.layout.form.ColumnLayout",requested:false,loaded:d1}};var S=C.extend("sap.ui.comp.smartform.SmartForm",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartform/SmartForm.designtime",properties:{title:{type:"string",group:"Misc",defaultValue:null},useHorizontalLayout:{type:"boolean",group:"Misc",defaultValue:null},horizontalLayoutGroupElementMinWidth:{type:"int",group:"Misc",defaultValue:null},checkButton:{type:"boolean",group:"Misc",defaultValue:false},entityType:{type:"string",group:"Misc",defaultValue:null},expandable:{type:"boolean",group:"Misc",defaultValue:false},expanded:{type:"boolean",group:"Misc",defaultValue:null},editTogglable:{type:"boolean",group:"Misc",defaultValue:false},editable:{type:"boolean",group:"Misc",defaultValue:false},ignoredFields:{type:"string",group:"Misc",defaultValue:null},flexEnabled:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.ui.comp.smartform.Group",multiple:true,singularName:"group"},content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},layout:{type:"sap.ui.comp.smartform.SmartFormLayout",multiple:false},semanticObjectController:{type:"sap.ui.comp.navpopover.SemanticObjectController",multiple:false},customToolbar:{type:"sap.m.Toolbar",multiple:false},toolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{editToggled:{parameters:{editable:{type:"boolean"}}},checked:{parameters:{erroneousFields:{type:"sap.ui.comp.smartfield.SmartField[]"}}}}},renderer:function(i,j){i.write("<div");i.writeControlData(j);i.addClass("sapUiCompSmartForm");i.writeClasses();i.write(">");var k=j.getAggregation("content");i.renderControl(k);i.write("</div>");}});S.prototype.init=function(){this._oForm=new F(this.getId()+"--Form");this._oForm.getToolbar=function(){var i=this.getParent();if(i&&!i.getExpandable()){return i._getToolbar();}};this.setAggregation("content",this._oForm);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this._oObserver=new M(g.bind(this));this._oObserver.observe(this,{properties:["editTogglable","title","checkButton","useHorizontalLayout","horizontalLayoutGroupElementMinWidth","expandable","expanded"],aggregations:["layout","customData"],associations:["ariaLabelledBy"]});};S.prototype.onBeforeRendering=function(){$.call(this);};S.prototype.addGroup=function(i){if(!i){return this;}i=this.validateAggregation("groups",i,true);y.call(this,i);this._delegateEditMode(i);this._oForm.addFormContainer(i);_.call(this,i);return this;};S.prototype.getGroups=function(){return this._oForm.getFormContainers();};S.prototype.indexOfGroup=function(i){return this._oForm.indexOfFormContainer(i);};S.prototype.insertGroup=function(i,j){if(!i){return this;}i=this.validateAggregation("groups",i,true);y.call(this,i);this._delegateEditMode(i);this._oForm.insertFormContainer(i,j);_.call(this,i);return this;};S.prototype.removeGroup=function(i){var j=this._oForm.removeFormContainer(i);if(j){j.detachEvent("_visibleChanged",g1,this);A.call(this,j);g1.call(this);}return j;};S.prototype.removeAllGroups=function(){var j=this._oForm.removeAllFormContainers();for(var i=0;i<j.length;i++){j[i].detachEvent("_visibleChanged",g1,this);A.call(this,j[i]);}g1.call(this);return j;};S.prototype.destroyGroups=function(){var j=this.getGroups();for(var i=0;i<j.length;i++){j[i].detachEvent("_visibleChanged",g1,this);}this._oForm.destroyFormContainers();g1.call(this);return this;};function _(i){var j=this.getUseHorizontalLayout();var k=this.getHorizontalLayoutGroupElementMinWidth();i.attachEvent("_visibleChanged",g1,this);if(k!=i.getHorizontalLayoutGroupElementMinWidth){i.setHorizontalLayoutGroupElementMinWidth(k);}if(j!=i.getUseHorizontalLayout()){i.setUseHorizontalLayout(j);}if(j){i._updateGridDataSpan();i._updateLineBreaks();}else{g1.call(this);}}S.prototype._getToolbar=function(){var i=this.getCustomToolbar();return i||this.getAggregation("toolbar");};S.prototype.propagateGridDataSpan=function(){var j=this.getGroups();for(var i=0;i<j.length;i++){var k=j[i];k._updateGridDataSpan();k._updateLineBreaks();}return this;};S.prototype._getGridDataSpanNumbers=function(){var i=this.getLayout();var j;if(i&&i._getGridDataSpanNumbers){j=i._getGridDataSpanNumbers();}return j;};S.prototype._toggleEditMode=function(){var i=this.getEditable();this.setEditable(!i);};S.prototype.check=function(i){var j=this._checkClientError(i);return j;};S.prototype._checkClientError=function(i){if(i===undefined){i=true;}var j=this.getSmartFields(i,i);var k=[];var k1=null;j.forEach(function(l1){if(l1.checkClientError()){if(i&&l1.getVisible){if(!l1.getVisible()){return;}}k1=l1.getParent();while(k1.getParent){k1=k1.getParent();if(k1.isA("sap.ui.comp.smartform.Group")){if(!k1.getExpanded()){k1.setExpanded(true);}break;}}k.push(l1.getId());}});return k;};S.prototype._displayError=function(i){var j=this._oRb.getText("FORM_CLIENT_CHECK_ERROR_TITLE");var k=this._oRb.getText("FORM_CLIENT_CHECK_ERROR");if(!c&&!this._bMessageBoxRequested){c=sap.ui.require("sap/m/MessageBox");if(!c){sap.ui.require(["sap/m/MessageBox"],d.bind(this));this._bMessageBoxRequested=true;}}if(c){c.show(k,{icon:c.Icon.ERROR,title:j,styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":""});}};function d(i){c=i;this._bMessageBoxRequested=false;if(!this._bIsBeingDestroyed){e.call(this);}}function e(){var i=this.check(true);if(i&&i.length>0){this._displayError(i);return true;}return false;}S.prototype.setEditable=function(i){var j=this.getEditable();i=this.validateProperty("editable",i);if(j===i){return this;}if(!i&&this.hasListeners("editToggled")){if(e.call(this)){return this;}}this.setProperty("editable",i);if(this._oForm){this._oForm.setEditable(i);}this.fireEditToggled({editable:i});if(this._oEditToggleButton){this._oEditToggleButton.setIcon(i?"sap-icon://display":"sap-icon://edit");var k=this._oRb.getText(i?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton.setTooltip(k);}var k1=this.getGroups();k1.forEach(function(l1){l1.setEditMode(i);});if(this.getCheckButton()&&i){U.call(this);}else{V.call(this);}return this;};function g(i){if(i.object==this){if(i.name=="editTogglable"){h.call(this,i.current);}else if(i.name=="title"){m.call(this,i.current);}else if(i.name=="checkButton"){n.call(this,i.current);}else if(i.name=="useHorizontalLayout"){o.call(this,i.current);}else if(i.name=="horizontalLayoutGroupElementMinWidth"){r.call(this,i.current);}else if(i.name=="expanded"){w.call(this,i.current);}else if(i.name=="expandable"){s.call(this,i.current);}else if(i.name=="layout"){p.call(this,i.child,i.mutation);}else if(i.name=="customData"){x.call(this,i.child,i.mutation);}else if(i.name=="ariaLabelledBy"){D.call(this,i.ids,i.mutation);}}else if(i.object.isA("sap.ui.comp.smartform.SmartFormLayout")){j1.call(this,i.object,i.name,i.current,i.old);}}function h(i){if(i){Q.call(this);}else{R.call(this);}H.call(this);}function m(i){if(this._oPanel){this._oPanel.setHeaderText(i);}H.call(this);}function n(i){if(i){U.call(this);}else{V.call(this);}H.call(this);}function o(i){if(i){this.addStyleClass("sapUiCompSmartFormHorizontalLayout");}else{this.removeStyleClass("sapUiCompSmartFormHorizontalLayout");}var j=this.getGroups();if(j){j.forEach(function(k1){if(k1.getUseHorizontalLayout()!=i){k1.setUseHorizontalLayout(i);}});}var k=this.getLayout();if(i){e1.call(this,k);}else{$.call(this);e1.call(this,k);}}function p(i,j){if(j==="remove"){this._oObserver.unobserve(i);}else{this._oObserver.observe(i,{properties:true});}if(i.isA("sap.ui.comp.smartform.Layout")){this.propagateGridDataSpan();}$.call(this);e1.call(this,j==="insert"?i:null);}function r(i){q.sap.log.error("HorizontalLayoutGroupElementMinWidth is deprecated",this);var j=this.getGroups();if(j){j.forEach(function(k){k.setHorizontalLayoutGroupElementMinWidth(i);});}}S.prototype.getVisibleProperties=function(){var i=[];var j=this.getGroups();if(j){j.forEach(function(k){var k1=k.getGroupElements();if(k1.length>0){k1.forEach(function(l1){var m1=l1.getElements();if(m1.length>0){m1.forEach(function(n1){if(n1.getVisible()){var o1=n1.getBindingPath("value");if(o1){i.push(o1);}}});}});}});}return i;};S.prototype.setCustomToolbar=function(i){var j=this.getCustomToolbar();if(j==i){return this;}K.call(this);R.call(this);V.call(this);this.setAggregation("customToolbar",i);if(this.getTitle()){H.call(this);}if(this.getEditTogglable()){Q.call(this);}if(this.getCheckButton()){U.call(this);}return this;};S.prototype.destroyCustomToolbar=function(){var i=this.getCustomToolbar();if(i){K.call(this);R.call(this);V.call(this);}this.destroyAggregation("customToolbar");if(this.getTitle()){H.call(this);}if(this.getEditTogglable()){Q.call(this);}if(this.getCheckButton()){U.call(this);}return this;};function s(i){if(i){if(!P&&!this._bPanelRequested){P=sap.ui.require("sap/m/Panel");if(!P){sap.ui.require(["sap/m/Panel"],u.bind(this));this._bPanelRequested=true;}}if(P){t.call(this);}}else if(this._oPanel){this.setAggregation("content",this._oForm);this._oPanel.destroy();this._oPanel=null;}H.call(this);}function t(){this._oPanel=new P(this.getId()+"--Panel",{expanded:this.getExpanded(),expandable:true,headerText:this.getTitle(),expandAnimation:false});this._oPanel.getHeaderToolbar=function(){var i=this.getParent();if(i){return i._getToolbar();}};this._oPanel.attachExpand(v,this);this.setAggregation("content",this._oPanel);this._oPanel.addContent(this._oForm);}function u(i){P=i;this._bPanelRequested=false;if(this.getExpandable()&&!this._bIsBeingDestroyed){t.call(this);}}function v(i){this.setProperty("expanded",i.getParameter("expand"),true);}function w(i){if(this._oPanel){this._oPanel.setExpanded(i);}}function x(j,k){var k1=this.getGroups();for(var i=0;i<k1.length;i++){if(k==="insert"){z.call(this,k1[i],j);}else{A.call(this,k1[i],j.getId());}}}function y(j){var k=this.getCustomData();for(var i=0;i<k.length;i++){z.call(this,j,k[i]);}}function z(i,j){if(sap.ui.comp.smartform.inheritCostomDataToFields(j)){var k=j.clone();k._bFromSmartForm=true;k._sOriginalId=j.getId();i.addCustomData(k);}}function A(j,k){var k1=j.getCustomData();for(var i=0;i<k1.length;i++){var l1=k1[i];if(l1._bFromSmartForm&&(!k||k==l1._sOriginalId)){j.removeCustomData(l1);}}}function D(j,k){var k1;if(Array.isArray(j)){k1=j;}else{k1=[j];}for(var i=0;i<k1.length;i++){var l1=k1[i];if(k==="insert"){this._oForm.addAriaLabelledBy(l1);}else{this._oForm.removeAriaLabelledBy(l1);}}}S.prototype._delegateEditMode=function(i){if(i){i.setEditMode(this.getEditable());}};S.prototype.getSmartFields=function(k1,l1){var m1=[];var n1=[];var o1=[];var p1=[];if(k1===undefined){k1=true;}m1=this.getGroups();for(var i=0;i<m1.length;i++){var q1=m1[i];if(!k1||(k1&&q1.isVisible())){n1=q1.getGroupElements();for(var j=0;j<n1.length;j++){var r1=n1[j];if(!l1||(l1&&r1.isVisible())){o1=r1.getElements();for(var k=0;k<o1.length;k++){var s1=o1[k];if(s1.isA("sap.ui.comp.smartfield.SmartField")){p1.push(s1);}}}}}}return p1;};S.prototype.setFocusOnEditableControl=function(){var i=[];this.getGroups().forEach(function(j){if(j.isVisible()){j.getGroupElements().forEach(function(k){if(k.isVisible()){i=i.concat(k.getElements());}});}});i.some(function(j){if(j.getEditable&&j.getEditable()&&j.focus&&j.getVisible()){if(j.isA("sap.ui.comp.smartfield.SmartField")){j.attachEventOnce("innerControlsCreated",function(k){q.sap.delayedCall(0,k.oSource._oControl[k.oSource._oControl.current],"focus");});}else{j.focus();}return true;}});};S.prototype.clone=function(j,k){this.setAggregation("content",null);var k1=this.getAggregation("toolbar");var l1=this.getCustomToolbar();var m1=this.getCustomData();var n1=this.getGroups();var i=0;if(l1){K.call(this);R.call(this);V.call(this);}else if(k1){this.setAggregation("toolbar",null);}if(m1.length>0){for(i=0;i<n1.length;i++){A.call(this,n1[i]);}}var o1=C.prototype.clone.apply(this,arguments);for(i=0;i<n1.length;i++){var p1=n1[i].clone(j,k);o1.addGroup(p1);}if(this.getExpandable()&&this._oPanel){this.setAggregation("content",this._oPanel);}else{this.setAggregation("content",this._oForm);}if(l1){if(this.getTitle()){H.call(this);}if(this.getEditTogglable()){Q.call(this);}if(this.getCheckButton()){U.call(this);}}else if(k1){this.setAggregation("toolbar",k1);}if(m1.length>0){for(i=0;i<n1.length;i++){y.call(this,n1[i]);}}return o1;};S.prototype.exit=function(){if(this._oForm){this._oForm.destroy();}if(this._oPanel){this._oPanel.destroy();}if(this._oTitle){this._oTitle.destroy();}if(this._oEditToggleButton){this._oEditToggleButton.destroy();}this._oForm=null;this._oPanel=null;this._oTitle=null;this._oRb=null;this._oEditToggleButton=null;this._oObserver.disconnect();this._oObserver=undefined;};function E(){var i=this.getAggregation("toolbar");if(!i){i=new O(this.getId()+"-toolbar-sfmain",{"height":"3rem","design":sap.m.ToolbarDesign.Transparent});i._bCreatedBySmartForm=true;this.setAggregation("toolbar",i);}return i;}function G(i){var j=this.getAggregation("toolbar");if(j){if(i){var k=j.getContent();if(k.length>0){return;}}this.destroyAggregation("toolbar");}}function H(){var i=this.getTitle();if(i){if(!this.getCustomToolbar()&&!this.getCheckButton()&&!this.getEditTogglable()){if(this._oTitle){if(this._getToolbar()){K.call(this);}this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null;}this._oForm.setTitle(i);}else{this._oForm.setTitle();if(!this._oTitle){if((!T||!O||!a||!b)&&!this._bTitleRequested){T=sap.ui.require("sap/m/Title");O=sap.ui.require("sap/m/OverflowToolbar");a=sap.ui.require("sap/m/ToolbarSpacer");b=sap.ui.require("sap/m/ToolbarSeparator");if(!T||!O||!a||!b){sap.ui.require(["sap/m/Title",'sap/m/OverflowToolbar','sap/m/ToolbarSpacer','sap/m/ToolbarSeparator'],I.bind(this));this._bTitleRequested=true;}}if(T&&!this._bTitleRequested){this._oTitle=new T(this.getId()+"-title-sfmain");}}if(this._oTitle){this._oTitle.setText(i);this._oForm.addAriaLabelledBy(this._oTitle);J.call(this);}}}else{if(this._oTitle){K.call(this);this._oForm.removeAriaLabelledBy(this._oTitle);this._oTitle.destroy();this._oTitle=null;}else{this._oForm.setTitle();}}}function I(i,j,k,k1){T=i;O=j;a=k;b=k1;this._bTitleRequested=false;if(!this._bIsBeingDestroyed){H.call(this);}}function J(){if(!this._oTitle){return;}var i=this._getToolbar();if(!i){i=E.call(this);}i.insertContent(this._oTitle,0);}function K(){if(!this._oTitle){return;}var i=this._getToolbar();i.removeContent(this._oTitle);G.call(this,true);}function L(){if((!B||!O||!a||!b)&&!this._bButtonRequested){B=sap.ui.require("sap/m/Button");O=sap.ui.require("sap/m/OverflowToolbar");a=sap.ui.require("sap/m/ToolbarSpacer");b=sap.ui.require("sap/m/ToolbarSeparator");if(!B||!O||!a||!b){sap.ui.require(["sap/m/Button",'sap/m/OverflowToolbar','sap/m/ToolbarSpacer','sap/m/ToolbarSeparator'],N.bind(this));this._bButtonRequested=true;}}if(B&&!this._bButtonRequested){return true;}return false;}function N(i,j,k,k1){B=i;O=j;a=k;b=k1;this._bButtonRequested=false;if(!this._bIsBeingDestroyed){if(this._bEditRequested){this._bEditRequested=false;Q.call(this);}if(this._bCheckRequested){this._bCheckRequested=false;U.call(this);}}}function Q(){if(!this.getEditTogglable()){return;}if(!L.call(this)){this._bEditRequested=true;return;}var i=this._getToolbar();if(!i){i=E.call(this);}if(!this._oCheckButton){X.call(this,i);}if(!this._oEditToggleButton){var j=this.getEditable()?"sap-icon://display":"sap-icon://edit";var k=this._oRb.getText(this.getEditable()?"FORM_TOOLTIP_DISPLAY":"FORM_TOOLTIP_EDIT");this._oEditToggleButton=new B(i.getId()+"-button-sfmain-editToggle",{icon:j,tooltip:k});this._oEditToggleButton.attachPress(this._toggleEditMode,this);}var k1=i.getContent().length;if(this._oCheckButton){k1--;}i.insertContent(this._oEditToggleButton,k1);}function R(){if(!this._oEditToggleButton){return;}var i=this._getToolbar();i.removeContent(this._oEditToggleButton);this._oEditToggleButton.destroy();this._oEditToggleButton=null;Y.call(this,i);G.call(this,true);}function U(){if(!this.getCheckButton()||!this.getEditable()){return;}if(!L.call(this)){this._bCheckRequested=true;return;}var i=this._getToolbar();if(!i){i=E.call(this);}if(!this._oEditToggleButton){X.call(this,i);}if(!this._oCheckButton){this._oCheckButton=new B(this.getId()+"-"+i.getId()+"-button-sfmain-check",{text:this._oRb.getText("SMART_FORM_CHECK")});this._oCheckButton.attachPress(W,this);}var j=i.getContent().length;i.insertContent(this._oCheckButton,j);}function V(){if(!this._oCheckButton){return;}var i=this._getToolbar();i.removeContent(this._oCheckButton);this._oCheckButton.destroy();this._oCheckButton=null;Y.call(this,i);G.call(this,true);}function W(i){var j=[];j=this.check(true);this.fireChecked({erroneousFields:j});}function X(j){var k;if(!j._bCreatedBySmartForm){var k1=j.getContent();var l1=false;for(var i=0;i<k1.length;i++){if(k1[i]instanceof a){l1=true;break;}}if(!l1){k=new a();k._bCreatedBySmartForm=true;j.addContent(k);}if(!(k1[k1.length-1]instanceof b)){var m1=new b();m1._bCreatedBySmartForm=true;j.addContent(m1);}}else{k=new a();k._bCreatedBySmartForm=true;j.addContent(k);}}function Y(i){var j=i.getContent();var k;if(!i._bCreatedBySmartForm){k=j[j.length-1];if(k instanceof b&&k._bCreatedBySmartForm){k.destroy();}j=i.getContent();}k=j[j.length-1];if(k instanceof a&&k._bCreatedBySmartForm){k.destroy();}}function Z(i,j){if(!i.layout&&!i.requested){i.layout=sap.ui.require(i.path);if(!i.layout){sap.ui.require([i.path],i.loaded.bind(this));i.requested=true;}}if(i.layout&&!i.requested&&!(j instanceof i.layout)){if(j){j.destroy();}j=new i.layout();this._oForm.setLayout(j);return true;}return false;}function $(){var j=this.getLayout();var k=this._oForm.getLayout();var k1=this.getUseHorizontalLayout();var l1=false;if(j&&j.isA("sap.ui.comp.smartform.ColumnLayout")){if(k1){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this);}l1=Z.call(this,f.ColumnLayout,k);if(l1){i1.call(this,j);}}else if(k1&&(!j||!j.getGridDataSpan())){l1=Z.call(this,f.ResponsiveLayout,k);}else if(!k||!f.ResponsiveGridLayout.layout||!(k instanceof f.ResponsiveGridLayout.layout)){l1=Z.call(this,f.ResponsiveGridLayout,k);if(l1){this._oFormLayoutNotInitial=true;f1.call(this,j);}}if(l1){var m1=this.getGroups();for(var i=0;i<m1.length;i++){var n1=m1[i];n1._updateLayoutData();}}}function a1(i,j){i.layout=j;i.requested=false;if(!this._bIsBeingDestroyed){$.call(this);}}function b1(i){a1.call(this,f.ResponsiveGridLayout,i);}function c1(i){a1.call(this,f.ResponsiveLayout,i);}function d1(i){a1.call(this,f.ColumnLayout,i);}function e1(i){if(!i||i.isA("sap.ui.comp.smartform.Layout")){f1.call(this,i);}else if(i.isA("sap.ui.comp.smartform.ColumnLayout")){i1.call(this,i);}}function f1(i){var j=this._oForm.getLayout();if(!j||!j.isA(f.ResponsiveGridLayout.name)){return;}if(this.getUseHorizontalLayout()){if(i&&i.getGridDataSpan()){h1.call(this,j);j.setColumnsL(1);j.setColumnsM(1);if(i.getBreakpointM()>0){j.setBreakpointM(i.getBreakpointM());}if(i.getBreakpointL()>0){j.setBreakpointL(i.getBreakpointL());}if(i.getBreakpointXL()>0){j.setBreakpointXL(i.getBreakpointXL());}this._oFormLayoutNotInitial=true;}}else{if(i){j.setLabelSpanXL(i.getLabelSpanXL()?i.getLabelSpanXL():-1);j.setLabelSpanL(i.getLabelSpanL()?i.getLabelSpanL():4);j.setLabelSpanM(i.getLabelSpanM()?i.getLabelSpanM():4);j.setLabelSpanS(i.getLabelSpanS()?i.getLabelSpanS():12);j.setEmptySpanXL(i.getEmptySpanXL()?i.getEmptySpanXL():-1);j.setEmptySpanL(i.getEmptySpanL()?i.getEmptySpanL():0);j.setEmptySpanM(i.getEmptySpanM()?i.getEmptySpanM():0);j.setColumnsXL(i.getColumnsXL()?i.getColumnsXL():-1);j.setColumnsL(i.getColumnsL()?i.getColumnsL():3);j.setColumnsM(i.getColumnsM()?i.getColumnsM():2);j.setSingleContainerFullSize(i.getSingleGroupFullSize());j.setBreakpointXL(i.getBreakpointXL()?i.getBreakpointXL():1440);j.setBreakpointL(i.getBreakpointL()?i.getBreakpointL():1024);j.setBreakpointM(i.getBreakpointM()?i.getBreakpointM():600);this._oFormLayoutNotInitial=true;}else{h1.call(this,j);}g1.call(this,i,j);}}function g1(j,k){if(this.getUseHorizontalLayout()){return;}if(!k){k=this._oForm.getLayout();j=this.getLayout();}if(!k||!k.isA(f.ResponsiveGridLayout.name)){return;}var k1=this.getGroups();var l1=-1;var m1=3;var n1=true;var o1=0;for(var i=0;i<k1.length;i++){if(k1[i].isVisible()){o1++;}}if(j){m1=j.getColumnsL()?j.getColumnsL():3;l1=(j.getColumnsXL()>0)?j.getColumnsXL():-1;n1=j.getSingleGroupFullSize();}if(k1&&o1>0&&o1<l1&&n1){k.setColumnsXL(o1);}else if(k.getColumnsXL()!=l1){k.setColumnsXL(l1);}if(k1&&o1>0&&o1<m1&&n1){k.setColumnsL(o1);}else if(k.getColumnsL()!=m1){k.setColumnsL(m1);}}function h1(i){if(this._oFormLayoutNotInitial){i.setLabelSpanXL(-1);i.setLabelSpanL(4);i.setLabelSpanM(4);i.setLabelSpanS(12);i.setEmptySpanXL(-1);i.setEmptySpanL(0);i.setEmptySpanM(0);i.setColumnsXL(-1);i.setColumnsL(3);i.setColumnsM(2);i.setSingleContainerFullSize(true);i.setBreakpointXL(1440);i.setBreakpointL(1024);i.setBreakpointM(600);this._oFormLayoutNotInitial=false;}}function i1(i){var j=this._oForm.getLayout();if(!j||!j.isA(f.ColumnLayout.name)){return;}if(this.getUseHorizontalLayout()){throw new Error("ColumnLayout and useHorizontalLayout must not ne used at the same time on "+this);}else{j.setColumnsXL(i.getColumnsXL());j.setColumnsL(i.getColumnsL());j.setColumnsM(i.getColumnsM());j.setLabelCellsLarge(i.getLabelCellsLarge());j.setEmptyCellsLarge(i.getEmptyCellsLarge());}}function j1(i,j,k,k1){e1.call(this,i);if(j==="gridDataSpan"){this.propagateGridDataSpan();if(k===""||k1===""){$.call(this);}}}return S;},true);