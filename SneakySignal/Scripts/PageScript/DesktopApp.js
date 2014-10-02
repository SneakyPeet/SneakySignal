function DesktopApp(urlElementId,qrCodeElementId) {
    var hub = $.connection.motionHub;
    var isConnected = false;
    var clientConnectionId;

    hub.client.OrientationChanged = function (orientation) {
        alert('orientation');
    };
    
    hub.client.ClientConnected = function (clientId) {
        if (!isConnected) {
            isConnected = true;
            $(urlElementId).html('Connected');
            clientConnectionId = clientId;
            hub.server.startExecution(clientConnectionId);
        }
        
    };

    var init = function() {
        $.connection.hub.start().done(function () {
            hub.server.getConnectionId().done(function (id) {
                var url = window.location.origin + '/Home/Mobile?connectionId=' + id;
                $(urlElementId).html(url);
                new QRCode(document.getElementById(qrCodeElementId), url);
            });
        });
    };

    return Object.freeze({
        init: init
    });
};