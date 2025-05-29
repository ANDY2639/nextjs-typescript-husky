import axios from "axios"
import { getError } from "./errorMap"

const ax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

ax.interceptors.response.use(undefined, error => {
  const mappedError = getError(error)
  return mappedError ? Promise.reject(mappedError) : Promise.reject(new Error(error))
})


// console.log('Test Variable: ', await env.dpsh-backoffice-dev.get())
// console.log('Test Variable PROCESS: ', await process.env.dpsh-backoffice-dev.get())

export default ax