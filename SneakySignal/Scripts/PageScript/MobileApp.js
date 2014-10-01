function MobileApp(connectionId) {
    var hub = $.connection.motionHub;
    
    hub.client.StartExecution = function() {
        alert('execute');
    };
    
    var init = function() {
        $.connection.hub.start().done(function () {
            hub.server.clientConnected(connectionId).done();
        });
    };

    return Object.freeze({
        init: init
    });
};