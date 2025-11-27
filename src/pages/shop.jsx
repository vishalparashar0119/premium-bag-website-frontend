import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Shop = () => {

      const navigate = useNavigate();

      useEffect( () => {
            async function fetchProducts(){

                  try{

                        const response =  await axios.get('http://localhost:3000/shop' , {
                              withCredentials : true
                        });
                        
                        if( !response.data.success)   navigate('/');
                        
                        console.log(response.data.message);
                  } catch (error) {
                        console.log( error.message);
                        navigate('/');
                  }
                        
            } 

            fetchProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      } , [])

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
                                    <a className="block w-fit mb-2" href="">Filter by :</a>
                                    <a className="block w-fit mb-2" href="">Availability</a>
                                    <a className="block w-fit mb-2" href="">Discount</a>
                              </div>
                        </div>
                        <div className="w-[75%] flex flex-col gap-5 h-screen">
                              <div className="flex items-start gap-5">
                                    {/* <% products.forEach(function(product){ %> */}
                                    <div className="w-60">
                                          <div className="w-full h-52 flex items-center justify-center bg-[<%= product.bgcolor %>]">
                                                <img className="h-48" src="data:image/jpeg;base64,<%= product.image.toString('base64') %>"
                                                      alt="" />
                                          </div>
                                          <div
                                                className="flex justify-between bg-[<%= product.panelcolor %>] items-center px-4 py-4 text-[<%= product.textcolor %>]">
                                                <div>
                                                      <h3>
                                                            {/* <%= product.name %> */} caska bag
                                                      </h3>
                                                      <h4>₹ {/* <%= product.price %> */} 1999</h4>

                                                </div>
                                                <a className="w-7 h-7 flex items-center justify-center rounded-full bg-white" href="">
                                                      <i className="ri-add-line"></i>
                                                </a>
                                          </div>
                                    </div>
                                    {/* <% }) %> */}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Shop
