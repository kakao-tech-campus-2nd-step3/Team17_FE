import axiosInstance from './axiosInstance'

const deleteMember = async () => {
  const response = await axiosInstance.delete('/api/member/profile')
  return response.data
}

export default deleteMember
