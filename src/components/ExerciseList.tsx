import styled from '@emotion/styled'

const ExerciseList = () => {

    const handleExerciseClick = () => {
        
    }

    const handleListMenuClick = (event: React.MouseEvent) => {
        event?.stopPropagation()
    }
  return (
    <Wrapper>
        <TitleContainer>
            <Title>상세 운동 내역</Title>
            <AddButton>+</AddButton>
        </TitleContainer>
        <ListContainer>
            <ListElement onClick={handleExerciseClick}>
                <LeftContainer>
                    <PlayIcon className='material-symbols-outlined'>play_circle</PlayIcon>
                    <ExerciseTitle>죽음의 타바타</ExerciseTitle>
                </LeftContainer>
                <RightContainer>
                    <ExerciseTime>10:00</ExerciseTime>
                    <MenuIcon className='material-symbols-outlined' onClick={handleListMenuClick}>more_vert</MenuIcon>
                </RightContainer>
            </ListElement>
        </ListContainer>
        
    </Wrapper>
  )
}

const Wrapper = styled.div`

`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 5px;
`

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
`

const AddButton = styled.div`
    font-size: 24px;
    font-weight: 500;
    color: #86A1E9;
    cursor: pointer;
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
`

const ListElement = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const PlayIcon = styled.div`
    padding: 0 10px 0 3px ;
    color: #828282;
`

const ExerciseTitle = styled.div`
    color: #828282;
    font-weight: 500;
    font-size: 17px;
`

const ExerciseTime = styled.div`
    color: #828282;
    font-weight: 500;
    font-size: 18px;
`

const MenuIcon = styled.div`
    color: #828282;
    font-weight: 300;
    padding: 0 0 0 10px;
`

export default ExerciseList