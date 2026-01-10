import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { createUser } from "../api/auth.api.js";

const PopUpComponent = (props) => {

  const { setPopUp } = props;
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

    const response = await createUser(data);

    if (response.success) {
      navigate('/shop');
      toast.success(response.message)
    } else {
      toast.error(response?.message)
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div onClick={() => setPopUp(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div onClick={(e) => { e.stopPropagation() }} className="w-[500px] h-[220px] bg-white rounded-lg p-6 flex flex-col justify-center items-center">
        <h4 className="text-xl mb-5">Enter OTP sent on email</h4>
        <form onSubmit={
          handleSubmit(onSubmit)
        } className="w-full flex justify-center flex-col items-center">
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
              onClick={(e) => e.stopPropagation()}
              className="px-5 block rounded-sm py-3 mt-3 bg-blue-500 text-white w-fit cursor-pointer"
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

export default PopUpComponent;