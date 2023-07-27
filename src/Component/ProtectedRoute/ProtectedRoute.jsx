import React from 'react'
import styles from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
  if (localStorage.getItem('userToken') == null) {

    return <>
      {/* {window.alert("please Log In first , If you don’t have an accout you can make one ")} */}
      <Navigate to={'/login'}></Navigate>
    </>
  }
  else {
    return props.children
  }
}
