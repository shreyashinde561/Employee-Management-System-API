import { useState } from "react";
import API from "../api/axios";
import {
  useNavigate,
  Link,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================

  const login = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password
    ) {
      alert(
        "Username and Password required"
      );

      return;
    }

    try {
      setLoading(true);

      console.log("Sending Request...");

      const response = await API.post(
        "/Auth/login",
        {
          username:
            formData.username.trim(),

          password:
            formData.password.trim(),
        }
      );

      console.log(response.data);

      // ================= SAVE AUTH =================

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      localStorage.setItem(
        "username",
        response.data.user.username
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log("FULL ERROR => ", error);

      if (error.response) {
        alert(
          error.response.data.message
        );
      } else {
        alert("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* TITLE */}
        <h2 style={styles.title}>
          Employee Login
        </h2>

        {/* FORM */}
        <form onSubmit={login}>
          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          {/* BUTTON */}
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p style={styles.text}>
          Don't have an account?

          <Link
            to="/register"
            style={styles.link}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

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
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow:
      "0 0 10px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
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
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
  },

  text: {
    marginTop: 15,
    textAlign: "center",
  },

  link: {
    marginLeft: 5,
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "bold",
  },
};