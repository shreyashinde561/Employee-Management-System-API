using EmployeeAPI.Models;
using EmployeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // 🔐 JWT REQUIRED FOR ALL ENDPOINTS
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        // ================= CREATE EMPLOYEE =================
        [HttpPost]
        [Authorize(Roles = "Admin")] // 🔐 ONLY ADMIN
        public async Task<IActionResult> Create([FromBody] Employee emp)
        {
            if (emp == null)
                return BadRequest(new { message = "Employee data is required" });

            var result = await _service.Create(emp);

            return Ok(new
            {
                message = "Employee created successfully",
                data = result
            });
        }

        // ================= GET ALL EMPLOYEES =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _service.GetAll();

            return Ok(new
            {
                count = employees.Count,
                data = employees
            });
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _service.GetById(id);

            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(new
            {
                data = emp
            });
        }

        // ================= UPDATE EMPLOYEE =================
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")] // 🔐 ONLY ADMIN
        public async Task<IActionResult> Update(int id, [FromBody] Employee updatedEmp)
        {
            if (updatedEmp == null)
                return BadRequest(new { message = "Invalid data" });

            var emp = await _service.GetById(id);

            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            emp.Name = updatedEmp.Name;
            emp.Department = updatedEmp.Department;
            emp.Email = updatedEmp.Email;
            emp.Salary = updatedEmp.Salary;

            await _service.Update(emp);

            return Ok(new
            {
                message = "Employee updated successfully",
                data = emp
            });
        }

        // ================= DELETE EMPLOYEE =================
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // 🔐 ONLY ADMIN
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.Delete(id);

            if (!success)
                return NotFound(new { message = "Employee not found" });

            return Ok(new
            {
                message = "Employee deleted successfully"
            });
        }
    }
}