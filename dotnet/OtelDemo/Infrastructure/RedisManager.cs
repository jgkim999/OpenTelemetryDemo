using OtelDemo.Configs;
using StackExchange.Redis;

namespace OtelDemo.Infrastructure;

public class RedisManager
{
    private readonly ConnectionMultiplexer _connection;
    
    public RedisManager(RedisOptions redisOptions)
    {
        ArgumentNullException.ThrowIfNull(redisOptions);
        _connection = ConnectionMultiplexer.Connect(redisOptions.ConnectionString);
    }

    public ConnectionMultiplexer GetConnection()
    {
        return _connection;
    }
    
    public IDatabase GetDatabase(int db = -1)
    {
        if (_connection.IsConnected)
        {
            return _connection.GetDatabase(db);
        }
        throw new InvalidOperationException("Redis connection is not established.");
    }
}
