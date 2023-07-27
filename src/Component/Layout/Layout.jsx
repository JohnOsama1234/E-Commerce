import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";
import { CartContext } from "../CartContext/CartContext.jsx";

export default function Layout({ userData, setuserData }) {
  let navigate = useNavigate();
  let { cartDeatails, setcartDeatails, setnumOfcartItems } =
    useContext(CartContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setuserData(null);
    setcartDeatails(null);
    setnumOfcartItems(null);
    navigate("/login");
  }

  useEffect(() => {
    console.log({ cartDeatails });
  }, [cartDeatails]);
  return (
    <>
      <div className="pt-5">
        <Navbar logOut={logOut} userData={userData}></Navbar>
        <div className="d-flex justify-content-center">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
