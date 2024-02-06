import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { useAuth } from "../../context/auth";
import { message, Badge } from "antd";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    message.success("Logged out successfully");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          <GiShoppingBag /> Ecommerce
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* //// */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item p-2">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown p-2">
              <Link
                className="nav-link dropdown-toggle"
                to="/categories"
                // role="button"
                data-bs-toggle="dropdown"
                // aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item p-2">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item p-2">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown p-2">
                <NavLink
                  className="nav-link dropdown-toggle text-capitalize"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            <li className="nav-item p-2">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">
                  <MdShoppingCart />
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
        <SearchInput />
      </div>
    </nav>
  );
};

export default Header;
