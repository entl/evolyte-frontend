import type ErrorResponse from "~/types/api/error";

function parseApiError(error: any, customErrorMessage: string = "An unexpected error occurred"): ErrorResponse {
  const data = error?.data ?? error?.response?._data
  return {
    error_code: data?.error_code,
    message: data?.message ?? customErrorMessage,
  }
}


export default parseApiError;