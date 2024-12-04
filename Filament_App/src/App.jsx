import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./ui/Nav";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("App: isLoggedIn state:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <header className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Filaments Express</h1>
          <p className="lead">
            Your one-stop shop for all filament needs!
          </p>
        </div>
      </header>

      <div>
        <Nav isLoggedIn={isLoggedIn} />
      </div>
      <div>
        <Outlet context={{ setIsLoggedIn }} />
      </div>
    </>
  );
}

export default App;
