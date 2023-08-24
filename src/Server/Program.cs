using System.Reflection.Metadata.Ecma335;
using Domain.Models;
using Domain.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.VisualBasic;
using Swashbuckle.AspNetCore.Filters;

const string CORSPOLICY = "CORSPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => {
    options.AddPolicy(CORSPOLICY, builder => {
        builder.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins("http://localhost:3000");
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

app.UseCors(CORSPOLICY);

app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");

app.MapGet("/get-all-posts", async () => {
    var repo = ActivatorUtilities.GetServiceOrCreateInstance<PostsRepository>(app.Services);
    return await repo.GetAllAsync();
})
    .WithTags("Posts");

app.MapGet("/get-post/{postId}", async (int postId) => {
    var repo = ActivatorUtilities.GetServiceOrCreateInstance<PostsRepository>(app.Services);
    var post = await repo.GetAsync(postId);
    if (post is null) return Results.BadRequest();
    else return Results.Ok(post);
})
    .WithTags("Posts");

app.MapPost("/create-post/", async (Post postToCreate) => {
    var repo = ActivatorUtilities.GetServiceOrCreateInstance<PostsRepository>(app.Services);
    bool didSuccess = await repo.CreateAsync(postToCreate);
    return didSuccess ? Results.Ok("Create Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapPut("/update-post/", async (Post postToUpdate) => {
    var repo = ActivatorUtilities.GetServiceOrCreateInstance<PostsRepository>(app.Services);
    bool didSuccess = await repo.UpdateAsync(postToUpdate);
    return didSuccess ? Results.Ok("Update Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapDelete("/delete-post/{postId}", async (int postId) => {
    var repo = ActivatorUtilities.GetServiceOrCreateInstance<PostsRepository>(app.Services);
    bool didSuccess = await repo.DeleteAsync(postId);
    return didSuccess ? Results.Ok("Delete Successful") : Results.BadRequest();
})
    .WithTags("Posts");

app.MapFallbackToFile("index.html");

app.Run();
