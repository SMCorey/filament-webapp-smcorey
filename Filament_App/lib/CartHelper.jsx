// CART COOKIE UTILITY FUNCTIONS

import { useCookies } from 'react-cookie';

export const useCartCookie = () => {
  const maxDays = 7 * 24 * 60 * 60 // 7 days
  const [cookies, setCookie] = useCookies(['cart']);

  const addToCart = (productId) => {
    const currentCart = cookies.cart ? cookies.cart : [];
    currentCart.push(productId);
    setCookie('cart', currentCart, { path: '/', maxAge: maxDays }); 
  };

  const getCart = () => {
    return cookies.cart ? cookies.cart : [];
    };

  const removeFromCart = (productId) => {
    const currentCart = cookies.cart ? cookies.cart : [];
    const index = currentCart.indexOf(productId);
    if (index !== -1) {
      currentCart.splice(index, 1); // Remove only the first occurrence
      setCookie('cart', currentCart, { path: '/', maxAge: maxDays });
    }
  };

  return { addToCart, getCart, removeFromCart };
};
