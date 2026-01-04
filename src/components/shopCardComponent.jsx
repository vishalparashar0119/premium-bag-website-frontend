import axios from 'axios';
import { CiCirclePlus } from 'react-icons/ci';
import { BACKEND_URL } from '../config/env';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

const ShopCardComponent = (props) => {
  const { imageUrl, productName, price, id, quantity, isAdmin = false, fetchProducts = null } = props;



  const addToCart = async (id) => {

    try {
      const response = await axios.post(`${BACKEND_URL}/users/addToCart/${id}`, {}, {
        withCredentials: true
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const deleteProduct = async (id) => {
    let response;
    try {
      const confirm = window.confirm('Are you sure you want to delete to this product');

      if (confirm) {
        response = await axios.delete(`${BACKEND_URL}/owners/deleteProduct/${id}`, {
          withCredentials: true
        });

        await fetchProducts();

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className=" rounded-md overflow-hidden w-full">

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

          {isAdmin && <div>
            <h6 className='font-semibold text-sm'>QTY: <span className='text-black'>{quantity}</span></h6>
            {quantity > 0 ? <h6 className=' text-green-600 text-sm'>In stock</h6> : <h6 className='text-red-600 text-sm'>Out of stock</h6>}
          </div>}
        </div>

        {isAdmin ? <button onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteProduct(id)
        }} className=" bg-red-600  hover:bg-red-700 text-white w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full  shrink-0">
          <MdDelete className="w-7 h-7" />
        </button> : <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(id);
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white shrink-0"
        >
          <CiCirclePlus className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
        </button>}

      </div>
    </div>
  );
};

export default ShopCardComponent;
