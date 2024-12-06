import { useCookies } from "react-cookie";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const { isLoggedIn } = useOutletContext();
  const [cookies, , removeCookie] = useCookies(['cart']);
  const [responseError, setResponseError] = useState(null);
  const navigate = useNavigate();

  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = apiHost + "api/products/purchase";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    // REDIRECT IF NOT LOGGED IN
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    // CONVERT CART TO PROPER FORMAT
    const cartItems = cookies.cart ? cookies.cart.join(",") : "";

    // PREPARE BODY
    const body = new URLSearchParams({
      ...data,
      cart: cartItems,
    }).toString();
   try{
     // API POST REQUEST
     fetch(apiUrl, {
       method: 'POST',
       credentials: 'include', 
       headers: { "Content-Type": "application/x-www-form-urlencoded" },
       body,
     })
       .then((response) => {
         if (response.ok) {
           // CLEAR CART COOKIE & REDIRECT ON SUCCESS
           removeCookie('cart'); 
           navigate('/confirmation');
         } else {
           setResponseError(
             `Error: Could complete checkout - ${response.statusText}`
           );
         }
       })
      }
      catch (err) {
        console.error("Error fetching data:", err);
        setResponseError("An error occurred while loading products.");
      }

   }

  // IN NAV/REDIRECT TOO SLOW
  if (!isLoggedIn) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      {responseError && (
          <h2 className="text-danger">{responseError}</h2>
        )}

        {/* FORM START */}
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* STREET */}
        <div className="form-group mb-3">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            {...register('street', { required: 'Street is required' })}
            className={`form-control ${errors.street ? 'is-invalid' : ''}`}
          />
          {errors.street && <div className="invalid-feedback">{errors.street.message}</div>}
        </div>

        {/* CITY */}
        <div className="form-group mb-3">
          <label htmlFor="city">City</label>
          <input
            id="city"
            {...register('city', { required: 'City is required' })}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          />
          {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
        </div>

        {/* PROVINCE */}
        <div className="form-group mb-3">
          <label htmlFor="province">Province</label>
          <input
            id="province"
            {...register('province', { required: 'Province is required' })}
            className={`form-control ${errors.province ? 'is-invalid' : ''}`}
          />
          {errors.province && <div className="invalid-feedback">{errors.province.message}</div>}
        </div>

        {/* COUNTRY */}
        <div className="form-group mb-3">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            {...register('country', { required: 'Country is required' })}
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
          />
          {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
        </div>

        {/* POSTAL CODE */}
        <div className="form-group mb-3">
          <label htmlFor="postal_code">Postal Code</label>
          <input
            id="postal_code"
            {...register('postal_code', {
              required: 'Postal code is required',
              pattern: {
                // REGEX FROM: https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
                value: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
                message: 'Invalid postal code format',
              },
            })}
            className={`form-control ${errors.postal_code ? 'is-invalid' : ''}`}
          />
          {errors.postal_code && (
            <div className="invalid-feedback">{errors.postal_code.message}</div>
          )}
        </div>

        {/* CREDIT CARD */}
        <div className="form-group mb-3">
          <label htmlFor="credit_card">Credit Card</label>
          <input
            id="credit_card"
            type="text"
            {...register('credit_card', {
              required: 'Credit card is required',
              pattern: {
                value: /^\d{16}$/,
                message: 'Credit card must be 16 digits',
              },
            })}
            className={`form-control ${errors.credit_card ? 'is-invalid' : ''}`}
          />
          {errors.credit_card && (
            <div className="invalid-feedback">{errors.credit_card.message}</div>
          )}
        </div>

        {/* EXPIRATION DATE */}
        <div className="form-group mb-3">
          <label htmlFor="credit_expire">Expiration Date</label>
          <input
            id="credit_expire"
            type="text"
            placeholder="MM/YY"
            {...register('credit_expire', {
              required: 'Expiration date is required',
              pattern: {
                // REGEX FROM: https://stackoverflow.com/questions/20430391/regular-expression-to-match-credit-card-expiration-date
                value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                message: 'Expiration date must be in MM/YY format',
              },
            })}
            className={`form-control ${errors.credit_expire ? 'is-invalid' : ''}`}
          />
          {errors.credit_expire && (
            <div className="invalid-feedback">{errors.credit_expire.message}</div>
          )}
        </div>

        {/* CVV */}
        <div className="form-group mb-3">
          <label htmlFor="credit_cvv">CVV</label>
          <input
            id="credit_cvv"
            type="text"
            {...register('credit_cvv', {
              required: 'CVV is required',
              pattern: {
                value: /^\d{3,4}$/, // SUPPOSEDLY CVVs CAN HAVE 4 DIGITS.
                message: 'CVV must be 3 or 4 digits',
              },
            })}
            className={`form-control ${errors.credit_cvv ? 'is-invalid' : ''}`}
          />
          {errors.credit_cvv && <div className="invalid-feedback">{errors.credit_cvv.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Complete Purchase
        </button>
      </form>
    </div>
  );
}
