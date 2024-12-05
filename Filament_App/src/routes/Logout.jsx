import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Logout() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "api/users/logout";

  const [responseError, setResponseError] = useState(null);
  const [responseGood, setResponseGood] = useState(null);
  const { setIsLoggedIn, setSessionData } = useOutletContext();
  const navigate = useNavigate();

  // API POST REQUEST
  async function postLogout() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
      });

      // HANDLE SESSION DESTROY AND LOGOUT
      if (response.ok) {
        setResponseGood(`Logout Successful! - ${response.statusText}`);
        setResponseError(null); // Clear any previous errors
        setIsLoggedIn(false);
        setSessionData(null);
      } else {
        setResponseError(
          `Error: Could not log user out - ${response.statusText}`
        );
        setResponseGood(null); 
      }
    } catch (error) {
      setResponseError(`Error: ${error.message}`);
      setResponseGood(null); 
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Logout</h1>
      {/* FEEDBACK ON SUCCESSFUL LOGOUT */}
      {responseGood && (
        <h2 className="text-center text-success">{responseGood}</h2>
      )}
      {/* FEEDBACK ON LOGOUT ISSUES */}
      {responseError && (
        <h2 className="text-center text-danger">{responseError}</h2>
      )}

      <div className="d-flex gap-3">
        {/* LOGOUT */}
        <button onClick={postLogout} type="button" className="btn btn-danger">
          Logout
        </button>

        {/* HOME */}
        <button
          onClick={() => navigate("/")}
          type="button"
          className="btn btn-primary"
        >
          Home
        </button>

        {/* LOGIN */}
        <button onClick={() => navigate("/login")} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}
