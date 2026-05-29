namespace EmployeeAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public required string Username { get; set; }

        public required string Password { get; set; }

        // Admin / User
        public string Role { get; set; } = "User";

        // 🔐 Refresh Token Support
        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiry { get; set; }
    }
}