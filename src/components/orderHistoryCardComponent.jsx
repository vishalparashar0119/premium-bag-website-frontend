import React from 'react'
import { Link } from 'react-router-dom'

const OrderHistoryCardComponent = (props) => {
      const {imageUrl , productId ,productName , price , orderId} = props
      return (
            <div
                  className="flex flex-col bg-white  rounded-xl p-1 lg:p-4 shadow-sm"
            >
                  {/* TOP SECTION */}
                  <div className="flex gap-1 lg:gap-4">
                        {/* PRODUCT IMAGE */}
                        <img
                              src={imageUrl}
                              alt="product"
                              className="h-20 w-20 lg:w-24 lg:h-24 rounded-lg object-cover"
                        />

                        {/* DETAILS */}
                        <div className="flex-1 flex flex-col justify-between">
                              <div>
                                    <p className="font-semibold text-sm lg:text-lg">
                                          Order ID: {orderId}
                                    </p>
                                    <p className="font-semibold text-xs lg:text-lg">
                                          Product Name: {productName}
                                    </p>
                                    <p className="text-gray-500 text-xs lg:text-sm mt-1">
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
                              <p className="font-bold text-green-700 text-sm lg:text-lg whitespace-nowrap">
                                    ₹ {price}
                              </p>
                        </div>
                  </div>

                  {/* BUTTON */}
                  <div className="flex justify-end mt-4">
                        <Link to={`/order/${productId}`} className="bg-yellow-400 hover:bg-yellow-500 px-3 py-2 lg:px-5 lg:py-2 text-sm  rounded-lg font-medium text-black">
                              Order Again
                        </Link>
                  </div>
            </div>
      )
}

export default OrderHistoryCardComponent
