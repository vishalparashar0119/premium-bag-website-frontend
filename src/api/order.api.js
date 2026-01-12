import { BACKEND_URL } from "../config/env";

import axios from "axios";

export const todayOrder = async () => {
      try {

            const response = await axios.get(`${BACKEND_URL}/owners/todaysOrder`, {
                  withCredentials: true
            });

            return response.data;

      } catch (error) {
            console.log(error.message);
            return { success: false, message: error.response.data.message || error.message };
      }
}

export const updateProductProcess = async (orderId) => {
      try {
            const response = await axios.put(`${BACKEND_URL}/owners/updateProcess/${orderId}`, {}, { withCredentials: true })
            return response.data;
      } catch (error) {
            console.log(error.message);
            return { success: false, message: error.response.data.message || error.message };
      }
}