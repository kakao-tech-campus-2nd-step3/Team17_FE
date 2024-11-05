import { AxiosError } from 'axios'
import axiosInstance from './axiosInstance'

export interface Tag {
  tagId: number
  tagName: string
  tagAttribute: string
}

interface SortInfo {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: SortInfo
  offset: number
  unpaged: boolean
  paged: boolean
}

interface TagResponse {
  totalPages: number
  totalElements: number
  size: number
  content: Tag[]
  number: number
  sort: SortInfo
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: Pageable
  empty: boolean
}

export interface Team {
  id: number
  teamName: string
  leaderNickname: string
  teamDescription: string
  maxParticipants: number
  currentParticipants: number
  hasPassword: boolean
  tagList: Tag[]
}

export interface TeamResponse {
  content: Team[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
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

export interface MyGroup {
  teamName: string
  leaderNickname: string
  teamDescription: string
  maxParticipants: number
  currentParticipants: number
  password?: string | null
  tagList: Tag[]
}

export interface MyGroupResponse {
  groupList: MyGroup[]
}

export const getGroup = async (
  page = 0,
  size = 8,
  sort = 'asc',
  searchTerm = '',
  activeFilters: number[] = []
): Promise<TeamResponse> => {
  let queryString = `page=${page}&size=${size}&sort=${sort}`

  if (searchTerm) {
    queryString += `&search=${encodeURIComponent(searchTerm)}`
  }

  if (activeFilters.length > 0) {
    queryString += `&filters=${activeFilters.join(',')}`
  }

  const url = `/api/team?${queryString}`
  const accessToken = localStorage.getItem('authToken')

  try {
    const response = await axiosInstance.get<TeamResponse>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching groups:', error)
    throw error
  }
}

export const getMyGroup = async (): Promise<MyGroup[]> => {
  const accessToken = localStorage.getItem('authToken')

  try {
    const response = await axiosInstance.get<MyGroupResponse>(
      '/api/member/group',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return response.data.groupList
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error fetching member groups:', axiosError.message)
    if (axiosError.response) {
      console.error('Response data:', axiosError.response.data)
      console.error('Status:', axiosError.response.status)
    }
    throw axiosError
  }
}

// 아직 api 배포 전(추후 구현)
export const getTags = async (): Promise<Tag[]> => {
  const accessToken = localStorage.getItem('authToken')

  try {
    const response = await axiosInstance.get<TagResponse>(
      '/api/team?page=0&size=10&sort=asc',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return response.data.content
  } catch (error) {
    const axiosError = error as AxiosError
    console.error('Error fetching tags:', axiosError.message)
    if (axiosError.response) {
      console.error('Response data:', axiosError.response.data)
      console.error('Status:', axiosError.response.status)
    }
    throw axiosError
  }
}

export const verifyGroupPassword = async (
  teamId: number,
  password: string
): Promise<boolean> => {
  const response = await axiosInstance.post(`/api/team/checking/${teamId}`, {
    password,
  })
  return response.status === 200
}

export {}
