import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios, { Axios } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { Helmet } from 'react-helmet'

export default function Register() {

  let navigate = useNavigate()
  const [isloading, setIsloading] = useState(false)
  const [msgError, setmsgError] = useState('')

  async function handleRegister(values) {
    setIsloading(true)
    // ahmed bahnsy way
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values).catch((errr) => {
      setIsloading(false)
      console.log(errr.response);
      if (errr.response.data.message === 'fail'){
        setmsgError( errr.response.data.errors.param  + " : " + errr.response.data.errors.msg )
      } else {
        setmsgError(errr.response.data.message + " , Check your data again")
      }
    })
    console.log(data);
    if (data.message === 'success') {
      
      setIsloading(false)
      navigate('/login')
      console.log('login');
    }
    console.log(values);

  // hajar way
  //   try {
  //     setIsloading(true)
  //     let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values)
  //     console.log("after calling api");
  //     setIsloading(false)
  //     if (data.message === 'success') {
  //       setIsloading(false)
  //       navigate('/login')
  //       console.log('login');
  //       setmsgError('')
  //     }

  //   } catch (error) {
  //     setIsloading(false)
  //     console.log(error.response.data.message);
  //     setmsgError(error.response.data.message)
  //   }
  }




  // Yup Validation
  let validationSchema = Yup.object({
    // name : Yup.string().required('Name is Required').min(3,'The min length of name is 3').max(10,'The max length of name is 10'),
    name: Yup.string().required('Name is Required'),

    // email : Yup.string().required('Email is Required').email('Email in in valid'),
    email: Yup.string().required('Email is Required'),

    // password: Yup.string().required('Password is Required').matches(/^[A-Z] [a-z0-9]{5,10}$/, 'Password is invalid'),
    password: Yup.string().required('Password is Required'),

    rePassword: Yup.string().required('Repasswoed is Required').oneOf([Yup.ref('password')], 'Repassword is not match with Password'),

    // phone: Yup.string().required('Phone is Required').matches(/^01[0125] [0-9] {8}$/, 'Phone is in invalid')
    phone: Yup.string().required('Phone is Required')

  })

  // validation By me
  // function validate(values){

  //   let errors = {};

  //   // Name Validation
  //   if (!values.name){
  //     errors.name ='Name is Required'
  //   }
  //   else if (values.name.length < 3 ){
  //     errors.name = 'The min length of name is 3'
  //   }
  //   else if (values.name.length > 10 ){
  //     errors.name = 'The max length of name is 10'
  //   }

  //   // Email Validation
  //   if (!values.email){
  //     errors.email ='Email is Required'
  //   }
  //   else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email = 'Email is invalid'
  //   }

  //   // Password Validation
  //   if (!values.password){
  //     errors.password ='Password is Required'
  //   }
  //   else if (/^[A-Z] [a-z0-9]{5,10}$/.test(values.password)){
  //     errors.password = 'Passwoed is invalid'
  //   }

  //   // Repassword Validation
  //   if (!values.rePassword){
  //     errors.rePassword ='Repassword is Required'
  //   }
  //   else if (values.rePassword !== values.password){
  //     errors.rePassword = 'Password is not match with Password'
  //   }

  //   // Phone Validation
  //   if (!values.phone){
  //     errors.phone ='phone is Required'
  //   }
  //   else if (!/^01[0125] [0-9] {8}$/.test(values.phone)){
  //     errors.phone = 'Phone is not valid'
  //   }

  //   return errors
  // }
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    // validate,
    validationSchema, //Because the fun is the same name validationSchema=validationSchema
    onSubmit: handleRegister
  });

  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
      <div className="w-75 mxauto py-4 ">
        <h3>Register Now : </h3>
        {msgError.length > 0 ? <div className="alert alert-danger"> {msgError}</div> : null}
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="name"> Name : </label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}

          <label htmlFor="email"> Email : </label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


          <label htmlFor="password"> password : </label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

          <label htmlFor="rePassword"> Repassword : </label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' id="repassword" name="rePassword" type="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

          <label htmlFor="phone"> phone : </label>
          <input onBlur={formik.handleBlur} className='form-control mb-2' id="phone" name="phone" type="tel" onChange={formik.handleChange} value={formik.values.phone} />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}


          {isloading ? <button type='button' className='btn bg-main form-control mt-2 text-white'><i className='fas fa-spinner fa-spin' ></i></button>
            :
            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main form-control mt-2 text-white'>Register</button>
          }

        </form>
        <p>If you have an accout , <span> <Link to='/login' className='text-primary special-link'>  Login </Link> </span> </p> 

      </div>
    </>
  )
}
