import * as yup from "yup"

export type OtpFormValues = {
  otpCode: string
}

export const defaultOtpFormValues: OtpFormValues = {
  otpCode: "",
}

export const otpFormValidationSchema = yup.object().shape({
  otpCode: yup.string().required(""),
})
