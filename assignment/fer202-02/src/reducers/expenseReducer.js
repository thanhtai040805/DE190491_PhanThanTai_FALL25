// expenseReducer.js - TEMPLATE dùng cho 1 expense bất kỳ

const amt = (v) => parseFloat(v) || 0;

export const initialExpenseState = {
  expenses: [], // tất cả expense (ví dụ: payments / orders / bookings)
  displayedExpenses: [], // danh sách đang hiển thị (sau filter / search)
  isLoading: false,
  error: null,
  totalAmount: 0,

  // Chỉ sử dụng nếu có modal
  showDeleteModal: false,
  showModal: false,
  isEditing: false,
  expenseToEdit: null, // dùng cho edit trên modal / trang riêng
};

export const expenseReducer = (state, action) => {
  switch (action.type) {
    // ================= LOADING / ERROR =================
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // ================== SET LIST ==================
    // payload: mảng expense
    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
        displayedExpenses: action.payload,
        isLoading: false,
        error: null,
        totalAmount: action.payload.reduce(
          (acc, curr) => acc + amt(curr.amount),
          0
        ),
      };

    // ================== ADD ==================
    // payload: 1 expense mới (đã được API trả về)
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        displayedExpenses: [...state.displayedExpenses, action.payload],
        isLoading: false,
        totalAmount: state.totalAmount + amt(action.payload.amount),
      };

    // ================== UPDATE ==================
    // payload: expense sau khi update (có id)
    case "UPDATE_EXPENSE": {
      const next = action.payload;
      const prev = state.expenses.find((e) => e.id === next.id);
      const delta = amt(next?.amount) - amt(prev?.amount);

      const updateItem = (item) => (item.id === next.id ? next : item);

      return {
        ...state,
        expenses: state.expenses.map(updateItem),
        displayedExpenses: state.displayedExpenses.map(updateItem),
        isLoading: false,
        totalAmount: state.totalAmount + delta,
      };
    }

    // ================== DELETE ==================
    // payload: id cần xóa
    case "DELETE_EXPENSE": {
      const idToDelete = action.payload;
      const toDelete = state.expenses.find((e) => e.id === idToDelete);

      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== idToDelete),
        displayedExpenses: state.displayedExpenses.filter(
          (e) => e.id !== idToDelete
        ),
        isLoading: false,
        totalAmount: state.totalAmount - amt(toDelete?.amount),
      };
    }

    // ================== FILTER / CLEAR ==================
    // payload: mảng expenses đã filter
    case "SET_FILTERED_EXPENSES":
      return {
        ...state,
        displayedExpenses: action.payload,
        isLoading: false,
        error: null,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        displayedExpenses: state.expenses,
        isLoading: false,
        error: null,
        totalAmount: state.totalAmount,
      };

    // ================== MODAL ==================
    case "OPEN_DELETE_MODAL":
      return {
        ...state,
        showDeleteModal: true,
      };

    case "CLOSE_DELETE_MODAL":
      return {
        ...state,
        showDeleteModal: false,
      };

    case "OPEN_ADD_MODAL":
      return {
        ...state,
        showModal: true,
        isEditing: false,
        expenseToEdit: null,
      };

    // payload: expense muốn edit (ví dụ chọn từ bảng)
    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        showModal: true,
        isEditing: true,
        expenseToEdit: action.payload,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        showModal: false,
        isEditing: false,
        expenseToEdit: null,
      };
    case "RESET_FORM":
      return {
        ...state,
        isEditing: false,
        expenseToEdit: null,
      };

    default:
      return state;
  }
};
