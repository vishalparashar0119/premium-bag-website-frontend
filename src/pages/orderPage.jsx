import React from "react";

const Order = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 px-10 py-20 flex gap-8">

        {/* LEFT SECTION */}
        <div className="w-[70%] bg-white rounded-md shadow py-6">

          <h2 className="text-2xl font-semibold ml-6 mb-6">Checkout</h2>

          {/* ADDRESS SECTION */}
          <div className=" border-b-2 border-gray-300 p-5 mb-6">
            <h3 className="text-lg font-medium mb-3">
              Delivering to Vishal Parashar
            </h3>

            <div className="flex justify-between items-start">
              <div className="text-gray-600 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus vel impedit sapiente atque reprehenderit aliquam quo.
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
                <input type="radio" name="payment" />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="payment" />
                <span>UPI / Debit / Credit Card</span>
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s"
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h4 className="font-medium text-lg">
                  Premium Leather Backpack
                </h4>

                <p className="text-green-600 text-sm mt-1">
                  In Stock
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-lg font-semibold">
                    ₹ 1,499
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
              <span>₹ 999</span>
            </div>

            <div className="flex justify-between">
              <span>Product 2</span>
              <span>₹ 1499</span>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹ 2498</span>
          </div>

          <button className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
