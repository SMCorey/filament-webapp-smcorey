import { useCartCookie } from "/lib/CartHelper.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCart } = useCartCookie();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const taxRate = 0.15; // Tax rate

  const apiHost = import.meta.env.VITE_API_HOST;

  // GET CART COOKIE
  useEffect(() => {
    const cartCookie = getCart();
    // console.log(cartCookie);

    // REDUCE CART COOKIE INTO ID AND QUANTITIES
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
    // console.log("consolidatedCart");
    // console.log(consolidatedCart);
  }, []);

  // FETCH PRODUCT DATA
  useEffect(() => {
    // IN CASE NO ITEMS IN CART
    if (cart.length === 0) {
      setLoading(false);
      return;
    }
    // console.log("cart");
    // console.log(cart);

    // FETCH EACH PRODUCT IN CART
    async function fetchProducts() {
      try {
        const productRequests = cart.map((item) =>
          fetch(`${apiHost}api/products/${item.product_id}`).then((response) => {
            if (!response.ok) {
              setError(
                `Failed to fetch product with ID: ${item.product_id}. Status: ${response.status}`
              );
              return;
            }
            return response.json();
          })
        );

        const productData = await Promise.all(productRequests);

        // COMBINE PRODUCT DATA AND CART QUANTITIES
        const fullCart = productData.map((product, index) => ({
          ...product,
          cost: parseFloat(product.cost) || 0, // Ensure cost is a number
          quantity: cart[index].quantity,
        }));

        // console.log("fullCart");
        // console.log(fullCart);
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

  // LOADING OR ERROR RETURNS
  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;

  // CALC TOTALS & TAX
  const subtotal = products.reduce(
    (acc, product) => acc + product.quantity * product.cost, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // console.log("products");
  // console.log(products);
  return (
    <div>
      <h1>Cart</h1>
      <Link to="/">Continue Shopping</Link> <br />
      <hr />
      {/* CART PRODUCT LIST */}
      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-2">
          {products.map((product) => (
            <div className="col" key={product.product_id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <img
                    src={`${apiHost}${product.image_filename}`}
                    className="img-thumbnail"
                    style={{ width: "225px", height: "auto", margin: "15px" }}
                    alt={"Image of " + product.name}
                  />
                  <p className="card-text">Price: ${product.cost.toFixed(2)}</p>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <p className="card-text">
                    Item Total: ${(product.quantity * product.cost).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products in the cart.</p>
      )}
      {/* TAX & TOTALS */}
      <div>
        <hr />
        <h5 className="card-title">Sub-Total: ${subtotal.toFixed(2)}</h5>
        <h5 className="card-title">Tax: ${tax.toFixed(2)}</h5>
        <h5 className="card-title">Total: ${total.toFixed(2)}</h5>
        <Link to="/checkout">Checkout</Link> <br />
      </div>
    </div>
  );
}
