import React from 'react'

const ProfileCardComponent = (props) => {

      const { fullName, email, phoneNo, address, isAdmin } = props;
      return (
            <div className="bg-white shadow rounded-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">My Account</h2>

                  <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                              <span className="text-gray-500">Full Name</span>
                              <span className="font-medium">{fullName}</span>
                        </div>

                        <div className="flex justify-between">
                              <span className="text-gray-500">Email</span>
                              <span className="font-medium">{email}</span>
                        </div>

                        <div className="flex justify-between">
                              <span className="text-gray-500">Phone No</span>
                              <span className="font-medium">{phoneNo}</span>
                        </div>

                        <div className="flex justify-between">
                              <span className="text-gray-500">Address</span>
                              <span className="font-medium">{address}</span>
                        </div>

                        {isAdmin && (
                              <div className="flex justify-between">
                                    <span className="text-gray-500">Admin Status</span>
                                    <span className="px-2 py-1 bg-yellow-400 rounded text-sm font-medium">
                                          Admin
                                    </span>
                              </div>
                        )}
                  </div>

                  <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-medium text-black">
                        Edit Profile
                  </button>
            </div>
      )
}

export default ProfileCardComponent
