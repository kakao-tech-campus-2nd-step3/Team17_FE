import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <NavIcon
            isActive={location.pathname === '/'}
            className="material-symbols-outlined"
          >
            home
          </NavIcon>
          <NavText isActive={location.pathname === '/'}>홈</NavText>
        </Link>
        <Link to="/mygroup">
          <NavIcon
            isActive={location.pathname === '/mygroup'}
            className="material-symbols-outlined"
          >
            group
          </NavIcon>
          <NavText isActive={location.pathname === '/mygroup'}>
            나의 그룹
          </NavText>
        </Link>
        <Link to="/searchgroup">
          <NavIcon
            isActive={location.pathname === '/searchgroup'}
            className="material-symbols-outlined"
          >
            data_loss_prevention
          </NavIcon>
          <NavText isActive={location.pathname === '/searchgroup'}>
            그룹 탐색
          </NavText>
        </Link>
        <Link to="/market">
          <NavIcon
            isActive={location.pathname === '/market'}
            className="material-symbols-outlined"
          >
            storefront
          </NavIcon>
          <NavText isActive={location.pathname === '/market'}>마켓</NavText>
        </Link>
        <Link to="/mypage">
          <NavIcon
            isActive={location.pathname === '/mypage'}
            className="material-symbols-outlined"
          >
            person
          </NavIcon>
          <NavText isActive={location.pathname === '/mypage'}>
            마이페이지
          </NavText>
        </Link>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ffffff;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 5px 24px;
  box-sizing: border-box;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NavIcon = styled.div<{ isActive: boolean }>`
  margin-bottom: 7px;
  font-size: 24px;
  color: ${(props) => (props.isActive ? '#7992EB' : '#4E4C4C')};
`

const NavText = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.isActive ? '#7992EB' : '#4E4C4C')};
`

export default Footer
