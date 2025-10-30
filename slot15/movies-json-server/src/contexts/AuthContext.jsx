import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
} from "react";
import movieApi from "../api/movieAPI";

const AuthContext = createContext();

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "SET_USERS":
      return { ...state, loading: false, users: action.payload || [] };
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return { ...state, user: null, isAuthenticated: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const fetchUser = useCallback(async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await movieApi.get("/users");
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách users:", error);
      dispatch({ type: "SET_USERS", payload: [] });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  function login(identifier, password) {
    dispatch({ type: "LOGIN_START" });
    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes("@");
        const account = state.users.find((acc) =>
          isEmail
            ? acc.email === identifier && acc.password === password
            : acc.username === identifier && acc.password === password
        );
        if (!account) {
          dispatch({ type: "LOGIN_FAILURE", payload: "Invalid credentials." });
          resolve({ ok: false });
          return;
        }
        if (account.status === "locked") {
          dispatch({ type: "LOGIN_FAILURE", payload: "Account locked." });
          resolve({ ok: false });
          return;
        }
        dispatch({ type: "LOGIN_SUCCESS", payload: account });
        resolve({ ok: true, account });
      }, 1000);
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  function clearError() {
    dispatch({ type: "CLEAR_ERROR" });
  }

  const contextValue = {
    ...state,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export default AuthContext;
