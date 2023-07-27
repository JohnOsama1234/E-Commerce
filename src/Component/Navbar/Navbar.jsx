import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import freshcart from '../../assests/freshcart-logo.svg'
import { CartContext } from '../CartContext/CartContext'

export default function Navbar({ userData, logOut }) {
  let { numOfcartItems } = useContext(CartContext)
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light  ">
        <div className="container">
          <Link className="navbar-brand" to=''>
            <img src={freshcart} alt="" />
          </Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userData !== null ?
                <>
                  <li className="nav-item ">
                    <Link className="nav-link" to=''>Home</Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to='about'>About</Link>
                  </li>
                  <li className="nav-item position-relative">
                    <Link className="nav-link" to='cart'>Cart</Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to='products'>Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='category'>Category</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='brands'>Brands</Link>
                  </li> */}
                </>
                : null
              }
            </ul>

            <ul className="navbar-nav ms-auto text-center mb-2 mb-lg-0">
              <li className='nav-item d-flex align-items-center'>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-tiktok'></i>
                <i className='fab mx-2 fa-linkedin'></i>
                <i className='fab mx-2 fa-youtube'></i>
              </li>
              {userData === null ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to='login'>Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='register'>Register</Link>
                  </li>
                </>
                :
                <>

                  <li className="nav-item position-relative">
                    <Link className="nav-link px-2" to='cart'>
                      <i className='fas fa-shopping-cart fa-lg'></i>
                      <span className='badge bg-main text-white position-absolute top-0 end-1'> {numOfcartItems}</span>
                    </Link>
                  </li>
                  <li className="nav-item ms-3">
                    <span onClick={logOut} className="cursor-pointer nav-link">Logout</span>
                  </li>
                </>
              }


            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
