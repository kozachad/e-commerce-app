namespace eTicaret.DTOs
{
    public sealed class TokenDTO
    {
        public int Id { get; set; }
        public string? Token { get; set; }

        public string? Name { get; set; }

        public string? RefreshToken { get; set; }
    }
}
