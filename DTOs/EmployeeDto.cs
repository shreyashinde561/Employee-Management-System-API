namespace EmployeeAPI.DTOs
{
    public class EmployeeDto
    {
        public required string Name { get; set; }
        public required string Department { get; set; }
        public required string Email { get; set; }

        // ✅ MUST MATCH MODEL TYPE
        public decimal Salary { get; set; }
    }
}