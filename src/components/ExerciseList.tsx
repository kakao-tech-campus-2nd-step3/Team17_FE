import styled from '@emotion/styled'
import { useEffect } from 'react';

export interface Exercise {
    exerciseId: number;
    exerciseName: string;
    exerciseTime: number;
    isActive: boolean;
}

interface ExerciseListProps {
    selectedDate: Date;
    exerciseList: Exercise[];
    setTotalTime: (time: number) => void;
    setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ selectedDate, exerciseList, setTotalTime, setExerciseList }) => {

    const today = new Date()
    const isToday = selectedDate.toDateString() === today.toDateString()

    useEffect(() => {
        if (!isToday) {
            // 오늘이 아니라면 해당 날짜의 exerciseList 출력
        }
    }, [isToday])

    useEffect(() => {
        // exerciseList가 변경될 때마다 전체 시간 업데이트
        const totalTime = exerciseList.reduce((total, exercise) => total + exercise.exerciseTime, 0)
        setTotalTime(totalTime)
    }, [exerciseList, setTotalTime])

    const handleExerciseClick = (exerciseId: number) => {
        const activeExercise = exerciseList.some(exercise => exercise.isActive)

        setExerciseList(prevList => 
            prevList.map(exercise => {
                // 다른 운동을 하고 있는 경우, 시작 못함
                if (activeExercise && !exercise.isActive) {
                    return exercise
                }
                // 클릭한 운동을 시작/정지
                return exercise.exerciseId === exerciseId
                ? { ...exercise, isActive: !exercise.isActive }
                : exercise
            })
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setExerciseList(prevList =>
                prevList.map(exercise =>
                    exercise.isActive
                        ? { ...exercise, exerciseTime: exercise.exerciseTime + 1000 }
                        : exercise
                )
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [exerciseList, setExerciseList])

    const handleListMenuClick = (event: React.MouseEvent) => {
        event?.stopPropagation()
    }

    const formatTime = (timeInMillis: number) => {
        const totalSeconds = Math.floor(timeInMillis / 1000)
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

  return (
    <Wrapper>
        <TitleContainer>
            <Title>상세 운동 내역</Title>
            <AddButton>+</AddButton>
        </TitleContainer>
        <ListContainer>
            {exerciseList.map((exercise) => (
                <ListElement key={exercise.exerciseId} onClick={() => handleExerciseClick(exercise.exerciseId)}>
                    <LeftContainer>
                        <PlayIcon className='material-symbols-outlined'>play_circle</PlayIcon>
                        <ExerciseTitle>{exercise.exerciseName}</ExerciseTitle>
                    </LeftContainer>
                    <RightContainer>
                        <ExerciseTime>{formatTime(exercise.exerciseTime)}</ExerciseTime>
                        <MenuIcon className='material-symbols-outlined' onClick={handleListMenuClick}>more_vert</MenuIcon>
                    </RightContainer>
                </ListElement>
            ))}
        </ListContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 5px;
`

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
`

const AddButton = styled.div`
    font-size: 24px;
    font-weight: 500;
    color: #86A1E9;
    cursor: pointer;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 0px;
`

const ListElement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 9px 0px;
`

const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const PlayIcon = styled.div`
    padding: 0 10px 0 3px ;
    color: #828282;
`

const ExerciseTitle = styled.div`
    color: #828282;
    font-weight: 500;
    font-size: 17px;
`

const ExerciseTime = styled.div`
    color: #828282;
    font-weight: 500;
    font-size: 18px;
`

const MenuIcon = styled.div`
    color: #828282;
    font-weight: 300;
    padding: 0 0 0 10px;
`

export default ExerciseList