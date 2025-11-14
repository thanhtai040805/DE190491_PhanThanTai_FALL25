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


// GET /expenses
export const getExpenses = async () => {
  try {
    const response = await API.get(`/expenses`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch expenses");
  }
};

// GET /expenses?userId=...
// Only use if data have userId
export const getExpensesByUserId = async (userId) => {
  try {
    const response = await API.get(`/expenses`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch expenses by userId");
  }
};

// GET /expenses/:id
export const getExpenseById = async (id) => {
  try {
    const response = await API.get(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch expense by id");
  }
};

// POST /expenses
export const createExpense = async (newExpense) => {
  try {
    const response = await API.post(`/expenses`, newExpense);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create expense");
  }
};

// PUT /expenses/:id
export const updateExpense = async (id, updatedData) => {
  try {
    const response = await API.put(`/expenses/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update expense");
  }
};

// DELETE /expenses/:id
export const deleteExpense = async (id) => {
  try {
    await API.delete(`/expenses/${id}`);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete expense");
  }
};

export { API }; 
