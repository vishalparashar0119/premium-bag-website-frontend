// add to cart 
// remove from cart
// fetch cart items

import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config/env";

export const addToCart = async (id ) =>{
      try {
            const response = await axios.post(`${BACKEND_URL}/users/addToCart/${id}`, {}, {
                  withCredentials: true
            });
            toast.success(response.data.message);
      } catch (error) {
            toast.error(error.response.data.message);
      }
}