const mainMock = {
    totalTime: 140000,
    exerciseList: [
        {
            exerciseId: 1, // Long (타입 논의 필요)
            exerciseName: '죽음의 타바타', // String
            exerciseTime: 600000, // Long 타입의 시간 (밀리초 단위)
            isActive: true, // boolean
            startTime: '2024-10-02T07:30:00Z',
        },
        {
            exerciseId: 2,
            exerciseName: '아침 스트레칭',
            exerciseTime: 800000,
            isActive: false,
            startTime: null,
        },
    ],
    diary: [
        {
            id: 1,
            time: '2024-10-01T07:00:00Z',
            memo: '오늘은 아침에 일어나서 계획한 대로 운동을 했다. 너무 뿌듯하다. 친구들과 함께 운동하니 운동 의욕이 커지는 것 같다.',
        },
        {
            id: 2,
            time: '2024-10-01T14:48:00.000Z',
            memo: '두번째 일기입니다~~',
        },
    ],
}

export default mainMock
