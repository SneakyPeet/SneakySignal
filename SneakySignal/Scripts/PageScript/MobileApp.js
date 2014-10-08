function MobileApp(connectionId,statusId) {
    var hub = $.connection.motionHub;
    var execute, updateOrientation, sendUpdate;
    var orientation = {
        alpha: 0,
        beta: 0,
        gamma: 0
    };
    var hasUpdate = false;
    var status = document.getElementById(statusId);
    
    hub.client.StartExecution = function () {
        if (window.DeviceOrientationEvent) {
            status.innerHTML = 'Tilt Me';
            execute();
        } else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
    };
    
    var init = function() {
        $.connection.hub.start().done(function () {
            hub.server.clientConnected(connectionId).done();
            status.innerHTML = 'Connecting';
        });
    };

    execute = function() {
        window.addEventListener("deviceorientation", updateOrientation);
        hasUpdate = true;
        sendUpdate();
    };

    updateOrientation = function (event) {
        if (event.alpha) {
            orientation.alpha = event.alpha;
            hasUpdate = true;
        }
        if (event.beta) {
            orientation.beta = event.beta;
            hasUpdate = true;
        }
        if (event.gamma) {
            orientation.gamma = event.gamma;
            hasUpdate = true;
        }
    };

    sendUpdate = function () {
        if (hasUpdate) {
            hub.server.orientationChanged(connectionId, orientation);
            hasUpdate = false;
        }
        setTimeout(sendUpdate, 100);
    };

    return Object.freeze({
        init: init
    });
};