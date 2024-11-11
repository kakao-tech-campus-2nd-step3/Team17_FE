import axiosInstance from './axiosInstance'

interface GetRankingParams {
  groupId: string
  page: number
  size: number
  sort: string
  date: string
}

interface Ranker {
  name: string
  ranking: number
  totalExerciseTime: number
}

interface RankingResponse {
  myRanking: number
  myNickname: string
  myExerciseTime: number
  slice: {
    content: Ranker[]
    pageable: {
      pageNumber: number
      pageSize: number
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      offset: number
      unpaged: boolean
      paged: boolean
    }
    first: boolean
    last: boolean
    size: number
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    empty: boolean
  }
}

const getRanking = async ({
  groupId,
  page,
  size,
  sort,
  date,
}: GetRankingParams): Promise<RankingResponse> => {
  const response = await axiosInstance.get(`/api/team/${groupId}/ranking`, {
    params: { page, size, sort, date },
  })
  return response.data
}

export default getRanking
