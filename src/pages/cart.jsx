import React, { useEffect, useState } from "react";
import Loader from '../components/loader'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { BACKEND_URL } from "../config/env.js";
import CartCardComponent from "../components/cartCardComponent.jsx";



const Cart = () => {

      const [isLoading, setIsLoading] = useState(true);
      const [cartData, setCartData] = useState();
      const navigate = useNavigate();

      const fetchCartData = async () => {
            try {
                  const response = await axios.get(`${BACKEND_URL}/users/cart`, { withCredentials: true });

                  if (!response.data.success) navigate('/');

                  setCartData(response.data.cartData.cart);
                  console.log(response.data.cartData.cart);
                  setIsLoading(false);
            } catch (error) {
                  console.log(error.response.data.message)
                  navigate('/');
            }
      }

      useEffect(() => {

            fetchCartData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const removeToCart = async (id) => {
            try {
                  const response = await axios.post(`${BACKEND_URL}/users/removeToCart/${id}`, {}, { withCredentials: true });
                  toast.success(response.data.message);
                  setCartData(response.data.cartData);
            } catch (error) {
                  toast.error(error.response.data.message)
            }
      }

      const updateQuantity = async (id, action) => {

            try {

                  const response = await axios.put(`${BACKEND_URL}/users/updateQuantity`, { id, action }, { withCredentials: true });
                  setCartData(response.data.updatedCart.cart)
                  console.log(response.data.message);

            } catch (error) {
                  console.log(error.message)
            }
      }


      if (isLoading) {
            return <Loader />
      }

      return (
            <>

                  <div className="w-full min-h-screen bg-gray-100 px-2 md:px-10 py-10 md:flex gap-8">

                        {/* LEFT SIDE CART ITEMS */}
                        <div className="w-full md:w-[70%] bg-white rounded-md shadow p-2 md:p-5 mt-10 mb-20 md:mb-0">

                              <h2 className="text-xl md:text-2xl font-semibold mb-4">Shopping Cart</h2>

                              {cartData.map((item, index) => (
                                    
                                          <div key={item.products._id}>
                                                <CartCardComponent
                                                      imageUrl={item.products.image.imageUrl}
                                                      productName={item.products.productName}
                                                      quantity={item.quantity}
                                                      id={item.products._id}
                                                      updateQuantity={updateQuantity}
                                                      removeToCart={removeToCart}
                                                      price={item.products.price} />



                                                {/* DIVIDER */}
                                                {index !== cartData.length - 1 && (
                                                      <div className="w-full h-px bg-gray-300"></div>
                                                )}
                                          </div>
                        
                              ))}
                        </div>

                        {/* RIGHT SIDE TOTAL BOX LIKE AMAZON */}
                        <div className="w-full md:w-[30%] h-fit bg-white rounded-lg shadow p-5 fixed bottom-0 \  md:z-0  md:top-20 right-0">
                              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

                              <div className="flex justify-between text-md md:text-lg">
                                    <span>Total:</span>
                                    <span className="font-bold">
                                          ₹{" "}
                                          {cartData.reduce(
                                                (acc, item) => acc + item.products.price,
                                                0
                                          )}
                                    </span>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default Cart;
