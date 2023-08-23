using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.DbContexts;

public class BlogDBContext : DbContext {
    public DbSet<Post> Posts { get; set; }

    public BlogDBContext(DbContextOptions<BlogDBContext> dbContextOptions) : base(dbContextOptions) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        var postsToSeed = new Post[6];

        for (int i = 1; i <= postsToSeed.Length; ++i) {
            postsToSeed[i - 1] = new Post {
                PostID = i,
                Title = $"Post {i}",
                Content = $"This is post #{i} and it has some very interesting content."
            };
        }
        modelBuilder.Entity<Post>().HasData(postsToSeed);
    }
}
