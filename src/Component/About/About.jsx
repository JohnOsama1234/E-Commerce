import React from 'react'
import { Helmet } from "react-helmet";
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <section class="about-section bg-main-light text-black mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2>About Our E-Commerce Store</h2>
              <p>Welcome to our online store! We are dedicated to providing the best shopping experience to our customers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
