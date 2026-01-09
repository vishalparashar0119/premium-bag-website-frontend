import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import { CiCirclePlus } from "react-icons/ci";
import { BACKEND_URL } from '../config/env.js';
import ShopCardComponent from '../components/shopCardComponent.jsx';
import { toast } from 'react-toastify';
import { IoColorFilterOutline } from 'react-icons/io5';


const Shop = () => {

      const navigate = useNavigate();
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [toggle, setToggle] = useState(false);

      async function fetchProducts() {

            try {

                  const response = await axios.get(`${BACKEND_URL}/shop`, {
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

      const filterData = async (data) => {
            try {
                  let response;

                  switch (data) {
                        case "newest": response = await axios.get(`${BACKEND_URL}/products/filter/newest`, { withCredentials: true });
                              break;

                        case "popular": response = await axios.get(`${BACKEND_URL}/products/filter/popular`, { withCredentials: true });
                              break;
                        case "New Collection": response = await axios.get(`${BACKEND_URL}/products/filter/newest`, { withCredentials: true });
                              break;
                        case "All Products": response = await axios.get(`${BACKEND_URL}/shop`, { withCredentials: true });
                              break;

                        case "Discounted Products": response = await axios.get(`${BACKEND_URL}/products/filter/discount`, { withCredentials: true });
                              break;

                        case "Availability": response = await axios.get(`${BACKEND_URL}/products/filter/available`, { withCredentials: true });
                              break;

                  }
                  setLoading(true);
                  setProducts(response.data.products);
                  setLoading(false);
            } catch (error) {
                  toast.error(error.response.data.message);
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
                  <div className="w-full relative h-screen flex items-start md:px-20 py-20">
                        <div className="hidden  w-[25%] md:flex flex-col items-start">
                              <div className="flex flex-col justify-center gap-2">
                                    <h3>sort by</h3>
                                    <select onChange={(e) => filterData(e.target.value)}
                                          className="border px-2 py-1" name="sortby" id="">
                                          <option onClick={() => filterData('popular')} value="popular">Popular</option>
                                          <option onClick={() => filterData('newest')} value="newest">Newest</option>
                                    </select>
                                    <div className="flex flex-col mt-20">
                                          <button onClick={() => filterData('New Collection')} className=" cursor-pointer block w-fit mb-2">New Collection</button>
                                          <button onClick={() => filterData('All Products')} className=" cursor-pointer block w-fit mb-2" >All Products</button>
                                          <button onClick={() => filterData('Discounted Products')} className=" cursor-pointer block w-fit mb-2" >Discounted Products</button>
                                    </div>
                                    <div className="mt-32">
                                          <h1 className="block w-fit mb-2 font-bold">Filter by :</h1>
                                          <button onClick={() => filterData('Availability')} className="block w-fit mb-2 cursor-pointer">Availability</button>
                                          <button onClick={() => filterData('Discounted Products')} className="block w-fit mb-2 cursor-pointer">Discount</button>
                                    </div>
                              </div>

                        </div>
                        <div className=" md:w-[75%] flex flex-col gap-5 ">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                                    {/* <% products.forEach(function(product){ %> */}
                                    {
                                          products.map((product) => {
                                                return (

                                                      <Link key={product._id} to={`/productInfo/${product._id}`} className="block">
                                                            <ShopCardComponent productName={product.productName} price={product.price} id={product._id} imageUrl={product.image.imageUrl} 
                                                            quantity={product.quantity}
                                                            setLoading = {setLoading}/>
                                                      </Link>
                                                )
                                          })
                                    }
                              </div>
                        </div>

                        <button onClick={() => setToggle(true)} className='h-10 w-10 fixed  bottom-2 left-2 rounded-full flex justify-center items-center bg-white md:hidden'>
                              <IoColorFilterOutline className='h-6 w-6' />

                        </button>

                        <div className={` fixed z-40  top-0 w-full bg-black/30 flex h-screen flex-col items-start  transition-all duration-300 ${toggle ? 'left-0' : '-left-full'} md:hidden`} onClick={() => setToggle(false)}>
                              <div className="flex  p-5 h-full bg-white w-[90%] flex-col  gap-2">
                                    <h3>sort by</h3>
                                    <select onChange={(e) => filterData(e.target.value)}
                                          className="border px-2 py-1" name="sortby" id="">
                                          <option onClick={() => filterData('popular')} value="popular">Popular</option>
                                          <option onClick={() => filterData('newest')} value="newest">Newest</option>
                                    </select>
                                    <div className="flex flex-col mt-20">
                                          <button onClick={() => filterData('New Collection')} className=" cursor-pointer block w-fit mb-2">New Collection</button>
                                          <button onClick={() => filterData('All Products')} className=" cursor-pointer block w-fit mb-2" >All Products</button>
                                          <button onClick={() => filterData('Discounted Products')} className=" cursor-pointer block w-fit mb-2" >Discounted Products</button>
                                    </div>
                                    <div className="mt-32">
                                          <h1 className="block w-fit mb-2 font-bold">Filter by :</h1>
                                          <button onClick={() => filterData('Availability')} className="block w-fit mb-2 cursor-pointer">Availability</button>
                                          <button onClick={() => filterData('Discounted Products')} className="block w-fit mb-2 cursor-pointer">Discount</button>
                                    </div>
                              </div>

                        </div>
                  </div>
            </>
      )
}

export default Shop
