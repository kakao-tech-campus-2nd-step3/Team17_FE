import { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import 'react-day-picker/style.css'
import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import styled from "@emotion/styled"

const DateSelect = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const formattedDate = format(selectedDate, "yyyy년 M월 d일 (EEE)", { locale: ko });
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
    const calendarRef = useRef<HTMLDivElement>(null)

    const handelPrev = () => {
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
    }

    const handleNext = () => {
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
    }

    const handleDateClick = () => {
        setIsCalendarOpen(!isCalendarOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleDateSelect = (date: Date | undefined) => {
        if(date) {
            setSelectedDate(date)
        }
        setIsCalendarOpen(false)
    }

  return (
    <Wrapper>
        <DateSelectContainer>
            <DateSelecter onClick={handelPrev}>{"<"}</DateSelecter>
            <DateSelection onClick={handleDateClick}>{formattedDate}</DateSelection>
            <DateSelecter onClick={handleNext}>{">"}</DateSelecter>
        </DateSelectContainer>
        {isCalendarOpen && (
            <CalendarContainer ref={calendarRef}>
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    locale={ko}
                />
            </CalendarContainer>
        )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F2F2F6;
    padding: 50px 15px 20px 15px;
    box-sizing: border-box;
`

const DateSelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
`

const DateSelecter = styled.div`
    font-size: 25px;
    cursor: pointer;
`

const DateSelection = styled.div`
    font-size: 20px;
    padding: 3px 20px;
    cursor: pointer;
`
const CalendarContainer = styled.div`
    background-color: #ffffff;
    justify-content: center;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    z-index: 10;
    /* position: absolute; */
`


export default DateSelect