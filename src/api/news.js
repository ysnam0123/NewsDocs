import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://newsdata.io/api/1/',
  // 응답을 기다릴 수 있는 최대 시간
  // timeout: 5000
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
