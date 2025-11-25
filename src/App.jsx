import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Shop from './pages/shop.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/shop' element={<Shop/>}/>
    </Routes>
  )
}

export default App
