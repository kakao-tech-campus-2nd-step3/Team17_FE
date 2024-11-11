import axiosInstance from './axiosInstance'

export interface ChatMessage {
  chatId: number
  memberId: number
  nickName: string
  message: string
}

export const fetchInitialMessages = async (
  groupId: string
): Promise<ChatMessage[]> => {
  const response = await axiosInstance.get<{ content: ChatMessage[] }>(
    `/api/team/chatting/${groupId}`
  )
  return response.data.content
}
