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