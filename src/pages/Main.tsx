import styled from '@emotion/styled'
import Timer from '../components/Timer'
import ExerciseList from '../components/ExerciseList'

const Main = () => {
  return (
    <MainWrapper>
        <DateContainer>
          <Timer />
        </DateContainer>
        <Container>
          <ExerciseList />
        </Container>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f2f2f6;
    padding: 20px;
    box-sizing: border-box;
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 20px 0px;
`



export default Main
