import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: 'http://localhost:3000/api/book',
  // 请求超时时间
  timeout: 60000,
  // 允许携带cookie
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  })

export default service
