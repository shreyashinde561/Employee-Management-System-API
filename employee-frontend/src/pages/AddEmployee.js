import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    email: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/Employee", employee);

      alert("Employee Added Successfully");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert("Failed to add employee");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={employee.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={employee.department}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: 400,
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    border: "1px solid #ccc",
    borderRadius: 5,
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
};