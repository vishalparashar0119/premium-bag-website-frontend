
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci';

const ShopCardComponent = (props) => {

      const {imageUrl , productName , price , addToCart , id } = props
      return (
            <div className="w-60">
                  <div className={`w-full h-52 flex items-center justify-center bg-[#F4DDD2]`}>
                        <img className="h-full w-full object-cover" src={imageUrl}
                              alt='' />
                  </div>
                  <div
                        className={`flex justify-between bg-[#DEBEAE] items-center px-4 py-4 text-[#774f3d]`}>
                        <div>
                              <h3>
                                    {productName}
                              </h3>
                              <h4>₹ {price}</h4>

                        </div>
                        <button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(id)
                        }} className="w-7 h-7 flex items-center justify-center rounded-full bg-white">
                              <CiCirclePlus className='w-7 h-7 cursor-pointer' />
                        </button>
                  </div>
            </div>
      )
}

export default ShopCardComponent
