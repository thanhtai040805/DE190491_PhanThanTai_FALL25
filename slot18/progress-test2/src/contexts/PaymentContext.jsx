import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import * as api from "../services/api"; // import các hàm API đã có
import { paymentReducer, initialPaymentState } from "../reducers/paymentReducer";

// ---------------------------
// 1️⃣ Tạo Context
// ---------------------------
const PaymentStateContext = createContext();
const PaymentDispatchContext = createContext();

// ---------------------------
// 4️⃣ Provider Component
// ---------------------------
export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);

  // READ - Lấy tất cả payment
  const fetchPayments = useCallback(async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const data = await api.getPayments();
      dispatch({ type: "SET_PAYMENTS", payload: data });
    } catch (error) {
      console.error("❌ Lỗi khi tải payments:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // READ (lọc theo userId)
  const fetchPaymentsByUserId = useCallback(async (userId) => {
    dispatch({ type: "START_LOADING" });
    try {
      const data = await api.getPaymentsByUserId(userId);
      dispatch({ type: "SET_PAYMENTS", payload: data });
    } catch (error) {
      console.error("❌ Lỗi khi tải payments theo user:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // CREATE
  const createPayment = useCallback(async (newPayment) => {
    dispatch({ type: "START_LOADING" });
    try {
      const data = await api.createPayment(newPayment);
      dispatch({ type: "ADD_PAYMENT", payload: data });
    } catch (error) {
      console.error("❌ Lỗi khi thêm payment:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // UPDATE
  const updatePayment = useCallback(async (id, updatedData) => {
    dispatch({ type: "START_LOADING" });
    try {
      const data = await api.updatePayment(id, updatedData);
      dispatch({ type: "UPDATE_PAYMENT", payload: data });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật payment:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // DELETE
  const deletePayment = useCallback(async (id) => {
    dispatch({ type: "START_LOADING" });
    try {
      await api.deletePayment(id);
      dispatch({ type: "DELETE_PAYMENT", payload: id });
    } catch (error) {
      console.error("❌ Lỗi khi xóa payment:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  // Load dữ liệu ban đầu
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentDispatchContext.Provider
        value={{
          dispatch,
          fetchPayments,
          fetchPaymentsByUserId,
          createPayment,
          updatePayment,
          deletePayment,
        }}
      >
        {children}
      </PaymentDispatchContext.Provider>
    </PaymentStateContext.Provider>
  );
};

// ---------------------------
// 5️⃣ Custom hooks
// ---------------------------
export const usePaymentState = () => useContext(PaymentStateContext);
export const usePaymentDispatch = () => useContext(PaymentDispatchContext);
