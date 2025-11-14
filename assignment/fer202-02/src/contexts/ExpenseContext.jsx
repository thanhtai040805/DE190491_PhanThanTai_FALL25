// ExpenseContext.jsx - TEMPLATE dùng cho 1 expense duy nhất
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect
} from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  getExpenses,
  getExpensesByUserId,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/api"; // chỉnh path cho đúng

import { expenseReducer, initialExpenseState } from "../reducers/expenseReducer";

const ExpenseStateContext = createContext(undefined);
const ExpenseDispatchContext = createContext(undefined);

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialExpenseState);
  const { user } = useAuth();
  // ====== FETCH LIST (all or by userId) ======
  const fetchExpensesByUserId = useCallback(async (userId) => {
    dispatch({ type: "START_LOADING" });
    try {
      const data = userId
        ? await getExpensesByUserId(userId)
        : await getExpenses();
      dispatch({ type: "SET_EXPENSES", payload: data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Failed to fetch expenses",
      });
    }
  }, []);

  //LẤY TẤT CẢ KỂ CẢ USER NÀO
  // const fetchExpenses = useCallback(async () => {
  //   dispatch({ type: "START_LOADING" });
  //   try {
  //     const data = await getExpenses(); // GET /expenses
  //     dispatch({ type: "SET_EXPENSES", payload: data });
  //   } catch (error) {
  //     dispatch({
  //       type: "SET_ERROR",
  //       payload: error.message || "Failed to fetch expenses",
  //     });
  //   }
  // }, []);

  // ====== CREATE ======
  const addExpense = useCallback(async (newExpense) => {
    dispatch({ type: "START_LOADING" });
    try {
      const created = await createExpense(newExpense);
      dispatch({ type: "ADD_EXPENSE", payload: created });
      return created;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Failed to create expense",
      });
      throw error;
    }
  }, []);

  // ====== UPDATE ======
  const editExpense = useCallback(async (id, updatedData) => {
    dispatch({ type: "START_LOADING" });
    try {
      const updated = await updateExpense(id, updatedData);
      dispatch({ type: "UPDATE_EXPENSE", payload: updated });
      return updated;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Failed to update expense",
      });
      throw error;
    }
  }, []);

  // ====== DELETE ======
  const removeExpense = useCallback(async (id) => {
    dispatch({ type: "START_LOADING" });
    try {
      await deleteExpense(id);
      dispatch({ type: "DELETE_EXPENSE", payload: id });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "Failed to delete expense",
      });
      throw error;
    }
  }, []);

  const valueState = {
    ...state,
  };

  // Load dữ liệu ban đầu
  useEffect(() => {
    fetchExpensesByUserId(user?.id);
  }, [fetchExpensesByUserId, user?.id]);

  const valueDispatch = {
    dispatch, // để component tự dispatch OPEN_MODAL,... nếu muốn
    // fetchExpenses,
    fetchExpensesByUserId,
    addExpense,
    editExpense,
    removeExpense,
  };

  return (
    <ExpenseStateContext.Provider value={valueState}>
      <ExpenseDispatchContext.Provider value={valueDispatch}>
        {children}
      </ExpenseDispatchContext.Provider>
    </ExpenseStateContext.Provider>
  );
};

// Hooks
export const useExpenseState = () => {
  const ctx = useContext(ExpenseStateContext);
  if (ctx === undefined) {
    throw new Error("useExpenseState must be used within an ExpenseProvider");
  }
  return ctx;
};

export const useExpenseDispatch = () => {
  const ctx = useContext(ExpenseDispatchContext);
  if (ctx === undefined) {
    throw new Error("useExpenseDispatch must be used within an ExpenseProvider");
  }
  return ctx;
};
