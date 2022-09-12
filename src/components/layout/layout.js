import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <nav
      style={{
        display: "flex",
        paddingRight: "50px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: "30px",
          margin: 0,
        }}
      >
        <li>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                color: isActive ? "red" : "",
                textDecoration: "none",
              };
            }}
            to="/"
          >
            Pelanggan
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                color: isActive ? "red" : "",
                textDecoration: "none",
              };
            }}
            to="/penjualan"
          >
            Penjualan
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => {
              return {
                display: "block",
                color: isActive ? "red" : "",
                textDecoration: "none",
              };
            }}
            to="/barang"
          >
            Barang
          </NavLink>
        </li>
      </ul>
      <main style={{ flexGrow: 2 }}>{children}</main>
    </nav>
  );
}
