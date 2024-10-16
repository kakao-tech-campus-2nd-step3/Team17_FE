import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import DateSelect from './DateSelect'
import { Exercise } from './ExerciseList'
// import axiosInstance from "../api/axiosInstance";

interface TimerProps {
  totalTime: number
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>
  isAnyActive: boolean
}

const Timer: React.FC<TimerProps> = ({
  totalTime,
  setExerciseList,
  isAnyActive,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(totalTime)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100)
      }, 100)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive])

  // useEffect(() => {
  //     setTime(0)
  //     setIsActive(false)
  // }, [selectedDate])

  useEffect(() => {
    setTime(totalTime)
  }, [totalTime])

  const handleStop = () => {
    setIsActive(false)
    setExerciseList((prevList: Exercise[]) => {
      return prevList.map((exercise: Exercise) => ({
        ...exercise,
        isActive: false,
      }))
    })
  }

  // 백엔드에서 시간 받아옴
  // const fetchTime = async (date: Date) => {
  //     const response = await axiosInstance.get(`/api/exercise/...`)
  //     const serverTime = response.data.time
  //     setTime(serverTime)
  // };

  // useEffect(() => {
  //     fetchTime(selectedDate)
  // }, [selectedDate])

  const formatTime = (runningTime: number) => {
    const hours = Math.floor((runningTime / 3600000) % 24)
    const minutes = Math.floor((runningTime / 60000) % 60)
    const seconds = Math.floor((runningTime / 1000) % 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <div>
      <DateSelect
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TimerContainer>
        <TimerContent>{formatTime(time)}</TimerContent>
      </TimerContainer>
      {isAnyActive && <StopButton onClick={handleStop}>운동 종료</StopButton>}
    </div>
  )
}

const TimerContainer = styled.div`
  margin: 20px 20px 15px 20px;
`

const TimerContent = styled.div`
  font-size: 45px;
  font-weight: 600;
  color: #ffffff;
  width: 315px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: linear-gradient(180deg, #b9ccff 0%, #8fadff 100%);
`

const StopButton = styled.div`
  width: 315px;
  height: 50px;
  background-color: #4b72ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 20px;
  border-radius: 12px;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 10px;
`

export default Timer
