import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { Helmet } from "react-helmet";

export default function Login({ saveuserData }) {
  let navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [msgError, setmsgError] = useState("");

  async function handleLogin(values) {
    setIsloading(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((errr) => {
        setIsloading(false);
        console.log(errr.response);
        if (errr.response.data.message === "fail") {
          setmsgError(
            errr.response.data.errors.param +
              " : " +
              errr.response.data.errors.msg
          );
        } else {
          setmsgError(errr.response.data.message + " , Check your data again");
        }
      });
    console.log(data);
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      console.log("token changed ✅");
      console.log(localStorage.getItem("userToken"));
      saveuserData();
      setIsloading(false);
      console.log("login");
      navigate("/home");
    }
    console.log(values);
  }

  // Yup Validation
  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Required"),

    password: Yup.string().required("Password is Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    validationSchema, //Because the fun is the same name validationSchema=validationSchema
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-75 mxauto py-4 ">
        <h3>Login Now : </h3>
        {msgError.length > 0 ? (
          <div className="alert alert-danger"> {msgError}</div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email"> Email : </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password"> password : </label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

          {isloading ? (
            <button
              type="button"
              className="btn bg-main form-control mt-2 text-white"
            >
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main form-control mt-2 text-white"
            >
              Login
            </button>
          )}
        </form>
        <p>
          If you don’t have an accout ,{" "}
          <span>
            {" "}
            <Link to="/register" className="text-primary special-link">
              {" "}
              Register{" "}
            </Link>{" "}
          </span>{" "}
        </p>
      </div>
    </>
  );
}
