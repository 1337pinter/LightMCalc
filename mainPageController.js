mainPageController = (function () {

    var page = null;
    var instance = null;
    var actions = null;

    function singletone() {

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
                initEvents();
                page = 1;

                _.delay(function () {
                    actions.hideBusyIndicator();
                }, 2000);
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