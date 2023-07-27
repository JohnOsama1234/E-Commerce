import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../CartContext/CartContext'
import { toast } from 'react-hot-toast'

export default function ProductDetails() {
  let [productDetails, setproductDetails] = useState(null)
  let [isLoading, setisLoading] = useState(false)
  let params = useParams()
  let {addtoCart , setnumOfcartItems} = useContext(CartContext)
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // }
  async function addProduct(productId){
    let {data} = await addtoCart(productId)
    console.log("id" , data.numOfCartItems);
    if (data?.status==='success'){
      setnumOfcartItems(data.numOfCartItems)
      toast.success(data.message , {duration:3000})
    }else {
      toast.error("Error" , {duration:3000})
    }
  }
  async function getprodactDetails(id) {
    setisLoading(true)
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setproductDetails(data.data)
    setisLoading(false)
  }
  useEffect(() => {
    getprodactDetails(params.id)
  }, [])
  return (
    <>
      {isLoading ?
        <i className='fa fa-spinner fa-spin position-absolute top-50 start-50 fa-3x'></i>
        :
        
          <div className="row align-items-center py-3">
            <div className="col-md-4">
              {/* <Slider {...settings}>
                {productDetails?.images.map((img)=> <img src={img} alt="" srcset="" /> )}
              </Slider> */}
              <img className='w-100 ' src={productDetails?.imageCover} alt="" />
            </div>
            <div className="col-md-8">
              <h3>{productDetails?.title}</h3>
              <p className='text-muted p-2'>{productDetails?.description}</p>
              <div className="d-flex justify-content-between" >
                <span className='text-muted'>{productDetails?.price} EGP</span>
                <span>
                  <i className='fa fa-star rating-color'></i>
                  {productDetails?.ratingsAverage}
                </span>
              </div>
              <div  onClick={()=>addProduct(productDetails._id)} className="btn bg-main text-white w-100 mt-2 ">+ Add</div>
            </div>
          </div>
        
      }

    </>
  )
}
