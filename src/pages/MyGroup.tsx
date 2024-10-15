import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import GroupList from '../components/GroupList'
import searchGroupMock, { Team } from '../mocks/GroupMock'
import Modal from '../components/Modal'

const MyGroup = () => {
  const [groupType, setGroupType] = useState('joined')
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Team | null>(null)

  const navigate = useNavigate()

  // 현재 사용자의 닉네임 설정(추후 카카오톡 토큰 정보로 바꾸기)
  const currentUserNickname = 'myName'

  const filteredGroups = searchGroupMock.Page.content.filter((group) =>
    groupType === 'joined'
      ? group.leaderNickname !== currentUserNickname
      : group.leaderNickname === currentUserNickname
  )

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupType(event.target.value)
  }

  const handleGroupClick = (group: Team) => {
    setSelectedGroup(group)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setIsSecondModalOpen(false)
  }

  const openSecondModal = () => {
    setIsSecondModalOpen(true)
  }

  const closeSecondModal = () => {
    setIsSecondModalOpen(false)
    setModalOpen(false)
  }

  const handleMenuClick = (group: Team) => {
    navigate(`/ranking/${group.Id}`)
  }

  const renderGroups = () => {
    if (filteredGroups.length === 0) {
      return <NoGroupsMessage>그룹이 존재하지 않습니다.</NoGroupsMessage>
    }
    return (
      <GroupList
        groups={filteredGroups}
        showMenuButton
        onCardClick={handleMenuClick}
        onButtonClick={handleGroupClick}
      />
    )
  }

  const modalContent =
    groupType === 'joined' ? '그룹 탈퇴하기' : '그룹 삭제하기'

  // 백엔드 api 확인 후 그룹 구조 변경
  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>나의 그룹</PageTitle>
        <DropdownContainer>
          <select value={groupType} onChange={handleSelectChange}>
            <option value="joined">가입한 그룹</option>
            <option value="created">내가 만든 그룹</option>
          </select>
        </DropdownContainer>
        {renderGroups()}
        {/* 첫 번째 모달 */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalButton onClick={openSecondModal}>{modalContent}</ModalButton>
        </Modal>

        {/* 두 번째 모달 */}
        <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
          <ModalTitle>{modalContent}</ModalTitle>
          <ModalText
            placeholder={`'${selectedGroup?.teamName}'을 ${groupType === 'joined' ? '탈퇴하시겠습니까?' : '삭제하시겠습니까?'}`}
          />
          <ModalBtnContainer>
            <CancelBtn onClick={closeSecondModal}>취소</CancelBtn>
            <DoneBtn>완료</DoneBtn>
          </ModalBtnContainer>
        </Modal>
      </PageContainer>
    </PageWrapper>
  )
}

export default MyGroup

/* Page */
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f2f6;
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 55px);
  overflow-y: auto;
  overflow-x: hidden;
`

const PageContainer = styled.div`
  padding: 10px 15px 20px 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px 0px;
`

const PageTitle = styled.p`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
`

/* Dropdown */
const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0px 20px 10px 0px;
  width: 100%;
  select {
    padding: 4px 0px;
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid #ccc;
    font-size: 12px;
    cursor: pointer;
  }
`

/* Modal */
const ModalTitle = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
`

const ModalText = styled.input`
  width: 90%;
  padding: 0px 7px;
  margin: 10px 0px;
  border: none;
  outline: none;
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

const ModalButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #b5c3e9;
  }
`

const NoGroupsMessage = styled.div`
  font-size: 18px;
  margin-top: 40px;
  padding: 100px 0;
  text-align: center;
`
