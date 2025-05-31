using System.Diagnostics;
using OtelDemo.Infrastructure;
using OtelDemo.Services;

namespace OtelDemo.Repositories;

public class UserRepository : IUserRepository
{
    private readonly RedisManager _redis;
    private readonly ILogger<UserRepository> _logger;
    private readonly string _envName;
    
    public UserRepository(RedisManager redisManager, ILogger<UserRepository> logger, IHostEnvironment env)
    {
        _logger = logger;
        _redis = redisManager;
        _envName = env.EnvironmentName;
    }
    
    string GetUserKey(string username)
    {
        return $"{_envName}:user:{username}";
    }

    public async Task<bool> UserExistsAsync(string username, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("UserRepository.UserExistsAsync");
        activity?.SetTag("Username", username ?? "null");
        
        var db = _redis.GetDatabase();
        Debug.Assert(username != null, nameof(username) + " != null");
        var userPassword = await db.StringGetAsync( GetUserKey(username));
        return userPassword.HasValue;
    }

    public async Task<bool> UserExistsAsync(string username, string password, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("UserRepository.UserExistsAsync");
        activity?.SetTag("Username", username ?? "null");
        
        var db = _redis.GetDatabase();
        Debug.Assert(username != null, nameof(username) + " != null");
        var userPassword = await db.StringGetAsync( GetUserKey(username));
        if (userPassword.HasValue && userPassword.ToString() == password)
        {
            _logger.LogInformation("User {Username} exists in the repository.", username);
            return true;
        }
        return false;
    }

    public Task<bool> CreateUserAsync(string username, string password, CancellationToken ct)
    {
        using var activity = ActivityService.StartActivity("UserRepository.CreateUserAsync");
        activity?.SetTag("Username", username ?? "null");
        
        Debug.Assert(username != null, nameof(username) + " != null");
        Debug.Assert(password != null, nameof(password) + " != null");

        var db = _redis.GetDatabase();
        var userKey = GetUserKey(username);
        
        // Store the user password in Redis
        return db.StringSetAsync(userKey, password, TimeSpan.FromDays(1));
    }
}
