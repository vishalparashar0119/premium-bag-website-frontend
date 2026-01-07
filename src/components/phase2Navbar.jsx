import React from 'react'
import { IoBagHandleOutline, IoReorderTwoSharp } from 'react-icons/io5'
import logo from '../assets/websiteLogo.jpg'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Navbar = () => {
      return (
            <div className='flex justify-between items-center px-4 py-4 sm:px-4 sm:py-5 '>
                  <div className='flex justify-center items-center'>
                        {/* hamburger */}
                        <IoReorderTwoSharp className='h-8 w-8 sm:h-9 sm:w-9 text-gray-600 cursor-pointer' />

                  </div>

                  <Link to='/' className='w-[150px] sm:w-[170px] h-8 overfow-hidden'>
                        {/* website logo */}
                        <img src={logo} alt="website logo" className='w-full h-full object-cover' />
                  </Link>

                  <div className='flex items-center justify-center gap-2 sm:gap-4'>
                        {/* search bar cart icon */}
                        <CiSearch className='h-6 w-6 sm:h-7 sm:w-7 text-gray-600 cursor-pointer' />
                        <IoBagHandleOutline className='h-6 w-6 sm:h-7 sm:w-7 text-gray-600 cursor-pointer' />

                  </div>

            </div>
      )
}

export default Navbar
