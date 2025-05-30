using FastEndpoints;
using FastEndpoints.Swagger;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddFastEndpoints()
    .SwaggerDocument(); //define a swagger doc - v1 by default
                        
var app = builder.Build();
app.UseFastEndpoints();

if (app.Environment.IsDevelopment())
{
    //scalar by default looks for the swagger json file here: 
    app.UseOpenApi(c => c.Path = "/openapi/{documentName}.json");    
    // http://localhost:{port}/scalar/v1
    app.MapScalarApiReference();
}
app.Run();
