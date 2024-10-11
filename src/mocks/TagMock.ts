export interface Tag {
  tagId: number
  tagName: string
  tagAttribute: string
}

const tagMock = {
  tagList: [
    { tagId: 1, tagName: '여성', tagAttribute: '성별' },
    { tagId: 2, tagName: '남성', tagAttribute: '성별' },
    { tagId: 3, tagName: '무관', tagAttribute: '성별' },
    { tagId: 4, tagName: '20대', tagAttribute: '나이' },
    { tagId: 5, tagName: '30대', tagAttribute: '나이' },
    { tagId: 6, tagName: '40대', tagAttribute: '나이' },
    { tagId: 7, tagName: '50대', tagAttribute: '나이' },
    { tagId: 8, tagName: '전연령', tagAttribute: '나이' },
    { tagId: 9, tagName: '강', tagAttribute: '운동강도' },
    { tagId: 10, tagName: '중', tagAttribute: '운동강도' },
    { tagId: 11, tagName: '약', tagAttribute: '운동강도' },
    { tagId: 12, tagName: '자유', tagAttribute: '운동강도' },
  ],
  findTagById(tagId: number): Tag | undefined {
    return this.tagList.find((tag) => tag.tagId === tagId)
  },
}
export default tagMock
