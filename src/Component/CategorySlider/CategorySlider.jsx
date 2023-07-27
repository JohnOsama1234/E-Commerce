import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  async function getcategories() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setCategories(data.data)
  }
  useEffect(() => {
    getcategories()
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  }
  return (
    <>
    <Slider {...settings}>
      {categories.map((category)=> <div key={category._id}> 
        <img className='w-100' height={200} src={category.image} alt="" srcset="" />
        <h2 className='h6 pt-2'>{category.name} </h2>
      </div> )}
    </Slider>
    </>
  )
}
