using Microsoft.AspNet.SignalR;

namespace SneakySignal
{
    public class MotionHub : Hub
    {
        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public void SetConnectionId()
        {
            Clients.Others.setConnectionId(Context.ConnectionId);
        }

        public void OrientationChanged(string connectionId, OrientationData orientationData)
        {
            Clients.Client(connectionId).orientationChanged(orientationData);
        }
    }
}