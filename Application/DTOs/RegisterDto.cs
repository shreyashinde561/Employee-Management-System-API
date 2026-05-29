namespace EmployeeAPI.Application.DTOs
{
    public class RegisterDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? Role { get; set; } // optional (Admin/User etc.)
    }
}