using System.Diagnostics;

namespace OtelDemo.Services;

public static class ActivityService
{
    private static ActivitySource? _activeSource;
    private static Random _random = new Random();
    private static double _samplingRate = 1.0;
    
    public static void Initialize(string name, string version = "1.0.0", double samplingRate = 1.0)
    {
        if (_activeSource != null)
        {
            return; // Already initialized
        }
        _activeSource = new ActivitySource( name ?? "OtelDemo", version?? "1.0.0");
        _samplingRate = samplingRate;
    }
    
    public static string Name => _activeSource?.Name ?? "OtelDemo";
    
    public static Activity? StartActivity(string name, ActivityKind kind = ActivityKind.Internal)
    {
        if (_activeSource == null)
        {
            throw new InvalidOperationException("ActiveSourceService is not initialized. Call Initialize() first.");
        }
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Activity name cannot be null or empty.", nameof(name));
        }
        if (kind == ActivityKind.Internal && !_activeSource.HasListeners())
        {
            return null; // No listeners for internal activities
        }
        // Check if the activity should be sampled based on the sampling rate
        if (_samplingRate < 1.0 && _random.NextDouble() > _samplingRate)
        {
            return null; // Skip this activity based on sampling rate
        }
        // Start a new activity with the provided name and kind
        var activity = _activeSource?.StartActivity(name, kind);
        return activity;
    }
}
