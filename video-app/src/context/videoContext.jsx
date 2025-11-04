import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { videoReducer, initialVideoState } from "../reducer/videoReducer";
import videoAPI from "../api/videoAPI";

// Contexts
export const VideoStateContext = createContext(initialVideoState);
export const VideoDispatchContext = createContext(null);

// Custom Hooks
export const useVideoState = () => useContext(VideoStateContext);
export const useVideoDispatch = () => useContext(VideoDispatchContext);

// MovieProvider Component
export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialVideoState);

  // Hàm READ: Tải lại dữ liệu (Axios GET)
  const fetchVideos = useCallback(async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const response = await videoAPI.get("/videos");
      dispatch({ type: "SET_VIDEOS", payload: response.data });
    } catch (error) {
      console.error("Lỗi khi tải danh sách videos:", error);
      // Giữ state cũ nếu lỗi (hoặc [] nếu ban đầu chưa có)
      dispatch({ type: "SET_VIDEOS", payload: [] });
    }
  }, [dispatch]);

  // Hàm CREATE/UPDATE: Xử lý POST và PUT (Axios POST/PUT)
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: "START_LOADING" });

      try {
        if (isEditing) {
          // UPDATE (PUT)
          await videoAPI.put(`/videos/${isEditingId}`, dataToSend);
        } else {
          // CREATE (POST)
          await videoAPI.post("/videos", dataToSend);
        }
        fetchVideos();
        return true;
      } catch (error) {
        console.error("Lỗi thao tác CREATE/UPDATE:", error);
        fetchVideos();
        return false;
      }
    }, [fetchVideos]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Giá trị của Dispatch Context
  const dispatchValue = {
    dispatch,
    fetchVideos,
    handleCreateOrUpdate,
  };

  return (
    <VideoStateContext.Provider value={state}>
      <VideoDispatchContext.Provider value={dispatchValue}>
        {children}
      </VideoDispatchContext.Provider>
    </VideoStateContext.Provider>
  );
};
