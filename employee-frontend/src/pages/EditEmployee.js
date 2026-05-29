import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    email: "",
    salary: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // ================= LOAD EMPLOYEE =================
  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await API.get(`/Employee/${id}`);

      console.log("EMPLOYEE =>", res.data);

      setEmployee(res.data);
    } catch (err) {
      console.log(err);

      alert("Failed to load employee");
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE EMPLOYEE =================
  const updateEmployee = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/Employee/${id}`, employee);

      alert("Employee Updated Successfully");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Update failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Edit Employee
        </h2>

        <form onSubmit={updateEmployee}>
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={employee.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* DEPARTMENT */}
          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            value={employee.department}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={employee.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* SALARY */}
          <input
            type="number"
            name="salary"
            placeholder="Enter Salary"
            value={employee.salary}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* BUTTONS */}
          <div style={styles.btnGroup}>
            <button
              type="submit"
              style={styles.updateBtn}
            >
              Update
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },

  card: {
    width: 400,
    background: "white",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
    borderRadius: 6,
    fontSize: 16,
    boxSizing: "border-box",
  },

  btnGroup: {
    display: "flex",
    justifyContent: "space-between",
  },

  updateBtn: {
    padding: "10px 20px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },

  cancelBtn: {
    padding: "10px 20px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },
};