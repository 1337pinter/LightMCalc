var poligram = poligram || {};
poligram.createNS = function (a) {
    a = a.split(".");
    var b = poligram;
    "poligram" === a[0] && (a = a.slice(1));
    for (var c = 0; c < a.length; c++) {
        var d = a[c];
        "undefined" === typeof b[d] && (b[d] = {});
        b = b[d]
    }
    return b
};
poligram.createNS("poligram.app.tracking.model");

poligram.app.tracking.model.trackingLocationRecord = (function () {

    var data = null;

    function create() {

        var data = {
            activationKey: -1,
            samplingDate: null,
            longitude: null,
            latitude: null,
            altitude: null,
            heading: null,
            speed: null,
            driverId: null,
            vehicleId: null,
            plateNumber: "",
            address: "",
            streetNumber: "",
            postNo: "",
            place: "",
            cc: "",
            iconPath: "",
            shortMovementsInKM: null,
            restDurationInSec: null,
            dailyJourneyInKM: null,
            dailyJourneyInSec: null,
            delay: -1,
            gprsDelay: -1
        };

        var clearData = function () {
            data["activationKey"] = -1;
            data["samplingDate"] = null;
            data["longitude"] = null;
            data["latitude"] = null;
            data["altitude"] = null;
            data["heading"] = null;
            data["speed"] = null;
            data["driverId"] = null;
            data["vehicleId"] = null;
            data["plateNumber"] = "";
            data["address"] = "";
            data["streetNumber"] = "";
            data["postNo"] = "";
            data["place"] = "";
            data["cc"] = "";
            data["iconPath"] = "";
            data["shortMovementsInKM"] = null;
            data["restDurationInSec"] = null;
            data["dailyJourneyInKM"] = null;
            data["dailyJourneyInSec"] = null;
            data["delay"] = -1;
            data["gprsDelay"] = -1;
        };

        var setData = function (selectedItem) {
            data["activationKey"] = selectedItem["activationKey"];
            data["samplingDate"] = selectedItem["samplingDate"];
            data["longitude"] = selectedItem["longitude"];
            data["latitude"] = selectedItem["latitude"];
            data["altitude"] = selectedItem["altitude"];
            data["heading"] = selectedItem["heading"];
            data["speed"] = selectedItem["speed"];
            data["driverId"] = selectedItem["driverId"];
            data["vehicleId"] = selectedItem["vehicleId"];
            data["plateNumber"] = selectedItem["plateNumber"];
            data["address"] = selectedItem["address"];
            data["streetNumber"] = selectedItem["streetNumber"];
            data["postNo"] = selectedItem["postNo"];
            data["place"] = selectedItem["place"];
            data["cc"] = selectedItem["cc"];
            data["iconPath"] = selectedItem["iconPath"];
            data["shortMovementsInKM"] = selectedItem["shortMovementsInKM"];
            data["restDurationInSec"] = selectedItem["restDurationInSec"];
            data["dailyJourneyInKM"] = selectedItem["dailyJourneyInKM"];
            data["dailyJourneyInSec"] = selectedItem["dailyJourneyInSec"];
            data["delay"] = selectedItem["delay"];
            data["gprsDelay"] = selectedItem["gprsDelay"];
        };

        return {
            data: data,
            setData: setData,
            clearData: clearData
        };
    }

    return {

        create: function () {
            var result = create();
            return result;
        }
    }
})();