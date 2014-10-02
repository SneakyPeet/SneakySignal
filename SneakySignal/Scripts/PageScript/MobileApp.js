function MobileApp(connectionId) {
    var hub = $.connection.motionHub;
    var execute, updateOrientation, sendUpdate;
    var orientation = {
        alpha: 0,
        beta: 0,
        gamma: 0
    };
    var hasUpdate = false;
    
    hub.client.StartExecution = function () {
        if (window.DeviceOrientationEvent) {
            execute();
        } else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
    };
    
    var init = function() {
        $.connection.hub.start().done(function () {
            hub.server.clientConnected(connectionId).done();
        });
    };

    execute = function() {
        window.addEventListener("deviceorientation", updateOrientation);
        hasUpdate = true;
        sendUpdate();
    };

    updateOrientation = function (event) {
        if (event.alpha) {
            $('#alpha').html(event.alpha);
            orientation.alpha = event.alpha;
            hasUpdate = true;
        }
        if (event.beta) {
            $('#beta').html(event.beta);
            orientation.beta = event.beta;
            hasUpdate = true;
        }
        if (event.alpha) {
            $('#gamma').html(event.gamma);
            orientation.gamma = event.gamma;
            hasUpdate = true;
        }
    };

    sendUpdate = function () {
        if (hasUpdate) {
            hub.server.orientationChanged(connectionId, orientation);
            hasUpdate = false;
        }
        setTimeout(sendUpdate, 50);
    };

    return Object.freeze({
        init: init
    });
};