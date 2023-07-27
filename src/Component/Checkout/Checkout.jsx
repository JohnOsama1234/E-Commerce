import React, { useContext } from 'react'
import styles from './Checkout.module.css'
import { Formik, useFormik } from 'formik'
import { Helmet } from "react-helmet";
import { CartContext } from '../CartContext/CartContext';


export default function Checkout() {
  let {onlinePayment , cartId} = useContext(CartContext)
  async function handleSubmit(values ){
    let {data} = await onlinePayment(cartId , values)
    console.log(data);
    if(data?.status==='success'){
      window.location.href(data.session.url)
    }
  }
  let formik = useFormik({
    initialValues:{
      details : '',
      phone:'',
      city : ''
    },
    onSubmit: handleSubmit
  })
  return (
    <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
    <div className="w-50 py-5 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details : </label>
        <input type="text" className='form-control mb-3' name='details' id='details'  value={formik.values.details} onChange={formik.handleChange}/>

        <label htmlFor="phone">Phone : </label>
        <input type="tel" className='form-control mb-3' name='phone' id='phone'  value={formik.values.phone} onChange={formik.handleChange}/>

        <label htmlFor="city">City : </label>
        <input type="text" className='form-control mb-3' name='city' id='city'  value={formik.values.city} onChange={formik.handleChange}/>

        <button  className='btn border-main bg-main w-100 ' type='submit'><span className='text-white'>Pay</span></button>
      </form>
    </div>
    </>
  )
}
