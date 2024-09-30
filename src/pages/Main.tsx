import styled from '@emotion/styled'
import { useState } from 'react'
import Timer from '../components/Timer'
import ExerciseList from '../components/ExerciseList'
import mainMock from '../mocks/MainMock'

const Main = () => {

  const [totalTime, setTotalTime] = useState(mainMock.totalTime)
  const [exerciseList, setExerciseList] = useState(mainMock.exerciseList)
  // const [diary, setDiary] = useState(mainMock.diary)
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <MainWrapper>
        <DateContainer>
          <Timer totalTime={totalTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setExerciseList={setExerciseList} />
        </DateContainer>
        <Container>
          <ExerciseList selectedDate={selectedDate} exerciseList={exerciseList} setTotalTime={setTotalTime} setExerciseList={setExerciseList} />
        </Container>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
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
  padding: 20px;
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
