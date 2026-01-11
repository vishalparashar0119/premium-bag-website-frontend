// fetch all products 
// fetch single product details

import axios from "axios";
import { BACKEND_URL } from "../config/env";



export async function fetchAllProducts() {
      try {
            const response = await axios.get(`${BACKEND_URL}/shop`, {
                  withCredentials: true
            });
            return response.data

      } catch (error) {
            console.log(error.message);
            return { success: false, message: error.response.data.message || error.message };
      }

}

export const filterProductData = async (data) => {
      try {
            let response;

            switch (data) {
                  case "newest": response = await axios.get(`${BACKEND_URL}/products/filter/newest`, { withCredentials: true });
                        break;

                  case "popular": response = await axios.get(`${BACKEND_URL}/products/filter/popular`, { withCredentials: true });
                        break;
                  case "New Collection": response = await axios.get(`${BACKEND_URL}/products/filter/newest`, { withCredentials: true });
                        break;
                  case "All Products": response = await axios.get(`${BACKEND_URL}/shop`, { withCredentials: true });
                        break;

                  case "Discounted Products": response = await axios.get(`${BACKEND_URL}/products/filter/discount`, { withCredentials: true });
                        break;

                  case "Availability": response = await axios.get(`${BACKEND_URL}/products/filter/available`, { withCredentials: true });
                        break;

            }

            return response.data
      } catch (error) {
            return { success: false, message: error.response.data.message || error.message };
      }
}

export   const fetchSingleProduct = async (id) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products/product/${id}`, { withCredentials: true });

      return response.data
    } catch (error) {
      console.log(error.response.data.message);
      return { success: false, message: error.response.data.message || error.message };
    }
  }