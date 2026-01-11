// fetch user data 
// update user profile

import axios from "axios";
import { BACKEND_URL } from "../config/env";


 export  const  fetchUserData = async ()=> {
            try {
                  const response = await axios.get(`${BACKEND_URL}/users/myAccount`, { withCredentials: true });
                  return response.data;

            } catch (error) {
                  console.log(error.message);
                  return {success: false, message: error.response?.data?.message || error.message};
            }
      }