import { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import styled from '@emotion/styled'

interface DateSelectProps {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

const DateSelect: React.FC<DateSelectProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const formattedDate = format(selectedDate, 'yyyy년 M월 d일 (EEE)', {
    locale: ko,
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
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
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
    setIsCalendarOpen(false)
  }

  return (
    <DateSelectWrapper>
      <DateSelectContainer>
        <DateSelecter onClick={handlePrev}>{'<'}</DateSelecter>
        <DateSelection onClick={handleDateClick}>{formattedDate}</DateSelection>
        <DateSelecter onClick={handleNext}>{'>'}</DateSelecter>
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
    </DateSelectWrapper>
  )
}

const DateSelectWrapper = styled.div``

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DateSelecter = styled.div`
  font-size: 25px;
  cursor: pointer;
  font-weight: 500;
`

const DateSelection = styled.div`
  font-size: 20px;
  padding: 3px 40px;
  cursor: pointer;
  font-weight: 500;
`

const CalendarContainer = styled.div`
  background-color: #ffffff;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 10;
`

export default DateSelect
