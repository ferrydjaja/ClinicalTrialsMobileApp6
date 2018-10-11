sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ClinicalTrials.ClinicalTrials.controller.Feedback", {
		handleRouteMatched: function(oEvent) {
			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}
		},

        onInit: function() {

            /*this below code for get the JSON Model form Manifest.json file*/
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        	var oModelCountry = this.getOwnerComponent().getModel("CountryModel");
            oModelCountry.setSizeLimit(250);
            this.getView().byId("selectCountryAS").setModel(oModelCountry);

            var oModelState = this.getOwnerComponent().getModel("StateModel");
            this.getView().byId("selectStateAS").setModel(oModelState);
            this.getView().byId("selectStateAS").bindAggregation("suggestionItems", {
                path: "/",
                template: new sap.ui.core.Item({
                    text: "{state}",
                    key: '{code}'
                })
            });

            var oModelTrialStatus = this.getOwnerComponent().getModel("TrialStatusModel");
            this.getView().byId("selectTrialStatusAS").setModel(oModelTrialStatus);

            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this,
                        args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };

            var this_ = this;
            var oTextArea = this.getView().byId("selectConditionAS");

            oTextArea.attachLiveChange(debounce(function() {
               
                var searchkey = oTextArea.getValue();
                
                $.ajax({
                    type: 'GET',
                    async: true,
                    cache: true,
                    timeout: 600000, 
                    dataType: "json",
                    url: "https://erpdevapi.apimanagement.us3.hana.ondemand.com/clinicalnodejs?q=3&cond=" + searchkey,
                    contentType: 'application/json; charset=utf-8',
                    success: function(data) {
                        var arSearch = [];
                        for (var i = 0, len = data.length; i < len; i++) {
                            arSearch.push({
                                desc: data[i],
                                code: data[i]
                            })
                        }

                        var model = new sap.ui.model.json.JSONModel();
                        model.setData({});
                        this_.getView().byId("selectConditionAS").setModel(model);

                        var oModelCondition = new sap.ui.model.json.JSONModel(arSearch);
                        this_.getView().byId("selectConditionAS").setModel(oModelCondition);

                        this_.getView().byId("selectConditionAS").bindAggregation("suggestionItems", {
                            path: "/",
                            template: new sap.ui.core.Item({
                                text: "{desc}",
                                key: '{code}'
                            })
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            
            }, 500));

            var oRootPath = jQuery.sap.getModulePath("ClinicalTrials.ClinicalTrials"); // your resource root
            var oImageModel = new sap.ui.model.json.JSONModel({
                path : oRootPath,
            });
                    
            this.getView().setModel(oImageModel, "imageModel");
        },


        onSelectCountryChange: function(oEvent) {
            console.log(oEvent.getParameters().selectedItem.getKey());

            if (oEvent.getParameters().selectedItem.getKey() != 'US') {
                this.getView().byId("selectStateAS").setValue("");
                this.getView().byId("selectStateAS").setEnabled(false);
            } else {
                this.getView().byId("selectStateAS").setValue("");
                this.getView().byId("selectStateAS").setEnabled(true);
            }
        },

        onSelectStateChange: function(oEvent) {
            console.log(oEvent.getParameters().selectedItem.getKey());
        },


        onSelectTrialStatusChange: function(oEvent) {},

        _onRadioButtonGroupSelect: function() {

        },

		onNavButtonTo: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("list", true);
		},

		
        onButtonPress: function(oEvent) {
            navigator.geolocation.getCurrentPosition(this.onGeoSuccess.bind(this), this.onGeoError.bind(this), {
                enableHighAccuracy: true, timeout: 2000, maximumAge: 0
            });
        },


        onGeoSuccess: function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var alt = position.coords.altitude;

            this.onProcess(lat, lng);
        },

       onGeoError: function() {
            //cordova.plugins.diagnostic.switchToLocationSettings();
            
            var this_ = this;
            
            cordova.plugins.locationAccuracy.canRequest(function(canRequest){
			    if(canRequest){
			        cordova.plugins.locationAccuracy.request(function (success){
			            console.log("Successfully requested accuracy: "+success.message);
			            
			             navigator.geolocation.getCurrentPosition(this_.onGeoSuccess.bind(this_), this_.onGeoError.bind(this_), {
			                enableHighAccuracy: true, timeout: 2000, maximumAge: 0
			            });
            
			        }, function (error){
			           console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
			           if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
			               if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
			                   cordova.plugins.diagnostic.switchToLocationSettings();
			               }
			           } else {
			           		this_.onProcess('', '');
			           }
			        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
			    }else{
			        // request location permission and try again
			    }
			});

            //this.onProcess(lat, lng);
        },

        onProcess: function(lat, lng) {
            var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
                text: "{i18n>MSG0}",
                title: "{i18n>MSG1}"
            });

            function wasteTime() {
                busyDialog.open();
            }

            function runNext() {
                busyDialog.close();
            }
            
            function toTitleCase(str) {
                return str.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }

            var cond = this.getView().byId("selectConditionAS").getValue().trim();
            var cntry = this.getView().byId("selectCountryAS").getSelectedKey().trim();
            var state = this.getView().byId("selectStateAS").getSelectedKey().trim();
            var city = this.getView().byId("selectCityAS").getValue().trim();
            var gndr = this.getView().byId("selectGenderAS").getSelectedIndex();
            var gndrAr = ['All', 'Male', 'Female'];
            gndr = gndrAr[gndr];
            var recrs = this.getView().byId("selectTrialStatusAS").getSelectedKey().trim();
            var age = this.getView().byId("selectAgeAS").getSelectedIndex();
            var ageAr = ['', '0', '1', '2'];
            age = ageAr[age];

            var dist = 10676;

            if (cond.length > 0) {
                console.log(cond + ':' + cntry + ':' + state + ':' + city + ':' + gndr + ':' + recrs + ':' + ':' + age + ':' + dist + ':' + lat + ':' + lng);

                wasteTime();

                var this_ = this;
               
                $.ajax({
                    type: 'GET',
                    async: true,
                    cache: true,
                    dataType: "json",
                    timeout: 600000, 
                    contentType: "application/json; charset=utf-8",
                    url: "https://erpdevapi.apimanagement.us3.hana.ondemand.com/clinicalnodejs?q=1&cond=" + cond + "&cntry=" + cntry + "&state=" + state + "&city=" + city + "&recrs=" + recrs + "&gndr=" + gndr + "&age=" + age + "&dist=" + dist + "&lat=" + lat + "&lng=" + lng,
                    success: function(data) {
                        console.log(data);

                        if (JSON.stringify(data) != "{}") {
                            console.log(data.results.length);

                            if (data.results.length > 0) {
                                runNext();

                                var oModel = new sap.ui.model.json.JSONModel();
                                oModel.setData({});
                                oModel.setSizeLimit(999999);

                                oModel.setData({
                                    modelData: [data],
                                    UserLoc: [lat + ';' + lng],
                                    cond: [toTitleCase(cond)]
                                });
                                sap.ui.getCore().setModel(oModel);
                                this_.onNavButtonTo();

                            } else {
                                runNext();
                                jQuery.sap.require("sap.m.MessageBox");
                                sap.m.MessageBox.show(jQuery.sap.resources({
                                    url: "i18n/i18n.properties"
                                }).getText("NO_INFO"), {
                                    icon: sap.m.MessageBox.Icon.INFORMATION,
                                    title: "{i18n>WELCOME_TITLE}",
                                    actions: sap.m.MessageBox.Action.OK,
                                    onClose: null,
                                    //styleClass: ""                        
                                });
                            }
                        } else {
                            // No record {}
                            runNext();
                            jQuery.sap.require("sap.m.MessageBox");
                            sap.m.MessageBox.show(jQuery.sap.resources({
                                url: "i18n/i18n.properties"
                            }).getText("NO_INFO"), {
                                icon: sap.m.MessageBox.Icon.INFORMATION,
                                title: "{i18n>WELCOME_TITLE}",
                                actions: sap.m.MessageBox.Action.OK,
                                onClose: null,
                                //styleClass: ""                        
                            });
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        runNext();
                        jQuery.sap.require("sap.m.MessageBox");
                        sap.m.MessageBox.show(jQuery.sap.resources({
                                url: "i18n/i18n.properties"
                        }).getText("ERROR_INFO"), {
                               icon: sap.m.MessageBox.Icon.INFORMATION,
                                title: "{i18n>WELCOME_TITLE}",
                                actions: sap.m.MessageBox.Action.OK,
                                onClose: null,
                                //styleClass: ""                        
                        });
                    }
                });


            } else {
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(jQuery.sap.resources({
                    url: "i18n/i18n.properties"
                }).getText("VALID_KEYWORD"), {
                    icon: sap.m.MessageBox.Icon.INFORMATION,
                    title: "{i18n>WELCOME_TITLE}",
                    actions: sap.m.MessageBox.Action.OK,
                    onClose: null,
                    //styleClass: ""                        
                });
            }
        }


    });
});
