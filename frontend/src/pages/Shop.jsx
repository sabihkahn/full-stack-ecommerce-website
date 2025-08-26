import React from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import AllProduct from './AllProduct'
import FilterProducts from './FilterProducts'

const Shop = () => {
  return (
    <>
      <Navbar />
   <FilterProducts />
      <Footer />

    </>
  )
}

export default Shop