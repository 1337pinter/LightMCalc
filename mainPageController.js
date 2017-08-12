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
                    trafficDensityHighOptionLabel: function () {
                        switch (parseInt(this.roadCategory)) {
                            case 0:
                                return "Visoka (> 45% max zmogljivosti)";
                            case 1:
                                return "Visoka (> 65% max zmogljivosti)";
                        }
                        return "";
                    },
                    trafficDensityMediumOptionLabel: function () {
                        switch (parseInt(this.roadCategory)) {
                            case 0:
                                return "Zmerna (15% do 45% max zmogljivosti)";
                            case 1:
                                return "Zmerna (35% do 65% max zmogljivosti)";
                        }
                        return "";
                    },
                    trafficDensityLowOptionLabel: function () {
                        switch (parseInt(this.roadCategory)) {
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
                    },
                    mClassStr: function () {
                        if (this.totalScore >= 1 && this.totalScore <= 6) {

                            var result = '<table class="table table-striped table-condensed table-hover"><thead><tr>';
                            result += '<th>' + "Razred" + '</th>';
                            result += '<th><i>L<sub>w</sub></i></th>';
                            result += '<th><i>U<sub>O</sub></i></th>';
                            result += '<th><i>U<sub>I</sub></i></th>';
                            result += '<th><i>TI</i></th>';
                            result += '<th><i>K<sub>O</sub></i></th>';
                            result += "</tr></thead>";
                            result += "<tbody>";

                            if(this.totalScore == 1){
                                result += "<tr><td><b>M1</b></td><td>2,0</td><td>0,4</td><td>0,7</td><td>10</td><td>0,5</td></tr>";
                            }

                            if(this.totalScore == 2){
                                result += "<tr><td><b>M2</b></td><td>1,5</td><td>0,4</td><td>0.7</td><td>10</td><td>0,5</td></tr>";
                            }

                            if(this.totalScore == 3){
                                result += "<tr><td><b>M3a</b></td><td>1,0</td><td>0,4</td><td>0.7</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M3b</b></td><td>1,0</td><td>0,4</td><td>0.6</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M3c</b></td><td>1,0</td><td>0,4</td><td>0.5</td><td>15</td><td>0,5</td></tr>";
                            }

                            if(this.totalScore == 4){
                                result += "<tr><td><b>M4a</b></td><td>0,75</td><td>0,4</td><td>0.6</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M4b</b></td><td>0,75</td><td>0,4</td><td>0.5</td><td>15</td><td>0,5</td></tr>";
                            }

                            if(this.totalScore == 5){
                                result += "<tr><td><b>M5</b></td><td>0,5</td><td>0,35</td><td>0.4</td><td>15</td><td>0,5</td></tr>";
                            }

                            if(this.totalScore == 6){
                                result += "<tr><td><b>M6</b></td><td>0,3</td><td>0,35</td><td>0.4</td><td>15</td><td>-</td></tr>";
                            }

                            result += "</tbody>";
                            result += "</table>";
                            return result;
                        } else {
                            return '<span class="glyphicon glyphicon-alert text-danger"></span> Vrednost parametrov ni primerna za razred razsvetljave M'
                        }

                        return result;
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