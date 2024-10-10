import React from 'react'
import styled from '@emotion/styled'
import { Tag } from '../mocks/TagMock'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

interface TagFilterProps {
  tags: Tag[]
  activeFilters: number[]
  toggleFilter: (tagId: number) => void
}

const TagFilter: React.FC<TagFilterProps> = ({
  tags,
  activeFilters,
  toggleFilter,
}) => {
  const groupTagsByAttribute = (tagItems: Tag[]) => {
    const groups: { [key: string]: Tag[] } = {}
    tagItems.forEach((tag) => {
      if (!groups[tag.tagAttribute]) {
        groups[tag.tagAttribute] = []
      }
      groups[tag.tagAttribute].push(tag)
    })
    return groups
  }
  const tagGroups = groupTagsByAttribute(tags)

  return (
    <Filters>
      {Object.keys(tagGroups).map((attribute) => (
        <Category key={attribute}>
          <CategoryName>{attribute}</CategoryName>
          <TagContainer>
            {tagGroups[attribute].map((tag) => (
              <Button
                key={tag.tagId}
                onClick={() => toggleFilter(tag.tagId)}
                active={activeFilters.includes(tag.tagId)}
              >
                {tag.tagName}
              </Button>
            ))}
          </TagContainer>
        </Category>
      ))}
    </Filters>
  )
}

export default TagFilter

const Button = styled.button<ButtonProps>`
  width: 42px;
  background-color: ${({ active }) => (active ? '#B5C3E9' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#768DCB')};
  border: 1px solid #768dcb;
  border-radius: 8px;
  padding: 2px;
  margin: 3px 2px;
  cursor: pointer;
  font-size: 12px;
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
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 90%;
`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: -5px;
`

const CategoryName = styled.p`
  font-size: 12px;
  color: #8e8e8e;
  width: 15%;
  text-align: left;
`

const TagContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 10px;
`
