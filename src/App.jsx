import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Shop from './pages/shop.jsx'
import Admin from './pages/admin.jsx';
import CreateProduct from './pages/createProduct.jsx';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/createProduct' element={<CreateProduct/>}/>
      
    </Routes>
  )
}

export default App
