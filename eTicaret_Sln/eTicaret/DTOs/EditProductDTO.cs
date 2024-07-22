namespace eTicaret.DTOs
{
    public class EditProductDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }

        public string Image {  get; set; } = string.Empty;
    }
}
