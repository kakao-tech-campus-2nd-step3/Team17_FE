export interface Tag {
  tagId: number
  tagName: string
  tagAttribute: string
}

const marketTag = {
  tagList: [
    { tagId: 1, tagName: '운동기구', tagAttribute: '마켓' },
    { tagId: 2, tagName: '건강식품', tagAttribute: '마켓' },
  ],
  findTagById(tagId: number): Tag | undefined {
    return this.tagList.find((tag) => tag.tagId === tagId)
  },
}
export default marketTag
