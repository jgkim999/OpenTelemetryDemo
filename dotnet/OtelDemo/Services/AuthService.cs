namespace OtelDemo.Services;

public class AuthService : IAuthService
{
    public async Task<bool> CredentialAreValidAsync(string username, string password, CancellationToken ct)
    {
        await Task.CompletedTask;
        return true;
    }
}
