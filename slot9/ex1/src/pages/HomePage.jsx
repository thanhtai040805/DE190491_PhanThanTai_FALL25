// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/Carousel/HomeCarousel";
import MovieCard from "../components/Movie/MovieCard";

export default function HomePage() {
  return (
    <div>
      <HomeCarousel />
      {/* Featured Movies Collections */}
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
