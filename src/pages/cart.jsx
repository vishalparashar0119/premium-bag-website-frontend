import React from "react";
import Navbar from "../components/navbar";

const Cart = () => {
      const cartItems = [
            {
                  id: 1,
                  name: "Clinge Bag",
                  color: "Black",
                  price: 1200,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764336678/premiumBagWebsiteProduct/rt3jau2ajrqfnzfulhd0.jpg",
                  qty: 1,
            },
            {
                  id: 2,
                  name: "Premium Leather Bag",
                  color: "Brown",
                  price: 1720,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764405516/premiumBagWebsiteProduct/yoddit4tro5njifx81jm.jpg",
                  qty: 2,
            },
            {
                  id: 2,
                  name: "Premium Leather Bag",
                  color: "Brown",
                  price: 1720,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764405516/premiumBagWebsiteProduct/yoddit4tro5njifx81jm.jpg",
                  qty: 2,
            },
            {
                  id: 2,
                  name: "Premium Leather Bag",
                  color: "Brown",
                  price: 1720,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764405516/premiumBagWebsiteProduct/yoddit4tro5njifx81jm.jpg",
                  qty: 2,
            },
            {
                  id: 2,
                  name: "Premium Leather Bag",
                  color: "Brown",
                  price: 1720,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764405516/premiumBagWebsiteProduct/yoddit4tro5njifx81jm.jpg",
                  qty: 2,
            },
            {
                  id: 2,
                  name: "Premium Leather Bag",
                  color: "Brown",
                  price: 1720,
                  image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764405516/premiumBagWebsiteProduct/yoddit4tro5njifx81jm.jpg",
                  qty: 2,
            },
      ];

      return (
            <>
                  <Navbar />
                  <div className="w-full min-h-screen bg-gray-100 px-10 py-10 flex gap-8">

                        {/* LEFT SIDE CART ITEMS */}
                        <div className="w-[70%] bg-white rounded-md shadow p-5 mt-10">

                              <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

                              {cartItems.map((item, index) => (
                                    <div key={item.id}>
                                          {/* ITEM ROW */}
                                          <div className="flex py-6 gap-6">

                                                {/* IMAGE */}
                                                <div className="w-40 h-40 bg-yellow-500 rounded overflow-hidden">
                                                      <img
                                                            src={item.image}
                                                            className="w-full h-full object-cover"
                                                      />
                                                </div>

                                                {/* DETAILS */}
                                                <div className="flex-1">
                                                      <h3 className="text-lg font-medium">{item.name}</h3>
                                                      <p className="text-sm text-gray-500">Colour: {item.color}</p>
                                                      <p className="text-green-600 text-sm mt-1">In stock</p>

                                                      {/* QUANTITY + DELETE */}
                                                      <div className="flex items-center gap-5 mt-5">

                                                            {/* QTY BUTTONS LIKE AMAZON */}
                                                            <div className="flex items-center gap-2 border rounded-full px-3 py-1">
                                                                  <button className="text-lg">-</button>
                                                                  <span>{item.qty}</span>
                                                                  <button className="text-lg">+</button>
                                                            </div>

                                                            {/* DELETE */}
                                                            <button className="text-blue-600 text-sm hover:underline">
                                                                  Delete
                                                            </button>

                                                            {/* SAVE FOR LATER */}
                                                            <button className="text-blue-600 text-sm hover:underline">
                                                                  Save for later
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* PRICE */}
                                                <div className="w-32 flex justify-end">
                                                      <h3 className="text-lg font-semibold">₹ {item.price}</h3>
                                                </div>
                                          </div>

                                          {/* DIVIDER */}
                                          {index !== cartItems.length - 1 && (
                                                <div className="w-full h-px bg-gray-300"></div>
                                          )}
                                    </div>
                              ))}

                              {/* TOTAL VALUE AT THE BOTTOM */}
                              <div className="flex justify-end mt-6 text-xl font-semibold">
                                    Total: ₹
                                    {cartItems.reduce(
                                          (acc, item) => acc + item.price * item.qty,
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
                                          {cartItems.reduce(
                                                (acc, item) => acc + item.price * item.qty,
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
