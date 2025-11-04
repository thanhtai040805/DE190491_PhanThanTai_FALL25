// src/pages/MovieDetailPage.jsx
import React, { useEffect, useState } from "react";
import { Container, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieState } from "../contexts/MovieContext";
import { MovieDetail } from "../components/MovieDetail";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useMovieState();
  const { movies, genres } = state;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const found = movies.find((m) => m.id === parseInt(id));
      if (found) setMovie(found);
    }
  }, [id, movies]);


  if (!movie) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Đang tải dữ liệu phim...</p>
      </Container>
    );
  }

  return (
    <Container className="p-4">
      <h2 className="mb-4">🎬 Thông Tin Chi Tiết Phim</h2>
      <MovieDetail
        currentMovie={movie}
        imagePreview={movie.avatar}
        genres={genres}
        errors={{}}
        validated={false}
      />
      <div className="mt-4">
        <Button variant="secondary" onClick={() => navigate("/movies")}>
          ← Quay lại danh sách
        </Button>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
