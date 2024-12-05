import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function Nav({ isLoggedIn, sessionData }) {
  const [cookies] = useCookies(["cart"]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // UPDATE ITEM COUNT WHENEVER CART CHANGES
    if (cookies.cart) {
      setItemCount(cookies.cart.length);
    } else {
      setItemCount(0); 
    }
  }, [cookies.cart]);

  return (
    <nav className="navbar bg-dark py-3 shadow">
      <div className="container d-flex justify-content-between align-items-center">
        {/* HOME BUTTON */}
        <div>
          <Link className="btn btn-outline-light mx-2 fw-bold" to="/">
            Home
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {/* CART BUTTON/ICON */}
          <Link
            className="btn btn-outline-light mx-2 fw-bold position-relative"
            to="/cart"
          >
            <i className="bi bi-cart">
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {itemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </i>
          </Link>

              {/* DISPLAY WELCOME MESSAGE IF LOGGED IN (NOT ON SMALL DISPLAYSD) */}
          {isLoggedIn ? (
            <>
              <div
                className="text-light fw-bold mx-2 d-none d-sm-block"
                style={{ fontSize: "1rem" }}
              >
                Hello, {sessionData?.first_name}!
              </div>

              {/* LOGOUT */}
              <Link className="btn btn-outline-light mx-2 fw-bold" to="/logout">
                Logout
              </Link>
            </>
          ) : (   // BELOW FOR NOT LOGGED IN
            <>
              {/* SIGNUP */}
              <Link className="btn btn-outline-light mx-2 fw-bold" to="/signup">
                Signup
              </Link>

              {/* LOGIN */}
              <Link className="btn btn-outline-light mx-2 fw-bold" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
