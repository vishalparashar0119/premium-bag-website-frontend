import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { useRef, useState } from 'react';

function Login() {
  const [toggle, setToggle] = useState(true)
   const [popUp, setPopUp] = useState(false);


  return (
    <>
      <div className="w-full h-screen flex px-20  flex-col justify-center  items-center">


        {toggle ? <CreateComponent setPopUp={setPopUp}  /> : <LoginComponent />}

        {/*  */}
        <div className='text-start  mt-3 w-1/2 px-33'>

          <button onClick={() => setToggle(!toggle)} className='text-blue-400 cursor-pointer'>{toggle ? "have an accout ?" : "dont have account ?"}</button>
        </div>


      </div>
      {
        popUp && <PopUpComponent />
      }
    </>
  )
}

const LoginComponent = () => {


  const notify = (message) => toast.error(message)
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
      const response = await axios.post('http://localhost:3000/users/login', { email: data.email, password: data.password }, {
        withCredentials: true
      })

      if (response.data.success) navigate('/shop');

    } catch (error) {
      notify(error.response?.data?.message || error.message);
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

const CreateComponent = (propes) => {


  const {setPopUp} = propes ;
  

  const notify = (message) => toast.error(message)

  const registerSchema = z.object({
    fullName: z.string().min(1, 'Name must be at least 1 character long'),
    email: z.email('Invali email formate'),
    password: z.string().min(6, 'Passowrd must me 6 digit long'),
  })

  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {

    try {
      const res = await axios.post('http://localhost:3000/users/verify', { fullName: data.fullName, email: data.email, password: data.password }, {
        withCredentials: true
      })

      

      notify(res.data.message)
      setPopUp(true);
      console.log(res)
    } catch (error) {
      notify(error.res.data.message)
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <div className="w-1/2 flex items-center justify-center h-fit">
      <div className="w-full px-32">
        <h3 className="text-4xl">welcome to <span className="text-blue-400 font-semibold">Scatch</span></h3>
        <h4 className="text-2xl mb-5">create your account</h4>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

          {/* full name  */}
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3 border-zinc-200" type='text'
            placeholder="Full Name"  {...register('fullName')} />
          {
            errors.fullName && (
              <p className='text-orange-500'>{errors.fullName.message}</p>
            )
          }

          {/* email  */}
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
            placeholder="Email" type='text' {...register('email')} />
          {
            errors.email && (
              <p className='text-orange-500'>{errors.email.message}</p>
            )
          }

          {/* password */}
          <input
            className="bg-zinc-100 block w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
            type="password" placeholder="Password" {...register('password')} />
          {
            errors.password && (
              <p className='text-orange-500'>{errors.password.message}</p>
            )
          }

          {/* submit */}
          <button className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white" type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create My Account'}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </div>
  )
}

const PopUpComponent = () => {

  const navigate = useNavigate();
  const otpSchema = z.object({
    otp: z
      .string()
      .length(6, "OTP should be 6 digits long")
      .regex(/^\d{6}$/, "OTP must contain only digits"),
  });

  const inputsRef = useRef([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // allow digits only
    e.target.value = value;

    const otpArray = inputsRef.current.map((input) => input?.value || "");
    otpArray[index] = value;

    setValue("otp", otpArray.join(""));

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (!e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/users/register', {otp: data.otp }, {
        withCredentials: true
      })

      if (res.data.success) navigate('/shop');

      toast.error(res.data.message)
      console.log(res)
    } catch (error) {
      toast.error(error.res.data.message)
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[500px] h-[220px] bg-white rounded-lg p-6 flex flex-col justify-center items-center">
        <h4 className="text-xl mb-5">Enter OTP sent on email</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center flex-col items-center">
          {/* Hidden input for react-hook-form */}
          <input type="hidden" {...register("otp")} />

          <div className="flex gap-2 mb-3 ">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                className="w-10 h-10 text-center text-lg border rounded-md bg-zinc-100 border-zinc-200 focus:outline-blue-500"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) =>
                  e.key === "Backspace" && handleBackspace(e, index)
                }
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-orange-500 text-sm">{errors.otp.message}</p>
          )}

          <div className=''>
            <button
              disabled={isSubmitting}
              className="px-5 block rounded-sm py-3 mt-3 bg-blue-500 text-white w-fit"
              type="submit"
            >
              {isSubmitting ? "verifying..." : "verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Login
