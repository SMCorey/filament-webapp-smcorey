import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartCookie } from "/lib/CartHelper.jsx";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCartCookie();

  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = `${apiHost}api/products/${id}`;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(getUrl);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchProduct();
  }, [getUrl]);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={`${apiHost}${product.image_filename}`}
            alt={`Image of ${product.name}`}
            className="img-fluid"
            style={{ width: "100%", maxWidth: "400px", height: "auto" }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="fs-5 mb-2">
            <strong>Price:</strong> ${product.cost}
          </p>
          <p className="fs-6 mb-4">{product.description}</p>

          {/* Add to Cart and Go Back Buttons */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.product_id)}
            >
              Add to Cart
            </button>
            <Link to="/" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
