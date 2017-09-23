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
                    selectedPage: 0,

                    roadCategory: 0,
                    speedLimit: 0,
                    trafficDensity: 0,
                    trafficConstitution: 0,
                    laneSep: false,
                    crossingDensity: 0,
                    hasParkedVehicles: false,
                    ambientLight: 0,
                    roadDifficulty: 0,

                    pTravelSpeed:0,
                    pUsageInt: 0,
                    pTrafficConst: 0,
                    pHasParkedVehicles: false,
                    pAmbilight: 0,
                    pFaceRecognition: 0
                },
                computed: {
                    selectedPageTitle: function () {
                        switch (this.selectedPage) {
                            case 0:
                                return "Določitev M in C razreda razsvetljave";
                            case 1:
                                return "Določitev P razreda razsvetljave";
                        }
                        return "";
                    },
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
                    mSpeedLimitScore: function () {
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
                    mcTrafficDensityScore: function () {
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
                    mcTrafficConstitutionScore: function () {
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
                    mcLaneSepScore: function () {
                        return this.laneSep == true ? 0 : 1;
                    },
                    mCrossingDensityScore: function () {
                        switch (parseInt(this.crossingDensity)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                        }
                        return 0;
                    },
                    mcHasParkedVehiclesScore: function () {
                        return this.hasParkedVehicles == true ? 1 : 0;
                    },
                    mcAmbientLightScore: function () {
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
                    mcRoadDifficultyScore: function () {
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
                    mVWS: function () {
                        return this.mSpeedLimitScore +
                            this.mcTrafficDensityScore +
                            this.mcTrafficConstitutionScore +
                            this.mcLaneSepScore +
                            this.mCrossingDensityScore +
                            this.mcHasParkedVehiclesScore +
                            this.mcAmbientLightScore +
                            this.mcRoadDifficultyScore;
                    },
                    mClassNo: function () {
                        var classVWS = this.mVWS < 0 ? 0 : this.mVWS;
                        var classNo = 6 - classVWS;

                        if (classNo <= 0)
                            return 1;
                        return classNo;
                    },
                    mClassStr: function () {
                        if (this.mClassNo >= 1 && this.mClassNo <= 6) {
                            var result = '<table class="table table-striped table-condensed table-hover"><thead><tr>';
                            result += '<th>' + "Razred" + '</th>';
                            result += '<th><i>L<sub>w</sub></i></th>';
                            result += '<th><i>U<sub>O</sub></i></th>';
                            result += '<th><i>U<sub>I</sub></i></th>';
                            result += '<th><i>TI</i></th>';
                            result += '<th><i>K<sub>O</sub></i></th>';
                            result += "</tr></thead>";
                            result += "<tbody>";

                            if (this.mClassNo == 1) {
                                result += "<tr><td><b>M1</b></td><td>2,0</td><td>0,4</td><td>0,7</td><td>10</td><td>0,5</td></tr>";
                            }

                            if (this.mClassNo == 2) {
                                result += "<tr><td><b>M2</b></td><td>1,5</td><td>0,4</td><td>0,7</td><td>10</td><td>0,5</td></tr>";
                            }

                            if (this.mClassNo == 3) {
                                result += "<tr><td><b>M3a</b></td><td>1,0</td><td>0,4</td><td>0,7</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M3b</b></td><td>1,0</td><td>0,4</td><td>0,6</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M3c</b></td><td>1,0</td><td>0,4</td><td>0,5</td><td>15</td><td>0,5</td></tr>";
                            }

                            if (this.mClassNo == 4) {
                                result += "<tr><td><b>M4a</b></td><td>0,75</td><td>0,4</td><td>0,6</td><td>15</td><td>0,5</td></tr>";
                                result += "<tr><td><b>M4b</b></td><td>0,75</td><td>0,4</td><td>0,5</td><td>15</td><td>0,5</td></tr>";
                            }

                            if (this.mClassNo == 5) {
                                result += "<tr><td><b>M5</b></td><td>0,5</td><td>0,35</td><td>0,4</td><td>15</td><td>0,5</td></tr>";
                            }

                            if (this.mClassNo == 6) {
                                result += "<tr><td><b>M6</b></td><td>0,3</td><td>0,35</td><td>0,4</td><td>15</td><td>-</td></tr>";
                            }

                            result += "</tbody>";
                            result += "</table>";
                            return result;
                        } else {
                            return '<span class="glyphicon glyphicon-alert text-danger"></span> Vrednost parametrov ni primerna za razred razsvetljave M'
                        }

                        return result;
                    },
                    cSpeedLimitScore: function () {
                        switch (parseInt(this.speedLimit)) {
                            case 0:
                                return 3;
                            case 1:
                                return 2;
                            case 2:
                                return 0;
                            case 3:
                                return -1;
                        }
                        return 0;
                    },
                    cVWS: function () {
                        return this.cSpeedLimitScore +
                            this.mcTrafficDensityScore +
                            this.mcTrafficConstitutionScore +
                            this.mcLaneSepScore +
                            this.mcHasParkedVehiclesScore +
                            this.mcAmbientLightScore +
                            this.mcRoadDifficultyScore;
                    },
                    cClassNo: function () {
                        var classVWS = this.cVWS <= 0 ? 1 : this.cVWS;
                        var classNo = 6 - classVWS;

                        if (classNo < 0)
                            return 0;
                        return classNo;
                    },
                    cClassStr: function () {
                        if (this.cClassNo >= 0 && this.cClassNo <= 5) {
                            var result = '<table class="table table-striped table-condensed table-hover"><thead><tr>';
                            result += '<th>' + "Razred" + '</th>';
                            result += '<th><i>E<sub>sr</sub> &nbsp;(L<sub>x</sub>)</i></th>';
                            result += '<th><i>U<sub>O</sub></i></th>';
                            result += "</tr></thead>";
                            result += "<tbody>";

                            if (this.cClassNo == 0) {
                                result += "<tr><td><b>C0</b></td><td>50</td><td>0,4</td></tr>";
                            }

                            if (this.cClassNo == 1) {
                                result += "<tr><td><b>C1</b></td><td>30</td><td>0,4</td></tr>";
                            }

                            if (this.cClassNo == 2) {
                                result += "<tr><td><b>C2</b></td><td>20</td><td>0,4</td></tr>";
                            }

                            if (this.cClassNo == 3) {
                                result += "<tr><td><b>C3</b></td><td>15</td><td>0,4</td></tr>";
                            }

                            if (this.cClassNo == 4) {
                                result += "<tr><td><b>C4</b></td><td>10</td><td>0,4</td></tr>";
                            }

                            if (this.cClassNo == 5) {
                                result += "<tr><td><b>C5</b></td><td>7,5</td><td>0,4</td></tr>";
                            }

                            result += "</tbody>";
                            result += "</table>";
                            return result;
                        } else {
                            return '<span class="glyphicon glyphicon-alert text-danger"></span> Vrednost parametrov ni primerna za razred razsvetljave C'
                        }

                        return result;
                    },
                    pTravelSpeedScore: function () {
                        switch (parseInt(this.pTravelSpeed)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                        }
                        return 0;
                    },
                    pUsageIntScore: function () {
                        switch (parseInt(this.pUsageInt)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                            case 2:
                                return -1;
                        }
                        return 0;
                    },
                    pTrafficConstScore: function () {
                        switch (parseInt(this.pTrafficConst)) {
                            case 0:
                                return 2;
                            case 1:
                                return 1;
                            case 2:
                                return 1;
                            case 3:
                                return 0;
                            case 4:
                                return 0;
                        }
                        return 0;
                    },
                    pHasParkedVehiclesScore: function () {
                        return this.pHasParkedVehicles == true ? 1 : 0;
                    },
                    pAmbilightScore: function () {
                        switch (parseInt(this.pAmbilight)) {
                            case 0:
                                return 1;
                            case 1:
                                return 0;
                            case 2:
                                return -1;
                        }
                        return 0;
                    },
                    pFaceRecognitionScore: function () {
                        switch (parseInt(this.pFaceRecognition)) {
                            case 0:
                                return "Dodatne zahteve";
                            case 1:
                                return "Brez dodatnih zahtev";
                        }
                        return "Brez dodatnih zahtev";
                    },
                    pVWS: function () {
                        return this.pTravelSpeedScore +
                            this.pUsageIntScore +
                            this.pTrafficConstScore +
                            this.pHasParkedVehiclesScore +
                            this.pAmbilightScore;
                    },
                    pClassNo: function () {
                        var classVWS = this.pVWS < 0 ? 0 : this.pVWS;
                        var classNo = 6 - classVWS;

                        if (classNo <= 0)
                            return 1;
                        return classNo;
                    },
                    pClassStr: function () {
                        if (this.pClassNo >= 1 && this.pClassNo <= 7) {
                            var result = '<table class="table table-striped table-condensed table-hover"><thead><tr>';
                            result += '<th>' + "Razred" + '</th>';
                            result += '<th><i>Povpr. vod. osv.&nbsp;(L<sub>x</sub>)</i></th>';
                            result += '<th><i>min. vod. osv.&nbsp;(L<sub>x</sub>)</i></th>';
                            result += "</tr></thead>";
                            result += "<tbody>";

                            if (this.pClassNo == 1) {
                                result += "<tr><td><b>P1</b></td><td>15</td><td>5</td></tr>";
                            }

                            if (this.pClassNo == 2) {
                                result += "<tr><td><b>P2</b></td><td>10</td><td>3</td></tr>";
                            }

                            if (this.pClassNo == 3) {
                                result += "<tr><td><b>P3</b></td><td>7,5</td><td>1,5</td></tr>";
                            }

                            if (this.pClassNo == 4) {
                                result += "<tr><td><b>P4</b></td><td>5</td><td>1</td></tr>";
                            }

                            if (this.pClassNo == 5) {
                                result += "<tr><td><b>P5</b></td><td>3</td><td>0,6</td></tr>";
                            }

                            if (this.pClassNo == 6) {
                                result += "<tr><td><b>P6</b></td><td>2</td><td>0,6</td></tr>";
                            }

                            if (this.pClassNo == 7) {
                                result += "<tr><td><b>P7</b></td><td>ni zahtev</td><td>ni zahtev</td></tr>";
                            }

                            result += "</tbody>";
                            result += "</table>";
                            return result;
                        } else {
                            return '<span class="glyphicon glyphicon-alert text-danger"></span> Vrednost parametrov ni primerna za razred razsvetljave P'
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