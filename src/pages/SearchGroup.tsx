import { useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import tagMock from '../mocks/TagMock';
import searchGroupMock, { Team } from '../mocks/SearchGroupMock';
import GroupList from '../components/GroupList';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import Modal from '../components/Modal';

const SearchGroup = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Team | null>(null);

  const toggleFilter = (tagId: number | null | undefined) => {
    if (tagId !== null && tagId !== undefined) {
      setActiveFilters(activeFilters.includes(tagId)
        ? activeFilters.filter(id => id !== tagId)
        : [...activeFilters, tagId]
      );
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>)  => {
    setSearchTerm(event.target.value);
  };

  const handleGroupClick = (group: Team) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const filteredGroups = searchGroupMock.Page.content.filter(group =>
    group.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <Wrapper>
      <Container>
      <Title>그룹 탐색</Title>
      <SearchBar onChange={handleSearchChange} value={searchTerm}/>
      <TagFilter tags={tagMock.tagList} activeFilters={activeFilters} toggleFilter={toggleFilter}/>
      <GroupList groups={filteredGroups} showMenuButton = {false} onGroupClick={handleGroupClick} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      {selectedGroup ? (
          <>
            <p>{selectedGroup.teamName}</p>
            <p>{selectedGroup.leaderNickname}</p>
            {/* 추가적인 그룹 정보를 여기에 렌더링 */}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
      <AddButton>+</AddButton>
      </Container>
    </Wrapper>
  );
};


export default SearchGroup;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #F2F2F6;
  padding : 20px;
  box-sizing: border-box;
  height: calc(100vh - 55px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const Container = styled.div`
  padding: 10px 15px 20px 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px 0px;
`

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
`;

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
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  &:hover {
    background-color: #B5C3E9;
  }
`;
