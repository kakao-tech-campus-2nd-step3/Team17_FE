import axiosInstance from './axiosInstance'

const postExercise = async (exerciseName: string) => {
  const response = await axiosInstance.post('/api/exercise', {
    exerciseName,
  })
  return response.data
}

export default postExercise
