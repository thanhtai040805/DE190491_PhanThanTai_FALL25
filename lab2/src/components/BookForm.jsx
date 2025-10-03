export const BookForm = () => {
  return (
    <section className="bg-dark py-5" id="booking">
      <div className="container">
        <h2 className="text-light mb-4 text-center fw-bold">Book Your Table</h2>

        <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Your Name *"
              required
              className="form-control bg-white text-dark border-secondary"
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              placeholder="Your Email *"
              required
              className="form-control bg-white text-dark border-secondary"
            />
          </div>
          <div className="col-md-4">
            <select
              defaultValue=""
              required
              className="form-select bg-white text-dark border-secondary"
            >
              <option value="" disabled>
                Select a Service
              </option>
              <option>Dine In</option>
              <option>Delivery</option>
              <option>Take Away</option>
            </select>
          </div>

          <div className="col-12">
            <textarea
              rows="6"
              placeholder="Please write your comment"
              className="form-control bg-white text-dark border-secondary"
            ></textarea>
          </div>

          <div className="col-12 text-start">
            <button type="submit" className="btn btn-warning text-white px-4">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
