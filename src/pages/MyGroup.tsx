import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import GroupList from '../components/GroupList'
import Modal from '../components/Modal'
import {
  MyTeam,
  getMyGroup,
  deleteTeam,
  withdrawFromTeam,
} from '../api/getGroup'
import getMypage from '../api/getMypage'

const Error = () => (
  <ErrorContainer>
    <ErrorMessage>오류가 발생했습니다.</ErrorMessage>
  </ErrorContainer>
)

const Loading = () => (
  <LoadingContainer>
    <LoadingText>로딩 중...</LoadingText>
  </LoadingContainer>
)

const MyGroup = () => {
  const [groupType, setGroupType] = useState('all')
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<MyTeam | null>(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const fetchGroup = () => {
    return getMyGroup(
      0,
      8,
      groupType === 'joined' ? 'teamId,asc' : 'teamId,desc'
    )
  }

  const {
    data: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useQuery({
    queryKey: ['myGroups', groupType],
    queryFn: fetchGroup,
    retry: 1,
  })

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ['userDetails'],
    queryFn: getMypage,
    retry: 1,
  })

  const currentUserNickname = userData?.nickname

  if (groupsLoading || userLoading) return <Loading />
  if (groupsError || userError) return <Error />

  const filteredGroups =
    groups?.content.filter((group) => {
      if (groupType === 'all') {
        return true
      }
      if (groupType === 'joined') {
        return group.leaderNickname !== currentUserNickname
      }
      return group.leaderNickname === currentUserNickname
    }) || []

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupType(event.target.value)
    queryClient.invalidateQueries({
      queryKey: ['myGroups'],
    })
  }

  const handleGroupClick = (group: MyTeam) => {
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

  const handleMenuClick = (group: MyTeam) => {
    navigate(`/ranking/${group.id}`)
  }

  const handleAction = async () => {
    if (selectedGroup && selectedGroup.id) {
      if (selectedGroup.leaderNickname === currentUserNickname) {
        await deleteTeam(selectedGroup.id)
      } else {
        await withdrawFromTeam(selectedGroup.id)
      }
      closeModal()
      queryClient.invalidateQueries({
        queryKey: ['myGroups', groupType],
      })
    } else {
      closeModal()
    }
  }

  const renderGroups = () => {
    if (!filteredGroups || filteredGroups.length === 0) {
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
    selectedGroup?.leaderNickname === currentUserNickname
      ? '그룹 삭제하기'
      : '그룹 탈퇴하기'

  return (
    <PageWrapper>
      <PageContainer>
        <PageTitle>나의 그룹</PageTitle>
        <DropdownContainer>
          <select value={groupType} onChange={handleSelectChange}>
            <option value="all">전체 그룹</option>
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
            placeholder={`'${selectedGroup?.teamName}'을 ${
              selectedGroup?.leaderNickname === currentUserNickname
                ? '삭제하시겠습니까?'
                : '탈퇴하시겠습니까?'
            }`}
          />
          <ModalBtnContainer>
            <CancelBtn onClick={closeSecondModal}>취소</CancelBtn>
            <DoneBtn onClick={handleAction}>완료</DoneBtn>
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
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 55px);
  overflow-y: auto;
  overflow-x: hidden;
`

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  margin-bottom: 150px;
  padding: 100px 0;
  text-align: center;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const LoadingText = styled.p`
  font-size: 20px;
`

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const ErrorMessage = styled.p`
  font-size: 20px;
`
