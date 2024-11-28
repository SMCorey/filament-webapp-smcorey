import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../UI/Card";

export default function Home() {
  const [products, setProducts] = useState([]); // initialize as empty array
  const apiHost = import.meta.env.VITE_API_HOST;

  // const apiUrl = "http://localhost:3000/api/products/all";
  const apiUrl = apiHost + "api/products/all";

  // Get from API -> Trigger React state change
  useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (!ignore) {
          setProducts(data);
        }
      } else {
        setProducts(null);
      }
    }

    document.body.style.back;

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []); // run only once

  return (
    <>
      <div className="bg-dark text-white min-vh-100">
        <h1 className="text-center fw-bold">Filaments</h1>
        <div className="d-flex justify-content-center mb-4">
          <Link to="/create" className="btn btn-warning">
            Add New Unit
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col">
                <Card product={product} apiHost={apiHost} showLinks={true} />
              </div>
            ))
          ) : (
            <p>No products.</p>
          )}
        </div>
      </div>
    </>
  );
}
