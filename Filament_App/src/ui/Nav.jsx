import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Nav(props) {
  const { isLoggedIn } = props;

  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <nav className="navbar bg-dark py-3 shadow">
      <div className="container d-flex justify-content-center">
        <Link className="btn btn-outline-light mx-2 fw-bold" to="/">
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link className="btn btn-outline-light mx-2 fw-bold" to="/logout">
              Logout
            </Link>
            <Link className="btn btn-outline-light mx-2 fw-bold" to="/cart">
              <i className="bi bi-cart"></i> {/* Shopping cart icon */}
            </Link>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light mx-2 fw-bold" to="/signup">
              Signup
            </Link>
            <Link className="btn btn-outline-light mx-2 fw-bold" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light mx-2 fw-bold" to="/cart">
              <i className="bi bi-cart"></i> {/* Shopping cart icon */}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
