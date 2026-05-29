using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmployeeAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeAPI.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateToken(User user)
        {
            var jwt = _config.GetSection("Jwt");

            var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

            // ================= CLAIMS =================
            var claims = new List<Claim>
            {
                // 👤 identity
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),

                // 🔐 ROLE (IMPORTANT FOR ROLE SYSTEM)
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            // ================= TOKEN =================
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),

                // ⏳ expiry time
                Expires = DateTime.UtcNow.AddMinutes(
                    Convert.ToDouble(jwt["DurationInMinutes"])
                ),

                // issuer + audience
                Issuer = jwt["Issuer"],
                Audience = jwt["Audience"],

                // 🔑 signing key
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}