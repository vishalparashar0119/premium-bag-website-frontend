import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { BACKEND_URL } from "../config/env";
import { updateUserProfile } from "../api/user.api.js";

const EditProfile = (props) => {

      const { setToggle, fullName, address, phoneNo, email, setUserData } = props;

      const updateUserSchema = z.object({
            fullName: z.string().min(1, 'User name at least one character long'),
            phoneNo: z
                  .string()
                  .trim()
                  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
            address: z.string()
      });

      const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({
            resolver: zodResolver(updateUserSchema), defaultValues: {
                  fullName: fullName,
                  phoneNo: phoneNo,
                  address: address
            }
      });


      const onSubmit = async (data) => {
            const response = await updateUserProfile(data, email);
            console.log(response);
            setUserData(response.user);
            setToggle(false);
      }



      return (
            <div className="w-full h-screen fixed z-20 top-0 right-0 left-0  bg-black/20 px-4 md:px-10 py-10 flex justify-center">
                  <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow rounded-md p-6">
                        <h2 className="text-xl md:text-2xl font-semibold mb-6">Edit Profile</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                              {/* FULL NAME */}
                              <div className="mb-4">
                                    <label className="block text-gray-500 mb-1">Full Name</label>
                                    <input
                                          type="text"
                                          {...register('fullName')}
                                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />{
                                          errors.fullName && (
                                                <p className="text-orange-400">
                                                      {errors.fullName.message}
                                                </p>
                                          )
                                    }
                              </div>


                              {/* PHONE */}
                              <div className="mb-4">
                                    <label className="block text-gray-500 mb-1">Phone No</label>
                                    <input
                                          type="number"
                                          {...register('phoneNo')}
                                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none" />
                                    {
                                          errors.phoneNo && (
                                                <p className="text-orange-400">
                                                      {errors.phoneNo.message}
                                                </p>
                                          )
                                    }
                              </div>

                              {/* ADDRESS */}
                              <div className="mb-6">
                                    <label className="block text-gray-500 mb-1">Address</label>
                                    <textarea
                                          rows="3"
                                          {...register('address')}
                                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none" />
                                    {
                                          errors.address && (
                                                <p className="text-orange-400">
                                                      {errors.address.message}
                                                </p>
                                          )
                                    }
                              </div>

                              {/* BUTTONS */}
                              <div className="flex gap-4">
                                    <button disabled={isSubmitting} type="submit" className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium text-black">
                                          {isSubmitting ? 'Saving...' : 'Save changes'}
                                    </button>

                                    <button
                                          onClick={() => setToggle(false)}
                                          className="border px-6 py-2 rounded font-medium"
                                    >
                                          Cancel
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default EditProfile;
