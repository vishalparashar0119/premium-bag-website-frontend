import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import z from "zod";
import { BACKEND_URL } from "../config/env.js";

const LoginComponent = () => {


  const navigate = useNavigate();





  const loginSchema = z.object({
    email: z.email('Invali email formate'),
    password: z.string().min(6, 'Passowrd must me 6 digit long'),
  })


  const { register: loginRegister, formState: {
    isSubmitting: loginIsSubmitting, errors: loginErrors
  }, handleSubmit: handleLoginSubmit } = useForm({
    resolver: zodResolver(loginSchema)
  })



  const onLoginSubmit = async (data) => {

    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, { email: data.email, password: data.password }, {
        withCredentials: true
      })

      if (response.data.success) navigate('/shop');

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Done!");

  }
  return (

    <div className="w-1/2 flex items-center justify-center h-fit">
      <div className="w-full px-32">
        <h3 className="text-4xl">welcome to <span className="text-blue-400 font-semibold">Scatch</span></h3>
        <h4 className="text-2xl capitalize mb-5">login your account</h4>
        <form autoComplete="off" onSubmit={handleLoginSubmit(onLoginSubmit)}>
          {/* email */}
          <input
            className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
            type="email" placeholder="Email" {...loginRegister('email')} />
          {
            loginErrors.password && (
              <p className='text-orange-500'>{loginErrors.email.message}</p>
            )
          }
          {/* password */}
          <input
            className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
            type="password" placeholder="Password"  {...loginRegister('password')} />
          {
            loginErrors.password && (
              <p className='text-orange-500'>{loginErrors.password.message}</p>
            )
          }
          <button className="px-5 block rounded-full py-3 mt-2 bg-blue-500 text-white" type="submit"
            disabled={loginIsSubmitting}>
            {loginIsSubmitting ? 'loging...' : 'Login'} </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </div>
  )
}

export default LoginComponent;