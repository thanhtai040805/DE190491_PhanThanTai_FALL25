import MovieCard from "../components/Movie/MovieCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { movies, allGenres } from "../data/movies.js";

export default function MoviePage() {
  return (
    <div className="container mt-5">
      <h2 className="mb-3">My movies </h2>
      <Row xs={1} md={3} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard
              id={movie.id}
              img={movie.poster}
              title={movie.title}
              text={movie.description}
              genre={movie.genre}
              year={movie.year}
              country={movie.country}
              duration={movie.duration}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
