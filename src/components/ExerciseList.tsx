import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Modal from './Modal'
import postExercise from '../api/postExercise'
import postStartExercise from '../api/postStartExercise'
import deleteExerciseApi from '../api/deleteExerciseApi'

export interface Exercise {
  exerciseId: number
  exerciseName: string
  exerciseTime: number
  isActive: boolean
  startTime: string | null
}

interface ExerciseListProps {
  exerciseList: Exercise[]
  setTotalTime: (time: number) => void
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exerciseList,
  setTotalTime,
  setExerciseList,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [exerciseNew, setExerciseNew] = useState('')
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null)
      }
    }

    // 메뉴가 활성화되어 있을 때만 이벤트 리스너 추가
    if (activeMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeMenuId])

  const addExercise = useMutation({
    mutationFn: postExercise,
  })

  const startExercise = useMutation({
    mutationFn: postStartExercise,
  })

  const deleteExercise = useMutation({
    mutationFn: deleteExerciseApi,
  })

  const handleDeleteClick = (exerciseId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    // eslint-disable-next-line no-console
    console.log('Delete 버튼 클릭')
    deleteExercise.mutate(exerciseId)
  }

  const handleExerciseNewChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExerciseNew(event.target.value)
  }

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
    if (activeExercise) return

    // 클릭한 운동 찾기
    const exerciseToStart = exerciseList.find(
      (exercise) => exercise.exerciseId === exerciseId
    )

    if (exerciseToStart) {
      try {
        // 운동 시작 요청
        await startExercise.mutateAsync(exerciseId)

        // 상태 업데이트
        setExerciseList((prevList) =>
          prevList.map((exercise) => {
            if (exercise.exerciseId === exerciseId) {
              return { ...exercise, isActive: true }
            }
            return exercise
          })
        )
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('운동 시작 요청 실패:', error)
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setExerciseList((prevList) =>
        prevList.map((exercise) =>
          exercise.isActive
            ? {
                ...exercise,
                exerciseTime: exercise.exerciseTime + 1000,
              }
            : exercise
        )
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [exerciseList, setExerciseList])

  const handleListMenuClick =
    (exerciseId: number) => (event: React.MouseEvent) => {
      event?.stopPropagation()

      if (activeMenuId !== exerciseId) {
        setActiveMenuId(exerciseId)
      } else {
        setActiveMenuId(null)
      }
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

  const handleExerciseSubmit = async () => {
    await addExercise.mutateAsync(exerciseNew)
    setIsModalOpen(false)
    setExerciseNew('')
  }

  return (
    <ExerciseWrapper>
      <TitleContainer>
        <Title>상세 운동 내역</Title>
        <AddButton onClick={handleAddClick}>+</AddButton>
      </TitleContainer>
      <ListContainer>
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise) => (
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
                  onClick={handleListMenuClick(exercise.exerciseId)}
                >
                  more_vert
                </MenuIcon>
                {activeMenuId === exercise.exerciseId && (
                  <MenuContainer>
                    <DeleteBtn
                      className="deleteBtn"
                      ref={menuRef}
                      onClick={(event) =>
                        handleDeleteClick(exercise.exerciseId, event)
                      }
                    >
                      운동 삭제하기
                    </DeleteBtn>
                  </MenuContainer>
                )}
              </RightContainer>
            </ListElement>
          ))
        ) : (
          <NoExerciseMessage>운동 내역이 없습니다</NoExerciseMessage>
        )}
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
    </ExerciseWrapper>
  )
}

interface ListElementProps {
  isActive: boolean
}

const ExerciseWrapper = styled.div``

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
  position: relative;
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

const MenuContainer = styled.div`
  border: 2px solid #a1b6e8;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f2f7ff;
  z-index: 10;
`

const DeleteBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #868686;
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

const NoExerciseMessage = styled.div`
  text-align: center;
  color: #888888;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 30px;
`

export default ExerciseList
