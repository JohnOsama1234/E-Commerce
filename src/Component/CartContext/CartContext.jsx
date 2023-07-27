import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  console.log(`Context Works 🎉🎉🎉🎉🎉🎉`);
  let headers = { token: localStorage.getItem("userToken") };
  console.log(headers);
  const [cartId, setcartId] = useState(null); // for online payment
  const [numOfcartItems, setnumOfcartItems] = useState(0);
  const [cartDeatails, setcartDeatails] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    if (data?.status === `success`) {
      setnumOfcartItems(data.numOfCartItems);
      setcartId(data.data._id);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async  function addtoCart(productId) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function getLoggedUserCart() {
    console.log(`GetLogged User Works ✅`);
    let headers = { token: localStorage.getItem("userToken") };
    console.log({ headers });
    return axios
      .get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers,
      })
      .then((response) => {
        console.log({ loggesresponse: response });
        return response;
      })
      .catch((error) => error);
  }

  async function removeItem(productId) {
    return axios
      .delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function updateProductCount(productId, count) {
     return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/corders/checkout-session/${cartId}?url=http://localhost:4200`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function clearCart() {
    return axios
      .delete(`https://route-ecommerce.onrender.com/api/v1/cart`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <CartContext.Provider
      value={{
        addtoCart,
        getLoggedUserCart,
        removeItem,
        updateProductCount,
        cartId,
        getCart,
        numOfcartItems,
        setnumOfcartItems,
        onlinePayment,
        clearCart,
        cartDeatails,
        setcartDeatails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
