import React, { useContext, useState, useEffect } from "react";
import { useMovieState, useMovieDispatch } from "../contexts/MovieContext";

const FilterBar = () => {
  const state = useMovieState();
  const { dispatch } = useMovieDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [durationRange, setDurationRange] = useState([0, 300]);
  const [sortOrder, setSortOrder] = useState("");

  // 🧠 Lọc + tìm kiếm + sắp xếp
  useEffect(() => {
    let filteredMovies = state.allMovies; // ✅ luôn bắt đầu từ bản gốc

    // 🔍 Tìm kiếm theo tên phim
    if (searchTerm.trim() !== "") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🎭 Lọc theo thể loại
    if (selectedGenre) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genreId === Number(selectedGenre)
      );
    }

    // ⏱️ Lọc theo thời lượng
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.duration >= durationRange[0] && movie.duration <= durationRange[1]
    );

    // 🔤 Sắp xếp theo tên phim
    if (sortOrder === "asc") {
      filteredMovies = [...filteredMovies].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (sortOrder === "desc") {
      filteredMovies = [...filteredMovies].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    dispatch({ type: "SET_FILTERED_MOVIES", payload: filteredMovies }); // ✅
  }, [searchTerm, selectedGenre, durationRange, sortOrder]);

  return (
    <div className="filter-bar" style={styles.container}>
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      {/* Chọn thể loại */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Tất cả thể loại --</option>
        {state.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Thời lượng */}
      <div style={styles.duration}>
        <label>Thời lượng: </label>
        <input
          type="number"
          value={durationRange[0]}
          onChange={(e) =>
            setDurationRange([Number(e.target.value), durationRange[1]])
          }
          style={{ width: "60px" }}
        />
        {" - "}
        <input
          type="number"
          value={durationRange[1]}
          onChange={(e) =>
            setDurationRange([durationRange[0], Number(e.target.value)])
          }
          style={{ width: "60px" }}
        />
        <span> phút</span>
      </div>

      {/* Sắp xếp */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={styles.select}
      >
        <option value="">-- Sắp xếp theo tên --</option>
        <option value="asc">Tăng dần (A → Z)</option>
        <option value="desc">Giảm dần (Z → A)</option>
      </select>

      <button
        onClick={() => {
          setSearchTerm("");
          setSelectedGenre("");
          setDurationRange([0, 300]);
          setSortOrder("");
          dispatch({ type: "SET_FILTERED_MOVIES", payload: state.allMovies });
        }}
      >
        🔄 Xóa bộ lọc
      </button>
    </div>
  );
};

// 🎨 Style đơn giản inline
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  duration: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
};

export default FilterBar;
