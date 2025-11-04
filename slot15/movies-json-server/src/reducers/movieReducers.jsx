export const initialMovieState = {
  allMovies: [],
  movies: [],
  genres: [],
  loading: false,
  isEditing: null,
  currentMovie: {
    avatar: "",
    title: "",
    description: "",
    genreId: "",
    duration: "",
    year: "",
    country: "",
  },
  showViewModal: false,
  showEditModal: false,
  showDeleteModal: false,
  movieToDelete: null,
  error: null,
};

export const movieReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };

    case "SET_MOVIES":
      return {
        ...state,
        allMovies: action.payload, // lưu gốc
        movies: action.payload, // hiển thị ban đầu
        loading: false,
      };
    case "SET_FILTERED_MOVIES": // ✅ thêm action mới
      return {
        ...state,
        movies: action.payload,
      };
    case "SET_GENRES":
      return { ...state, genres: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "UPDATE_FIELD":
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          [action.payload.name]: action.payload.value,
        },
      };

    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        currentMovie: { ...action.payload }, // fix: clone object
        isEditing: action.payload.id,
        showEditModal: true,
      };

    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    case "CLOSE_EDIT_MODAL":
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false,
      };

    case "OPEN_DELETE_MODAL":
      return {
        ...state,
        movieToDelete: action.payload,
        showDeleteModal: true,
      };

    case "CLOSE_DELETE_MODAL":
      return {
        ...state,
        movieToDelete: null,
        showDeleteModal: false,
      };
    case "OPEN_VIEW_MODAL":
      return {
        ...state,
        currentMovie: { ...action.payload },
        showViewModal: true,
      };

    case "CLOSE_VIEW_MODAL":
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        showViewModal: false,
      };
    case "RESET_FORM":
      return {
        ...state,
        currentMovie: initialMovieState.currentMovie,
        isEditing: null,
        showEditModal: false,
      };

    default:
      return state;
  }
};
