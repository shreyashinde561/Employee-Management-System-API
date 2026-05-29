using EmployeeAPI.Application.DTOs;
using EmployeeAPI.Data;
using EmployeeAPI.Models;
using EmployeeAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwt;

        public AuthController(AppDbContext context, JwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        // ================= REGISTER =================

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto request)
        {
            // VALIDATION
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Username and Password are required"
                });
            }

            // CHECK IF USER EXISTS
            var exists = await _context.Users
                .AnyAsync(x => x.Username == request.Username);

            if (exists)
            {
                return BadRequest(new
                {
                    message = "User already exists"
                });
            }

            // CREATE USER
            var user = new User
            {
                Username = request.Username.Trim(),

                // HASH PASSWORD
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),

                // ROLE FIX
                Role = string.IsNullOrWhiteSpace(request.Role)
                    ? "User"
                    : request.Role.Trim()
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User registered successfully",

                user = new
                {
                    user.Id,
                    user.Username,
                    user.Role
                }
            });
        }

        // ================= LOGIN =================

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto request)
        {
            // VALIDATION
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    message = "Username and Password are required"
                });
            }

            // FIND USER
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Username == request.Username);

            if (dbUser == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid credentials"
                });
            }

            // VERIFY PASSWORD
            bool isValid = BCrypt.Net.BCrypt.Verify(
                request.Password,
                dbUser.Password
            );

            if (!isValid)
            {
                return Unauthorized(new
                {
                    message = "Invalid credentials"
                });
            }

            // GENERATE TOKEN
            var token = _jwt.GenerateToken(dbUser);

            return Ok(new
            {
                token,

                user = new
                {
                    dbUser.Id,
                    dbUser.Username,
                    dbUser.Role
                }
            });
        }
    }
}