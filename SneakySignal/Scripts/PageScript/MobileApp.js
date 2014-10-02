function MobileApp(connectionId) {
    var hub = $.connection.motionHub;
    var execute, updateOrientation;
    
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
    };

    updateOrientation = function (event) {
        if (event.alpha) {
            $('#alpha').html(event.alpha);
        }
        if (event.beta) {
            $('#beta').html(event.beta);
        }
        if (event.alpha) {
            $('#gamma').html(event.gamma);
        }
    };

    return Object.freeze({
        init: init
    });
};