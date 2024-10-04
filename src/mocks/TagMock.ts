export interface Tag {
    tagId: number
    tagName: string
    tagAttribute: string
}

const tagMock = {
    tagList: [
        { tagId: 1, tagName: '성별', tagAttribute: '여성' },
        { tagId: 2, tagName: '성별', tagAttribute: '남성' },
        { tagId: 3, tagName: '성별', tagAttribute: '무관' },
        { tagId: 4, tagName: '나이', tagAttribute: '10대' },
        { tagId: 5, tagName: '나이', tagAttribute: '20대' },
        { tagId: 6, tagName: '나이', tagAttribute: '30대' },
        { tagId: 7, tagName: '나이', tagAttribute: '40대' },
        { tagId: 8, tagName: '나이', tagAttribute: '50대' },
        { tagId: 9, tagName: '나이', tagAttribute: '전연령' },
        { tagId: 10, tagName: '운동강도', tagAttribute: '강' },
        { tagId: 11, tagName: '운동강도', tagAttribute: '중' },
        { tagId: 12, tagName: '운동강도', tagAttribute: '약' },
        { tagId: 13, tagName: '운동강도', tagAttribute: '자유' },
    ],
    findTagById(tagId: number): Tag | undefined {
        return this.tagList.find((tag) => tag.tagId === tagId)
    },
}
export default tagMock
