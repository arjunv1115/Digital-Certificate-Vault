import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import AddCertificate from "./pages/AddCertificate";
import ViewCertificate from "./pages/ViewCertificate";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      <Route path="/certificates"
        element={
          <ProtectedRoute>
            <Certificates />
          </ProtectedRoute>
        } />
      <Route path="/add-certificate"
        element={
          <ProtectedRoute>
            <AddCertificate />
          </ProtectedRoute>
        } />
      <Route path="/certificate/:id"
        element={
          <ProtectedRoute>
            <ViewCertificate />
          </ProtectedRoute>
        } />
      <Route path="/certificate/:id/edit"
        element={
          <ProtectedRoute>
            <AddCertificate />
          </ProtectedRoute>
        } />
      <Route path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      <Route path="*"
        element={<Navigate to="/dashboard" replace/>} />
    </Routes>
  );
};

export default App;