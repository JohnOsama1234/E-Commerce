import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    removeItem,
    updateProductCount,
    setnumOfcartItems,
    clearCart,
    cartDeatails,
    setcartDeatails,
  } = useContext(CartContext);
  const [isLoading, setisLoading] = useState(false);

  async function getCart() {
    setisLoading(true);
    let { data } = await getLoggedUserCart();
    console.log({ loggedUser: data });
    if (data?.status === "success") {
      console.log(data.data);
      setcartDeatails(data.data);
      setisLoading(false);
    }
  }

  async function deleteItem(productId) {
    setisLoading(true);
    let { data } = await removeItem(productId);
    console.log(data);
    setcartDeatails(data.data);
    setnumOfcartItems(data.numOfCartItems);
    toast.success("Product removed successfully");
    setisLoading(false);
  }

  async function clearing() {
    setisLoading(true);
    let { data } = await clearCart();
    console.log(data);
    setcartDeatails(data.data);
    setnumOfcartItems(data.numOfCartItems);
    toast.success("Cart Cleared Successfully");
    setisLoading(false);
  }

  async function updateProductQuantity(productId, count) {
    let { data } = await updateProductCount(productId, count);
    console.log(data);
    setcartDeatails(data.data);
    toast.success("Product count updated successfully");
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div>
        {isLoading ? (
          <i className="fa fa-spinner fa-spin position-absolute top-50 start-50 fa-3x"></i>
        ) : (
          <div className="container bg-main-light p-4 my-4 form-control">
            <h3>Shop Cart : </h3>
            <h6 className="text-main mt-3">
              Total Cart Price : {cartDeatails?.totalCartPrice} EGP
            </h6>
            {cartDeatails?.products.map((product, index) => (
              <div
                key={index}
                className="row align-items-center border-bottom py-2 my-2"
              >
                <div className="col-md-1 mt-4">
                  <img
                    className="w-100"
                    src={product.product.imageCover}
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between ">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main"> Price : {product.price}</h6>
                    {isLoading ? (
                      <button
                        type="button"
                        className="btn bg-main form-control mt-2 text-white"
                      >
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => deleteItem(product.product._id)}
                        className="btn m-0 p-0"
                      >
                        <i className="fa-regular fa-trash-can text-main"></i>{" "}
                        Remove
                      </button>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="btn border-main btn-sm "
                    >
                      +
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="btn border-main btn-sm "
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {cartDeatails ? (
              <>
                <button className="form-control mt-2 border-main text-white bg-main ">
                  <Link to={"/checkout"}>
                    <span className="text-white pt-2">Checkout</span>
                  </Link>
                </button>
                <button className="form-control mt-2 border-main text-white bg-main">
                  <span className="text-white">Cash</span>
                </button>
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <button
                    onClick={clearing}
                    className="form-control mt-2 border-main text-white bg-main"
                  >
                    <span className="text-white"> Clear Cart</span>{" "}
                  </button>
                )}
              </>
            ) : (
              <h2>Your cart is empty now</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}
