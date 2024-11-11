import axiosInstance from './axiosInstance'

interface Tags {
  tagId: number
  productTagName: string
}

interface Content {
  productId: number
  imageUrl: string
  productUrl: string
  name: string
  price: number
  storeName: string
  tag: Tags[]
}

interface Sort {
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort[]
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface MarketResponse {
  content: Content[]
  pageable: Pageable
  last: boolean
}

const getMarket = async (
  tagIds?: number,
  pageParam: number = 0
): Promise<MarketResponse> => {
  const response = await axiosInstance.get('/api/market', {
    params: {
      tagIds,
      size: null,
      page: pageParam,
      sort: null,
    },
  })
  return response.data
}

export default getMarket
