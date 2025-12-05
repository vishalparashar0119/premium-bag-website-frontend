import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React from 'react'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Bounce , toast , ToastContainer } from 'react-toastify'



const CreateProduct = () => {


      const notifySuccess = (message) => toast.success(message) 
      const notifyError = (message) => toast.error(message) 

      const registerSchema = z.object({
            productName: z.string().min(1, 'Name is required'),
            image: z.any(),
            price: z.string().min(1, 'Price is required'),
            discount: z.string().optional(),
            backgroundColor: z.string().optional(),
            pannelColor: z.string().optional(),
            textColor: z.string().optional(),
      })

      const { handleSubmit, formState: { errors, isSubmitting }, register, } = useForm({ resolver: zodResolver(registerSchema) });

      const onSubmit = async (data) => {
            console.log(data);
            const formData = new FormData();
            formData.append('productName', data.productName);
            formData.append('price', data.price);
            formData.append('image', data.image[0]);
            formData.append('discount', data.discount);
            formData.append('backgroundColor', data.backgroundColor);
            formData.append('pannelColor', data.pannelColor);
            formData.append('textColor', data.textColor);

            try {
                  const response = await axios.post('http://localhost:3000/owners/createProduct', formData, {
                        headers: {
                              'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true,
                  });

                  notifySuccess(response.data.message);

            } catch (error) {
                notifyError(error.response.data.message || error.message);
            }
      }

      return (
            <>


                  <div className="min-h-screen flex flex-col">
                        <div className="container px-10 py-20 flex grow">
                              <div className="w-[25%] flex h-screen flex-col items-start">
                                    <div className="flex flex-col">
                                          <Link className="block w-fit mb-2" to='/admin'>All Products</Link>
                                          <Link className="block w-fit mb-2" to='/admin/createProduct'>Create new product</Link>
                                    </div>
                              </div>
                              <main className="w-3/4 bg-white p-8 shadow ml-4">
                                    <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                                    <form autoComplete="off" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                                          <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                                                <div className="mb-4">
                                                      <label className="block mb-2 font-medium">Product Image</label>
                                                      <input {...register('image')} type="file" className="py-2 px-4 rounded  border-2 border-gray-400 border-dashed cursor-pointer  text-center" />
                                                      {
                                                            errors.image && (
                                                                  <p className='text-orange-600'>{errors.image.message}</p>
                                                            )
                                                      }
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">

                                                      <div className='flex flex-col'>
                                                      <input {...register('productName')} type="text" placeholder="Product Name"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.productName && (
                                                                  <p className='text-orange-600'>{errors.productName.message}</p>
                                                            )
                                                      }
                                                      </div>
                                                      <div className='flex flex-col'>

                                                      <input {...register('price')} type="text" placeholder="Product Price"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.price && (
                                                                  <p className='text-orange-600'>{errors.price.message}</p>
                                                            )
                                                      }
                                                      </div>
                                                      <div className='flex flex-col'>

                                                      <input {...register('discount')} type="text" placeholder="Discount Price"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.discount && (
                                                                  <p className='text-orange-600'>{errors.discount.message}</p>
                                                            )
                                                      }
                                                      </div>
                                                </div>
                                          </div>

                                          <div>
                                                <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                      <input {...register('backgroundColor')} type="text" placeholder="Background Color"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.backgroundColor && (
                                                                  <p className='text-orange-600'>{errors.backgroundColor.message}</p>
                                                            )
                                                      }
                                                      <input {...register('pannelColor')} type="text" placeholder="Panel Color"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.pannelColor && (
                                                                  <p className='text-orange-600'>{errors.pannelColor.message}</p>
                                                            )
                                                      }
                                                      <input {...register('textColor')} type="text" placeholder="Text Color"
                                                            className="border p-2 rounded w-full" />
                                                      {
                                                            errors.textColor && (
                                                                  <p className='text-orange-600'>{errors.textColor.message}</p>
                                                            )
                                                      }
                                                </div>
                                          </div>
                                          <button className="px-5 py-2 rounded mt-3 bg-blue-500 text-white" type="submit" disabled={isSubmitting}
                                          >
                                                {
                                                      isSubmitting ? 'Creating...' : 'Create New Product'
                                                }
                                          </button>
                                    </form>
                              </main>
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
      )
}

export default CreateProduct
