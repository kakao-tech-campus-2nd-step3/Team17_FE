export interface Team {
  teamName: string
  leaderNickname: string
  teamDescription: string
  maxParticipants: number
  currentParticipants: number
  password?: string | null
  tagList: {
    tagId: number
    tagName: string
    tagAttribute: string
  }[]
}

const searchGroupMock = {
  Page: {
    totalPages: 3,
    totalElements: 3,
    size: 7,
    content: [
      {
        teamName: '매일 홈트 시작',
        leaderNickname: '나만의 홈트',
        teamDescription: '매일 1시간씩 운동하는 것을 목표로 합니다.',
        maxParticipants: 6,
        currentParticipants: 5,
        password: '1234',
        tagList: [
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 12,
            tagName: '운동강도',
            tagAttribute: '약',
          },
        ],
      },
      {
        teamName: '매일 운동',
        leaderNickname: '매홈트',
        teamDescription: '꾸준히 합시다.',
        maxParticipants: 8,
        currentParticipants: 3,
        password: null,
        tagList: [
          { tagId: 1, tagName: '성별', tagAttribute: '여성' },
          { tagId: 2, tagName: '성별', tagAttribute: '남성' },
          { tagId: 9, tagName: '나이', tagAttribute: '전연령' },
          { tagId: 13, tagName: '운동강도', tagAttribute: '자유' },
        ],
      },
      {
        teamName: '홈트초보방',
        leaderNickname: '홈트1일차',
        teamDescription: '초보자이신 분 편하게 들어오세요',
        maxParticipants: 6,
        currentParticipants: 6,
        password: 'pass789',
        tagList: [
          {
            tagId: 2,
            tagName: '성별',
            tagAttribute: '남성',
          },
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 6,
            tagName: '나이',
            tagAttribute: '30대',
          },
        ],
      },
      {
        teamName: '매.운.도',
        leaderNickname: '최강운동',
        teamDescription: '아자아자 화이팅',
        maxParticipants: 4,
        currentParticipants: 2,
        password: null,
        tagList: [
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 10,
            tagName: '운동강도',
            tagAttribute: '강',
          },
        ],
      },
      {
        teamName: '숨쉬기 운동 도전',
        leaderNickname: '운동하는 운동짐',
        teamDescription: '운동을 사랑하는 모임',
        maxParticipants: 4,
        currentParticipants: 3,
        password: null,
        tagList: [
          {
            tagId: 2,
            tagName: '성별',
            tagAttribute: '남성',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 6,
            tagName: '나이',
            tagAttribute: '30대',
          },
          {
            tagId: 10,
            tagName: '운동강도',
            tagAttribute: '강',
          },
        ],
      },
      {
        teamName: '모각트',
        leaderNickname: 'myName',
        teamDescription: '모여서 각자 트레이닝',
        maxParticipants: 4,
        currentParticipants: 1,
        password: null,
        tagList: [
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 2,
            tagName: '성별',
            tagAttribute: '남성',
          },
          {
            tagId: 9,
            tagName: '나이',
            tagAttribute: '전연령',
          },
          {
            tagId: 13,
            tagName: '운동강도',
            tagAttribute: '자유',
          },
        ],
      },
      {
        teamName: '런앤번',
        leaderNickname: '러닝러닝',
        teamDescription: '매일 러닝하는 모임(러닝머신 필수)',
        maxParticipants: 4,
        currentParticipants: 2,
        password: '1111',
        tagList: [
          {
            tagId: 3,
            tagName: '성별',
            tagAttribute: '무관',
          },
        ],
      },
      {
        teamName: '매일 운동 도전',
        leaderNickname: '러닝맨',
        teamDescription: '매일매일 성실히만 합시다.',
        maxParticipants: 6,
        currentParticipants: 5,
        password: '5555',
        tagList: [
          {
            tagId: 3,
            tagName: '성별',
            tagAttribute: '무관',
          },
          {
            tagId: 13,
            tagName: '운동강도',
            tagAttribute: '자유',
          },
        ],
      },
      {
        teamName: '내일 운동 도전',
        leaderNickname: '운동내일',
        teamDescription: '게으르지만 노력하는 사람',
        maxParticipants: 1,
        currentParticipants: 1,
        password: '1111',
        tagList: [
          {
            tagId: 3,
            tagName: '성별',
            tagAttribute: '무관',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 12,
            tagName: '운동강도',
            tagAttribute: '약',
          },
        ],
      },
      {
        teamName: '하이핏',
        leaderNickname: '아임파인',
        teamDescription: '파인애플',
        maxParticipants: 7,
        currentParticipants: 2,
        password: null,
        tagList: [
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 4,
            tagName: '나이',
            tagAttribute: '10대',
          },
          {
            tagId: 10,
            tagName: '운동강도',
            tagAttribute: '약',
          },
          {
            tagId: 11,
            tagName: '운동강도',
            tagAttribute: '중',
          },
        ],
      },
      {
        teamName: '홈트라이',
        leaderNickname: '에브리러닝',
        teamDescription: '대학생들 운동 모임',
        maxParticipants: 13,
        currentParticipants: 10,
        password: null,
        tagList: [
          {
            tagId: 1,
            tagName: '성별',
            tagAttribute: '여성',
          },
          {
            tagId: 2,
            tagName: '성별',
            tagAttribute: '남성',
          },
          {
            tagId: 5,
            tagName: '나이',
            tagAttribute: '20대',
          },
          {
            tagId: 11,
            tagName: '운동강도',
            tagAttribute: '중',
          },
        ],
      },
      {
        teamName: '오운완',
        leaderNickname: '캔유러닝',
        teamDescription: '같이 운동할 사람 커먼',
        maxParticipants: 4,
        currentParticipants: 1,
        password: null,
        tagList: [
          {
            tagId: 3,
            tagName: '성별',
            tagAttribute: '무관',
          },
        ],
      },
    ],
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    last: true,
    numberOfElements: 3,
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      unpaged: false,
      paged: true,
    },
    empty: false,
  },
}

export default searchGroupMock
