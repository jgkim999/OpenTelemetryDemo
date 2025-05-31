using FastEndpoints;
using OtelDemo.Models;
using OtelDemo.Services;

namespace OtelDemo.Endpoints;

public class MyEndpoint : Endpoint<MyRequest, MyResponse>
{
    private readonly ILogger<MyEndpoint> _logger;
    private readonly IAuthService _authService;
    
    public MyEndpoint(ILogger<MyEndpoint> logger, IAuthService authService)
    {
        _logger = logger;
        _authService = authService;
    }
    
    public override void Configure()
    {
        Post("/api/user/create");
        AllowAnonymous();
    }

    public override async Task HandleAsync(MyRequest req, CancellationToken ct)
    {
        bool created = await _authService.CreateUserAsync(req.Username, req.Password, ct);
        
        
        await SendAsync(new()
            {
                FullName = req.FirstName + " " + req.LastName,
                IsOver18 = req.Age > 18
            },
            cancellation: ct);
    }
}
