import axiosInstance from './axiosInstance'
import { Tag } from './getTags'

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

export interface MyTeam extends Team {
  password?: string | null
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

export interface MyGroupResponse {
  groupList: MyTeam[]
}

export const getGroup = async (
  page = 0,
  size = 8,
  sort = 'teamId,asc',
  searchTerm = '',
  activeFilters: number[] = []
): Promise<TeamResponse> => {
  let queryString = `page=${page}&size=${size}&sort=${sort}`

  if (searchTerm) {
    queryString += `&teamName=${encodeURIComponent(searchTerm)}`
  }

  if (activeFilters.length > 0) {
    queryString += `&tagIdList=${activeFilters.join(',')}`
  }

  const url = `/api/team?${queryString}`
  const response = await axiosInstance.get<TeamResponse>(url)
  return response.data
}

export const getMyGroup = async (
  page = 0,
  size = 8,
  sort = 'teamId,asc'
): Promise<TeamResponse> => {
  try {
    const url = `/api/team/joined?page=${page}&size=${size}&sort=${sort}`
    const response = await axiosInstance.get<{ content: MyTeam[] }>(url)
    const teams = response.data.content.map((group: MyTeam) => ({
      ...group,
      id: group.id,
      hasPassword: !!group.hasPassword,
    }))

    return {
      content: teams,
      pageable: {
        pageNumber: page,
        pageSize: size,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: page * size,
        paged: true,
        unpaged: false,
      },
      first: page === 0,
      last: teams.length < size,
      size,
      number: page,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      numberOfElements: teams.length,
      empty: teams.length === 0,
    }
  } catch (error) {
    throw new Error('Failed to fetch group data.')
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

export const deleteTeam = async (teamId: number): Promise<void> => {
  try {
    const url = `/api/team/${teamId}`
    await axiosInstance.delete(url)
  } catch (error) {
    throw new Error('Failed to delete team.')
  }
}

export const withdrawFromTeam = async (teamId: number): Promise<void> => {
  try {
    const url = `/api/team/withdraw/${teamId}`
    await axiosInstance.delete(url)
  } catch (error) {
    throw new Error('Failed to withdraw from team.')
  }
}

export {}
