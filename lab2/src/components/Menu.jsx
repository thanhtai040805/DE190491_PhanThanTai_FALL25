export const Menu = () => {
  return (
    <section className="container py-5" id="menu">
      <h2 className="text-light mb-4 fw-bold">Our Menu</h2>
      <div className="row g-4">
        <div className="col-lg-3 col-md-6 col-12">
          <article className="card bg-white border-secondary">
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              SALE
            </span>
            <img
              src="/picture2.jpg"
              alt="Margherita Pizza"
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">
              <h3 className="card-title text-dark mb-2 fs-5">Margherita Pizza</h3>
              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="text-muted text-decoration-line-through small">
                  $40.00
                </span>
                <span className="text-warning fw-bold">$21.00</span>
              </div>
              <button className="btn btn-dark mt-auto">Buy</button>
            </div>
          </article>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <article className="card bg-white border-secondary">
            <img
              src="/picture3.jpg"
              alt="Mushroom Pizza"
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="card-title text-dark mb-2 fs-5">Mushroom Pizza</h3>
              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="text-warning fw-bold">$25.00</span>
              </div>
              <button className="btn btn-dark mt-auto">Buy</button>
            </div>
          </article>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <article className="card bg-white border-secondary">
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              NEW
            </span>
            <img
              src="/picture4.jpg"
              alt="Hawaiian Pizza"
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="card-title text-dark mb-2 fs-5">Hawaiian Pizza</h3>
              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="text-warning fw-bold">$30.00</span>
              </div>
              <button className="btn btn-dark mt-auto">Buy</button>
            </div>
          </article>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <article className="card bg-white border-secondary">
            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
              SALE
            </span>
            <img
              src="/picture5.jpg"
              alt="Pesto Pizza"
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h3 className="card-title text-dark mb-2 fs-5">Pesto Pizza</h3>
              <div className="d-flex align-items-baseline gap-2 mb-3">
                <span className="text-muted text-decoration-line-through small">
                  $49.00
                </span>
                <span className="text-warning fw-bold">$36.00</span>
              </div>
              <button className="btn btn-dark mt-auto">Buy</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};