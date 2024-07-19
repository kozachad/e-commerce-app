using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;

namespace eTicaret.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public string? Avatar { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public string? Role { get; set; } = string.Empty;

        public string? refreshToken { get; set; }
        public DateTime? ExpiryDate { get; set; }

        [NotMapped]

        public virtual List<Product> Products { get; set; } = new List<Product>();
        public virtual Cart Cart { get; set; }

    }
}
