using Microsoft.AspNet.SignalR;

namespace SneakySignal
{
    public class MotionHub : Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public void ClientConnected(string connectionId)
        {
            var clientId = Context.ConnectionId;
            Clients.Client(connectionId).clientConnected(clientId);
        }

        public void OrientationChanged(string connectionId, OrientationData orientationData)
        {
            Clients.Client(connectionId).orientationChanged(orientationData);
        }

        public void StartExecution(string connectionId)
        {
            Clients.Client(connectionId).startExecution();
        }
    }
}