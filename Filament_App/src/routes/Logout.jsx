import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Logout() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "api/users/logout";

  const [responseError, setResponseError] = useState(null);
  const [responseGood, setResponseGood] = useState(null);
  const { setIsLoggedIn } = useOutletContext();
  const navigate = useNavigate(); // Use useNavigate for navigation

  async function postLogout() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
      });

      // Handle response
      if (response.ok) {
        setResponseGood(`Logout Successful! - ${response.statusText}`);
        setResponseError(null); // Clear any previous errors
        setIsLoggedIn(false);
      } else {
        setResponseError(
          `Error: Could not log user out - ${response.statusText}`
        );
        setResponseGood(null); // Clear any previous success messages
      }
    } catch (error) {
      setResponseError(`Error: ${error.message}`);
      setResponseGood(null); // Clear any previous success messages
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Logout</h1>
      {responseGood && (
        <h2 className="text-center text-success">{responseGood}</h2>
      )}
      {responseError && (
        <h2 className="text-center text-danger">{responseError}</h2>
      )}
      <div className="d-flex gap-3">
        <button onClick={postLogout} type="button" className="btn btn-danger">
          Logout
        </button>
        <button
          onClick={() => navigate("/")} // Navigate to Home
          type="button"
          className="btn btn-primary"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/login")} // Navigate to Login
          type="button"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </div>
  );
}
