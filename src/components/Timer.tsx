import { useEffect, useState } from "react"
import styled from '@emotion/styled'
import DateSelect from "./DateSelect"

const Timer: React.FC = () => {

    const [isActive, setIsActive] = useState(false)
    const [time, setTime] = useState(0)


    useEffect(() => {
        let interval: NodeJS.Timeout | undefined

        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 100)
            }, 100)
        } else if (!isActive && time !== 0) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isActive, time])


    const handleStart = () => {
        setIsActive(true)
    };

    const handleStop = () => {
        setIsActive(false)
    };

    const handleReset = () => {
        setIsActive(false)
        setTime(0)
    };

    const formatTime = (runningTime: number) => {
        const hours = Math.floor((runningTime / 3600000) % 24)
        const minutes = Math.floor((runningTime / 60000) % 60)
        const seconds = Math.floor((runningTime / 1000) % 60)
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };
    
    
    
  return (
    <div>
        <DateSelect />
        <TimerContainer>
            <TimerContent>{formatTime(time)}</TimerContent>
        </TimerContainer>
        <StopButton>

        </StopButton>
        <button type="button" onClick={handleStart}>Start</button>
        <button type="button" onClick={handleStop}>Stop</button>
        <button type="button" onClick={handleReset}>Reset</button>

    </div>
  )
}

const TimerContainer = styled.div`
    margin: 20px;
`

const TimerContent = styled.div`
    font-size: 42px;
    font-weight: 600;
    color: #FFFFFF;
    width: 310px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 17.362px 17.362px 20px 20px;
    border: 0px solid #F4F9FF;
    background: linear-gradient(180deg, #B9CCFF 0%, #8FADFF 100%);
`

const StopButton = styled.div`

`

export default Timer