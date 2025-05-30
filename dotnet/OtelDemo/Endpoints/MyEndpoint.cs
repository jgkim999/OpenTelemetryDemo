using FastEndpoints;
using OtelDemo.Models;

namespace OtelDemo.Endpoints;

public class MyEndpoint : Endpoint<MyRequest, MyResponse>
{
    private readonly ILogger<MyEndpoint> _logger;
    
    public MyEndpoint(ILogger<MyEndpoint> logger)
    {
        _logger = logger;
    }
    
    public override void Configure()
    {
        Post("/api/user/create");
        AllowAnonymous();
    }

    public override async Task HandleAsync(MyRequest req, CancellationToken ct)
    {
        await SendAsync(new()
            {
                FullName = req.FirstName + " " + req.LastName,
                IsOver18 = req.Age > 18
            },
            cancellation: ct);
    }
}
