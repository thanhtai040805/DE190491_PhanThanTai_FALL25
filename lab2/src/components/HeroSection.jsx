export const HeroSection = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="picture1.jpg"
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Neapolitan Pizza</h5>
            <p>
              If you are looking for traditional Italian pizza, the Neapolitan
              is the best option!
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="picture2.jpg"
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Margherita Pizza</h5>
            <p>
              If you are looking for a classic pizza, the Margherita is the best
              option!
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="picture3.jpg"
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Mushroom Pizza</h5>
            <p>
              If you are looking for a pizza with mushrooms, the Mushroom is the
              best option!
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="picture4.jpg"
            className="d-block w-100"
            style={{ height: "400px", objectFit: "cover" }}
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Hawaiian Pizza</h5>
            <p>
              If you are looking for a pizza with Hawaiian, the Hawaiian is the
              best option!
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};