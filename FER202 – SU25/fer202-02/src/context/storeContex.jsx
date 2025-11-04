import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { storeReducer, initialStoreState } from "../reducers/storeReducer";
import storeAPI from "../api/storeAPI";

// Contexts
export const StoreStateContext = createContext(initialStoreState);
export const StoreDispatchContext = createContext(null);

// Custom Hooks
export const useStoreState = () => useContext(StoreStateContext);
export const useStoreDispatch = () => useContext(StoreDispatchContext);

// MovieProvider Component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);

  // Hàm READ: Tải lại dữ liệu (Axios GET)
  const fetchStore = useCallback(async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await storeAPI.get("/store");
      dispatch({ type: "SET_STORE", payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách cửa hàng:", error);
      // Giữ state cũ nếu lỗi (hoặc [] nếu ban đầu chưa có)
      dispatch({ type: "SET_STORE", payload: [] });
    }
  }, [dispatch]);

  // Hàm CREATE/UPDATE: Xử lý POST và PUT (Axios POST/PUT)
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: "START_LOADING" });
      try {
        if (isEditing) {
          // ✅ Cập nhật trong state (UI)
          dispatch({ type: "UPDATE_PRODUCT", payload: dataToSend });

          // ✅ Lấy lại store hiện tại để PUT toàn bộ object
          const updatedProducts = state.store.products.map((p) =>
            p.id === isEditingId ? dataToSend : p
          );
          const updatedStore = { ...state.store, products: updatedProducts };

          // ✅ PUT toàn bộ object store lên server
          await storeAPI.put("/store", updatedStore);
        } else {
          // ✅ Thêm sản phẩm mới
          const updatedStore = {
            ...state.store,
            products: [...state.store.products, dataToSend],
          };
          await storeAPI.put("/store", updatedStore);
        }

        fetchStore();
        return true;
      } catch (error) {
        console.error("Lỗi thao tác CREATE/UPDATE:", error);
        fetchStore();
        return false;
      }
    },
    [state.store, fetchStore]
  );

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  // Giá trị của Dispatch Context
  const dispatchValue = {
    dispatch,
    fetchStore,
    handleCreateOrUpdate,
  };

  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatchValue}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};
