using System.ComponentModel.DataAnnotations.Schema;

namespace eTicaret.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int userId { get; set; }

        public User? user { get; set; }
        //public int? ProductId { get; set; }
        public virtual List<Product> Products { get; set; }
    }
}
