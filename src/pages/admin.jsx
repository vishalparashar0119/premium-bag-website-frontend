import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import { MdDelete } from 'react-icons/md';
import { BACKEND_URL } from '../config/env.js';
import EditProduct from '../components/editProductComponent.jsx';
import AdminsNavigation from '../components/adminsNavigation.jsx';
import ShopCardComponent from '../components/shopCardComponent.jsx';

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
                <AdminsNavigation />
                <div className="w-[75%] flex flex-col gap-5 h-screen">
                    <a className="text-red-500" href="">Delete all</a>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'>

                        {
                            products.map((product) => {
                                return (
                                    <div onClick={() => editProduct(product._id)} key={product._id} className="flex flex-wrap gap-5">
                                        <ShopCardComponent productName={product.productName} price={product.price} id={product._id} imageUrl={product.image.imageUrl}
                                            quantity={product.quantity}
                                            isAdmin={true}
                                            fetchProducts={fetchProducts} 
                                            setLoading = {setLoading} />
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
