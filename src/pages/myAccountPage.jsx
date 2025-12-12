import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { BACKEND_URL } from "../config/env.js";
import OrderHistoryCardComponent from "../components/orderHistoryCardComponent.jsx";
import ProfileCardComponent from "../components/profileCardComponent.jsx";


const MyAccount = () => {


      const navigate = useNavigate();
      const [userData, setUserData] = useState();
      const [loading, setLoading] = useState(true);

      async function fetchUserData() {
            try {
                  const response = await axios.get(`${BACKEND_URL}/users/myAccount`, { withCredentials: true });

                  if (!response.data.success) navigate('/')

                  console.log(response.data.user);

                  setUserData(response.data.user)
                  setLoading(false);

            } catch (error) {
                  console.log(error.response.data.message)
                  navigate('/')
            }
      }

      useEffect(() => {
            fetchUserData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      if (loading) {
            return <Loader />
      }

      return (
            <>


                  <div className="w-full min-h-screen bg-gray-100 px-10 py-10 flex gap-10 ">

                        {/* LEFT SIDE */}
                        <div className="w-[65%] flex flex-col gap-8 mt-10">

                              {/* PROFILE CARD */}
                              <ProfileCardComponent
                                    fullName={userData.fullName}
                                    email={userData.email}
                                    phoneNo={userData.phoneNo}
                                    address={userData.address}
                                    isAdmin={userData.isAdmin} />
                              

                              {/* ORDER HISTORY */}
                              <div className="bg-white shadow rounded-md p-6">
                                    <h3 className="text-2xl font-semibold mb-4">Order History</h3>

                                    {userData.orderHistory.length === 0 ? (
                                          <p className="text-gray-500">No orders placed yet.</p>
                                    ) : (
                                          <div className="flex flex-col gap-6">
                                                {userData.orderHistory.map((order) => (

                                                      <OrderHistoryCardComponent
                                                            key={order._id}
                                                            imageUrl={order.productId.image.imageUrl}
                                                            productId={order.productId._id}
                                                            orderId={order._id}
                                                            productName={order.productId.productName}
                                                            price={order.productId.price} />


                                                ))}
                                          </div>
                                    )}
                              </div>
                        </div>

                        {/* RIGHT SIDE SUMMARY */}
                        <div className="w-[35%] h-fit bg-white shadow rounded-md p-6 sticky top-20">
                              <h3 className="text-xl font-semibold mb-4">Account Summary</h3>

                              <div className="flex justify-between mt-3">
                                    <span>Total Items in Cart</span>
                                    <span className="font-medium">{userData.cart.length}</span>
                              </div>

                              <div className="flex justify-between mt-3">
                                    <span>Total Orders</span>
                                    <span className="font-medium">{userData.orderHistory.length}</span>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default MyAccount;
