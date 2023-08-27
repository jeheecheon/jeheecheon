using System.Reflection.Metadata.Ecma335;
using Domain.Models;
using Domain.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.VisualBasic;
using Swashbuckle.AspNetCore.Filters;


var builder = WebApplication.CreateBuilder(args);

var reactClientCORSPolicy = "ReactClientCORSPolicy";
var reactClientUrl = builder.Environment.IsDevelopment() ? "http://localhost:44495" : "https://black-bush-0a3774c00.3.azurestaticapps.net";

// Add services to the container.
builder.Services.AddCors(options => {
    options.AddPolicy(reactClientCORSPolicy, builder => {
        builder.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins(reactClientUrl);
    });
});

builder.Services.AddDbContext<BlogDbContext>();
builder.Services.AddScoped<IPostsRepository, PostsRepository>();

builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "jeheecheon", Version = "v1" });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    });
}

app.UseCors(reactClientCORSPolicy);

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");

app.MapGet("/get-all-posts", async () => {
    using var scope = app.Services.CreateScope();
    var repo = scope.ServiceProvider.GetRequiredService<IPostsRepository>();
    return await repo.GetAllAsync();
})
    .WithTags("Posts");

app.MapGet("/get-post/{postId}", async (int postId) => {
    using var scope = app.Services.CreateScope();
    var repo = scope.ServiceProvider.GetRequiredService<IPostsRepository>();
    var post = await repo.GetAsync(postId);
    if (post is null) return Results.BadRequest();
    else return Results.Ok(post);
})
    .WithTags("Posts");

app.MapPost("/create-post/", async (Post postToCreate) => {
    using var scope = app.Services.CreateScope();
    var repo = scope.ServiceProvider.GetRequiredService<IPostsRepository>();
    bool didSuccess = await repo.CreateAsync(postToCreate);
    return didSuccess ? Results.Ok("Create Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapPut("/update-post/", async (Post postToUpdate) => {
    using var scope = app.Services.CreateScope();
    var repo = scope.ServiceProvider.GetRequiredService<IPostsRepository>();
    bool didSuccess = await repo.UpdateAsync(postToUpdate);
    return didSuccess ? Results.Ok("Update Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapDelete("/delete-post/{postId}", async (int postId) => {
    using var scope = app.Services.CreateScope();
    var repo = scope.ServiceProvider.GetRequiredService<IPostsRepository>();
    bool didSuccess = await repo.DeleteAsync(postId);
    return didSuccess ? Results.Ok("Delete Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapFallbackToFile("index.html");

app.Run();
