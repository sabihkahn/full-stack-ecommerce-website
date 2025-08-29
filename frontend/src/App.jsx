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
import AdminPannel from './admin/adminpages/AdminPannel'
import CheckisLogined from './Auth/CheckisLogined'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutus' element={<Aboutus />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/shop' element={
          <CheckisLogined>
            <Shop />
          </CheckisLogined>
        } />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={
          <CheckisLogined>

            <Profile />
          </CheckisLogined>
        } />
        <Route path='/product/:id' element={
          <CheckisLogined>
            <ProductDetail />
          </CheckisLogined>
        } />
        <Route path='/checkout' element={<CheckisLogined><Chexkout /></CheckisLogined>} />
        <Route path='/admin' element={<CheckisLogined><AdminPannel /></CheckisLogined>} />
      </Routes>

    </>
  )
}

export default App