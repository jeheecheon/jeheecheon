using System.ComponentModel.DataAnnotations;

namespace Domain.Models;

public class Post {
    [Key]
    public int PostID { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(100000)]
    public string Content { get; set; } = string.Empty;
}
