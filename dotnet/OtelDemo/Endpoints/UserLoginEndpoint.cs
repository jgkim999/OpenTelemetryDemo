using FastEndpoints;
using FastEndpoints.Security;
using OtelDemo.Models;
using OtelDemo.Services;

namespace OtelDemo.Endpoints;

public class UserLoginEndpoint : Endpoint<LoginRequest>
{
    private readonly IAuthService _authService;
    private readonly ILogger<UserLoginEndpoint> _logger;
    
    public UserLoginEndpoint(IAuthService authService, ILogger<UserLoginEndpoint> logger)
    {
        _authService = authService;
        _logger = logger;
    }
    
    public override void Configure()
    {
        Post("/api/login");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("UserLoginEndpoint.HandleAsync");
        activity?.SetTag("Username", req.Username ?? "null");
        activity?.SetTag("Password", req.Password ?? "null"); // Be cautious with sensitive data in logs
        
        _logger.LogInformation("UserLoginEndpoint.HandleAsync {Username} {Password}", req.Username, req.Password);
        
        if (await _authService.CredentialAreValidAsync(req.Username, req.Password, ct))
        {
            var jwtToken = JwtBearer.CreateToken(o =>
            {
                o.ExpireAt = DateTime.UtcNow.AddDays(1);
                o.User.Roles.Add("Manager", "Auditor");
                o.User.Claims.Add(("UserName", req.Username));
                o.User["UserId"] = "001";
            });
            // For demonstration purposes, we assume the login is always successful
            var response = new LoginResponse
            {
                Username = req.Username,
                Token = jwtToken
            };
            await SendAsync(response, cancellation: ct);
        }
        else
        {
            ThrowError("Invalid UserName or password.");
        }
    }
}
