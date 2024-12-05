import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Signup() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "api/users/signup";

  const [responseError, setResponseError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function signup(data) {

    // BODY CONSTRUCTION
    const formData = new URLSearchParams({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
    }).toString();

    // API POST REQUEST
    async function postData() {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        setResponseError(
          `Error: Could not sign up user - ${response.statusText}`
        );
      }
    }
    postData();
  }

  return (
    <div className="bg-dark text-white min-vh-100 d-flex justify-content-center">
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-4 mt-4">Create an Account</h1>
        <p className="lead mb-4">Join us to enjoy personalized services and great offers.</p>

        {/* ISSUES FEEDBACK */}
        {responseError && (
          <p className="text-danger mb-4">{responseError}</p>
        )}

        {/* FORM START */}
        <form
          onSubmit={handleSubmit(signup)}
          className="mx-auto bg-dark-subtle text-dark p-4 rounded shadow"
          style={{ maxWidth: "500px" }}
        >

          {/* FIRST NAME */}
          <div className="mb-3">
            <label className="form-label fw-bold">First Name</label>
            <input
              {...register("first_name", { required: true, maxLength: 80 })}
              type="text"
              className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
            />
            {errors.first_name && (
              <div className="invalid-feedback">First Name required.</div>
            )}
          </div>

            {/* LAST NAME */}
          <div className="mb-3">
            <label className="form-label fw-bold">Last Name</label>
            <input
              {...register("last_name", { required: true, maxLength: 100 })}
              type="text"
              className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            />
            {errors.last_name && (
              <div className="invalid-feedback">Last Name required.</div>
            )}
          </div>

            {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">Email required.</div>
            )}
          </div>

            {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              {...register("password", {
                required: "Password required.",
                validate: { // note: could use same password validator as backend
                  validFormat: (value) =>
                    // REGEX FROM: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/.test(
                      value
                    ) ||
                    "Password must be 8-50 characters, 1 upper, 1 lower, 1 special character, and 1 number.",
                },
              })}
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">
                Password must be 8-50 characters, 1 upper, 1 lower, 1 special character, and 1 number.
              </div>
            )}
          </div>

            {/* SIGNUP & CANCEL */}
          <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-success px-4">
              Signup
            </button>
            <Link to="/" className="btn btn-outline-secondary px-4">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
