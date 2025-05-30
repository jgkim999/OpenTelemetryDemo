namespace OtelDemo.Services;

public class AuthService : IAuthService
{
    public async Task<bool> CredentialAreValidAsync(string username, string password, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("AuthService.CredentialAreValidAsync");
        activity?.SetTag("Username", username ?? "null");
        activity?.SetTag("Password", password ?? "null"); // Be cautious with sensitive data in logs
        
        await Task.CompletedTask;
        return true;
    }
}
