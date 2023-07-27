import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import { CartContext } from "../CartContext/CartContext.jsx";
export default function Home() {
  let { getCart } = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* <CategorySlider></CategorySlider> */}
      <FeaturedProducts></FeaturedProducts>
    </>
  );
}
