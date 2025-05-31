namespace OtelDemo.Services;

public interface IAuthService
{
    Task<bool> CredentialAreValidAsync(string username, string password, CancellationToken ct);
    Task<bool> CreateUserAsync(string username, string password, CancellationToken ct);
}
