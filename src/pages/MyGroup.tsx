import React, { useState, ChangeEvent, useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getGroup,
  Team,
  verifyGroupPassword,
  TeamResponse,
} from '../api/getGroup'
import GroupListContainer from '../components/GroupListContainer'
import GroupModal from '../components/GroupModal'
import TagFilter from '../components/TagFilter'
import SearchBar from '../components/SearchBar'
import tagMock from '../mocks/TagMock'

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

const SearchGroup = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalType, setModalType] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<Team | undefined>(
    undefined
  )
  const [password, setPassword] = useState('')
  const [groups, setGroups] = useState<Team[]>([])
  const navigate = useNavigate()

  const {
    isLoading: groupsLoading,
    isError: groupsError,
    data,
  } = useQuery<TeamResponse, Error, Team[]>({
    queryKey: ['groupPage', { searchTerm, activeFilters }],
    queryFn: () => getGroup(0, 8, 'asc', searchTerm, activeFilters),
    select: (response: TeamResponse) => response.content,
  })

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setGroups(data)
    }
  }, [data])

  const verifyPasswordMutation = useMutation({
    mutationFn: (enteredPassword: string) =>
      verifyGroupPassword(selectedGroup!.id, enteredPassword),
  })

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
    setModalType(group.hasPassword ? 'password' : 'info')
  }

  const closeModal = () => {
    setModalType('')
    setPassword('')
  }

  const joinGroup = (group: Team) => {
    alert(`${group.teamName}가입이 완료되었습니다.`)
  }

  const navigateToAddGroup = () => {
    navigate('/addGroup')
  }

  if (groupsLoading) return <Loading />
  if (groupsError) return <Error />

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
        <GroupListContainer
          groups={groups}
          searchTerm={searchTerm}
          onCardClick={handleGroupClick}
        />
        <GroupModal
          modalType={modalType}
          selectedGroup={selectedGroup}
          password={password}
          onPasswordChange={handlePasswordChange}
          onVerifyPassword={() => verifyPasswordMutation.mutate(password)}
          onClose={closeModal}
          onJoinGroup={joinGroup}
        />
      </PageContainer>
      <AddButton onClick={navigateToAddGroup}>+</AddButton>
    </PageWrapper>
  )
}

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

const AddButton = styled.button`
  align-self: flex-end;
  margin-top: auto;
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 100px;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const LoadingText = styled.p`
  font-size: 20px;
  color: #555;
`

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #ffebee;
`

const ErrorMessage = styled.p`
  font-size: 20px;
  color: #b71c1c;
`

export default SearchGroup
