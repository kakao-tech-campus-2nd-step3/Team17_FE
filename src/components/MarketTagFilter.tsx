import React from 'react'
import styled from '@emotion/styled'
import { Tag } from '../mocks/marketTag'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

interface TagFilterProps {
  tags: Tag[]
  activeTag: number | null
  onToggleFilter: (tagId: number) => void
}

const MarketTagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeTag,
  onToggleFilter,
}) => {
  return (
    <Filters>
      {tags.map((tag) => (
        <Button
          key={tag.tagId}
          onClick={() => onToggleFilter(tag.tagId)}
          active={activeTag === tag.tagId}
        >
          {tag.tagName}
        </Button>
      ))}
    </Filters>
  )
}

export default MarketTagFilter

const Button = styled.button<ButtonProps>`
  height: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: ${({ active }) => (active ? '#B5C3E9' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#768DCB')};
  border: 1.5px solid #b5c3e9;
  border-radius: 7px;
  margin: 5px 3px;
  cursor: pointer;
  font-size: 13px;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ active }) => (!active ? '#E0F0FF' : '#B5C3E9')};
    color: ${({ active }) => (!active ? '#B5C3E9' : 'white')};
  }
`

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 5px;
  margin-left: 5px;
  width: 90%;
`
