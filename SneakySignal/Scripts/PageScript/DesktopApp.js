function DesktopApp(urlElementId,qrCodeElementId) {
    var hub = $.connection.motionHub;
    var isConnected = false;
    var clientConnectionId;
    var ulrElement = $(urlElementId);
    var qrCodeElement = $(qrCodeElementId);

    hub.client.orientationChanged = function (orientation) {
        $('#alpha').html(orientation.Alpha);
        $('#beta').html(orientation.Beta);
        $('#gamma').html(orientation.Gamma);
    };
    
    hub.client.ClientConnected = function (clientId) {
        if (!isConnected) {
            isConnected = true;
            ulrElement.html('Connected');
            qrCodeElement.hide();
            clientConnectionId = clientId;
            hub.server.startExecution(clientConnectionId);
        }
    };

    var init = function() {
        $.connection.hub.start().done(function () {
            hub.server.getConnectionId().done(function (id) {
                var url = window.location.origin + '/Home/Mobile?connectionId=' + id;
                ulrElement.html(url);
                new QRCode(qrCodeElement[0], url);
            });
        });
    };

    return Object.freeze({
        init: init
    });
};