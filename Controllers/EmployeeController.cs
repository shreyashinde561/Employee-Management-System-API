using Microsoft.AspNetCore.Mvc;
using EmployeeAPI.Data;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return Ok(emp);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Employees.ToListAsync());
        }
    }
}