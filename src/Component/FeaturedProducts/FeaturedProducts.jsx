import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { toast } from "react-hot-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  let { addtoCart, setnumOfcartItems } = useContext(CartContext);

  async function addProduct(productId) {
    let { data } = await addtoCart(productId);
    // console.log(data.message);
    if (data?.status === "success") {
      setnumOfcartItems(data.numOfCartItems);
      toast.success(data.message, { duration: 3000 });
    } else {
      toast.error("Error", { duration: 3000 });
    }
  }

  async function getProducts() {
    setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setProducts(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <i className="fa fa-spinner fa-spin position-absolute top-50 start-50 fa-3x"></i>
      ) : (
        <div className="container ">
          <div className="row cursor-pointer">
            {products.map((product) => (
              <div key={product._id} className="col-md-2">
                <div className="product px-2 py-4">
                  <Link to={`/productdetails/${product._id}`}>
                    <img src={product.imageCover} className="w-100" alt="" />
                    <span className="text-main fw-bolder font-sm ">
                      {product.category?.name}
                    </span>
                    <h3 className="h6 fw-bolder">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price} EGP</span>
                      <span>
                        <i className="fa fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(product._id)}
                    className="btn bg-main text-white w-100 mt-2 "
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
