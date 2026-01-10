import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import z from "zod";
import { BACKEND_URL } from "../config/env.js";
import { createVerification } from "../api/auth.api.js";

const CreateComponent = (propes) => {


  const { setPopUp } = propes;

  const registerSchema = z.object({
    fullName: z.string().min(1, 'Name must be at least 1 character long'),
    email: z.email('Invali email formate'),
    password: z.string().min(6, 'Passowrd must me 6 digit long'),
  })

  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {

    const response = await createVerification(data);
    console.log(response);

    if (response.success) {
      toast.success(response.message)
      setPopUp(true);
    } else {
      if (response.message.includes('pending')) {
        setPopUp(true)
        toast.error(response.message);
      } else {
        toast.error(response.message)
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center h-fit">
      <div className="w-full px-10 md:px-32">
        <h3 className="text-3xl md:text-4xl">welcome to <span className="text-blue-400 font-semibold">Scatch</span></h3>
        <h4 className="text-xl md:text-2xl mb-5">create your account</h4>
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


export default CreateComponent