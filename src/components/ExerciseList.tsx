import styled from '@emotion/styled'
import { useEffect } from 'react';

interface Exercise {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExerciseList: React.FC<ExerciseListProps> = ({ selectedDate, exerciseList, setTotalTime, setExerciseList }) => {

    const today = new Date()
    const isToday = selectedDate.toDateString() === today.toDateString()

    useEffect(() => {
        if (!isToday) {
            // 오늘이 아니라면 해당 날짜의 exerciseList 출력
        }
    }, [isToday])

    const handleExerciseClick = () => {
        
    }

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
                <ListElement key={exercise.exerciseId} onClick={handleExerciseClick}>
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