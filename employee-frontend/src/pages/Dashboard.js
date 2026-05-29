import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role = getUserRole();

  // ================= LOAD EMPLOYEES =================
  const loadEmployees = useCallback(async () => {
    try {
      const res = await API.get("/Employee");

      console.log("EMPLOYEE API RESPONSE =>", res.data);

      // HANDLE API RESPONSE
      if (Array.isArray(res.data)) {
        setEmployees(res.data);
      } else if (res.data.data) {
        setEmployees(res.data.data);
      } else {
        setEmployees([]);
      }
    } catch (err) {
      console.log(err);

      alert("Session expired or unauthorized");

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");

      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // ================= DELETE EMPLOYEE =================
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/Employee/${id}`);

      alert("Employee Deleted Successfully");

      loadEmployees();
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/");
  };

  // ================= SEARCH FILTER =================
  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <h2 style={styles.heading}>
          Employee Dashboard
        </h2>

        <div>
          {/* ADMIN ONLY */}
          {role === "Admin" && (
            <button
              onClick={() => navigate("/add")}
              style={styles.addBtn}
            >
              + Add Employee
            </button>
          )}

          <button
            onClick={logout}
            style={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search employee by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* ================= TABLE ================= */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.head}>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  No Employees Found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp) => (
                <tr key={emp.id} style={styles.row}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>
                  <td>₹ {emp.salary}</td>

                  <td>
                    {/* EDIT */}
                    <button
                      onClick={() =>
                        navigate(`/edit/${emp.id}`)
                      }
                      style={styles.editBtn}
                    >
                      Edit
                    </button>

                    {/* DELETE ADMIN ONLY */}
                    {role === "Admin" && (
                      <button
                        onClick={() =>
                          deleteEmployee(emp.id)
                        }
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  heading: {
    margin: 0,
    color: "#2c3e50",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  search: {
    width: "100%",
    padding: 12,
    marginBottom: 20,
    border: "1px solid #ccc",
    borderRadius: 6,
    outline: "none",
    fontSize: 16,
    boxSizing: "border-box",
  },

  addBtn: {
    marginRight: 10,
    padding: "10px 15px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },

  logoutBtn: {
    padding: "10px 15px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: 10,
    overflow: "hidden",
  },

  head: {
    background: "#34495e",
    color: "white",
    height: 55,
  },

  row: {
    textAlign: "center",
    height: 55,
    borderBottom: "1px solid #ddd",
  },

  editBtn: {
    marginRight: 5,
    padding: "7px 14px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "7px 14px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: 25,
    fontSize: 18,
    color: "#777",
  },
};