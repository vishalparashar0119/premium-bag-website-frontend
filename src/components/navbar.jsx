import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { BACKEND_URL } from '../config/env.js'
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'


const Navbar = () => {

      const navigate = useNavigate();
      const [toggle, setToggle] = useState(false);
      const handleLogout = async () => {

            try {
                  const confirmLogout = await axios.post(`${BACKEND_URL}/users/logout`, {}, { withCredentials: true });
                  if (confirmLogout.data.success) navigate('/');

            } catch (error) {
                  toast.error(error.confirmLogout.data.message)
            }
      }
      return (
            <>
                  <div className="">
                        <nav className="w-full fixed top-0 left-0 px-5 py-3 flex justify-between items-center ">
                              <h3 className="text-xl">Scatch</h3>

                              <div className="hidden md:flex gap-5 items-center">
                                    <Link to='/shop'>Shop</Link>
                                    <Link to='/cart'>Cart</Link>
                                    <Link to='/myAccount'>My Account</Link>
                                    <button className='bg-red-600 text-white cursor-pointer py-1 px-3 rounded-sm' onClick={handleLogout}>Logout</button>
                              </div>
                              <div className="flex md:hidden justify-center items-center">
                                    <GiHamburgerMenu className='w-6 h-6 cursor-pointer' onClick={() => setToggle(true)} />
                              </div>
                        </nav>
                        <ToastContainer position='top-center' transition={Bounce} />
                  </div>

                  <div className={`w-full h-full bg-black/30  z-20   fixed top-0  transition-all duration-300 ${toggle ? 'right-0' : '-right-full'} md:hidden flex justify-end`} onClick={() => setToggle(false)}>
                        <div className='w-[90%] bg-gray-100 h-full p-2 flex flex-col justify-between'>

                              <div className='  flex flex-col gap-2 text-xl '>
                                    <Link to='/shop' >Shop</Link>
                                    <Link to='/cart' >Cart</Link>
                                    <Link to='/myAccount'>My Account</Link>
                              </div>
                              <button className='bg-red-600 text-white w-full cursor-pointer py-3 px-3 rounded-sm' onClick={handleLogout}>Logout</button>
                        </div>
                  </div>
                  <Outlet />
            </>
      )
}

export default Navbar
