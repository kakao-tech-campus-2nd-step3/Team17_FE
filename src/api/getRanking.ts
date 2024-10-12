import axiosInstance from "./axiosInstance"

interface GetRankingParams {
    groupId: string
    page: number
    size: number
    sort: string
    year: number
    month: number
    day: number
}

interface Ranker {
    name: string
    time: string
}

interface RankingResponse {
    myRanking: number
    myNickname: string
    myTime: string
    page: {
        totalPages: number
        totalElements: number
        size: number
        content: Ranker[]
        number: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        first: boolean
        last: boolean
        numberOfElements: number
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
        empty: boolean
    }
}


const getRanking = async ({ groupId, page, size, sort, year, month, day }: GetRankingParams): Promise<RankingResponse> => {
    const response = await axiosInstance.get(`/api/team/${groupId}/ranking`, {
        params: { page, size, sort, year, month, day }
    })
    return response.data
}

export default getRanking