using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
using OpenTelemetry.Exporter;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OtelDemo.Services;
using Scalar.AspNetCore;
using Serilog;
using Serilog.Sinks.OpenTelemetry;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.OpenTelemetry(options =>
    {
        options.Endpoint = "http://192.168.0.47:4317";
        options.Protocol = OtlpProtocol.Grpc;
    })
    .CreateLogger();
try
{
    var builder = WebApplication.CreateBuilder(args);
    
    string serviceName = builder.Environment.ApplicationName ?? "DotNetOtelDemo";
    
    var otel = builder.Services.AddOpenTelemetry();
    otel.ConfigureResource(resource => resource
        .AddService(serviceName));
    
    otel.WithMetrics(metrics => metrics
        // Metrics provider from OpenTelemetry
        .AddAspNetCoreInstrumentation()
        .AddProcessInstrumentation()
        .AddRuntimeInstrumentation()
        .AddHttpClientInstrumentation()
        // Metrics provides by ASP.NET Core in .NET 8
        .AddMeter("Microsoft.AspNetCore.Hosting")
        .AddMeter("Microsoft.AspNetCore.Server.Kestrel")
        // Metrics provided by System.Net libraries
        .AddMeter("System.Net.Http")
        .AddMeter("System.Net.NameResolution")
        .AddConsoleExporter()
        .AddOtlpExporter(o =>
        {
            o.Endpoint = new Uri("http://192.168.0.47:4317");
            o.Protocol = OtlpExportProtocol.Grpc;
        })
        .AddPrometheusExporter());
    
    ActivityService.Initialize(serviceName, "1.0.0", 1.0);
    
    // Add Tracing for ASP.NET Core and our custom ActivitySource and export to Jaeger
    otel.WithTracing(tracing =>
    {
        tracing.AddSource(ActivityService.Name);
        tracing.AddAspNetCoreInstrumentation();
        tracing.AddHttpClientInstrumentation();
        tracing.AddOtlpExporter(o =>
        {
            o.Endpoint = new Uri("http://192.168.0.47:4317");
            o.Protocol = OtlpExportProtocol.Grpc;
        });
        tracing.AddConsoleExporter();
    });
    
    builder.Services.AddSerilog();
    builder.Services
        .Configure<JwtCreationOptions>(o => o.SigningKey = JwtKey.SigningKey)
        .AddAuthenticationJwtBearer(s => s.SigningKey = JwtKey.SigningKey)
        .AddAuthorization()
        .AddFastEndpoints()
        .SwaggerDocument(); //define a swagger doc - v1 by default

    builder.Services.AddTransient<IAuthService, AuthService>();

    var app = builder.Build();
    app.UseAuthentication()
        .UseAuthorization()
        .UseFastEndpoints();

    if (app.Environment.IsDevelopment())
    {
        //scalar by default looks for the swagger json file here: 
        app.UseOpenApi(c => c.Path = "/openapi/{documentName}.json");
        // http://localhost:{port}/scalar/v1
        app.MapScalarApiReference();
    }

    app.MapPrometheusScrapingEndpoint();
    
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application start-up failed");
}
finally
{
    Log.CloseAndFlush();
}