import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import Navbar from "../components/navbar";


const MyAccount = () => {


      const navigate = useNavigate();
      const [userData, setUserData] = useState();
      const [loading, setLoading] = useState(true);

      async function fetchUserData() {
            try {
                  const response = await axios.get('http://localhost:3000/users/myAccount', { withCredentials: true });

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
                  <Navbar />

                        {/* LEFT SIDE */}
                        <div className="w-[65%] flex flex-col gap-8 mt-10">

                              {/* PROFILE CARD */}
                              <div className="bg-white shadow rounded-md p-6">
                                    <h2 className="text-2xl font-semibold mb-4">My Account</h2>

                                    <div className="flex flex-col gap-4">
                                          <div className="flex justify-between">
                                                <span className="text-gray-500">Full Name</span>
                                                <span className="font-medium">{userData.fullName}</span>
                                          </div>

                                          <div className="flex justify-between">
                                                <span className="text-gray-500">Email</span>
                                                <span className="font-medium">{userData.email}</span>
                                          </div>

                                          <div className="flex justify-between">
                                                <span className="text-gray-500">Phone No</span>
                                                <span className="font-medium">{userData.phoneNo}</span>
                                          </div>

                                          <div className="flex justify-between">
                                                <span className="text-gray-500">Address</span>
                                                <span className="font-medium">{userData.address}</span>
                                          </div>

                                          {userData.isAdmin && (
                                                <div className="flex justify-between">
                                                      <span className="text-gray-500">Admin Status</span>
                                                      <span className="px-2 py-1 bg-yellow-400 rounded text-sm font-medium">
                                                            Admin
                                                      </span>
                                                </div>
                                          )}
                                    </div>

                                    <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium text-black">
                                          Edit Profile
                                    </button>
                              </div>

                              {/* ORDER HISTORY */}
                              <div className="bg-white shadow rounded-md p-6">
                                    <h3 className="text-2xl font-semibold mb-4">Order History</h3>

                                    {userData.orderHistory.length === 0 ? (
                                          <p className="text-gray-500">No orders placed yet.</p>
                                    ) : (
                                          <div className="flex flex-col gap-6">
                                                {userData.orderHistory.map((order, index) => (
                                                      <div
                                                            key={index}
                                                            className="flex flex-col bg-white  rounded-xl p-4 shadow-sm"
                                                      >
                                                            {/* TOP SECTION */}
                                                            <div className="flex gap-4">
                                                                  {/* PRODUCT IMAGE */}
                                                                  <img
                                                                        src={order.image.imageUrl}
                                                                        alt="product"
                                                                        className="w-24 h-24 rounded-lg object-cover"
                                                                  />

                                                                  {/* DETAILS */}
                                                                  <div className="flex-1 flex flex-col justify-between">
                                                                        <div>
                                                                              <p className="font-semibold text-lg">
                                                                                    Order ID: {order._id}
                                                                              </p>
                                                                              <p className="font-semibold text-lg">
                                                                                    Product Name: {order.productName}
                                                                              </p>
                                                                              <p className="text-gray-500 text-sm mt-1">
                                                                                    Date: 19/12/99
                                                                              </p>
                                                                        </div>

                                                                        {/* PRODUCT LIST */}
                                                                        <div className="mt-2">

                                                                              <div className="text-sm text-gray-700">
                                                                                    {/* {item.name} — Qty: {item.qty} — ₹{item.price} */}
                                                                              </div>

                                                                        </div>
                                                                  </div>

                                                                  {/* TOTAL */}
                                                                  <div>
                                                                        <p className="font-bold text-green-700 text-lg whitespace-nowrap">
                                                                              ₹ {order.price}
                                                                        </p>
                                                                  </div>
                                                            </div>

                                                            {/* BUTTON */}
                                                            <div className="flex justify-end mt-4">
                                                                  <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md font-medium text-black">
                                                                        Order Again
                                                                  </button>
                                                            </div>
                                                      </div>
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
