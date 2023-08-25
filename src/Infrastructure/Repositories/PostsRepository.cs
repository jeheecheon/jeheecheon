using System.Data.Common;
using Domain.Models;
using Domain.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Repositories;

public class PostsRepository : IPostsRepository {
    private readonly ILogger _logger;
    
    public PostsRepository(ILogger<PostsRepository> logger) {
        _logger = logger;
    }

    public async Task<List<Post>?> GetAllAsync() {
        using var db = new BlogDbContext();
        return await db.Posts!.ToListAsync();
    }

    public async Task<Post?> GetAsync(int postId) {
        using var db = new BlogDbContext();
        return await db.Posts!.FirstOrDefaultAsync(post => post.PostId == postId);
    }

    public async Task<bool> CreateAsync(Post postToCreate) {
        using var db = new BlogDbContext();
        try {
            await db.Posts!.AddAsync(postToCreate);
            return await db.SaveChangesAsync() >= 1;
        }
        catch (Exception e) {
            _logger.LogError($"{e.Source}: {e.Message}");
            return false;
        }
    }

    public async Task<bool> UpdateAsync(Post postToUpdate) {
        using var db = new BlogDbContext();
        try {
            db.Posts!.Update(postToUpdate);
            return await db.SaveChangesAsync() >= 1;
        }
        catch (Exception e) {
            _logger.LogError($"{e.Source}: {e.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int postId) {
        using var db = new BlogDbContext();
        try {
            var postToDelete = await GetAsync(postId);
            if (postToDelete is null)
                return false;

            db.Posts!.Remove(postToDelete);
            return await db.SaveChangesAsync() >= 1;
        }
        catch (Exception e) {
            _logger.LogError($"{e.Source}: {e.Message}");
            return false;
        }
    }
}
