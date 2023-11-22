import axios from 'axios'
import { getAccessToken } from './handle-token'



export default function makeApi(baseURL: string) {
  const api = axios.create({
    baseURL,
  })

  api.defaults.headers.post['Content-Type'] = 'application/json'
  api.defaults.headers.put['Content-Type'] = 'application/json'
  api.defaults.headers.delete['Content-Type'] = 'application/json'

  // api.interceptors.request.use(
  //   config => {
  //     if (getAccessToken()) {
  //       config.headers = {
  //         ...config.headers,
  //         Authorization: Bearer ${getAccessToken()},
  //       }
  //     }

  //     return config
  //   },
  //   error => Promise.reject(error),
  // )

  api.interceptors.response.use(
    response => response.data, // return data object
    error => Promise.reject(error),
  )
  return api
}