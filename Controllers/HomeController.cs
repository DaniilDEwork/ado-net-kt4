using Microsoft.AspNetCore.Mvc;

namespace Kt4HttpRequest.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["Title"] = "Главная";
        return View();
    }

    public IActionResult Demo(string id)
    {
        string? title = id switch
        {
            "Get" => "GET-запрос",
            "Post" => "POST-запрос",
            "Headers" => "Заголовки запроса",
            "Query" => "Параметры строки запроса",
            "Body" => "Тело запроса",
            _ => null
        };

        if (title == null)
        {
            return NotFound();
        }

        ViewData["Title"] = title;
        return View(model: id);
    }
}
