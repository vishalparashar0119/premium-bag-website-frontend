import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CartCardComponent = (props) => {
      const { imageUrl, productName, quantity, id, updateQuantity, removeToCart, price } = props
      return (
            <div>

                  {/* ITEM ROW */}
                  <div className="flex py-6 gap-6">

                        {/* IMAGE */}
                        <Link to={`/order/${id}`} className="w-20 h-20 sm:w-40 sm:h-40 bg-yellow-500 rounded overflow-hidden">
                              <img
                                    src={imageUrl}
                                    className="w-full h-full object-cover"
                              />
                        </Link>

                        {/* DETAILS */}
                        <div className="flex-1">
                              <h3 className="text-sm sm:text-lg font-medium">{productName}</h3>
                              <p className="text-xs sm:text-sm text-gray-500">Colour: Black</p>
                              <p className="text-green-600 text-xs sm:text-sm mt-1">In stock</p>

                              {/* QUANTITY + DELETE */}
                              <div className="flex items-center gap-5 mt-2 sm:mt-5">

                                    {/* QTY BUTTONS LIKE AMAZON */}
                                    <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                          {
                                                quantity > 1 ? <button onClick={() => updateQuantity(id, 'decrease')} className="text-sm cursor-pointer"><FaMinus /></button> : <button> </button>
                                          }

                                          <span>{quantity}</span>
                                          <button onClick={() => updateQuantity(id, 'increase')} className="text-sm cursor-pointer"><FaPlus /></button>
                                    </div>

                                    {/* DELETE */}
                                    <button onClick={() => {
                                          removeToCart(id);
                                    }} className=" bg-red-500  hover:bg-red-600 text-white w-7 h-7 sm:w-9 sm:h-9 rounded-full flex justify-center items-center cursor-pointer">
                                          <MdDelete className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                              </div>
                        </div>

                        {/* PRICE */}
                        <div className="w-32 flex justify-end">
                              <h3 className="text-sm sm:text-lg font-semibold">₹ {price}</h3>
                        </div>
                  </div>
            </div>
      )
}

export default CartCardComponent
