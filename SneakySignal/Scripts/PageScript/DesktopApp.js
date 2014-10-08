function DesktopApp(urlElementId,qrCodeElementId,canvaseId) {
    var hub = $.connection.motionHub;
    var isConnected = false;
    var clientConnectionId;
    var ulrElement = $(urlElementId);
    var qrCodeElement = $(qrCodeElementId);
    var setAplha, setBeta, setGama;
    

    hub.client.orientationChanged = function (orientation) {
        var canvas = document.getElementById(canvaseId);
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setAplha(context, orientation.Alpha);
        setBeta(context, orientation.Beta);
        setGama(context, orientation.Gamma);
    };
    
    hub.client.ClientConnected = function (clientId) {
        if (!isConnected) {
            isConnected = true;
            qrCodeElement.hide();
            $('#' + canvaseId).show();
            clientConnectionId = clientId;
            hub.server.startExecution(clientConnectionId);
        }
    };

    setAplha = function(context, alpha) {
        context.fillStyle = "#FF7777";
        context.font = "14px Verdana";
        context.fillText("Alpha: " + Math.round(alpha), 10, 20);
        context.beginPath();
        context.moveTo(180, 75);
        context.lineTo(210, 75);
        context.arc(180, 75, 60, 0, alpha * Math.PI / 180);
        context.fill();
    };
    
    setBeta = function (context, beta) {
        context.fillStyle = "#FF6600";
        context.fillText("Beta: " + Math.round(beta), 10, 140);
        context.beginPath();
        context.fillRect(180, 150, beta, 90);
    };
    
    setGama = function (context, gamma) {
        context.fillStyle = "#FF0000";
        context.fillText("Gamma: " + Math.round(gamma), 10, 270);
        context.beginPath();
        context.fillRect(90, 340, 180, gamma);
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