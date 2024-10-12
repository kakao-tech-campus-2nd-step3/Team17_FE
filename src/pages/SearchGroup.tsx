import { useState, ChangeEvent, SetStateAction } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import tagMock from '../mocks/TagMock'
import searchGroupMock, { Team } from '../mocks/SearchGroupMock'
import GroupList from '../components/GroupList'
import SearchBar from '../components/SearchBar'
import TagFilter from '../components/TagFilter'
import Modal from '../components/Modal'

const SearchGroup = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalType, setModalType] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<Team | null>(null)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(event.target.value)
  }

  const verifyPassword = () => {
    if (selectedGroup && password === selectedGroup.password) {
      setModalType('info')
    } else {
      setModalType('error')
    }
  }

  const toggleFilter = (tagId: number | null | undefined) => {
    if (tagId !== null && tagId !== undefined) {
      setActiveFilters(
        activeFilters.includes(tagId)
          ? activeFilters.filter((id) => id !== tagId)
          : [...activeFilters, tagId]
      )
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleGroupClick = (group: Team) => {
    setSelectedGroup(group)
    setPassword('')
    if (group.password) {
      setModalType('password')
    } else {
      setModalType('info')
    }
  }

  const closeModal = () => {
    setModalType('')
    setPassword('')
  }

  const joinGroup = (group: Team) => {
    alert(`${group.teamName}가입이 완료되었습니다.`)
  }

  const renderGroups = () => {
    const filteredGroups = searchGroupMock.Page.content.filter((group) =>
      group.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (filteredGroups.length === 0) {
      return <NoGroupsMessage>그룹이 존재하지 않습니다.</NoGroupsMessage>
    }
    return (
      <GroupList
        groups={searchGroupMock.Page.content.filter((group) =>
          group.teamName.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        showMenuButton={false}
        onCardClick={handleGroupClick}
      />
    )
  }

  const navigateToAddGroup = () => {
    navigate('/addGroup')
  }

  const renderModalContent = () => {
    // 추후 페이지네이션 처리
    if (!selectedGroup) {
      return <p>Loading...</p>
    }
    switch (modalType) {
      case 'password':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
            />
            <ModalBtnContainer>
              <CancelBtn onClick={closeModal}>취소</CancelBtn>
              <DoneBtn onClick={verifyPassword}>확인</DoneBtn>
            </ModalBtnContainer>
          </Modal>
        )
      case 'error':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <ModalText>비밀번호가 일치하지 않습니다.</ModalText>
            <ModalBtnContainer>
              <CancelBtn onClick={closeModal}>확인</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        )
      case 'info':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalHeader>
              <ModalTitle>{selectedGroup.teamName}</ModalTitle>
              <ModalParticipantCount>
                {selectedGroup.currentParticipants}/
                {selectedGroup.maxParticipants}명
                {selectedGroup.password && (
                  <LockIcon className="material-symbols-outlined">
                    lock
                  </LockIcon>
                )}
              </ModalParticipantCount>
            </ModalHeader>
            <ModlaContent>
              <ModalText>
                <ModalBold>그룹장 : </ModalBold>
                {selectedGroup.leaderNickname}
              </ModalText>
              <ModalText>
                <ModalBold>태그 : </ModalBold>#
                {selectedGroup.tagList.map((tag) => tag.tagName).join(' #')}
              </ModalText>
              <ModalText>
                <ModalBold>그룹소개 : </ModalBold>
                {selectedGroup.teamDescription}
              </ModalText>
              <ModalBtnContainer>
                <CancelBtn onClick={closeModal}>취소</CancelBtn>
                <DoneBtn onClick={() => joinGroup(selectedGroup)}>
                  그룹참여
                </DoneBtn>
              </ModalBtnContainer>
            </ModlaContent>
          </Modal>
        )
      default:
        return null
    }
  }

  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>그룹 탐색</PageTitle>
        <SearchBar onChange={handleSearchChange} value={searchTerm} />
        <TagFilter
          tags={tagMock.tagList}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />
        {renderGroups()}
        {renderModalContent()}
        <AddButton onClick={navigateToAddGroup}>+</AddButton>
      </PageContainer>
    </PageWrapper>
  )
}

export default SearchGroup

/* page */
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

const AddButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 220px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(181, 195, 233, 0.8);
  color: white;
  font-size: 24px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background-color: #b5c3e9;
  }
`

/* Modal */
const ModalHeader = styled.div`
  position: relative;
  width: 100%;
`
const ModalTitle = styled.div`
  font-size: 20px;
  padding: 10px;
  text-align: left;
  float: left;
`

const ModalParticipantCount = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  padding: 10px;
  margin: 6px 0 0 0;
`

const ModlaContent = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const ModalBold = styled.div`
  font-size: 12px;
  color: #707070;
  font-weight: 500;
  position: inline-block;
  width: 20%;
  float: left;
`

const ModalText = styled.p`
  font-size: 12px;
  color: #8e8e8e;
  margin: 10px;
  position: inline-block;
  float: left;
  width: 100%;
`

const Input = styled.input`
  border: transparent;
  border-bottom: 1px solid #b5c3e9;
  width: 96%;
  padding: 6px 7px;
  margin: 10px 0px;
  box-sizing: border-box;
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

const LockIcon = styled.span`
  color: #828282;
  position: absolute;
  font-size: 14px;
  margin-left: 5px;
`

const NoGroupsMessage = styled.div`
  font-size: 18px;
  margin-top: 40px;
  padding: 100px;
  text-align: center;
`
