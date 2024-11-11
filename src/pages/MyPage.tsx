import styled from '@emotion/styled'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Sneaker from '../assets/sneaker.png'
import Personal from '../assets/personal.png'
import getMypage from '../api/getMypage'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { formatTime } from '../components/Timer'
import putNickName from '../api/putNickname'
import Modal from '../components/Modal'
import deleteMember from '../api/deleteMember'

const MyPage = () => {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [newName, setNewName] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['mypage'],
    queryFn: getMypage,
    retry: 1,
  })

  // 닉네임 변경 로직
  const changeNickname = useMutation({
    mutationFn: putNickName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const handleClickName = () => {
    setIsModalOpen(true)
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleNameSubmit = () => {
    setIsModalOpen(false)
    changeNickname.mutate(newName)
  }

  // 회원 탈퇴 로직
  const deleteProfile = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypage'] })
    },
  })

  const handleClickExit = () => {
    setIsExitModalOpen(true)
  }

  const handleCloseExitModal = () => {
    setIsExitModalOpen(false)
  }

  const handleExitSubmit = () => {
    setIsExitModalOpen(false)
    window.localStorage.removeItem('authToken')
    deleteProfile.mutate()
  }

  if (isLoading) return <Loading />
  if (isError) return <Error name="마이페이지" />

  return (
    <MypageWrapper>
      <MypageTitle>마이페이지</MypageTitle>
      <PersonalWrapper>
        <PersonalPicture src={Personal} width={90} onClick={handleClickName} />
        <PersonalInfo>
          <PersonalName>{data?.nickname}</PersonalName>
          <PersonalEmail>{data?.email}</PersonalEmail>
          <ExitMember onClick={handleClickExit}>회원 탈퇴하기</ExitMember>
        </PersonalInfo>
      </PersonalWrapper>
      <AttendWrapper>
        <AttendIcon src={Sneaker} width={30} />
        <AttendText>
          지금까지 <TextHighlight>{data?.attendance}</TextHighlight>일
          출석하였어요 !
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
          <MonthlyTime>{formatTime(data?.monthlyTotal ?? 0)}</MonthlyTime>
        </MonthlyStatic>
        <WeeklyStatic>
          <WeeklyTitle>주간 통계</WeeklyTitle>
          <WeeklyTime>{formatTime(data?.weeklyTotal ?? 0)}</WeeklyTime>
        </WeeklyStatic>
      </StaticWrapper>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddTitle>닉네임 변경</AddTitle>
        <PutNickname
          placeholder="변경할 닉네임을 작성하세요"
          value={newName}
          onChange={handleChangeName}
        />
        <ModalBtnContainer>
          <CancelBtn onClick={handleCloseModal}>취소</CancelBtn>
          <DoneBtn onClick={handleNameSubmit}>완료</DoneBtn>
        </ModalBtnContainer>
      </Modal>
      <Modal isOpen={isExitModalOpen} onClose={handleCloseExitModal}>
        <AddTitle>회원 탈퇴하기</AddTitle>
        <ModalContent>
          <ModalContentLine>정말 홈트라이를 탈퇴하시겠습니까?</ModalContentLine>
          <ModalContentLine>
            지금까지의 운동 정보가 모두 사라집니다 🥲
          </ModalContentLine>
        </ModalContent>
        <ModalBtnContainer>
          <CancelBtn onClick={handleCloseExitModal}>취소</CancelBtn>
          <DoneBtn onClick={handleExitSubmit}>탈퇴</DoneBtn>
        </ModalBtnContainer>
      </Modal>
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
  padding: 20px 17px 10px 20px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #f8fdff 0%, #d7e0ff 100%);
`

const PersonalPicture = styled.img`
  margin-right: 25px;
  margin-left: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`

const PersonalInfo = styled.div`
  width: 100%;
`

const PersonalName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 7px;
  margin-top: 8px;
`

const PersonalEmail = styled.div`
  font-size: 14px;
  color: #8e8e8e;
`

const ExitMember = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: #69779f;
  margin-top: 18px;
  text-decoration: underline;
  cursor: pointer;
`

const AttendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 19px;
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
  font-size: 18px;
`

const MonthlyTitle = styled.div`
  color: #6f6f6f;
`

const MonthlyTime = styled.div`
  color: #6d86cb;
`

const WeeklyStatic = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 18px;
`

const WeeklyTitle = styled.div`
  color: #6f6f6f;
`

const WeeklyTime = styled.div`
  color: #6d86cb;
`

const AddTitle = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
`

const PutNickname = styled.input`
  width: 96%;
  padding: 3px 7px;
  margin: 10px 0px;
  box-sizing: border-box;
  border: none;
  outline: none;
`

const ModalContent = styled.div`
  margin-top: 5px;
  margin-bottom: 7px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`

const ModalContentLine = styled.div`
  color: #5d5d5d;
  margin-top: 5px;
  font-size: 15px;
`

const ModalBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const CancelBtn = styled.div`
  padding: 5px 15px;
  color: #969393;
  cursor: pointer;
`

const DoneBtn = styled.div`
  padding: 5px;
  color: #6d86cb;
  cursor: pointer;
`

export default MyPage
