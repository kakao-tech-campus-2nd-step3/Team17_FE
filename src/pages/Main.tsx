import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import Timer from '../components/Timer'
import ExerciseList, { Exercise } from '../components/ExerciseList'
import mainMock from '../mocks/MainMock'
import DiaryCreate from '../components/DiaryCreate'
import axiosInstance from '../api/axiosInstance'
import TodayDiary from '../components/TodayDiary'

const Main = () => {
  const [totalTime, setTotalTime] = useState(mainMock.totalTime)
  const [exerciseList, setExerciseList] = useState<Exercise[]>(
    mainMock.exerciseList
  )
  const [diary, setDiary] = useState(mainMock.diary)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date())
  const isAnyActive = exerciseList.some((exercise) => exercise.isActive)

  const [newDiary, setNewDiary] = useState('')

  // 메인페이지 통신 코드 초안
  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axiosInstance.get('/api')
        const fetchData = response.data

        setTotalTime(fetchData.totalTime)
        setExerciseList(fetchData.exerciseList)
        setDiary(fetchData.diary)

        const activeExercise = fetchData.find(
          (exercise: Exercise) => exercise.isActive
        )
        if (activeExercise && activeExercise.startTime) {
          const elapsedTime = Date.now() - new Date(activeExercise).getTime()
          setTotalTime((prevTime) => prevTime + elapsedTime)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('운동 리스트 불러오기 실패', error)
      }
    }

    fetchExercise()
  }, [])

  const handleDiarySubmit = async () => {
    try {
      const response = await axiosInstance.post('/api/diary', {
        memo: newDiary,
      })
      // eslint-disable-next-line no-console
      console.log('Diary 전송 성공', response.data)
      setNewDiary('')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting diary:', error)
    }
  }

  return (
    <MainWrapper>
      <DateContainer>
        <Timer
          totalTime={totalTime}
          setExerciseList={setExerciseList}
          isAnyActive={isAnyActive}
        />
      </DateContainer>
      <Container>
        <ExerciseList
          selectedDate={selectedDate}
          exerciseList={exerciseList}
          setTotalTime={setTotalTime}
          setExerciseList={setExerciseList}
        />
      </Container>
      <Container>
        <DiaryCreate
          newDiary={newDiary}
          setNewDiary={setNewDiary}
          onSubmit={handleDiarySubmit}
        />
      </Container>
      <Container>
        <TodayDiary diaryData={diary} />
      </Container>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 55px);
  overflow-y: auto;
  background-color: #f2f2f6;
  padding: 20px;
  box-sizing: border-box;
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 20px 10px 20px;
  border-radius: 10px;
  margin: 20px 0px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 20px 0px;
`

export default Main
