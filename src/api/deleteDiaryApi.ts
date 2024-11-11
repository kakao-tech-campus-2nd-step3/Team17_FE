import axiosInstance from './axiosInstance'

const deleteDiaryApi = async (diaryId: number) => {
  const response = await axiosInstance.delete(`/api/diary/${diaryId}`)
  return response.data
}

export default deleteDiaryApi
