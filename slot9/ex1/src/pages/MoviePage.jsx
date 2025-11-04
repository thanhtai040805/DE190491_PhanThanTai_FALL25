import MovieCard from "../components/Movie/MovieCard";

export default function MoviePage() {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">Featured Movies Collections</h2>
            <p className="text-center text-muted mb-5">
              Khám phá những bộ phim hay nhất được tuyển chọn đặc biệt cho bạn
            </p>
            <MovieCard />
          </div>
        </div>
      </div>
    </div>
  );
}
