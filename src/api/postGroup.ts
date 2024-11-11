import axiosInstance from './axiosInstance'
import { Team } from './getGroup'

interface GroupData {
  teamName: string
  teamDescription: string
  maxParticipants: number
  password: string | null | undefined
  tagIdList: number[]
}

const postGroup = async ({
  teamName,
  teamDescription,
  maxParticipants,
  password,
  tagIdList,
}: GroupData) => {
  const response = await axiosInstance.post('/api/team', {
    teamName,
    teamDescription,
    maxParticipants,
    password,
    tagIdList,
  })
  return response.data
}

export const joinGroup = async (group: Team) => {
  const response = await axiosInstance.post(`/api/team/join/${group.id}`)
  return response.data
}

export default postGroup
