import styled from '@emotion/styled'

interface SearchBarProps {
  onSearch: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onSearch, value }) => {
  return (
    <SearchContainer>
      <StyledSearchBar
        placeholder="홈트를 함께 이어나갈 그룹을 검색해보세요"
        onChange={onChange}
        value={value}
      />
      <SearchIcon
        onClick={onSearch}
        className="material-symbols-outlined"
        isActive={false}
      >
        search
      </SearchIcon>
    </SearchContainer>
  )
}

export default SearchBar

const SearchContainer = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`

const NavIcon = styled.div<{ isActive: boolean }>`
  margin-bottom: 7px;
  font-size: 24px;
  color: ${(props) => (props.isActive ? '#7992EB' : '#4E4C4C')};
`

const SearchIcon = styled(NavIcon)`
  position: absolute;
  color: #ccc;
  font-size: 24px;
  right: 10px;
  top: 8px;
  cursor: pointer;
`

const StyledSearchBar = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border: 2px solid #b5c3e9;
  border-radius: 10px;
  position: relative;
  font-size: 12px;
`
