import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exercise } from './ExerciseList'
import putStopExercise from '../api/putStopExercise'

interface TimerProps {
  totalTime: number
  setExerciseList: React.Dispatch<React.SetStateAction<Exercise[]>>
  isAnyActive: boolean
  selectedDate: Date
  activeExerciseId?: number
}

export const formatTime = (runningTime: number) => {
  if (Number.isNaN(runningTime)) return '00:00:00'
  const hours = Math.floor((runningTime / 3600000) % 24)
  const minutes = Math.floor((runningTime / 60000) % 60)
  const seconds = Math.floor((runningTime / 1000) % 60)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const Timer: React.FC<TimerProps> = ({
  totalTime,
  setExerciseList,
  isAnyActive,
  selectedDate,
  activeExerciseId,
}) => {
  const queryClient = useQueryClient()

  const stopExercise = useMutation({
    mutationFn: putStopExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['main'] })
    },
  })

  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(totalTime)

  useEffect(() => {
    if (typeof totalTime === 'number' && !Number.isNaN(totalTime)) {
      setTime(totalTime)
    } else {
      setTime(0)
    }
  }, [totalTime])

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

  useEffect(() => {
    setTime(0)
    setIsActive(false)
  }, [selectedDate])

  useEffect(() => {
    if (typeof totalTime === 'number' && !Number.isNaN(totalTime)) {
      setTime(totalTime)
    } else {
      setTime(0)
    }
  }, [totalTime, selectedDate])

  const handleStop = () => {
    setIsActive(false)
    setExerciseList((prevList: Exercise[]) => {
      return prevList.map((exercise: Exercise) => ({
        ...exercise,
        isActive: false,
      }))
    })
    if (activeExerciseId) {
      stopExercise.mutate(activeExerciseId)
    }
  }

  return (
    <div>
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
