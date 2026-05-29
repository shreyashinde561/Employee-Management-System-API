using EmployeeAPI.Data;
using EmployeeAPI.DTOs;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Services
{
    public class EmployeeService
    {
        private readonly AppDbContext _context;

        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        // ---------------- GET ALL ----------------
        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        // ---------------- GET BY ID ----------------
        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // ---------------- CREATE (DTO → ENTITY) ----------------
        public async Task<Employee> CreateAsync(EmployeeDto dto)
        {
            var emp = new Employee
            {
                Name = dto.Name,
                Department = dto.Department,
                Email = dto.Email,
                Salary = dto.Salary   // ✅ decimal safe
            };

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();

            return emp;
        }

        // ---------------- UPDATE (DTO → ENTITY) ----------------
        public async Task<Employee?> UpdateAsync(int id, EmployeeDto dto)
        {
            var existing = await _context.Employees.FindAsync(id);

            if (existing == null)
                return null;

            existing.Name = dto.Name;
            existing.Department = dto.Department;
            existing.Email = dto.Email;
            existing.Salary = dto.Salary;  // ✅ decimal safe

            await _context.SaveChangesAsync();

            return existing;
        }

        // ---------------- DELETE ----------------
        public async Task<bool> DeleteAsync(int id)
        {
            var emp = await _context.Employees.FindAsync(id);

            if (emp == null)
                return false;

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}