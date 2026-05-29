using Microsoft.EntityFrameworkCore;
using EmployeeAPI.Models;

namespace EmployeeAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Employees table
        public DbSet<Employee> Employees { get; set; }

        // Users table (JWT LOGIN/REGISTER ke liye IMPORTANT)
        public DbSet<User> Users { get; set; }
    }
}