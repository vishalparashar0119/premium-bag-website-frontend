import axios from "axios";
import { BACKEND_URL } from "../config/env";
import { toast } from "react-toastify";


export async function fetchProductsAdmin() {

    try {
        const response = await axios.get(`${BACKEND_URL}/owners`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error.message);
        return { success: false, products: [], message: error.message };
    }

}


export async function createProduct(formData) {
    try {
        const response = await axios.post(`${BACKEND_URL}/owners/createProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        toast.success(response.data.message);

    } catch (error) {
        toast.error(error.response.data.message || error.message);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/owners/deleteProduct/${id}`, {
            withCredentials: true
        });
        
        toast.success(response.data.message);
    } catch (error) {
        toast.error(error.response.data.message);
    }
}
