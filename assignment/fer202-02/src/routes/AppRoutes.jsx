// AppRoutes.js - TEMPLATE cấu hình định tuyến chung cho ứng dụng React Router
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

// ========== PAGES (template) ==========
// 👉 Khi đổi sang entity thật, chỉ cần đổi Entity → Payment / Booking / Order...
import LoginPage from "../pages/LoginPage.jsx";
import HomePage from "../pages/HomePage.jsx";

// ========== PrivateRoute: Bảo vệ route cần đăng nhập ==========
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ========== AppRoutes ==========
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 1️⃣ Trang gốc: chuyển hướng / → /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* 2️⃣ Trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />

        {/* 3️⃣ Trang chính (dashboard / home) */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        {/* 5️⃣ Bắt tất cả route không tồn tại */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
