using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Kt4HttpRequest.Controllers;

public class EchoController : Controller
{
    [HttpGet]
    public async Task Get()
    {
        Response.ContentType = "text/plain";
        await Response.WriteAsync("GET request received");
    }

    [HttpPost]
    public async Task Post()
    {
        Response.ContentType = "text/plain";
        await Response.WriteAsync("POST request received");
    }

    public async Task Headers()
    {
        var headers = Request.Headers.ToDictionary(
            header => header.Key,
            header => header.Value.ToArray());

        Response.ContentType = "application/json";
        await Response.WriteAsJsonAsync(headers, new JsonSerializerOptions(), "application/json");
    }

    public async Task Query()
    {
        var parameters = Request.Query.ToDictionary(
            parameter => parameter.Key,
            parameter => parameter.Value.ToArray());

        Response.ContentType = "application/json";
        await Response.WriteAsJsonAsync(parameters, new JsonSerializerOptions(), "application/json");
    }

    public async Task Body()
    {
        using var content = new StreamContent(Request.Body);

        if (Request.ContentType != null)
        {
            content.Headers.TryAddWithoutValidation("Content-Type", Request.ContentType);
        }

        string body = await content.ReadAsStringAsync();

        Response.ContentType = "text/plain";
        await Response.WriteAsync(body);
    }
}
