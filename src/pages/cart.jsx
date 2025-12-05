import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { MdDelete } from "react-icons/md";
import Loader from '../components/loader'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Cart = () => {

      const [isLoading, setIsLoading] = useState(true);
      const [cartData, setCartData] = useState();
      const navigate = useNavigate();

      const fetchCartData = async () => {
            try {
                  const response = await axios.get('http://localhost:3000/users/cart', { withCredentials: true });

                  if (!response.data.success) navigate('/');

                  setCartData(response.data.cartData.cart);
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

      if (isLoading) {
            return <Loader />
      }

      return (
            <>
                  <Navbar />
                  <div className="w-full min-h-screen bg-gray-100 px-10 py-10 flex gap-8">

                        {/* LEFT SIDE CART ITEMS */}
                        <div className="w-[70%] bg-white rounded-md shadow p-5 mt-10">

                              <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

                              {cartData.map((item, index) => (
                                    <div key={index}>

                                          {/* ITEM ROW */}
                                          <div className="flex py-6 gap-6">

                                                {/* IMAGE */}
                                                <div className="w-40 h-40 bg-yellow-500 rounded overflow-hidden">
                                                      <img
                                                            src={item.image.imageUrl}
                                                            className="w-full h-full object-cover"
                                                      />
                                                </div>

                                                {/* DETAILS */}
                                                <div className="flex-1">
                                                      <h3 className="text-lg font-medium">{item.productName}</h3>
                                                      <p className="text-sm text-gray-500">Colour: Black</p>
                                                      <p className="text-green-600 text-sm mt-1">In stock</p>

                                                      {/* QUANTITY + DELETE */}
                                                      <div className="flex items-center gap-5 mt-5">

                                                            {/* QTY BUTTONS LIKE AMAZON */}
                                                            <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                                                  <button className="text-lg">-</button>
                                                                  <span>1</span>
                                                                  <button className="text-lg">+</button>
                                                            </div>

                                                            {/* DELETE */}
                                                            <button className=" bg-red-500  hover:bg-red-600 text-white w-9 h-9 rounded-full flex justify-center items-center cursor-pointer">
                                                                  <MdDelete className="w-6 h-6" />
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* PRICE */}
                                                <div className="w-32 flex justify-end">
                                                      <h3 className="text-lg font-semibold">₹ {item.price}</h3>
                                                </div>
                                          </div>

                                          {/* DIVIDER */}
                                          {index !== cartData.length - 1 && (
                                                <div className="w-full h-px bg-gray-300"></div>
                                          )}
                                    </div>
                              ))}

                              {/* TOTAL VALUE AT THE BOTTOM */}
                              <div className="flex justify-end mt-6 text-xl font-semibold">
                                    Total: ₹
                                    {cartData.reduce(
                                          (acc, item) => acc + item.price,
                                          0
                                    )}
                              </div>
                        </div>

                        {/* RIGHT SIDE TOTAL BOX LIKE AMAZON */}
                        <div className="w-[30%] h-fit bg-white rounded-md shadow p-5 sticky top-20">
                              <h3 className="text-lg font-medium mb-4">Order Summary</h3>

                              <div className="flex justify-between text-lg">
                                    <span>Items:</span>
                                    <span>
                                          ₹{" "}
                                          {cartData.reduce(
                                                (acc, item) => acc + item.price,
                                                0
                                          )}
                                    </span>
                              </div>

                              <button className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded">
                                    Proceed to Buy
                              </button>
                        </div>
                  </div>
            </>
      );
};

export default Cart;
