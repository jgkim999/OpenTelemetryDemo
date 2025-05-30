using FastEndpoints;
using FastEndpoints.Security;
using OtelDemo.Models;
using OtelDemo.Services;

namespace OtelDemo.Endpoints;

public class UserLoginEndpoint : Endpoint<LoginRequest>
{
    private readonly IAuthService _authService;
    
    public UserLoginEndpoint(IAuthService authService)
    {
        _authService = authService;
    }
    
    public override void Configure()
    {
        Post("/api/login");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(LoginRequest req, CancellationToken ct)
    {
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
