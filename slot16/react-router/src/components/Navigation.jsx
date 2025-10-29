import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  const linkStyle = {
    marginRight: "15px",
    textDecoration: "none",
    color: "#333",
  };

  const activeStyle = {
    fontWeight: "bold",
    color: "#007bff",
    borderBottom: "2px solid #007bff",
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Trang Chủ
      </NavLink>
      <NavLink
        to="/san-pham"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/lien-he"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default Navigation;
