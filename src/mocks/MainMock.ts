const mainMock = {
    totalTime: 140000,
    exerciseList: [
        {
            exerciseId: 1,  // Long (타입 논의 필요)
            exerciseName: "죽음의 타바타",  // String
            exerciseTime: 600000, // Long 타입의 시간 (밀리초 단위)
            isActive: true  // boolean
        },
        {
            exerciseId: 2,
            exerciseName: "아침 스트레칭",
            exerciseTime: 800000,
            isActive: true
        }
    ],
    diary: [
        {
            memo: "오늘은 아침에 일어나서 계획한 대로 운동을 했다. 너무 뿌듯하다. 친구들과 함께 운동하니 운동 의욕이 커지는 것 같다."
        }
    ]
};

export default mainMock