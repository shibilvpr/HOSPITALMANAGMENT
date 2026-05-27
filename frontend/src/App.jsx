import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import AddPatient from "./Pages/AddPatient/AddPatient";
import Appointments from "./Pages/Appointments/Appointments";
import Doctors from "./Pages/Doctors/Doctors";
import Receptionists from "./Pages/Receptionists/Receptionists";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Sidebar from "./compenents/Sidebar/Sidebar";
import ProtectedRoute from "./compenents/ProtectedRoute/ProtectedRoute";

// Configure axios authorization header on load
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionists"
          element={
            <ProtectedRoute>
              <Receptionists />
            </ProtectedRoute>
          }
        />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
