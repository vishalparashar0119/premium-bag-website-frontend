import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const registerSchema = z.object({
    fullName: z.string().min(1, 'Name must be at least 1 character long'),
    email: z.email('Invali email formate'),
    password: z.string().min(6, 'Passowrd must me 6 digit long'),
  })

  const loginSchema = z.object({
    email: z.email('Invali email formate'),
    password: z.string().min(6, 'Passowrd must me 6 digit long'),
  })

  const { register, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const { register: loginRegister, formState: {
    isSubmitting: loginIsSubmitting, errors: loginErrors
  }, handleSubmit: handleLoginSubmit } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {

    try {
      const res = await axios.post('http://localhost:3000/users/register' , {fullName : data.fullName , email : data.email , password : data.password} ,{
        withCredentials : true   
      } )

      if(res.data.success) navigate('/shop');

      setError('root' , {message : res.data.message})
      console.log(res)
    } catch (error) {
      setError('root ', {
        message: error.message
      })
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }


  const onLoginSubmit = async (data) => {
    console.log("Form data:", data);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Done!");

  }

  return (
    <>
      {
        errors.root && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-red-500">
            <span className="inline-block mt-1 mb-1 text-white">
              somthing went wrong , please try again
            </span>
          </div>
        )
      }

      <div className="w-full h-screen flex px-20">
        <div className="w-1/2 flex items-center justify-center h-screen">
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
        </div>


        <div className="w-1/2 flex items-center justify-center h-screen">
          <div className="w-full px-32">
            <h4 className="text-2xl capitalize mb-5">login your account</h4>
            <form autoComplete="off" onSubmit={handleLoginSubmit(onLoginSubmit)}>
              {/* email */}
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
                type="email" placeholder="Email" {...loginRegister('email', {
                  required: ' email is require', pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    , message: 'invalid email address'
                  }
                })} />
              {
                loginErrors.password && (
                  <p className='text-orange-500'>{loginErrors.email.message}</p>
                )
              }
              {/* password */}
              <input
                className="block bg-zinc-100 w-full px-3 py-2 border rounded-md mb-3 border-zinc-200"
                type="password" placeholder="Password"  {...loginRegister('password', { required: 'password is require' })} />
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
        </div>
      </div>
    </>
  )
}

export default Login
