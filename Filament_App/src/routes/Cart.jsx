import { useCartCookie } from '/lib/CartHelper.jsx';
import { useState, useEffect } from "react";

export default function Cart() {
  const { getCart, addToCart, removeFromCart } = useCartCookie();
  let id;
  const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true); // Track loading state
  // const [error, setError] = useState(null); // Track error state

  const apiHost = import.meta.env.VITE_API_HOST;
  const getUrl = `${apiHost}api/products/${id}`;
  
  useEffect(() => {
    let cart = getCart();
    console.log("My Cart1:" + cart);
  },[]);


  // useEffect(() => {
  //   async function fetchProduct() {
  //     try { 
  //       const response = await fetch(getUrl);
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProduct(data);
  //       } else {
  //         // setError("Failed to fetch product data.");
  //       }
  //     } catch (err) {
  //       // setError("An error occurred while fetching the product.");
  //     } finally {
  //       // setLoading(false); // Stop loading once request is complete
  //     }
  //   }
  //     fetchProduct();
  //   }, [getUrl]);

    return (
      <div>
        <h1>Cart</h1>
        <p>This is the Cart page</p>
      </div>
    );
  }