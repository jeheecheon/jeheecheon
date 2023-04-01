using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using jeheecheon.Models;

namespace jeheecheon.Data
{
    public class BookContext : DbContext
    {
        public BookContext (DbContextOptions<BookContext> options)
            : base(options)
        {
        }

        public DbSet<jeheecheon.Models.Book> Book { get; set; } = default!;
    }
}
