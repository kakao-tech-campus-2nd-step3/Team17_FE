import { Exercise } from '../components/ExerciseList'
import axiosInstance from './axiosInstance'
import { Pageable } from './getMarket'

interface DiaryContent {
  id: number
  createdAt: string
  memo: string
}

interface Diary {
  content: DiaryContent[]
  pageable: Pageable
  last: boolean
}
interface MainResponse {
  totalTime?: number
  exerciseList?: Exercise[]
  diaries: Diary
}

const getMain = async (
  formattedDate: string,
  pageParam: number = 0
): Promise<MainResponse> => {
  const response = await axiosInstance.get('/api', {
    params: {
      date: formattedDate,
      page: pageParam,
      size: 5,
    },
  })
  return response.data
}

export default getMain
