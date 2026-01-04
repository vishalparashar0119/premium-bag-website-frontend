import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NotViewed from '../components/notViewedComponent';
import Viewed from '../components/viewedComponent';
import Shipped from '../components/shippedComponent';
import Return from '../components/returnedComponent';
import Packed from '../components/packedComponent';
import Delivered from '../components/deliveredComponent';
import axios from 'axios';
import { BACKEND_URL } from '../config/env';
import Loader from '../components/loader';
import AdminsNavigation from '../components/adminsNavigation';


const TodaysOrders = () => {

      const navigate = useNavigate();
      const [orderData, setOrderData] = useState([]);
      const [loading, setLoading] = useState(true);

      const fetchTodayOrder = async () => {
            try {

                  const response = await axios.get(`${BACKEND_URL}/owners/todaysOrder`, {
                        withCredentials: true
                  });

                  if (!response.data.success) navigate('/');

                  setOrderData(response.data.todaysOrder);
                  console.log(response.data.todaysOrder);
                  setLoading(false);

            } catch (error) {
                  console.log(error.message);
                  navigate('/');
            }
      }

      useEffect(() => {
            fetchTodayOrder()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      if (loading) return <Loader />
      return (
            <div>
                  <div className="w-full h-screen flex items-start px-20 py-20">

                        {/* Sidebar */}
                        <AdminsNavigation/>

                        {/* Main Content */}
                        <div className="w-[75%] flex flex-col gap-5 min-h-screen  ">

                              <h2 className="text-xl font-semibold">Orders</h2>

                              <div className="flex flex-col gap-5">

                                    {orderData.map(order => (
                                          <div key={order._id} className='w-full rounded-md shadow-xl'>

                                                <div

                                                      className="relative p-5 flex gap-5 items-center "
                                                >
                                                      {/* Product Image */}
                                                      <div className="w-40 h-40 bg-yellow-500 shrink-0 rounded-sm overflow-hidden ">
                                                            <img
                                                                  src={order.productSnapShot[0].image.imageUrl}
                                                                  alt={order.productName}
                                                                  className="w-full h-full object-cover"
                                                            />
                                                      </div>

                                                      {/* Order Info */}
                                                      <div className="flex flex-col gap-2 flex-1 text-black ">
                                                            <h3 className="text-lg font-semibold">{order.productSnapShot[0].name}</h3>
                                                            <p><strong>User:</strong> {order.userId.fullName}</p>
                                                            <p><strong>Phone:</strong> {order.userId.phoneNo}</p>
                                                            <p><strong>Address:</strong> {order.shippingAddress}</p>
                                                            <p><strong>Amount:</strong> {order.amount}</p>
                                                            <p><strong>Mode of paymentn:</strong> {order.modeOfPayment}</p>
                                                            {order.paymentId && <p><strong>Payment Id:</strong> {order.paymentId}</p>}
                                                      </div>

                                                      {/* Action Button */}
                                                      
                                                            <button className="absolute bottom-7  right-10 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                                                                  {order.status.toUpperCase()}
                                                            </button>
                                                      
                                                </div>


                                                <div className='w-full  flex gap-2 p-5 justify-center items-center '>
                                                      {order.status === 'notViewed' && (<NotViewed />)}
                                                      {order.status === 'viewed' && (<Viewed />)}
                                                      {order.status === 'packed' && (<Packed />)}
                                                      {order.status === 'shipped' && (<Shipped />)}
                                                      {order.status === 'delivered' && (<Delivered />)}
                                                      {order.status === 'returned' && (<Return />)}
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
