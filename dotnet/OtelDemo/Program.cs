using FastEndpoints;
using FastEndpoints.Security;
using FastEndpoints.Swagger;
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