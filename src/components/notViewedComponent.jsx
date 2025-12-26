import React from 'react'
import ProgressCircle from './progressCircleComponent'
import { FaRegEyeSlash } from 'react-icons/fa6'

const NotViewed = () => {
      return (

            <ProgressCircle color="#9ca3af
" delay={0} tooltip="Order not viewed">
                  <FaRegEyeSlash className="h-6 w-6" />
            </ProgressCircle>
      )
}

export default NotViewed
