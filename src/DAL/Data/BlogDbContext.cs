using Microsoft.EntityFrameworkCore;
using DAL.Models;

namespace DAL.DbContexts;

public class BlogDBContext : DbContext {
    public DbSet<Post>? Posts { get; set; }

    public BlogDBContext(DbContextOptions<BlogDBContext> dbContextOptions) : base(dbContextOptions) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.UseSqlite("Data Source=./Data/BlogDB.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

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
