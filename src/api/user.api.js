// fetch user data 
// update user profile

import axios from "axios";
import { BACKEND_URL } from "../config/env";
import { toast } from "react-toastify";


 export  const  fetchUserData = async ()=> {
            try {
                  const response = await axios.get(`${BACKEND_URL}/users/myAccount`, { withCredentials: true });
                  return response.data;

            } catch (error) {
                  console.log(error.message);
                  return {success: false, message: error.response?.data?.message || error.message};
            }
}

export const updateUserProfile = async (data , email) =>{
       try {
                  const response = await axios.put(`${BACKEND_URL}/users/update`, {
                        fullName: data.fullName,
                        phoneNo: data.phoneNo,
                        address: data.address,
                        email: email

                  });
                  toast.success(response.data.message);
                  return response.data;
            } catch (error) {
                  toast.error(error.response.data.message);
            }
}