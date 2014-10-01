using System.Web.Mvc;

namespace SneakySignal.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Request.Browser.IsMobileDevice)
            {
                return RedirectToAction("Mobile");
            }
            return RedirectToAction("Desktop");
        }
        
        public ActionResult Desktop()
        {
            return View();
        }
        
        public ActionResult Mobile()
        {
            return View();
        }
	}
}