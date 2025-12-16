import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import { MdDelete } from 'react-icons/md';
import { BACKEND_URL } from '../config/env.js';
import EditProduct from '../components/editProductComponent.jsx';
import { toast } from 'react-toastify';

const Admin = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [id, setId] = useState(false);

    async function fetchProducts() {

        try {

            const response = await axios.get(`${BACKEND_URL}/owners`, {
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

    const editProduct = (id) => {
        setId(id);
        setToggle(true);
    }

    const deleteProduct = async (id) => {
        let response;
        try {
            const confirm = window.confirm('Are you sure you want to delete to this product');

            if (confirm) {
                response = await axios.delete(`${BACKEND_URL}/owners/deleteProduct/${id}`, {
                    withCredentials: true
                });

                setLoading(true);
                setProducts(response.data.products);
                setLoading(false);

                toast.success(response.data.message);
            }
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
        <div>

            <div className="w-full h-screen flex items-start px-20 py-20">
                <div className="w-[25%] flex h-screen flex-col items-start">
                    <div className="flex flex-col">
                        <Link className="block w-fit mb-2" to='/admin'>All Products</Link>
                        <Link className="block w-fit mb-2" to='/admin/createProduct'>Create new product</Link>
                    </div>
                </div>
                <div className="w-[75%] flex flex-col gap-5 h-screen">
                    <a className="text-red-500" href="">Delete all</a>
                    <div className='flex flex-wrap gap-5'>

                        {
                            products.map((product) => {
                                return (
                                    <div onClick={() => editProduct(product._id)} key={product._id} className="flex flex-wrap gap-5">

                                        <div className="w-60 bg-yellow-600">
                                            <div className="w-full h-52 bg-yellow-500">
                                                <img src={product.image.imageUrl} alt="" className='w-full h-full object-cover ' />
                                            </div>
                                            <div className="flex justify-between items-center px-4 py-4">
                                                <div>
                                                    <h3>{product.productName}</h3>
                                                    <h4>₹ {product.price}</h4>
                                                    <h6 className='text-white text-sm'>QTY:{product.quantity}</h6>
                                                    {product.quantity >= 0 ? <h6 className='text-white text-sm'>In stock</h6> : <h6 className='text-red-600 text-sm'>Out of stock</h6>}
                                                </div>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deleteProduct(product._id)
                                                }} className=" bg-red-600  hover:bg-red-700 text-white w-9 h-9 rounded-full flex justify-center items-center cursor-pointer">
                                                    <MdDelete className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>


                </div>
            </div>
            {toggle && <EditProduct id={id} setToggle={setToggle} />}
        </div>
    )
}

export default Admin
