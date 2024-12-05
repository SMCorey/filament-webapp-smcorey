import { useState, useEffect } from "react";
import Card from "/src/ui/Card.jsx";

export default function Home() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = apiHost + "api/products/all";

  // FETCH ALL PRODUCT DATA
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
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

    fetchData();
  }, []);

  // LOADING OR ERROR STATES
  if (loading) {
    return (
      <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
        <p className="text-center fs-4">Loading Products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
        <p className="text-danger text-center fs-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <h1 className="text-center display-4 fw-bold mb-5">Our Products</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {/* DISPLAY CARDS FOR ALL PRODUCTS */}
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col" key={product.id}>
                <Card product={product} apiHost={apiHost} showLinks={true} />
              </div>
            ))
          ) : (
            <p className="text-center fs-5">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
