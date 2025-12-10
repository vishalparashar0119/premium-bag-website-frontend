import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import { CiCirclePlus } from "react-icons/ci";
import { BACKEND_URL } from '../config/env.js';
import ShopCardComponent from '../components/shopCardComponent.jsx';


const Shop = () => {

      const navigate = useNavigate();
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

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

      const addToCart = async (productId) => {
            console.log(productId);

            try {
                  const response = await axios.post(`${BACKEND_URL}/users/addToCart/${productId}`, {}, {
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
                                    <h1 className="block w-fit mb-2 font-bold">Filter by :</h1>
                                    <button className="block w-fit mb-2 cursor-pointer">Availability</button>
                                    <button className="block w-fit mb-2 cursor-pointer">Discount</button>
                              </div>
                        </div>
                        <div className="w-[75%] flex flex-col gap-5 h-screen">
                              <div className="flex items-start gap-5 flex-wrap">
                                    {/* <% products.forEach(function(product){ %> */}
                                    {
                                          products.map((product) => {
                                                return (
                                                      <Link key={product._id} to={`/productInfo/${product._id}`}>
                                                            <ShopCardComponent productName = {product.productName} price = {product.price} id = {product._id} imageUrl={product.image.imageUrl} addToCart ={addToCart}/>
                                                            
                                                      </Link>
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
