/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import styled from '@emotion/styled'
import { useState } from 'react'
import Timer from '../components/Timer'
import ExerciseList from '../components/ExerciseList'
import mainMock from '../mocks/MainMock'
import DiaryCreate from '../components/DiaryCreate'
import axiosInstance from '../api/axiosInstance'
import TodayDiary from '../components/TodayDiary'

const Main = () => {

  const [totalTime, setTotalTime] = useState(mainMock.totalTime)
  const [exerciseList, setExerciseList] = useState(mainMock.exerciseList)
  // const [diary, setDiary] = useState(mainMock.diary)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const isAnyActive = exerciseList.some(exercise => exercise.isActive)

  const [newDiary, setNewDiary] = useState("")
  const [diaryData, setDiaryData] = useState(mainMock.diary)

  const handleDiarySubmit = async () => {
    try {
      const response = await axiosInstance.post('/api/diary', {
        memo: newDiary
      })
      console.log('Diary 전송 성공', response.data)
      setNewDiary('')
    } catch(error) {
      console.error('Error submitting diary:', error)
    }
  }

  return (
    <MainWrapper>
        <DateContainer>
          <Timer totalTime={totalTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setExerciseList={setExerciseList} isAnyActive={isAnyActive} />
        </DateContainer>
        <Container>
          <ExerciseList selectedDate={selectedDate} exerciseList={exerciseList} setTotalTime={setTotalTime} setExerciseList={setExerciseList} />
        </Container>
        <Container>
          <DiaryCreate newDiary={newDiary} setNewDiary={setNewDiary} onSubmit={handleDiarySubmit} />
        </Container>
        <Container>
          <TodayDiary diaryData={diaryData} />
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
