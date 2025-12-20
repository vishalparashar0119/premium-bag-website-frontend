import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong, FaRegEyeSlash } from "react-icons/fa6";
import ProgressBar from '../components/progressBarComponent';
import ProgressCircle from '../components/progressCircleComponent';
import { FaRegEye } from "react-icons/fa";


import { MdOutlineBrokenImage, MdOutlineLocalShipping } from "react-icons/md";
import { LuPackageCheck, LuPackageOpen } from 'react-icons/lu';
import NotViewed from '../components/notViewedComponent';
import Viewed from '../components/viewedComponent';
import Shipped from '../components/shippedComponent';
import Return from '../components/returnedComponent';
import Packed from '../components/packedComponent';
import Delivered from '../components/deliveredComponent';

const dummyOrders = [
      {
            _id: '1',
            userName: 'Rahul Sharma',
            phone: '9876543210',
            address: 'New Delhi, India',
            productName: 'Leather Backpack',
            productImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
            status : 'not viewed'
      },
      {
            _id: '2',
            userName: 'Ankit Verma',
            phone: '9123456789',
            address: 'Mumbai, Maharashtra',
            productName: 'Sling Chest Bag',
            productImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
            status : 'viewed'
      },
      {
            _id: '3',
            userName: 'Pooja Singh',
            phone: '9001122334',
            address: 'Jaipur, Rajasthan',
            productName: 'Weekend Travel Bag',
            productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231691',
            status : 'packed'
      }
      ,
      {
            _id: '3',
            userName: 'Pooja Singh',
            phone: '9001122334',
            address: 'Jaipur, Rajasthan',
            productName: 'Weekend Travel Bag',
            productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231691',
            status : 'shipped'
      }
      ,
      {
            _id: '3',
            userName: 'Pooja Singh',
            phone: '9001122334',
            address: 'Jaipur, Rajasthan',
            productName: 'Weekend Travel Bag',
            productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231691',
            status : 'delivered'
      }
      ,
      {
            _id: '3',
            userName: 'Pooja Singh',
            phone: '9001122334',
            address: 'Jaipur, Rajasthan',
            productName: 'Weekend Travel Bag',
            productImage: 'https://images.unsplash.com/photo-1585386959984-a41552231691',
            status : 'returned'
      }
]

const TodaysOrders = () => {

      const Tooltip = ({ text, children }) => {
            return (
                  <div className="relative inline-block group">
                        {children}

                        {/* Tooltip box */}
                        <div
                              className=" absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none "
                        >
                              <div className="relative bg-white text-yellow-600 text-xs font-medium px-3 py-2 rounded-md shadow-xl border whitespace-nowrap">
                                    {text}

                                    {/* Tooltip arrow */}
                                    <div
                                          className="
              absolute left-1/2 -translate-x-1/2 top-full
              w-0 h-0
              border-l-6 border-r-6 border-t-6
              border-l-transparent border-r-transparent border-t-black
            "
                                    />
                              </div>
                        </div>
                  </div>
            );
      }


      return (
            <div>
                  <div className="w-full h-screen flex items-start px-20 py-20">

                        {/* Sidebar */}
                        <div className="w-[25%] flex h-screen flex-col items-start">
                              <div className="flex flex-col">
                                    <Link className="block w-fit mb-2" to="/admin">All Products</Link>
                                    <Link className="block w-fit mb-2" to="/admin/orders">Orders</Link>
                              </div>
                        </div>

                        {/* Main Content */}
                        <div className="w-[75%] flex flex-col gap-5 h-screen border overflow-y-auto">

                              <h2 className="text-xl font-semibold">Orders</h2>

                              <div className="flex flex-col gap-5">

                                    {dummyOrders.map(order => (
                                          <div key={order._id} className='w-full rounded-md shadow-xl'>

                                                <div

                                                      className=" p-5 flex gap-5 items-center"
                                                >
                                                      {/* Product Image */}
                                                      <div className="w-40 h-40 bg-yellow-500 shrink-0 rounded-sm overflow-hidden">
                                                            <img
                                                                  src={order.productImage}
                                                                  alt={order.productName}
                                                                  className="w-full h-full object-cover"
                                                            />
                                                      </div>

                                                      {/* Order Info */}
                                                      <div className="flex flex-col gap-2 flex-1 text-black">
                                                            <h3 className="text-lg font-semibold">{order.productName}</h3>
                                                            <p><strong>User:</strong> {order.userName}</p>
                                                            <p><strong>Phone:</strong> {order.phone}</p>
                                                            <p><strong>Address:</strong> {order.address}</p>
                                                      </div>

                                                      {/* Action Button */}
                                                      <div className='h-full flex flex-col justify-end'>
                                                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                                                  Mark as Delivered
                                                            </button>
                                                      </div>
                                                </div>


                                                <div className='w-full flex gap-2 p-5 justify-center items-center '>
                                                      {order.status == 'not viewed' && (<NotViewed/>)}
                                                      {order.status == 'viewed' && (<Viewed/>)}
                                                      {order.status == 'packed' && (<Packed/>)}
                                                      {order.status == 'shipped' && (<Shipped/>)}
                                                      {order.status == 'delivered' && (<Delivered/>)}
                                                      {order.status == 'returned' && (<Return/>)}
                                                </div>
                                          </div>
                                    ))}

                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default TodaysOrders
