import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
