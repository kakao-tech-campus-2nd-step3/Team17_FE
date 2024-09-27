import styled from '@emotion/styled'
import Timer from '../components/Timer'

const Main = () => {
  return (
    <MainWrapper>
        <DateContainer>
            <Timer />
        </DateContainer>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f2f2f6;
    padding: 50px 15px 20px 15px;
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
`



export default Main
