import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/loader';
import { MdDelete } from 'react-icons/md';

const Admin = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProducts() {

        try {

            const response = await axios.get('http://localhost:3000/owners', {
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
                            products.map((product, index) => {
                                return (
                                    <Link to={`/productInfo/${product._id}`}>
                                    <div key={index} className="flex flex-wrap gap-5">

                                        <div className="w-60 bg-yellow-600">
                                            <div className="w-full h-52 bg-yellow-500">
                                                <img src={product.image.imageUrl} alt=""  className='w-full h-full object-cover '/>
                                            </div>
                                            <div className="flex justify-between items-center px-4 py-4">
                                                <div>
                                                    <h3>{product.productName}</h3>
                                                    <h4>₹ {product.price}</h4>  
                                                </div>
                                                <button onClick={(e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }} className=" bg-red-600  hover:bg-red-700 text-white w-9 h-9 rounded-full flex justify-center items-center cursor-pointer">
                                                    <MdDelete className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                )
                            })
                        }

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Admin
