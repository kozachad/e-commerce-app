using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace eTicaret.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int userId { get; set; }

        public User? user { get; set; }

        [JsonIgnore]
        public virtual List<Product> Products { get; set; }
    }
}
