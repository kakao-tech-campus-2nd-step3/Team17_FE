import axiosInstance from './axiosInstance'

const putStopExercise = async (exerciseId: number) => {
  const response = await axiosInstance.put(`/api/exercise/${exerciseId}`, {})
  return response.data
}

export default putStopExercise
