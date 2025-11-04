export const initialVideoState = {
  allVideos: [],
  videos: [],
  loading: false,
  isEditing: null,
  currentVideo: {
    title: "",
    description: "",
    url: "",
    comments: [],
  },
  error: null,
};

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };

    case "SET_VIDEOS":
      return {
        ...state,
        allVideos: action.payload, // lưu gốc
        videos: action.payload, // hiển thị ban đầu
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "UPDATE_FIELD":
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UPDATE_VIDEO":
      return {
        ...state,
        videos: state.videos.map((v) =>
          v.id === action.payload.id ? action.payload : v
        ),
      };
    default:
      return state;
  }
};
