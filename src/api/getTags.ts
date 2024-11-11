import axiosInstance from './axiosInstance'

export interface Tag {
  tagId: number
  teamTagName: string
  teamTagAttribute: string
}

interface TagResponse {
  genderTagList: Tag[]
  ageTagList: Tag[]
  exerciseIntensityTagList: Tag[]
}

export const getTags = async (): Promise<Tag[]> => {
  const response = await axiosInstance.get<TagResponse>('/api/team/teamTags')

  const allTags = [
    ...response.data.genderTagList,
    ...response.data.ageTagList,
    ...response.data.exerciseIntensityTagList,
  ]
  return allTags
}
