// src/components/home/HomeCarousel.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import { useStoreState } from "../context/storeContex";


export default function HomeCarousel() {

  const { store } = useStoreState();
  console.log("store", store);
  // Nếu mảng rỗng, không render để tránh lỗi
  if (!Array.isArray(store.products) || store.products.length === 0)
    return null;

  return (
    <Carousel interval={3000} data-bs-theme="dark">
      {store.products.map((p) => (
        <Carousel.Item key={p.id}>
          <img
            className="d-block w-100"
            src={p.img}
            alt={p.name}
            style={{ height: 420, objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
