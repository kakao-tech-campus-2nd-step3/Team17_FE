import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://home-try.13.125.102.156.sslip.io',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
