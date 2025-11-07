//api.js chứa các hàm gọi API tới JSON Server
import axios from "axios";
// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001
const API = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user by id");
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await API.post("/users", newUser);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await API.patch(`/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    await API.delete(`/users/${id}`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const getPayments = async () => {
  try {
    const response = await API.get("/payments");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch payments")
  }
}

export const getPaymentsByUserId = async (id) => {
  try {
    const response = await API.get(`/payments?userId=${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch payments by userId");
  }
};

// CREATE - Tạo payment mới
export const createPayment = async (newPayment) => {
  try {
    const response = await API.post("/payments", newPayment);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create payment");
  }
};

// UPDATE - Cập nhật payment
export const updatePayment = async (id, updatedData) => {
  try {
    const response = await API.put(`/payments/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update payment");
  }
};

// DELETE - Xóa payment
export const deletePayment = async (id) => {
  try {
    await API.delete(`/payments/${id}`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete payment");
  }
};

export { API }; // 👈 export thêm nếu bạn muốn dùng chung trong Context
