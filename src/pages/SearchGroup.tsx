import React, { useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import tagMock, { Tag } from '../mocks/TagMock'
import searchGroupMock, { Team } from '../mocks/SearchGroupMock'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean
}

const SearchGroup = () => {
    const [activeFilters, setActiveFilters] = useState<number[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    const getTagAttributes = (tags: Tag[]): string[] => {
        return tags.map((tag) => tag.tagAttribute)
    }

    const toggleFilter = (tagId: number | null | undefined) => {
        if (tagId !== null && tagId !== undefined) {
            if (activeFilters.includes(tagId)) {
                setActiveFilters(activeFilters.filter((id) => id !== tagId))
            } else {
                setActiveFilters([...activeFilters, tagId])
            }
        }
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSearch = () => {
        // 검색 로직
    }

    const filteredGroups = searchGroupMock.Page.content.filter(
        (group) =>
            activeFilters.length === 0 ||
            group.tagList.some((tag) => activeFilters.includes(tag.tagId)) ||
            group.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Wrapper>
            <Title>그룹 탐색</Title>
            <SearchContainer>
                <SearchBar
                    placeholder="홈트를 함께 이어나갈 그룹을 검색해보세요"
                    onChange={handleSearchChange}
                    value={searchTerm}
                />
                <SearchIcon
                    onClick={handleSearch}
                    className="material-symbols-outlined"
                    isActive={false}
                >
                    search
                </SearchIcon>
            </SearchContainer>
            <Filters>
                {tagMock.tagList.map((tag: Tag) => (
                    <Button
                        key={tag.tagId}
                        onClick={() => toggleFilter(tag.tagId)}
                        active={activeFilters.includes(tag.tagId)}
                    >
                        {tag.tagAttribute}
                    </Button>
                ))}
            </Filters>
            <GroupContainer>
                {filteredGroups.map((team: Team) => (
                    <GroupCard key={team.teamName}>
                        <Name>{team.teamName}</Name>
                        <Details>{team.leaderNickname}</Details>
                        <MemberInfo>
                            멤버 {team.currentParticipants}/
                            {team.maxParticipants}명
                        </MemberInfo>
                        <TagLine>
                            #{getTagAttributes(team.tagList).join(' # ')}
                        </TagLine>
                    </GroupCard>
                ))}
            </GroupContainer>
            <AddButton>+</AddButton>
        </Wrapper>
    )
}

export default SearchGroup

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background-color: #f2f2f6;
    padding: 10px 15px 20px 15px;
    box-sizing: border-box;
    height: calc(100vh - 55px);
    overflow-y: auto;
`

const Title = styled.p`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: bold;
`

const SearchContainer = styled.div`
    width: 90%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`

const SearchBar = styled.input`
    width: 100%;
    padding: 10px 40px 10px 10px;
    border: 2px solid #b5c3e9;
    border-radius: 10px;
    position: relative;
`

const Button = styled.button<ButtonProps>`
    background-color: ${({ active }) => (active ? '#B5C3E9' : 'white')};
    color: ${({ active }) => (active ? 'white' : '#768DCB')};
    border: 1px solid #768dcb;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 3px 2px;
    cursor: pointer;
    font-size: 14px;
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
    justify-content: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
`

const GroupContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px 15px;
    width: 90%;
    padding: 0 15%;
`

const GroupCard = styled.div`
    width: 90%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    background: linear-gradient(180deg, #f8fdff 0%, #d7e0ff 100%);
    border: 2px solid #b5c3e9;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
`

const Name = styled.p`
    color: #3f3f3f;
    font-size: 14px;
    font-weight: bold;
`

const Details = styled.p`
    color: #8e8e8e;
    font-size: 12px;
    font-weight: bold;
`

const TagLine = styled.p`
    color: #8e8e8e;
    font-size: 12px;
    font-weight: bold;
`

const MemberInfo = styled.p`
    color: #8e8e8e;
    font-size: 12px;
    font-weight: bold;
`

const AddButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #007bff;
    color: white;
    font-size: 24px;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`

const NavIcon = styled.div<{ isActive: boolean }>`
    margin-bottom: 7px;
    font-size: 24px;
    color: ${(props) => (props.isActive ? '#7992EB' : '#4E4C4C')};
`

const SearchIcon = styled(NavIcon)`
    position: absolute;
    right: 10px;
    color: #ccc;
    font-size: 24px;
    right: 10px;
    cursor: pointer;
`
