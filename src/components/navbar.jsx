import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
      return (
            <div className="">
                  <nav className="w-full fixed top-0 left-0 px-5 py-3 flex justify-between items-center ">
                        <h3 className="text-xl">Scatch</h3>

                        <div className="flex gap-5 items-center">
                              <Link to='/shop'>Shop</Link>
                              <Link to='/cart'>Cart</Link>
                              <Link to='/myAccount'>My Account</Link>
                              <button className='bg-red-600 text-white cursor-pointer py-1 px-3 rounded-sm'>Logout</button>
                        </div>
                  </nav>
            </div>
      )
}

export default Navbar
