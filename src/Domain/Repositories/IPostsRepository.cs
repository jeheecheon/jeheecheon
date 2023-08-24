using Domain.Models;

namespace Domain.Repositories;

public interface IPostsRepository {
    public Task<Post?> GetAsync(int postId);
    public Task<bool> CreateAsync(Post postToCreate);
    public Task<bool> UpdateAsync(Post postToUpdate);
    public Task<bool> DeleteAsync(int postId);
    public Task<List<Post>?> GetAllAsync();
}