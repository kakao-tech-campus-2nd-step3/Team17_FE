import styled from '@emotion/styled'
import React, { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import tagMock from '../mocks/TagMock'
import searchGroupMock, { Team } from '../mocks/GroupMock'
import GroupListContainer from '../components/GroupListContainer'
import GroupModal from '../components/GroupModal'
import TagFilter from '../components/TagFilter'
import SearchBar from '../components/SearchBar'

const SearchGroup = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [modalType, setModalType] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<Team | undefined>(
    undefined
  )
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const navigateToAddGroup = () => {
    navigate('/addGroup')
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
        <GroupListContainer
          groups={searchGroupMock.Page.content}
          searchTerm={searchTerm}
          onCardClick={handleGroupClick}
        />
        <GroupModal
          modalType={modalType}
          selectedGroup={selectedGroup}
          password={password}
          onPasswordChange={handlePasswordChange}
          onVerifyPassword={verifyPassword}
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

export default SearchGroup
