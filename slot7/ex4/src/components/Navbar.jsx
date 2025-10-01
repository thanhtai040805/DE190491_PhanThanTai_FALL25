export const Navbar = () => {
  return (
    <nav
      className="navbar d-flex flex-column"
      style={{ backgroundColor: "orange" }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <img src="FPT2.jpg" alt="Bootstrap" width="500" height="250" />
      </div>

      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link text-white active"
            aria-current="page"
            href="#"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
