import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartCookie } from '/lib/CartHelper.jsx';
import { useCookies } from 'react-cookie';

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true); // Track loading state
  // const [error, setError] = useState(null); // Track error state
  const { addToCart } = useCartCookie();

  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = `${apiHost}api/products/${id}`;
  
  useEffect(() => {
  },[]);


  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(getUrl);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          // setError("Failed to fetch product data.");
        }
      } catch (err) {
        // setError("An error occurred while fetching the product.");
      } finally {
        // setLoading(false); // Stop loading once request is complete
      }
    }
    
    fetchProduct();
  }, [getUrl]);
  
  // if (loading) {
  //   return <p>Loading product details...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="mt-2 mb-2 mx-2 card-shadow bg-secondary text-white d-flex align-items-center position-relative">
      <img
        src={`${apiHost}${product.image_filename}`}
        className="img-thumbnail"
        style={{ width: "500px", height: "auto", margin: "15px" }}
        alt={"Image of " + product.name}
      />
      <h1>{product.name}</h1>
      <p>Price: ${product.cost}</p>
      <p>Description: {product.description}</p>

      <div>
        <Link 
        to={"/"}
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation
          addToCart(product.product_id); // Add product ID to the cart
        }}
        >Add to Cart</Link>
      </div>
      <div>
        <Link to={"/"}>Go Back</Link>
      </div>
    </div>
  );
}
