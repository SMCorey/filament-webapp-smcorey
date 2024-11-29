import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "/src/ui/Card.jsx";  

export default function Home() {
  const apiHost = import.meta.env.VITE_API_HOST;
  const [products, setProducts] = useState([]);

  // const apiUrl = "http://localhost:3000/api/products/all";
  const apiUrl = apiHost + "api/products/all";

  // FETCH ALL PRODUCT DATA
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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
  }, []);

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
