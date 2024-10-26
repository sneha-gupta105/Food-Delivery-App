import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";

export default function NavBar() {
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }
    const [cartView, setCartView] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>{" "}
          {/*We need to remove these achor tags. Since they make our page reload and our application is not single page because of them.*/}
          {/*We will use React router DOM to avoid page reload.*/}
          {/*Link tag from react router dom will replace the anchor tag, use "to" property here instead of "to"*/}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5"aria-current="page" to="/">My Orders</Link>
                </li>
              ) : ("")}

            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>My Cart{"  "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>: null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}