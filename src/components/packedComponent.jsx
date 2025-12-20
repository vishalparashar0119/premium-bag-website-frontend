import React from 'react'
import ProgressCircle from './progressCircleComponent'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import ProgressBar from './progressBarComponent'
import { LuPackageCheck } from 'react-icons/lu'

const Packed = () => {
      return (
            <>
                  <ProgressCircle color="gray" delay={0} tooltip="Order not viewed">
                        <FaRegEyeSlash className="h-6 w-6" />
                  </ProgressCircle>

                  <ProgressBar color="yellow" delay={700} />

                  <ProgressCircle color="yellow" delay={1100} tooltip="Order viewed">
                        <FaRegEye className="h-6 w-6" />
                  </ProgressCircle>

                  <ProgressBar color="orange" delay={1800} />

                  <ProgressCircle color="orange" delay={2200} tooltip="Order packed">
                        <LuPackageCheck className="h-6 w-6" />
                  </ProgressCircle>

            </>
      )
}

export default Packed
