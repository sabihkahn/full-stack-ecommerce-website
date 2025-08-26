import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Aboutus from './pages/Aboutus'
import Contact from './pages/Conactus'
import Shop from './pages/Shop'
import Register from './pages/Register'
import Login from './pages/Login'
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
       </Routes>

    </>
  )
}

export default App