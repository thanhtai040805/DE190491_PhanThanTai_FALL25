export const HeroSection = () => {
  return (
    <header
      className="position-relative text-white d-flex align-items-center"
      style={{
        backgroundImage: "url('picture1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

      <div className="position-relative container text-center">
        <h1 className="fw-bold display-4 mb-3">Neapolitan Pizza</h1>
        <p className="fs-5 text-white">
          If you are looking for traditional Italian pizza, the Neapolitan is
          the best option!
        </p>
      </div>
    </header>
  );
};