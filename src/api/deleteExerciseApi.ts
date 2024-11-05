import axiosInstance from './axiosInstance'

const deleteExerciseApi = async (exerciseId: number) => {
  const response = await axiosInstance.delete(`/api/exercise/${exerciseId}`)
  return response.data
}

export default deleteExerciseApi
