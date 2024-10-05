import { useState, ChangeEvent, SetStateAction } from 'react';
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
  const [modalType, setModalType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Team | null>(null);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const verifyPassword = () => {
    if (selectedGroup && password === selectedGroup.password) {
      setModalType('info');  
    } 
    else {
      setModalType('error'); 
    }
  };


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
    setPassword('');
    if (group.password) {
      setModalType('password'); 
    } else {
      setModalType('info'); 
    }
  };

  const closeModal = () => {
    setModalType('');  
    setPassword('');
  };

  const joinGroup = (group : Team) => {
    alert(`${group.teamName}가입이 완료되었습니다.`);
  };

  const renderGroups = () => {
    const filteredGroups = searchGroupMock.Page.content.filter(group => 
      group.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredGroups.length === 0) {
      return <NoGroupsMessage>그룹이 존재하지 않습니다.</NoGroupsMessage>;
    }
    return <GroupList groups={filteredGroups} showMenuButton={false} onCardClick={handleGroupClick} />;
  };

  const renderModalContent = () => {
    if (!selectedGroup) {
      return <p>Loading...</p>;
    }
    switch (modalType) {
      case 'password':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} />
            <ModalBtnContainer>
              <CancelBtn onClick={closeModal}>취소</CancelBtn>
              <DoneBtn onClick={verifyPassword}>확인</DoneBtn>
            </ModalBtnContainer>
          </Modal>
        );
      case 'error':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <ModalText>비밀번호가 일치하지 않습니다.</ModalText>
            <ModalBtnContainer>
              <CancelBtn onClick={closeModal}>확인</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        );
      case 'info':
        return (
          <Modal isOpen onClose={closeModal}>
            <ModalContainer>
          <ModalTitle>{selectedGroup.teamName}</ModalTitle>
          <ModalNum>{selectedGroup.currentParticipants}/{selectedGroup.maxParticipants}명
          {selectedGroup.password && <LockIcon className="material-symbols-outlined">lock</LockIcon>}</ModalNum></ModalContainer>
          <ModlaCon>
          <ModalText><ModalBold>그룹장 : </ModalBold>{selectedGroup.leaderNickname}</ModalText>
          <ModalText><ModalBold>태그 : </ModalBold>#{selectedGroup.tagList.map(tag => tag.tagName).join(' #')}</ModalText>
          <ModalText><ModalBold>그룹소개 : </ModalBold>{selectedGroup.teamDescription}</ModalText>
          <ModalBtnContainer>
            <CancelBtn onClick={closeModal}>취소</CancelBtn>
            <DoneBtn onClick={() => joinGroup(selectedGroup)}>그룹참여</DoneBtn>
          </ModalBtnContainer>
          </ModlaCon>
          </Modal>
        );
      default:
        return null;
    }
    
  };

  return (
    <Wrapper>
      <Container>
        <Title>그룹 탐색</Title>
        <SearchBar onChange={handleSearchChange} value={searchTerm} />
        <TagFilter tags={tagMock.tagList} activeFilters={activeFilters} toggleFilter={toggleFilter} />
        {renderGroups()}
        <GroupList groups={searchGroupMock.Page.content.filter(group => group.teamName.toLowerCase().includes(searchTerm.toLowerCase()))}
                   showMenuButton={false} onCardClick={handleGroupClick} />
        {renderModalContent()}
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

const ModalContainer = styled.div`
  position : relative;
  width : 100%;
  `
const ModalTitle = styled.div`
  font-size: 20px;
  padding: 10px;
  text-align: left;
  float : left;
`;

const ModalNum = styled.div`
  font-size: 12px;
  color : #8E8E8E;
  padding: 10px;
  margin : 6px 0 0 0;
`;

const ModlaCon = styled.div`
  width : 100%;
  box-sizing: border-box;
`;

const ModalBold = styled.div`
  font-size : 12px;
  color : #707070;
  font-weight: 500;
  position : inline-block;
  width : 20%;
  float : left;
`

const ModalText = styled.p`
  font-size: 12px;
  color : #8E8E8E;
  margin: 10px;
  position : inline-block;
  float : left;
  width : 100%;
`;


const Input = styled.input`
  border : transparent;
  border-bottom : 1px solid #B5C3E9;
  width: 96%;
  padding: 6px 7px;
  margin: 10px 0px;
  box-sizing: border-box;
  outline: none;
`;


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
    color: #6D86CB;
    cursor: pointer;
`

const LockIcon = styled.span`
  color: #828282;
  position: absolute;
  font-size: 14px;
  margin-left: 5px;
`;

const NoGroupsMessage = styled.div`
  font-size: 18px;
  margin-top: 40px;
  padding : 100px;
  text-align: center;
`;