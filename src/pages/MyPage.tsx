import styled from "@emotion/styled"
import Sneaker from '../assets/sneaker.png'
import Personal from '../assets/personal.png'

const MyPage = () => {
  return (
    <MypageWrapper>
      <MypageTitle>마이페이지</MypageTitle>
      <PersonalWrapper>
        <PersonalPicture src={Personal} width={90}/>
        <PersonalInfo>
          <PersonalName>홍길동님</PersonalName>
          <PersonalEmail>gildong@gmail.com</PersonalEmail>
        </PersonalInfo>
      </PersonalWrapper>
      <AttendWrapper>
        <AttendIcon src={Sneaker} width={30} />
        <AttendText>지금까지 <TextHighlight>97</TextHighlight>일 출석하였어요 !</AttendText>
      </AttendWrapper>
      <StaticWrapper>
        <StaticTitleContainer>
          <StaticIcon className='material-symbols-outlined'>equalizer</StaticIcon>
          <StaticText>통계</StaticText>
        </StaticTitleContainer>
        <MonthlyStatic>
          <MonthlyTitle>월별 통계</MonthlyTitle>
          <MonthlyTime>42:00:08</MonthlyTime>
        </MonthlyStatic>
        <WeeklyStatic>
          <WeeklyTitle>주간 통계</WeeklyTitle>
          <WeeklyTime>12:24:32</WeeklyTime>
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
  border: 2px solid #B5C3E9;
  padding: 20px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #F8FDFF 0%, #D7E0FF 100%);

`

const PersonalPicture = styled.img`
  margin-right: 25px;
  margin-left: 5px;
`

const PersonalInfo = styled.div`

`

const PersonalName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top: 10px;
`

const PersonalEmail = styled.div`
  font-size: 14px;
  color: #8E8E8E;
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
  color: #3F3F3F;
`

const TextHighlight = styled.div`
  color: #6D86CB;
`

const StaticWrapper = styled.div`
  margin: 10px 0;
`

const StaticTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  color: #3F3F3F;
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
  color: #6F6F6F;
  font-size: 18px;
`

const MonthlyTitle = styled.div`

`

const MonthlyTime = styled.div`

`

const WeeklyStatic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  color: #6F6F6F;
  font-size: 18px;
`

const WeeklyTitle = styled.div`

`

const WeeklyTime = styled.div`

`

export default MyPage
