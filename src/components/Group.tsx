import React from 'react';
import styled from '@emotion/styled';
import { Team } from '../mocks/SearchGroupMock';
import { Tag } from '../mocks/TagMock';

interface GroupProps {
  group: Team; 
  showMenuButton: boolean;
  onMenuClick: (group: Team) => void; 
}

const Group: React.FC<GroupProps> = ({ group, showMenuButton, onMenuClick }) => {
    const getTagAttributes = (tags: Tag[]): string[] => {
        return tags.map(tag => tag.tagAttribute);
      };  
  return (
    <GroupCard>
      <GroupName>{group.teamName}</GroupName>
      <GroupDetails>{group.leaderNickname}</GroupDetails>
      <GroupInfo>{group.currentParticipants}/{group.maxParticipants}명
      {group.password && <LockIcon className="material-symbols-outlined">lock</LockIcon>}
      </GroupInfo>
      <TagLine>#{getTagAttributes(group.tagList).join(' # ')}</TagLine>
      {showMenuButton && (
        <MenuButton onClick={() => onMenuClick(group)}>
        <Icon className="material-symbols-outlined">more_vert</Icon>
      </MenuButton>
      )}
    </GroupCard>
  );
};

export default Group;

const GroupCard = styled.div`
position: relative;
  width: 90%;
  padding: 15px 5px 0px 20px;
  margin: 5px 0;
  border-radius: 15px;
  background: linear-gradient(180deg, #F8FDFF 0%, #D7E0FF 100%);
  border: 2px solid #B5C3E9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor : pointer;
`;

const GroupName = styled.div`
  color: #3F3F3F;
  font-size: 14px;
  font-weight: bold;
  margin-top : 5px;
`;

const GroupDetails = styled.div`
  color: #8E8E8E;
  font-size: 12px;
  font-weight: bold;
  margin-top : 5px;
`;

const GroupInfo = styled.div`
  color: #8E8E8E;
  font-size: 12px;
  font-weight: bold;
  margin-top : 5px;
`;

const TagLine = styled.p`
  color: #8E8E8E;
  font-size: 12px;
  font-weight: bold;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const Icon = styled.div`
    color: #828282;
    font-weight: 300;
    padding: 5px 0 0 10px;
`;

const LockIcon = styled.span`
  color: #828282;
  position: absolute;
  font-size: 14px;
  margin-left: 5px;
`;
