import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "User",
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= REGISTER =================

  const register = async (e) => {
    e.preventDefault();

    try {
      await API.post("/Auth/register", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Register
        </h2>

        <form onSubmit={register}>
          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* ROLE */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="User">
              User
            </option>

            <option value="Admin">
              Admin
            </option>
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

/* ================= STYLES ================= */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: 350,
    background: "white",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    border: "1px solid #ccc",
    borderRadius: 5,
    fontSize: 16,
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
  },

  loginText: {
    marginTop: 15,
    textAlign: "center",
  },
};