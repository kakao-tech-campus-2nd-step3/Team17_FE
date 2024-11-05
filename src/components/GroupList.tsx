import React from 'react'
import styled from '@emotion/styled'
import Group from './Group'
import { Team } from '../api/getGroup'

interface GroupListProps {
  groups: Team[]
  showMenuButton: boolean
  onCardClick: (group: Team) => void
  onButtonClick?: (group: Team) => void
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  showMenuButton,
  onCardClick,
  onButtonClick = () => {},
}) => {
  return (
    <GroupContainer>
      {groups.map((group) => (
        <Group
          key={group.teamName}
          group={group}
          showMenuButton={showMenuButton}
          onCardClick={onCardClick}
          onButtonClick={onButtonClick}
        />
      ))}
    </GroupContainer>
  )
}
GroupList.defaultProps = {
  onButtonClick: () => {},
}

export default GroupList

const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 5px;
  width: 90%;
`
