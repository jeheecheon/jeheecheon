using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using jeheecheon.Data;
using System;
using System.Linq;

namespace jeheecheon.Models;
public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new BookContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<BookContext>>()))
        {
            // Look for any movies.
            if (context.Book.Any())
            {
                return;   // DB has been seeded
            }
            context.Book.AddRange(
                new Book
                {
                    Title = "Book1",
                    PublicationDate = DateTime.Parse("1989-2-12"),
                    Genre = "Romantic Comedy",
                    Price = 7.99M,
                    AuthorName = "Author1"
                },
                new Book
                {
                    Title = "Book2",
                    PublicationDate = DateTime.Parse("1984-3-13"),
                    Genre = "Comedy",
                    Price = 8.99M,
                    AuthorName = "Author2"
                },
                new Book
                {
                    Title = "Book3",
                    PublicationDate = DateTime.Parse("1986-2-23"),
                    Genre = "Comedy",
                    Price = 9.99M,
                    AuthorName = "Author2"
                },
                new Book
                {
                    Title = "Book4",
                    PublicationDate = DateTime.Parse("1959-4-15"),
                    Genre = "Western",
                    Price = 3.99M,
                    AuthorName = "Author3"
                }
            );
            context.SaveChanges();
        }
    }
}

