using System.Diagnostics;
using OtelDemo.Repositories;

namespace OtelDemo.Services;

public class AuthService : IAuthService
{
    private ILogger<AuthService> _logger;
    private IUserRepository _userRepository;
    
    public AuthService(ILogger<AuthService> logger, IUserRepository userRepository)
    {
        _logger = logger;
        _userRepository = userRepository;
    }
    
    public async Task<bool> CredentialAreValidAsync(string username, string password, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("AuthService.CredentialAreValidAsync");
        activity?.SetTag("Username", username ?? "null");
        activity?.SetTag("Password", password ?? "null"); // Be cautious with sensitive data in logs

        Debug.Assert(username != null, nameof(username) + " != null");
        Debug.Assert(password != null, nameof(password) + " != null");
        bool exist = await _userRepository.UserExistsAsync(username, password, ct);
        return exist;
    }

    public async Task<bool> CreateUserAsync(string username, string password, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("AuthService.CreateUserAsync");
        activity?.SetTag("Username", username ?? "null");
        activity?.SetTag("Password", password ?? "null"); // Be cautious with sensitive data in logs

        Debug.Assert(username != null, nameof(username) + " != null");
        Debug.Assert(password != null, nameof(password) + " != null");

        bool exist = await _userRepository.UserExistsAsync(username, ct);
        if (exist)
        {
            _logger.LogWarning("User {Username} already exists.", username);
            return false; // User already exists
        }
        
        bool success = await _userRepository.CreateUserAsync(username, password, ct);
        if (!success)
        {
            _logger.LogError("Failed to create user {Username}.", username);
            return false; // Failed to create user
        }
        
        _logger.LogInformation("Creating user {Username} with password {Password}", username, password);
        return true;
    }
}
