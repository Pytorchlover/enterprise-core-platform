import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Sales from "@/pages/Sales";
import Projects from "@/pages/Projects";
import HR from "@/pages/HR";
import Finance from "@/pages/Finance";
import Settings from "@/pages/Settings";
import { AuthProvider } from '@/contexts/authContext';
import ProtectedRoute from '@/components/ProtectedRoute';

// Forgot Password Page (placeholder)
const ForgotPassword = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        忘记密码
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        密码重置功能开发中...
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sales" 
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hr" 
          element={
            <ProtectedRoute>
              <HR />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/finance" 
          element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </AuthProvider>
  );
}