//AuthContext.jsx quản lý xác thực người dùng bằng Context API và useReducer
import React, { createContext, useContext, useReducer } from "react";
import * as api from "../services/api";
import { authReducer, initialAuthState } from "../reducers/authReducer";

// 1. Tạo Context
const AuthContext = createContext();

// 4. Tạo AuthProvider để cung cấp Context cho các component con
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Hàm action để xóa lỗi
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Hàm login nhận usernameOrEmail (identifier) và password
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: "LOGIN_START" });

    try {
      // 1. Gọi API để đăng nhập và lấy thông tin user từ file db.json
      const accounts = await api.getUsers(); // Giả định getUsers() lấy tất cả users

      // 2. SỬA LỖI: Kiểm tra thông tin đăng nhập bằng username HOẶC email (identifier)
      const user = accounts.find(
        // (acc) =>
        //   (acc.username === usernameOrEmail ||
        //     (acc.email && acc.email === usernameOrEmail)) &&
        //   acc.password === password
          
          // Only login with userName
          (acc) =>
          (acc.username === usernameOrEmail) &&
          acc.password === password
      );

      // 3. Cập nhật trạng thái dựa trên kết quả đăng nhập
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        // Trả về kết quả thành công cho LoginForm
        return { success: true, user };
      } else if (!usernameOrEmail.trim()) {
        const errorMessage = "Username is required!";
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        return { success: false, error: errorMessage };
      }
      else {
        // Đăng nhập thất bại (Invalid username/email hoặc password)
        const errorMessage = "Invalid username or password!";
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Lỗi mạng hoặc lỗi không xác định từ API
      const errorMessage =
        error.message || "Login failed due to a network error.";
      dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // 4. Cung cấp trực tiếp các giá trị cần thiết qua Context value
  const contextValue = {
    // Trạng thái từ Reducer
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,

    // Actions
    login,
    logout,
    clearError, // Thêm hàm clearError để LoginForm có thể sử dụng
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// 5. Tạo custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => useContext(AuthContext);
