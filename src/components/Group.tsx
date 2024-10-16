import React from 'react'
import styled from '@emotion/styled'
import { Team } from '../mocks/GroupMock'
import { Tag } from '../mocks/TagMock'

interface GroupProps {
  group: Team
  showMenuButton: boolean
  onCardClick: (group: Team) => void
  onButtonClick?: (group: Team) => void
}

const Group: React.FC<GroupProps> = ({
  group,
  showMenuButton,
  onCardClick,
  onButtonClick,
}) => {
  const getTagAttributes = (tags: Tag[]): string[] => {
    return tags.map((tag) => tag.tagName)
  }
  // Group card 클릭 이벤트 핸들러
  const handleCardClick = () => {
    onCardClick(group)
  }

  // Menu 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (onButtonClick) {
      onButtonClick(group)
    }
  }
  Group.defaultProps = {
    onButtonClick: () => {},
  }
  return (
    <GroupCard onClick={handleCardClick}>
      <GroupName>{group.teamName}</GroupName>
      <GroupDetails>{group.leaderNickname}</GroupDetails>
      <GroupInfo>
        {group.currentParticipants}/{group.maxParticipants}명
        {group.password && (
          <LockIcon className="material-symbols-outlined">lock</LockIcon>
        )}
      </GroupInfo>
      <TagLine>#{getTagAttributes(group.tagList).join(' # ')}</TagLine>
      {showMenuButton && (
        <MenuButton onClick={handleButtonClick}>
          <Icon className="material-symbols-outlined">more_vert</Icon>
        </MenuButton>
      )}
    </GroupCard>
  )
}

export default Group

const GroupCard = styled.div`
  position: relative;
  max-width: 85%;
  padding: 15px 5px 0px 10px;
  margin: 5px 0;
  border-radius: 10px;
  background: linear-gradient(180deg, #f8fdff 0%, #d7e0ff 100%);
  border: 2px solid #b5c3e9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const GroupName = styled.div`
  color: #3f3f3f;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
`

const GroupDetails = styled.div`
  color: #8e8e8e;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
`

const GroupInfo = styled.div`
  color: #8e8e8e;
  font-size: 12px;
  font-weight: bold;
  margin-top: 5px;
`

const TagLine = styled.p`
  color: #8e8e8e;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`

const Icon = styled.div`
  color: #828282;
  font-weight: 300;
  padding: 5px 0 0 0;
  position: absolute;
  right: 0px;
`

const LockIcon = styled.span`
  color: #828282;
  position: absolute;
  font-size: 14px;
  margin-left: 5px;
`
