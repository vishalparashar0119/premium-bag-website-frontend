import axios from "axios";
import { BACKEND_URL } from "../config/env";


export const orderProductForUser = async (amount, userId, paymentId = null, productId, shippingAddress, quantity, modeOfPayment) => {
      try {
            console.log(amount, userId, paymentId, productId, shippingAddress, quantity, modeOfPayment);

            const newOrder = await axios.post(`${BACKEND_URL}/products/product/order`, {
                  amount, userId, paymentId, productId, shippingAddress, quantity, modeOfPayment
            }, { withCredentials: true });

            return newOrder.data
      } catch (error) {

            console.log(error.message)
            return { success: false, message: error.response?.data?.message || "Failed to place order" }
      }
}