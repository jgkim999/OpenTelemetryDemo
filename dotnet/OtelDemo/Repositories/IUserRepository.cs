namespace OtelDemo.Repositories;

public interface IUserRepository
{
    Task<bool> UserExistsAsync(string username, CancellationToken ct);
    Task<bool> UserExistsAsync(string username, string password, CancellationToken ct);
    Task<bool> CreateUserAsync(string username, string password, CancellationToken ct);
}

