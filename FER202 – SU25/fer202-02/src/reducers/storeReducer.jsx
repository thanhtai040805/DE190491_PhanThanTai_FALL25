export const initialStoreState = {
  store: {
    products: [],
  },
  loading: false,
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };
    case "SET_STORE":
      return { ...state, store: action.payload, loading: false };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        store: {
          ...state.store,
          products: state.store.products.map((p) =>
            p.id === action.payload.id ? action.payload : p
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
};
