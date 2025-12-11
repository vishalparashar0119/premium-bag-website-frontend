import axios from "axios";
import { BACKEND_URL, RAZORPAY_KEY } from "../config/env.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../components/loader.jsx';
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const Order = () => {

  const navigate = useNavigate()
  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const { id } = useParams()

  const orderSchema = z.object({
    choice: z.string().min(1, 'select at least one method')
  });

  const { register, handleSubmit, formState: {isSubmitting } } = useForm({ resolver: zodResolver(orderSchema) })

  const fetchProductUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/order/${id}`, { withCredentials: true });

      if (!response.data.success) navigate('/');

      setProduct(response.data.product);
      console.log(response.data)
      console.log(product);
      setUser(response.data.user);
      console.log(user);
      setLoader(false);

    } catch (error) {
      console.log(error.message);
      navigate("/");

    }
  }

  useEffect(() => {
    fetchProductUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePayment = async (data) => {
    try {

      if (data.choice === 'online') {

        const order = await axios.post(`${BACKEND_URL}/users/razorPay/createOrder`, { amount: product.price }, {
          withCredentials: true
        });

        const options = {
          key: RAZORPAY_KEY,
          amount: order.data.order.amount,
          currency: order.data.order.currency,
          order_id: order.data.order.id,
          handler: function (response) {
            verifyPayment(response);
          }


        }

        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log(order)
        console.log(data)
      } else {
        console.log(data.choice)
      }
    } catch (error) {
      console.log(error.messsage)
    }
  }

  const verifyPayment = async (paymentDetails) => {

    console.log("verify payment method ::", paymentDetails);
    try {
      const order = await axios.post(`${BACKEND_URL}/users/razorPay/verifyPayment`, { paymentDetails }, {
        withCredentials: true
      });

      console.log(order.data.message)
    } catch (error) {
      console.log(error.messsage)
    }
  }

  if (loader) {
    return <Loader />
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 px-10 py-20 flex gap-8">

        {/* LEFT SECTION */}
        <div className="w-[70%] bg-white rounded-md shadow py-6">

          <h2 className="text-2xl font-semibold ml-6 mb-6">Checkout</h2>

          {/* ADDRESS SECTION */}
          <div className=" border-b-2 border-gray-300 p-5 mb-6">
            <h3 className="text-lg font-medium mb-3">
              Delivering to {user.fullName}
            </h3>

            <div className="flex justify-between items-start">
              <div className="text-gray-600 leading-relaxed">
                <p>
                  {user?.address}
                </p>
              </div>
              {/*
              <button className="text-blue-600 hover:underline text-sm">
                Change
              </button> */}
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className=" border-b-2 border-gray-300 p-5 mb-6">
            <h3 className="text-lg font-medium mb-4">Payment Method</h3>

            <div className="flex flex-col gap-4">

              <label className="flex items-center gap-3 cursor-pointer">
                <input defaultChecked type="radio" value="online" {...register('choice')} />
                <span>UPI / Debit / Credit Card</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" {...register('choice')} value="cod" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* ✅ PRODUCT PREVIEW CARD */}
          <div className=" rounded-md p-5 ">
            <h3 className="text-lg font-medium mb-4">
              Review Items
            </h3>

            <div className="flex gap-6 items-start mb-6">

              {/* IMAGE */}
              <div className="w-32 h-32 bg-gray-200 rounded overflow-hidden">
                <img
                  src={product.image.imageUrl}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h4 className="font-medium text-lg">
                  {product.productName}
                </h4>

                <p className="text-green-600 text-sm mt-1">
                  In Stock
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-lg font-semibold">
                    ₹ {product.price}
                  </span>

                  <span className="text-sm line-through text-gray-500">
                    ₹ 2,499
                  </span>

                  <span className="text-sm text-green-600">
                    40% off
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-[30%] h-fit bg-white rounded-md shadow p-5 sticky top-20">

          <h3 className="text-lg font-medium mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Product 1</span>
              <span>₹ {product.price}</span>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹ {product.price}</span>
          </div>

          <button disabled={isSubmitting} type="submit" onClick={handleSubmit(handlePayment)} className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded">
            {isSubmitting ? 'Placing order...':'Place Order'} 
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
