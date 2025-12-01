import React from "react";

const MyAccount = () => {
      // Fixed sample user data
      const user = {
            fullName: "Kushal Sharma",
            email: "kushal@example.com",
            phoneNo: 9876543210,
            address: "Jaipur, Rajasthan, 302021",
            isAdmin: false,
            cart: ["product1", "product2"],

            // FIXED: now each order has "products" array
            orderHistory: [
                  {
                        id: "ORD1234",
                        date: "20 Nov 2025",
                        amount: 1499,
                        products: [
                              {
                                    name: "Product A",
                                    qty: 1,
                                    price: 1499,
                                    image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764336678/premiumBagWebsiteProduct/rt3jau2ajrqfnzfulhd0.jpg",
                              }
                        ],
                  },
                  {
                        id: "ORD1235",
                        date: "12 Oct 2025",
                        amount: 999,
                        products: [
                              {
                                    name: "Product B",
                                    qty: 1,
                                    price: 999,
                                    image: "https://res.cloudinary.com/ddipugf3l/image/upload/v1764336678/premiumBagWebsiteProduct/rt3jau2ajrqfnzfulhd0.jpg",
                              }
                        ],
                  },
            ],
      };

      return (
            <div className="w-full min-h-screen bg-gray-100 px-10 py-10 flex gap-10">

                  {/* LEFT SIDE */} 
                  <div className="w-[65%] flex flex-col gap-8">

                        {/* PROFILE CARD */}
                        <div className="bg-white shadow rounded-md p-6">
                              <h2 className="text-2xl font-semibold mb-4">My Account</h2>

                              <div className="flex flex-col gap-4">
                                    <div className="flex justify-between">
                                          <span className="text-gray-500">Full Name</span>
                                          <span className="font-medium">{user.fullName}</span>
                                    </div>

                                    <div className="flex justify-between">
                                          <span className="text-gray-500">Email</span>
                                          <span className="font-medium">{user.email}</span>
                                    </div>

                                    <div className="flex justify-between">
                                          <span className="text-gray-500">Phone No</span>
                                          <span className="font-medium">{user.phoneNo}</span>
                                    </div>

                                    <div className="flex justify-between">
                                          <span className="text-gray-500">Address</span>
                                          <span className="font-medium">{user.address}</span>
                                    </div>

                                    {user.isAdmin && (
                                          <div className="flex justify-between">
                                                <span className="text-gray-500">Admin Status</span>
                                                <span className="px-2 py-1 bg-yellow-400 rounded text-sm font-medium">
                                                      Admin
                                                </span>
                                          </div>
                                    )}
                              </div>

                              <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium text-black">
                                    Edit Profile
                              </button>
                        </div>

                        {/* ORDER HISTORY */}
                        <div className="bg-white shadow rounded-md p-6">
                              <h3 className="text-2xl font-semibold mb-4">Order History</h3>

                              {user.orderHistory.length === 0 ? (
                                    <p className="text-gray-500">No orders placed yet.</p>
                              ) : (
                                    <div className="flex flex-col gap-6">
                                          {user.orderHistory.map((order, index) => (
                                                <div
                                                      key={index}
                                                      className="flex flex-col bg-white  rounded-xl p-4 shadow-sm"
                                                >
                                                      {/* TOP SECTION */}
                                                      <div className="flex gap-4">
                                                            {/* PRODUCT IMAGE */}
                                                            <img
                                                                  src={order.products[0].image}
                                                                  alt="product"
                                                                  className="w-24 h-24 rounded-lg object-cover"
                                                            />

                                                            {/* DETAILS */}
                                                            <div className="flex-1 flex flex-col justify-between">
                                                                  <div>
                                                                        <p className="font-semibold text-lg">
                                                                              Order ID: {order.id}
                                                                        </p>
                                                                        <p className="text-gray-500 text-sm mt-1">
                                                                              Date: {order.date}
                                                                        </p>
                                                                  </div>

                                                                  {/* PRODUCT LIST */}
                                                                  <div className="mt-2">
                                                                        {order.products.map((item, idx) => (
                                                                              <div key={idx} className="text-sm text-gray-700">
                                                                                    {item.name} — Qty: {item.qty} — ₹{item.price}
                                                                              </div>
                                                                        ))}
                                                                  </div>
                                                            </div>

                                                            {/* TOTAL */}
                                                            <div>
                                                                  <p className="font-bold text-green-700 text-lg whitespace-nowrap">
                                                                        ₹ {order.amount}
                                                                  </p>
                                                            </div>
                                                      </div>

                                                      {/* BUTTON */}
                                                      <div className="flex justify-end mt-4">
                                                            <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-md font-medium text-black">
                                                                  Order Again
                                                            </button>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </div>
                  </div>

                  {/* RIGHT SIDE SUMMARY */}
                  <div className="w-[35%] h-fit bg-white shadow rounded-md p-6 sticky top-10">
                        <h3 className="text-xl font-semibold mb-4">Account Summary</h3>

                        <div className="flex justify-between mt-3">
                              <span>Total Items in Cart</span>
                              <span className="font-medium">{user.cart.length}</span>
                        </div>

                        <div className="flex justify-between mt-3">
                              <span>Total Orders</span>
                              <span className="font-medium">{user.orderHistory.length}</span>
                        </div>
                  </div>
            </div>
      );
};

export default MyAccount;
