// add to cart 
// remove from cart
// fetch cart items

import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config/env";

export const addToCart = async (id) => {
      try {
            const response = await axios.post(`${BACKEND_URL}/users/addToCart/${id}`, {}, {
                  withCredentials: true
            });
            toast.success(response.data.message);
      } catch (error) {
            toast.error(error.response.data.message);
      }
}


export const fetchUserCartData = async () => {
      try {
            const response = await axios.get(`${BACKEND_URL}/users/cart`, { withCredentials: true });
            console.log(response.data.cartData.cart);
            return response.data
      } catch (error) {
            console.log(error.response.data.message)
            return { success: false, message: error.response.data.message || error.message }
      }
}

export const removeFromCart = async (id) => {
      try {
            const response = await axios.post(`${BACKEND_URL}/users/removeToCart/${id}`, {}, { withCredentials: true });
            toast.success(response.data.message);
      } catch (error) {
            toast.error(error.response.data.message)
      }
}