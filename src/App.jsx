import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Login from './pages/login.jsx';
import Shop from './pages/shop.jsx'
import Admin from './pages/admin.jsx';
import CreateProduct from './pages/createProduct.jsx';
import Cart from './pages/cart.jsx';
import MyAccount from './pages/myAccountPage.jsx';
import Navbar from './components/navbar.jsx';
import ProductInfo from './pages/productInfo.jsx';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>


      <Route  element={<Navbar/>}>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/createProduct' element={<CreateProduct/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/myAccount' element={<MyAccount/>}/>
      <Route path='/productInfo/:id' element={<ProductInfo/>}/>
      </Route>
      
    </Routes>
  )
}

export default App
