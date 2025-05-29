import ApiError from "@/domain/entity/Error/ApiError"

export default function errorMapper(status: number, code: number, message: string, details: string, title?: string): ApiError {
  return new ApiError(status, code, message, details, title)
}
