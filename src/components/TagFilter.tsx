import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getTags, Tag } from '../api/getTags'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean
}

interface TagFilterProps {
  activeFilters: number[]
  onToggleFilter: (tagId: number) => void
}

const TagFilter: React.FC<TagFilterProps> = ({
  activeFilters,
  onToggleFilter,
}) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTags()
        setTags(fetchedTags)
        setLoading(false)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch tags:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  if (loading) return <div>Loading tags...</div>
  if (error) return <div>Error loading tags.</div>

  const groupTagsByAttribute = (tagItems: Tag[]) => {
    const groups: { [key: string]: Tag[] } = {}
    if (!tagItems) return groups
    tagItems.forEach((tag) => {
      if (!groups[tag.teamTagAttribute]) {
        groups[tag.teamTagAttribute] = []
      }
      groups[tag.teamTagAttribute].push(tag)
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
                onClick={() => onToggleFilter(tag.tagId)}
                active={activeFilters.includes(tag.tagId)}
              >
                {tag.teamTagName}
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
  width: 36px;
  background-color: ${({ active }) => (active ? '#B5C3E9' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#768DCB')};
  border: 1px solid #768dcb;
  border-radius: 8px;
  padding: 3px 2px;
  margin: 1px 3px;
  cursor: pointer;
  font-size: 10px;
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
