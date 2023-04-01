using System.ComponentModel.DataAnnotations;

namespace jeheecheon.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        [DataType(DataType.Date)]
        public DateTime PublicationDate { get; set; }
        public string? Genre { get; set; }
        public decimal Price { get; set; }
        public string? AuthorName { get; set; }
    }
}
