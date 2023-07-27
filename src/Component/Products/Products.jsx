import React from 'react'
import styles from './Products.module.css'
import { Helmet } from "react-helmet";
export default function Products() {
  return (
    <>
    <Helmet>
      <title>Products</title>
    </Helmet>
    <h2>Counter : 0 </h2>
    <button className='ms-2 btn btn-danger'>+Counter</button>
    </>
  )
}
