import React from "react";
import Navbar from "../components/navbar";
import { MdStar, MdStarHalf, MdStarBorder } from "react-icons/md";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  
      const {id} = useParams();
  // Dummy product data (replace with real state when integrating)
  console.log(id)
  const product = {
    productName: "Premium Leather Shoes",
    price: 2499,
    description:
      "Experience unmatched comfort and premium design with these stylish leather shoes. Built for everyday use with high durability.",
    image: {
      imageUrl:
        "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress",
    },
    rating: 4.5,
    stock: 5,
  };

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
                {product.description}
              </p>
            </div>

            {/* ADD TO CART + BUY */}
            <div className="mt-10 flex gap-5">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded font-medium shadow">
                Add to Cart
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-medium shadow">
                Buy Now
              </button>
            </div>

          </div>
        </div>

        {/* EXTRA SECTION: RELATED PRODUCTS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-5">Related Products</h2>

          <div className="grid grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:scale-105 transition"
              >
                <div className="w-full h-40 bg-gray-200 rounded overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="font-medium mt-2">Sample Shoe {n}</h4>
                <p className="text-green-600 font-semibold">₹ 1999</p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </>
  );
};

export default ProductInfo;
