// 
// Styling pulled from Bootstrap examples & docs
// https://getbootstrap.com/docs/5.3/getting-started/introduction/

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./ui/Nav";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);

  const apiHost = import.meta.env.VITE_API_HOST;
  const getSessionUrl = `${apiHost}api/users/getSession`;

  // GET SESSION DATA ON PAGE LOAD
  useEffect(() => {
    async function getSession() {
      try {
        const response = await fetch(getSessionUrl, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          // SESSION DATA FOR USE ACROSS SITE
          setSessionData(data);
          setIsLoggedIn(true);
        } else {
          setSessionData(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Error fetching Session Data:", err);
      }
    }
    // ONLY GET SESSION IF FIRST LOAD OR LOGGED IN = TRUE
    if (firstLoad || isLoggedIn) {
      getSession();
      setFirstLoad(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Filaments Express</h1>
          <p className="lead">Your one-stop shop for all filament needs!</p>
        </div>
      </header>

      <div>
        <Nav isLoggedIn={isLoggedIn} sessionData={sessionData} />
      </div>
      <div>
        <Outlet
          context={{
            setIsLoggedIn,
            setSessionData,
            isLoggedIn,
            sessionData,
          }}
        />
      </div>
    </>
  );
}

export default App;
