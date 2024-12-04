import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "api/users/login";

  const navigate = useNavigate();
  const [responseError, setResponseError] = useState(null);
  const { setIsLoggedIn } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function login(data) {
    console.log(data);

    const formData = new URLSearchParams({
      email: data.email,
      password: data.password,
    }).toString();

    async function postLogin() {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setResponseError(
          `Error: Could not log user in - ${response.statusText}`
        );
      }
    }

    postLogin();
  }

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center">
      <div className="container text-center">
        <h1 className="display-4 fw-bold mt-4">Login</h1>
        <p className="lead">Login to checkout!</p>

        {responseError && (
          <h2 className="text-danger">{responseError}</h2>
        )}

        <form
          onSubmit={handleSubmit(login)}        
          method="post"
          encType="application/x-www-form-urlencoded"
          className="mx-auto bg-dark-subtle text-dark p-4 rounded shadow"
          style={{ maxWidth: "500px" }}
        >
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input
              {...register("email", { required: true })}
              type="text"
              className="form-control bg-light"
            />
            {errors.email && (
              <span className="text-danger">Email Required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              className="form-control bg-light"
            />
            {errors.password && (
              <span className="text-danger">Password Required.</span>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-success px-4">
              Login
            </button>
            <Link to="/" className="btn btn-outline-light px-4">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
