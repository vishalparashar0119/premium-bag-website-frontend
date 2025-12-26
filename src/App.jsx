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
import Order from './pages/orderPage.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import TodaysOrders from './pages/todaysOrder.jsx';
import AdminsNavbar from './components/adminsNavbar.jsx';


const App = () => {
  return (<>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route  element={<Navbar/>}>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/myAccount' element={<MyAccount/>}/>
      <Route path='/productInfo/:id' element={<ProductInfo/>}/>
      <Route path='/order/:id' element={<Order/>}/>
      </Route>

      <Route element={<AdminsNavbar/>}>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/createProduct' element={<CreateProduct/>}/>
      <Route path='/admin/orders' element={<TodaysOrders/>}/>
      </Route>
      
    </Routes>
    
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
  </>
  )
}

export default App
