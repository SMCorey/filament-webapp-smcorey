import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "/src/ui/Card.jsx";  

export default function Home() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // const apiUrl = "http://localhost:3000/api/products/all";
  const apiUrl = apiHost + "api/products/all";

  // FETCH ALL PRODUCT DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
  
        if (!response.ok) {
          // Log the error and provide feedback without throwing
          console.error(`Fetch failed with status: ${response.status}`);
          setError("Failed to load products. Please try again later.");
          return;
        }
  
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while loading products.");
      } finally {
        setLoading(false);
      }
    }

    document.body.style.back;

    let ignore = false;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

    // LOADING OR ERROR RETURNS
    if (loading) return <p>Loading Products...</p>;
    if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-dark text-white min-vh-100">
        <h1 className="text-center fw-bold">Filaments</h1>
        <div className="row row-cols-1 row-cols-md-2 g-2">
          {/* DISPLAY CARDS FOR ALL PRODUCTS */}
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
