using EmployeeAPI.Data;
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
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        // ---------------- GET BY ID ----------------
        public async Task<Employee?> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // ---------------- CREATE ----------------
        public async Task<Employee> Create(Employee emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        // ---------------- UPDATE (NEW ADD) ----------------
        public async Task<Employee?> Update(Employee emp)
        {
            var existing = await _context.Employees.FindAsync(emp.Id);

            if (existing == null)
                return null;

            existing.Name = emp.Name;
            existing.Department = emp.Department;
            existing.Email = emp.Email;
            existing.Salary = emp.Salary;

            await _context.SaveChangesAsync();

            return existing;
        }

        // ---------------- DELETE ----------------
        public async Task<bool> Delete(int id)
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