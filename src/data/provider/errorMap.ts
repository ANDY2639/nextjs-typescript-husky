import { genericErrors } from "@/data/errorMappers/GenericError"
import errorMapper from "@/data/errorMappers"
import { AxiosError } from "axios"

export interface ErrorResponseData {
  httpCode: number
  message: string
  code: string
}

export const getError = (error: AxiosError<ErrorResponseData>) => {
  const { response } = error
  const { httpCode = 500, message, code } = response?.data || {}

  let errorTitle = "Error"
  let errorMessage = ""
  const errorDetail = `${code}: ${message}`
  const errorCode = code ? Number(code) : 0

  switch (httpCode) {
    case 403:
      errorTitle = "Forbidden"
      errorMessage = genericErrors.FORBIDDEN
      break
    case 401:
      errorTitle = "Unauthorized"
      errorMessage = genericErrors.UNAUTHORIZED
      break
    case 400:
      errorTitle = "BadRequest"
      errorMessage = genericErrors.BADREQUEST
      break
    default:
      errorMessage = genericErrors.GENERIC_ERROR
      break
  }

  return errorMapper(httpCode, errorCode, errorMessage, errorDetail, errorTitle)
}