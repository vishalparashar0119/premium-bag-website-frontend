import React, { useEffect, useState } from "react";
import { MdStar, MdStarHalf, MdStarBorder } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { BACKEND_URL } from "../config/env.js";

const ProductInfo = () => {

  const { id } = useParams();
  // Dummy product data (replace with real state when integrating)
  console.log(id);

  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [inCart, setInCart] = useState(true);
  const [loading, setLoadig] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products/product/${id}`, { withCredentials: true });

      if (!response.data.success) navigate('/');

      console.log(response.data)
      setProduct(response.data.product);
      setLoadig(false);

    } catch (error) {
      console.log(error.response.data.message);
      navigate('/')
    }
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = async () => {

    try {
      const response = await axios.post(`${BACKEND_URL}/users/addToCart/${id}`, {}, {
        withCredentials: true
      });
      setInCart(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  const removeToCart = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/removeToCart/${id}`, {}, { withCredentials: true });
      setInCart(true)
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (loading) {
    return <Loader />
  }

  return (
    <>

      <div className="w-full min-h-screen bg-gray-100 px-10 py-20 mt">

        {/* MAIN CONTAINER */}
        <div className="w-full bg-white rounded-md shadow p-6 flex gap-10">

          {/* LEFT SIDE IMAGE */}
          <div className="w-[40%] h-[450px] bg-gray-200 rounded overflow-hidden">
            <img
              src={product.image.imageUrl}
              className="w-full h-full object-cover"
              alt="product"
            />
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="w-[60%] flex flex-col">

            {/* PRODUCT NAME */}
            <h1 className="text-3xl font-semibold">{product.productName}</h1>

            {/* RATING */}
            <div className="flex items-center gap-1 mt-2 text-yellow-500 text-xl">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStarHalf />
              <MdStarBorder />

              <span className="text-gray-600 text-sm ml-2">
                ({product.rating})
              </span>
            </div>

            {/* PRICE */}
            <h2 className="text-3xl font-bold mt-5 text-green-600">
              ₹ {product.price}
            </h2>

            {/* STOCK STATUS */}
            <p className="text-sm mt-2">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </p>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-1">About this item</h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus velit ipsum non libero explicabo nisi mollitia quo, quis voluptatum necessitatibus assumenda! Maiores inventore modi soluta!
              </p>
            </div>

            {/* ADD TO CART + BUY */}
            <div className="mt-10 flex gap-5">
              {
                inCart ?
                  <button onClick={addToCart} className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded font-medium shadow">
                    Add to Cart
                  </button> :
                  <button onClick={removeToCart} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium shadow">
                    Remove to Cart
                  </button>
              }
              
              <Link key={product._id} to={`/order/${id}`}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-medium shadow">
                Buy Now
              </Link>
            </div>

          </div>
        </div>


      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ProductInfo;
