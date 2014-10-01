using System.Web.Mvc;
using SneakySignal.ViewModel;

namespace SneakySignal.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View("Desktop");
        }

        public ActionResult Mobile(string connectionId)
        {
            var vm = new MobileViewModel { ConnectionId = connectionId };
            return View(vm);
        }
    }
}