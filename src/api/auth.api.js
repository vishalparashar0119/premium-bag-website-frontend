//login 
// register 
// logout

import axios from "axios";
import { BACKEND_URL } from "../config/env";

export const loginUser = async (data) => {

      try {
            const response = await axios.post(`${BACKEND_URL}/users/login`, { email: data.email, password: data.password }, {
                  withCredentials: true
            })

            return response.data;

      } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
      }
}

export const createVerification = async (data) => {
      try {
            const response = await axios.post(`${BACKEND_URL}/users/verify`, { fullName: data.fullName, email: data.email, password: data.password }, {
                  withCredentials: true
            });
            return response.data;
      } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
      }
}

export const createUser = async (data) => {
      try {
            const response = await axios.post(`${BACKEND_URL}/users/register`, { otp: data.otp }, {
                  withCredentials: true
            })

            return response.data;
      } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
      }
}