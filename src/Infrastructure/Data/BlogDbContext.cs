using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace Infrastructure.Data;

public class BlogDbContext : DbContext {
    public DbSet<Post>? Posts { get; set; }

    public BlogDbContext() : base() { }

    public BlogDbContext(DbContextOptions<BlogDbContext> dbContextOptions) : base(dbContextOptions) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.UseSqlite("Data Source=../Infrastructure/Data/BlogDB.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        var postsToSeed = new Post[6];
        for (int i = 1; i <= postsToSeed.Length; ++i) {
            postsToSeed[i - 1] = new Post {
                PostId = i,
                Title = $"Post {i}",
                Content = $"This is post #{i} and it has some very interesting content."
            };
        }
        modelBuilder.Entity<Post>().HasData(postsToSeed);
    }
}
