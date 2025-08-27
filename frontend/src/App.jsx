import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Aboutus from './pages/Aboutus'
import Contact from './pages/Conactus'
import Shop from './pages/Shop'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Chexkout from './pages/Chexkout'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/checkout' element={<Chexkout />} />

       </Routes>

    </>
  )
}

export default App