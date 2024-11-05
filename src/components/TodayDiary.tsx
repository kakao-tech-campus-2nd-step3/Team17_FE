import styled from '@emotion/styled'
import { DateTime } from 'luxon'

interface DiaryData {
  id: number
  createdAt: string
  memo: string
}

interface TodayDiaryProps {
  diaryData: DiaryData[]
  // setDiaryData: React.Dispatch<React.SetStateAction<{ time: string; memo: string; }[]>>;
}

const TodayDiary: React.FC<TodayDiaryProps> = ({ diaryData }) => {
  return (
    <TodayDiaryWrapper>
      <TitleContainer>
        <Title>오늘의 일기</Title>
      </TitleContainer>
      {Array.isArray(diaryData) && diaryData.length > 0 ? (
        diaryData.map((diary) => (
          <DiaryContainer key={diary.id}>
            <DiaryTime>
              {DateTime.fromISO(diary.createdAt, { zone: 'utc' })
                .setZone('Asia/Seoul')
                .toFormat('HH:mm')}
            </DiaryTime>
            <DiaryContent>{diary.memo}</DiaryContent>
          </DiaryContainer>
        ))
      ) : (
        <NoDiaryMessage>오늘의 일기가 없습니다</NoDiaryMessage>
      )}
      {}
    </TodayDiaryWrapper>
  )
}

const TodayDiaryWrapper = styled.div``

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px 7px 5px;
  margin-bottom: 10px;
  margin-top: 3px;
  margin-left: 2px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const DiaryContainer = styled.div`
  padding: 0 5px;
  margin: 15px 0 30px 0;

  &:last-child {
    margin-bottom: 18px;
  }
`

const DiaryTime = styled.div`
    position: relative;
    display: inline:block;
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 12px;
    color: #626262;
    font-weight: 500;

    &::after {
        content: '';
        position: absolute;
        top: 52%;
        width: 238px;
        height: 1px;
        margin-left: 15px;
        background-color: #B5C3E9;
        vertical-align: middle;
    }
`

const DiaryContent = styled.div`
  border: 1.5px solid #b5c3e9;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  font-size: 14px;
  color: #555454;
`

const NoDiaryMessage = styled.div`
  text-align: center;
  color: #888888;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 30px;
`

export default TodayDiary
