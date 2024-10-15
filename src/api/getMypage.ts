import axiosInstance from './axiosInstance'

interface GetMypageParams {
  nickName: string
  email: string
  attendance: number
  weeklyTotal: string
  monthlyTotal: string
}

const getMypage = async (): Promise<GetMypageParams> => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('No access token found in session storage')
  }
  const response = await axiosInstance.get(`/api/member/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

export default getMypage
