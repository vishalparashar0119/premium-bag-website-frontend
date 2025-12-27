import React from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const ShopCardComponent = (props) => {
  const { imageUrl, productName, price, addToCart, id } = props;

  return (
    <div className=" rounded-md overflow-hidden w-full">
      <Link to={`/productInfo/${id}`} className="block">
        
        {/* Image Section */}
        <div className="w-full h-36 sm:h-40 md:h-48 lg:h-52 flex items-center justify-center bg-[#F4DDD2]">
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={productName}
          />
        </div>

        {/* Content Section */}
        <div className="flex justify-between items-center bg-[#DEBEAE] px-3 sm:px-4 py-3 sm:py-4 text-[#774f3d]">
          
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-medium line-clamp-2">
              {productName}
            </h3>
            <h4 className="text-sm sm:text-base font-semibold">
              ₹ {price}
            </h4>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(id);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white shrink-0"
          >
            <CiCirclePlus className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
          </button>

        </div>
      </Link>
    </div>
  );
};

export default ShopCardComponent;
