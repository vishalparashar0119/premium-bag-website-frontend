import React from 'react'
import { Link } from 'react-router-dom'

const OrderHistoryCardComponent = (props) => {
      const {imageUrl , productId ,productName , price , orderId} = props
      return (
            <div
                  className="flex flex-col bg-white  rounded-xl p-4 shadow-sm"
            >
                  {/* TOP SECTION */}
                  <div className="flex gap-4">
                        {/* PRODUCT IMAGE */}
                        <img
                              src={imageUrl}
                              alt="product"
                              className="w-24 h-24 rounded-lg object-cover"
                        />

                        {/* DETAILS */}
                        <div className="flex-1 flex flex-col justify-between">
                              <div>
                                    <p className="font-semibold text-lg">
                                          Order ID: {orderId}
                                    </p>
                                    <p className="font-semibold text-lg">
                                          Product Name: {productName}
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
                                    ₹ {price}
                              </p>
                        </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-end mt-4">
                        <Link to={`/order/${productId}`} className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md font-medium text-black">
                              Order Again
                        </Link>
                  </div>
            </div>
      )
}

export default OrderHistoryCardComponent
