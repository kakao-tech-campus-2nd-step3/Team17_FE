import axiosInstance from './axiosInstance'

const putNickName = async (name: string) => {
  const response = await axiosInstance.put('/api/member/profile', {
    name,
  })
  return response.data
}

export default putNickName
