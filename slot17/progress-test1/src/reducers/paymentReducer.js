// paymentReducer.js - Quản lý reducer cho payments

// Trạng thái khởi tạo
export const initialPaymentState = {
  payments: [], // tất cả payment
  displayedPayments: [], // danh sách hiện đang hiển thị (sau khi filter, v.v)
  isLoading: false,
  error: null,
};

// Reducer quản lý state
export const paymentReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true, error: null };

    case "SET_PAYMENTS":
      return {
        ...state,
        payments: action.payload,
        displayedPayments: action.payload,
        isLoading: false,
        error: null,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload],
        displayedPayments: [...state.displayedPayments, action.payload],
        isLoading: false,
      };

    case "UPDATE_PAYMENT":
      const updateItem = (item) =>
        item.id === action.payload.id ? action.payload : item;
      return {
        ...state,
        payments: state.payments.map(updateItem),
        displayedPayments: state.displayedPayments.map(updateItem),
        isLoading: false,
      };

    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
        displayedPayments: state.displayedPayments.filter(
          (p) => p.id !== action.payload
        ),
        isLoading: false,
      };

    case "SET_FILTERED_PAYMENTS":
      return {
        ...state,
        displayedPayments: action.payload,
        isLoading: false,
        error: null,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        displayedPayments: state.payments,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

