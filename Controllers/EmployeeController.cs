using EmployeeAPI.DTOs;
using EmployeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        // ================= CREATE =================
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(EmployeeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.CreateAsync(dto);

            return Ok(new
            {
                message = "Employee created successfully",
                data = result
            });
        }

        // ================= GET ALL =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _service.GetAllAsync();

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
            var emp = await _service.GetByIdAsync(id);

            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(new
            {
                data = emp
            });
        }

        // ================= UPDATE =================
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, EmployeeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateAsync(id, dto);

            if (updated == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(new
            {
                message = "Employee updated successfully",
                data = updated
            });
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);

            if (!success)
                return NotFound(new { message = "Employee not found" });

            return Ok(new
            {
                message = "Employee deleted successfully"
            });
        }
    }
}