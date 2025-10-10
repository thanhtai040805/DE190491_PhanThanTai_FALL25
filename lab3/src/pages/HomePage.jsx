// src/pages/HomePage.jsx
import React from "react";
import HomeCarousel from "../components/Home/HomeCarousel";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <HomeCarousel />
        <Filter />
      </div>
    </div>
  );
}
