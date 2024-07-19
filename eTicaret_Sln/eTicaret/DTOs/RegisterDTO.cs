namespace eTicaret.DTOs
{
    public sealed record RegisterDTO(
        string Name,
        string Password,
        string Role);
}
