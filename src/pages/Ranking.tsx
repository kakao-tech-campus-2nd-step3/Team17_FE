/* eslint-disable no-console */
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Duration } from 'luxon'
import { useNavigate, useParams } from 'react-router'
import DateSelect from '../components/DateSelect'
import RankingMock from '../mocks/RankingMock'
import axiosInstance from '../api/axiosInstance'
import chatbubble from '../assets/chatbubble.svg'

const Ranking = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [rankData, setRankData] = useState(RankingMock)

  const formatDuration = (isoDuration: string) => {
    const duration = Duration.fromISO(isoDuration)
    const hours = String(duration.hours).padStart(2, '0')
    const minutes = String(duration.minutes).padStart(2, '0')
    const seconds = String(duration.seconds).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/team/${groupId}/ranking?page=0&size=7&sort=time,asc&year=2024&month=7&day=26`
        )
        setRankData(response.data)
      } catch (error) {
        console.error('랭크 데이터 가져오기 실패', error)
      }
    }
    fetchRankingData()
  }, [groupId])

  const handleBeforeClick = () => {
    navigate('/mygroup')
  }
  const handleChatClick = () => {
    navigate(`/chat/${groupId}`)
  }

  return (
    <RankingWrapper>
      <TitleContainer>
        <BeforeButton onClick={handleBeforeClick}>&lt;</BeforeButton>
        <Title>매일 운동 도전</Title>
        <Space></Space>
      </TitleContainer>
      <RankContainer>
        <DateContainer>
          <DateSelect
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </DateContainer>
        <EntireRank>
          {rankData.Page.content.map((ranker, index) => (
            <RankElement key={ranker.name} index={index}>
              <RankerCount index={index}>{index + 1}</RankerCount>
              <RankerName>{ranker.name}</RankerName>
              <RankerTime>{formatDuration(ranker.time)}</RankerTime>
            </RankElement>
          ))}
        </EntireRank>
      </RankContainer>
      <MyRank>
        <MyRankElement ranking={rankData.myRanking}>
          <MyRankerCount ranking={rankData.myRanking}>
            {rankData.myRanking}
          </MyRankerCount>
          <RankerName>{rankData.myNickname}</RankerName>
          <RankerTime>{formatDuration(rankData.myTime)}</RankerTime>
        </MyRankElement>
      </MyRank>
      <ChatButton onClick={handleChatClick}>
        <ChatIcon src={chatbubble} alt="chat icon" />
      </ChatButton>
    </RankingWrapper>
  )
}

const RankingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 55px);
  background-color: #f2f2f6;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

const BeforeButton = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #5673c1;
  cursor: pointer;
`

const Title = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #5673c1;
`

const Space = styled.div``

const RankContainer = styled.div`
  border: 1px solid #b5c3e9;
  border-radius: 10px;
`

const DateContainer = styled.div`
  padding: 15px 0;
  color: #4a4a4a;
`

const EntireRank = styled.div`
  height: 470px;
  overflow-y: auto;
`

const MyRank = styled.div`
  border: 1px solid #b5c3e9;
  border-radius: 10px;
  margin-top: 20px;
`

const MyRankElement = styled.div<{ ranking: number }>`
  display: flex;
  font-size: 18px;
  padding: 10px 20px;
  background: ${(props) => {
    if (props.ranking === 1)
      return 'linear-gradient(90deg, #FFF 0%, #FFC329 100%)'
    if (props.ranking === 2)
      return 'linear-gradient(90deg, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.23) 100%)'
    if (props.ranking === 3)
      return 'linear-gradient(90deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 170, 70, 0.30) 100%)'
    return ''
  }};
`

const MyRankerCount = styled.div<{ ranking: number }>`
  padding: 10px;
  margin-left: 5px;
  font-weight: 500;
  color: ${(props) => {
    if (props.ranking === 1) return '#D7C100'
    if (props.ranking === 2) return '#989898'
    if (props.ranking === 3) return '#B46100'
    return ''
  }};
`

interface RankElementProps {
  index: number
}

const RankElement = styled.div<RankElementProps>`
  display: flex;
  padding: 10px 20px;
  border-top: 1px solid #b5c3e9;
  align-items: center;
  background: ${(props) => {
    if (props.index === 0)
      return 'linear-gradient(90deg, #FFF 0%, #FFC329 100%)'
    if (props.index === 1)
      return 'linear-gradient(90deg, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.23) 100%)'
    if (props.index === 2)
      return 'linear-gradient(90deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 170, 70, 0.30) 100%)'
    return ''
  }};
`

const RankerCount = styled.div<RankElementProps>`
  padding: 10px;
  margin-left: 5px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => {
    if (props.index === 0) return '#D7C100'
    if (props.index === 1) return '#989898'
    if (props.index === 2) return '#B46100'
    return ''
  }};
`

const RankerName = styled.div`
  padding: 10px;
  margin-left: 25px;
  font-size: 18px;
`

const RankerTime = styled.div`
  padding: 10px;
  margin-left: auto;
  color: #4a4a4a;
  font-size: 18px;
`

const ChatButton = styled.div`
  position: absolute;
  right: -10px;
  bottom: 37px;
  transform: translateX(-50%);
  background-color: #b5c3e9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  cursor: pointer;
`

const ChatIcon = styled.img`
  width: 33px;
  height: 33px;
  padding: 13px 11px 13px 14px;
`

export default Ranking
