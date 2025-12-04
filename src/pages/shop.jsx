import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import Navbar from '../components/navbar';
import { CiCirclePlus } from "react-icons/ci";


const Shop = () => {

      const navigate = useNavigate();
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

      async function fetchProducts() {

            try {

                  const response = await axios.get('http://localhost:3000/shop', {
                        withCredentials: true
                  });

                  if (!response.data.success) navigate('/');

                  setProducts(response.data.products);
                  setLoading(false);

            } catch (error) {
                  console.log(error.message);
                  navigate('/');
            }

      }

      const addToCart = async (productId) => {
            console.log(productId);

            try {
                  const response = await axios.post(`http://localhost:3000/users/addToCart/${productId}`, {}, {
                        withCredentials: true
                  })
                  console.log(response.data.message);
            } catch (error) {
                  console.log(error.response.data.message);
            }
      }


      useEffect(() => {

            fetchProducts();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      if (loading) {
            return <Loader />
      }

      return (
            <>
                  <Navbar />
                  <div className="w-full h-screen flex items-start px-20 py-20">
                        <div className="w-[25%] flex h-screen flex-col items-start">
                              <div className="flex items-center gap-2">
                                    <h3>sort by</h3>
                                    <form action="/shop">
                                          <select className="border px-2 py-1" name="sortby" id="">
                                                <option value="popular">Popular</option>
                                                <option value="newest">Newest</option>
                                          </select>
                                    </form>
                              </div>
                              <div className="flex flex-col mt-20">
                                    <a className="block w-fit mb-2" href="">New Collection</a>
                                    <a className="block w-fit mb-2" href="">All Products</a>
                                    <a className="block w-fit mb-2" href="">Discounted Products</a>
                              </div>
                              <div className="mt-32">
                                    <a className="block w-fit mb-2" href="">Filter by :</a>
                                    <a className="block w-fit mb-2" href="">Availability</a>
                                    <a className="block w-fit mb-2" href="">Discount</a>
                              </div>
                        </div>
                        <div className="w-[75%] flex flex-col gap-5 h-screen">
                              <div className="flex items-start gap-5">
                                    {/* <% products.forEach(function(product){ %> */}
                                    {
                                          products.map((product, index) => {
                                                return (
                                                      <div key={index} className="w-60">
                                                            <div className={`w-full h-52 flex items-center justify-center bg-[#F4DDD2]`}>
                                                                  <img className="h-48" src={product.image.imageUrl}
                                                                        alt='' />
                                                            </div>
                                                            <div
                                                                  className={`flex justify-between bg-[#DEBEAE] items-center px-4 py-4 text-[#774f3d]`}>
                                                                  <div>
                                                                        <h3>
                                                                              {product.productName}
                                                                        </h3>
                                                                        <h4>₹  {product.price}</h4>

                                                                  </div>
                                                                  <button onClick={() => {
                                                                        addToCart(product._id)
                                                                  }} className="w-7 h-7 flex items-center justify-center rounded-full bg-white">
                                                                        <CiCirclePlus className='w-7 h-7 cursor-pointer' />
                                                                  </button>
                                                            </div>
                                                      </div>
                                                )
                                          })
                                    }

                                    {/* <% }) %> */}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Shop
