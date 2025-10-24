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
        to="/about"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        Giới Thiệu
      </NavLink>
      <NavLink
        to="/users/123"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        User 123
      </NavLink>
    </nav>
  );
}

export default Navigation;
