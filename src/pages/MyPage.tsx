import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import Sneaker from '../assets/sneaker.png'
import Personal from '../assets/personal.png'
import getMypage from '../api/getMypage'

const MyPage = () => {
  const [userName, setUserName] = useState('홍길동님')
  const [userEmail, setUserEmail] = useState('gildong@gmail.com')
  const [attendanceDay, setAttendanceDay] = useState(97)
  const [monthlyTotal, setMonthlyTotal] = useState('42:00:08')
  const [weeklyTotal, setWeeklyTotal] = useState('12:24:32')

  useEffect(() => {
    const fetchMypageData = async () => {
      try {
        const response = await getMypage()
        setUserName(response.nickName)
        setUserEmail(response.email)
        setAttendanceDay(response.attendance)
        setMonthlyTotal(response.weeklyTotal)
        setWeeklyTotal(response.weeklyTotal)
      } catch (error) {
        // 에러 처리하기
        // eslint-disable-next-line no-console
        console.error('마이페이지 데이터 가져오기 실패', error)
      }
    }

    fetchMypageData()
  }, [])

  return (
    <MypageWrapper>
      <MypageTitle>마이페이지</MypageTitle>
      <PersonalWrapper>
        <PersonalPicture src={Personal} width={90} />
        <PersonalInfo>
          <PersonalName>{userName}</PersonalName>
          <PersonalEmail>{userEmail}</PersonalEmail>
        </PersonalInfo>
      </PersonalWrapper>
      <AttendWrapper>
        <AttendIcon src={Sneaker} width={30} />
        <AttendText>
          지금까지 <TextHighlight>{attendanceDay}</TextHighlight>일 출석하였어요
          !
        </AttendText>
      </AttendWrapper>
      <StaticWrapper>
        <StaticTitleContainer>
          <StaticIcon className="material-symbols-outlined">
            equalizer
          </StaticIcon>
          <StaticText>통계</StaticText>
        </StaticTitleContainer>
        <MonthlyStatic>
          <MonthlyTitle>월별 통계</MonthlyTitle>
          <MonthlyTime>{monthlyTotal}</MonthlyTime>
        </MonthlyStatic>
        <WeeklyStatic>
          <WeeklyTitle>주간 통계</WeeklyTitle>
          <WeeklyTime>{weeklyTotal}</WeeklyTime>
        </WeeklyStatic>
      </StaticWrapper>
    </MypageWrapper>
  )
}

const MypageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 55px);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const MypageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 18px;
  font-weight: 500;
`

const PersonalWrapper = styled.div`
  border-radius: 10px;
  border: 2px solid #b5c3e9;
  padding: 20px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #f8fdff 0%, #d7e0ff 100%);
`

const PersonalPicture = styled.img`
  margin-right: 25px;
  margin-left: 5px;
`

const PersonalInfo = styled.div``

const PersonalName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
`

const PersonalEmail = styled.div`
  font-size: 14px;
  color: #8e8e8e;
`

const AttendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  padding: 35px 0;
`

const AttendIcon = styled.img`
  margin-right: 20px;
`

const AttendText = styled.div`
  letter-spacing: 0.5px;
  display: flex;
  white-space: pre;
  color: #3f3f3f;
`

const TextHighlight = styled.div`
  color: #6d86cb;
`

const StaticWrapper = styled.div`
  margin: 10px 0;
`

const StaticTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  color: #3f3f3f;
`

const StaticIcon = styled.div`
  margin-right: 10px;
`

const StaticText = styled.div`
  font-size: 20px;
  font-wieght: 500;
`

const MonthlyStatic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  color: #6f6f6f;
  font-size: 18px;
`

const MonthlyTitle = styled.div``

const MonthlyTime = styled.div``

const WeeklyStatic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  color: #6f6f6f;
  font-size: 18px;
`

const WeeklyTitle = styled.div``

const WeeklyTime = styled.div``

export default MyPage
