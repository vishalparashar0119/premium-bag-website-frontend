import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast , ToastContainer } from 'react-toastify'

const Navbar = () => {

      const navigate = useNavigate();
      const handleLogout = async () => {

            try {
                  const  confirmLogout = await axios.post('http://localhost:3000/users/logout' , {} , {withCredentials:true});
                  if(confirmLogout.data.success) navigate('/');

            } catch ( error) {
                    toast.error(error.confirmLogout.data.message)
            }
      }
      return (
            <div className="">
                  <nav className="w-full fixed top-0 left-0 px-5 py-3 flex justify-between items-center ">
                        <h3 className="text-xl">Scatch</h3>

                        <div className="flex gap-5 items-center">
                              <Link to='/shop'>Shop</Link>
                              <Link to='/cart'>Cart</Link>
                              <Link to='/myAccount'>My Account</Link>
                              <button className='bg-red-600 text-white cursor-pointer py-1 px-3 rounded-sm' onClick={handleLogout}>Logout</button>
                        </div>
                  </nav>
                  <ToastContainer position='top-center' transition={Bounce}/>
            </div>
      )
}

export default Navbar
