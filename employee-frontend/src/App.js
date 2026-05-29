import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================= PAGES =================
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

// ================= COMPONENTS =================
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADD EMPLOYEE */}
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />

        {/* EDIT EMPLOYEE */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 PAGE ================= */}
        <Route
          path="*"
          element={
            <div style={styles.notFound}>
              <h1 style={styles.code}>
                404
              </h1>

              <h2>
                Page Not Found
              </h2>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* ================= STYLES ================= */

const styles = {
  notFound: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    background: "#f4f6f8",
  },

  code: {
    fontSize: 80,
    margin: 0,
    color: "#e74c3c",
  },
};