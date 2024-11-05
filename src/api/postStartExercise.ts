import axiosInstance from './axiosInstance'

const postStartExercise = async (exerciseId: number) => {
  const response = await axiosInstance.post(`/api/exercise/${exerciseId}`, {})
  return response.data
}

export default postStartExercise
