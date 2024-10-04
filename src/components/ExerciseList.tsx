/* eslint-disable no-console */
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import axiosInstance from '../api/axiosInstance'

export interface Exercise {
  exerciseId: number
  exerciseName: string
  exerciseTime: number
  isActive: boolean
  startTime: string | null
}

interface ExerciseListProps {
  selectedDate: Date
  exerciseList: Exercise[]
  setTotalTime: (time: number) => void
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  selectedDate,
  exerciseList,
  setTotalTime,
  setExerciseList,
}) => {
  const today = new Date()
  const isToday = selectedDate.toDateString() === today.toDateString()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exerciseNew, setExerciseNew] = useState('')

  const handleExerciseNewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExerciseNew(event.target.value)
  }

  useEffect(() => {
    if (!isToday) {
      // 오늘이 아니라면 해당 날짜의 exerciseList 출력
    }
  }, [isToday])

  useEffect(() => {
    // exerciseList가 변경될 때마다 전체 시간 업데이트
    const totalTime = exerciseList.reduce(
      (total, exercise) => total + exercise.exerciseTime,
      0
    )
    setTotalTime(totalTime)
  }, [exerciseList, setTotalTime])

  const handleExerciseClick = async (exerciseId: number) => {
    const activeExercise = exerciseList.some((exercise) => exercise.isActive)

    // 다른 운동을 하고 있는 경우, 아무것도 하지 않음
    if (activeExercise) {
      return
    }

    setExerciseList((prevList) =>
      prevList.map((exercise) => {
        // 클릭한 운동을 시작/정지
        return exercise.exerciseId === exerciseId
          ? { ...exercise, isActive: true }
          : exercise
      })
    )

    // 서버에 시작한 운동 post 코드 작성하기 (초안)
    try {
      const response = await axiosInstance.post(`/api/exercise/${exerciseId}`, {
        exerciseId,
        startTime: new Date().toISOString,
      })
      console.log('운동 시작 전송 성공', response.data)
    } catch (error) {
      console.error('운동 시작 전송 실패', error)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setExerciseList((prevList) =>
        prevList.map((exercise) =>
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

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setExerciseNew('')
  }

  const handleExerciseSubmit = () => {
    // 서버로 새 운동이름 post 코드 작성
    // console.log(exerciseNew)
    setIsModalOpen(false)
    setExerciseNew('')
  }

  return (
    <Wrapper>
      <TitleContainer>
        <Title>상세 운동 내역</Title>
        <AddButton onClick={handleAddClick}>+</AddButton>
      </TitleContainer>
      <ListContainer>
        {exerciseList.map((exercise) => (
          <ListElement
            key={exercise.exerciseId}
            isActive={exercise.isActive}
            onClick={() => handleExerciseClick(exercise.exerciseId)}
          >
            <LeftContainer>
              <PlayIcon className="material-symbols-outlined">
                {exercise.isActive ? 'pause_circle' : 'play_circle'}
              </PlayIcon>
              <ExerciseTitle>{exercise.exerciseName}</ExerciseTitle>
            </LeftContainer>
            <RightContainer>
              <ExerciseTime>{formatTime(exercise.exerciseTime)}</ExerciseTime>
              <MenuIcon
                className="material-symbols-outlined"
                onClick={handleListMenuClick}
              >
                more_vert
              </MenuIcon>
            </RightContainer>
          </ListElement>
        ))}
      </ListContainer>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddTitle>운동이름</AddTitle>
        <AddExerciseName
          placeholder="ex) 아침 스트레칭, 복근 운동"
          value={exerciseNew}
          onChange={handleExerciseNewChange}
        />
        <ModalBtnContainer>
          <CancelBtn onClick={handleCloseModal}>취소</CancelBtn>
          <DoneBtn onClick={handleExerciseSubmit}>완료</DoneBtn>
        </ModalBtnContainer>
      </Modal>
    </Wrapper>
  )
}

interface ListElementProps {
  isActive: boolean
}

const Wrapper = styled.div``

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
  color: #86a1e9;
  cursor: pointer;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
`

const ListElement = styled.div<ListElementProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 9px 0px;
  background-color: ${({ isActive }) => (isActive ? '#DCEFFF' : 'transparent')};
  border-radius: 5px;
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
  padding: 0 10px 0 4px;
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

const AddTitle = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
`

const AddExerciseName = styled.input`
  width: 96%;
  padding: 0px 7px;
  margin: 10px 0px;
  box-sizing: border-box;
  border: none;
  outline: none;
`

const ModalBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const CancelBtn = styled.div`
  padding: 5px 15px;
  color: #969393;
  cursor: pointer;
`

const DoneBtn = styled.div`
  padding: 5px;
  color: #6d86cb;
  cursor: pointer;
`

export default ExerciseList
