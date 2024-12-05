import { useCartCookie } from "/lib/CartHelper.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCart, removeFromCart } = useCartCookie();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const taxRate = 0.15;

  const apiHost = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    const cartCookie = getCart();

    //REDUCE COOKIE CART INTO PROD_ID:QTY PAIRINGS
    const consolidatedCart = cartCookie.reduce((acc, productId) => {
      const existingItem = acc.find((item) => item.product_id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        acc.push({ product_id: productId, quantity: 1 });
      }
      return acc;
    }, []);
    setCart(consolidatedCart);
  }, []); 

  useEffect(() => {

    if (cart.length === 0) { // DONT PROCESS IF CART IS EMPTY
      setLoading(false);
      return;
    }

    // FETCH EACH PRODUCT FROM API
    async function fetchProducts() {
      try {
        const productRequests = cart.map((item) =>
          fetch(`${apiHost}api/products/${item.product_id}`).then(
            (response) => {
              if (!response.ok) {
                setError(
                  `Failed to fetch product with ID: ${item.product_id}. Status: ${response.status}`
                );
                return;
              }
              return response.json();
            }
          )
        );
        
        // WAIT FOR ALL ASYNC PRODUCT REQUESTS
        const productData = await Promise.all(productRequests);

        // COMBINE PRODUCT DATA AND CART DATA
        const fullCart = productData.map((product, index) => ({
          ...product,
          cost: parseFloat(product.cost) || 0,
          quantity: cart[index].quantity,
        }));

        // SET PRODUCTS FOR THE UI CARDS
        setProducts(fullCart);

      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [cart]);

  // REMOVE/DELETE FROM CART
  const handleDelete = (productId) => {

    // SINGLE ITEM REMOVE FROM CART COOKIE
    removeFromCart(productId);

    // UPDATE CART STATE
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.product_id === productId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          // REMOVE ANY 0 QTY ITEMS
          .filter((item) => item.quantity > 0)
    );

    // UPDATE PRODUCT STATE (note: prevProducts is the state before this method is called, fancy useState feature)
    setProducts(
      (prevProducts) =>
        prevProducts
          .map((product) => {
            if (product.product_id === productId) {
              return { ...product, quantity: product.quantity - 1 };
            }
            return product;
          })
          // REMOVE ANY 0 QTY ITEMS
          .filter((product) => product.quantity > 0)
    );
  };

  // RETURN ELEMENTS IN THE EVENT OF ERRORS OR LOADING
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  // CALCULATING TOTALS
  const subtotal = products.reduce(
    (acc, product) => acc + product.quantity * product.cost,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Shopping Cart</h1>

      {/* CONTINUE SHOPPING */}
      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
      </div>

      {products.length > 0 ? (
        <>
          {/* PRODUCT CARDS */}
          <div className="d-flex flex-column gap-3">
            {products.map((product) => (
              <div
                className="card p-3 d-flex flex-row flex-wrap align-items-center"
                key={product.product_id}
                style={{ border: "1px solid #ddd" }}
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={`${apiHost}${product.image_filename}`}
                  alt={`Image of ${product.name}`}
                  className="img-fluid"
                  style={{
                    width: "80px",
                    height: "auto",
                    objectFit: "contain",
                    marginRight: "15px",
                  }}
                />
                {/* PRODUCT INFO*/}
                <div
                  className="d-flex flex-grow-1 flex-wrap justify-content-between align-items-center"
                  style={{ gap: "10px" }}
                >
                  {/* PRODUCT NAME */}
                  <h5
                    className="me-3 mb-1 text-wrap"
                    style={{
                      flex: "1 1 20%",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: "1rem",
                    }}
                  >
                    {product.name}
                  </h5>
                  {/* PRICE */}
                  <p
                    className="text-center mb-0"
                    style={{
                      flex: "1 1 20%",
                      fontSize: "0.9rem",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    <span style={{ color: "#666", fontWeight: "bold" }}>
                      Price:
                    </span>{" "}
                    ${product.cost.toFixed(2)}
                  </p>
                  {/* QUANTITY */}
                  <p
                    className="text-center mb-0"
                    style={{
                      flex: "1 1 20%",
                      fontSize: "0.9rem",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    <span style={{ color: "#666", fontWeight: "bold" }}>
                      Quantity:
                    </span>{" "}
                    {product.quantity}
                  </p>
                  {/* ITEM TOTAL */}
                  <p
                    className="text-center mb-0"
                    style={{
                      flex: "1 1 20%",
                      fontSize: "0.9rem",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    <span style={{ color: "#666", fontWeight: "bold" }}>
                      Item Total:
                    </span>{" "}
                    ${(product.quantity * product.cost).toFixed(2)}
                  </p>
                </div>
                {/* REMOVE */}
                <div className="mt-2">
                  <button
                    className="btn btn-danger btn-sm"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                    }}
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTALS */}
          <div className="mt-4">
            <hr />
            <div className="d-flex flex-column align-items-end">
              <h5 className="mb-1">Sub-Total: ${subtotal.toFixed(2)}</h5>
              <h5 className="mb-1">Tax: ${tax.toFixed(2)}</h5>
              <h5 className="mb-1">Total: ${total.toFixed(2)}</h5>

              {/* CHECKOUT */}
              <Link to="/checkout" className="btn btn-primary mt-3">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      ) : ( // IF CART IS EMPTY
        <p className="text-center">Your cart is empty. Start shopping!</p>
      )}
    </div>
  );
}
