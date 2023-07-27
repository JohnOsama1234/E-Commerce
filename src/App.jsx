import React, { useEffect, useState } from "react";
import Cart from "./Component/Cart/Cart";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NotFound from "./Component/NotFound/NotFound";
import ProductDetails from "./Component/ProductDetails/ProductDetails";
import Products from "./Component/Products/Products";
import Register from "./Component/Register/Register";
import Layout from "./Component/Layout/Layout";
import About from "./Component/About/About";
import Category from "./Component/Category/Category";
import Brands from "./Component/Brands/Brands";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Component/CartContext/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Offline, Online } from "react-detect-offline";
import Checkout from "./Component/Checkout/Checkout";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveuserData();
    }
  }, []);
  let [userData, setuserData] = useState(null);
  function saveuserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
  }
  let routers = createHashRouter([
    {
      path: "",
      element: <Layout setuserData={setuserData} userData={userData}></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute>
              <About></About>
            </ProtectedRoute>
          ),
        },
        {
          path: "category",
          element: (
            <ProtectedRoute>
              <Category></Category>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout></Checkout>
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveuserData={saveuserData}></Login> },
        { path: "register", element: <Register></Register> },
        { path: "*", element: <NotFound></NotFound> },
      ],
    },
  ]);
  return (
    <CartContextProvider>
      <Offline>
        <div className="connection">You are offline now!</div>
      </Offline>
      <Toaster />
      <RouterProvider router={routers}></RouterProvider>
    </CartContextProvider>
  );
}
