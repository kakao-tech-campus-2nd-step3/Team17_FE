import axiosInstance from './axiosInstance'

interface MypageResponse {
  nickname: string
  email: string
  attendance: number
  weeklyTotal: number
  monthlyTotal: number
}

const getMypage = async (): Promise<MypageResponse> => {
  const response = await axiosInstance.get('/api/member/profile')
  return response.data
}

export default getMypage
