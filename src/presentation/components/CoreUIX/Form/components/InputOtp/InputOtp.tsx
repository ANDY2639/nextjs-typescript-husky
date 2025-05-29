import { InputOtp, InputOtpProps } from '@heroui/react'
import React from 'react'

export interface BaseInputOtpProps extends InputOtpProps {
  name: string
}

const BaseInputOtp: React.FC<BaseInputOtpProps> = ({ name, ...props }) => {
  return (
    <InputOtp
      data-id={name}
      {...props}
    />
  )
}

export default BaseInputOtp