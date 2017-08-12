mainPageController = (function () {

    var page = null;
    var app = null;
    var instance = null;
    var actions = null;

    function singletone() {

        var initApp = function () {
            app = new Vue({
                el: '#app',
                data: {
                    roadCategory: 0,
                    speedLimit: 0,
                    trafficDensity: 0,
                    trafficConstitution: 0,
                    laneSep: false,
                    crossingDensity: 0,
                    hasParkedVehicles: false,
                    ambientLight: 0,
                    roadDifficulty: 0
                },
                computed: {
                    trafficDensityHighOptionLabel: function(){
                      switch(parseInt(this.roadCategory)){
                          case 0:
                              return "Visoka (> 45% max zmogljivosti)";
                          case 1:
                              return "Visoka (> 65% max zmogljivosti)";
                      }
                        return "";
                    },
                    trafficDensityMediumOptionLabel: function(){
                        switch(parseInt(this.roadCategory)){
                            case 0:
                                return "Zmerna (15% do 45% max zmogljivosti)";
                            case 1:
                                return "Zmerna (35% do 65% max zmogljivosti)";
                        }
                        return "";
                    },
                    trafficDensityLowOptionLabel: function(){
                        switch(parseInt(this.roadCategory)){
                            case 0:
                                return "Nizka (< 15% max zmogljivosti)";
                            case 1:
                                return "Nizka (< 35% max zmogljivosti)";
                        }
                        return "";
                    },
                    speedLimitScore: function () {
                        switch (parseInt(this.speedLimit)) {
                            case 0:
                                return 2;
                            case 1:
                                return 1;
                            case 2:
                                return -1;
                            case 3:
                                return -2;
                        }
                        return 0;
                    },
                    trafficDensityScore: function () {
                        switch (parseInt(this.trafficDensity)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                            case 2:
                                return -1;
                        }
                        return 0;
                    },
                    trafficConstitutionScore: function () {
                        switch (parseInt(this.trafficConstitution)) {
                            case 0:
                                return 2;
                            case 1:
                                return 1;
                            case 2:
                                return 0;
                        }
                        return 0;
                    },
                    laneSepScore: function () {
                        return this.laneSep == true ? 0 : 1;
                    },
                    crossingDensityScore: function () {
                        switch (parseInt(this.crossingDensity)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                        }
                        return 0;
                    },
                    hasParkedVehiclesScore: function () {
                        return this.hasParkedVehicles == true ? 1 : 0;
                    },
                    ambientLightScore: function () {
                        switch (parseInt(this.ambientLight)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                            case 2:
                                return -1;
                        }
                        return 0;
                    },
                    roadDifficultyScore: function () {
                        switch (parseInt(this.roadDifficulty)) {
                            case 0:
                                return 2;
                            case 1:
                                return 1;
                            case 2:
                                return 0;
                        }
                        return 0;
                    },
                    totalScore: function () {
                        return this.speedLimitScore +
                            this.trafficDensityScore +
                            this.trafficConstitutionScore +
                            this.laneSepScore +
                            this.crossingDensityScore +
                            this.hasParkedVehiclesScore +
                            this.ambientLightScore +
                            this.roadDifficultyScore;
                    }

                }
            });
        };

        var initEvents = function () {

        };

        var initActions = function () {
            function showBusyIndicator() {
                $("#busyIndicator").show();
            }

            function hideBusyIndicator() {
                $("#busyIndicator").hide();
            }

            return {
                showBusyIndicator: showBusyIndicator,
                hideBusyIndicator: hideBusyIndicator
            }
        };

        var show = function () {
            if (page == null) {
                actions = initActions();
                initApp();

                initEvents();
                page = 1;

                _.delay(function () {
                    actions.hideBusyIndicator();
                }, 500);
            }
        };

        return {
            show: show
        };
    }

    return {
        defaultInstance: function (htmlDialogRootElement) {
            if (instance == null) {
                instance = singletone(htmlDialogRootElement);
            }
            return instance;
        }
    }
})();