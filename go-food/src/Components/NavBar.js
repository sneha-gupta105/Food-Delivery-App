import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import Modal from "../Modal"; // Ensure Modal component is implemented
import Cart from "../Screens/Cart"; // Ensure Cart component is implemented

export default function NavBar(props) {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart(); // Get cart items from context

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token on logout
    navigate("/login"); // Redirect to login
  };

  const loadCart = () => {
    setCartView(true); // Open cart modal
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
      style={{
        boxShadow: "0px 10px 20px black",
        position: "fixed",
        zIndex: "10",
        width: "100%",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" to="/myOrder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">
                Signup
              </Link>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              <div
                className="btn bg-white text-success mx-2 position-relative"
                onClick={loadCart}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/shopping_cart.svg`}
                  alt="Shopping Cart"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                  }}
                />
                Cart
                {items.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "0 6px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {items.length}
                  </span>
                )}
              </div>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <button onClick={handleLogout} className="btn bg-white text-success mx-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
