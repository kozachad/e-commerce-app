namespace eTicaret.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description {  get; set; } = string.Empty;
        public double Price { get; set; }

        public string Image { get; set; } = string.Empty;

        public bool isDeleted { get; set; }

        public int UserId { get; set; }

        public User? user { get; set; }

        public List<Cart> Carts { get; set; } = new List<Cart>();

    }
}
