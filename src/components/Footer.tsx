import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Modal from './Modal'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isWarningOpen, setIsWarningOpen] = useState(false)

  const isAnyActive = new URLSearchParams(location.search).has(
    'activeExerciseId'
  )

  useEffect(() => {
    if (isAnyActive) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault()
      }
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
    return undefined
  }, [isAnyActive])

  const handleNavigation = (target: string) => {
    if (isAnyActive) {
      setIsWarningOpen(true)
    } else {
      navigate(target)
    }
  }

  const handleWarningClose = () => {
    setIsWarningOpen(false)
    window.history.back()
  }

  return (
    <FooterWrapper>
      <Container>
        <Link to="/" onClick={() => handleNavigation('/')}>
          <NavIcon
            isActive={location.pathname === '/'}
            className="material-symbols-outlined"
          >
            home
          </NavIcon>
          <NavText isActive={location.pathname === '/'}>홈</NavText>
        </Link>
        <Link to="/mygroup" onClick={() => handleNavigation('/mygroup')}>
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
        <Link to="/searchgroup" onClick={() => '/searchgroup'}>
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
        <Link to="/market" onClick={() => handleNavigation('/market')}>
          <NavIcon
            isActive={location.pathname === '/market'}
            className="material-symbols-outlined"
          >
            storefront
          </NavIcon>
          <NavText isActive={location.pathname === '/market'}>마켓</NavText>
        </Link>
        <Link to="/mypage" onClick={() => handleNavigation('/mypage')}>
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
      <Modal isOpen={isWarningOpen} onClose={handleWarningClose}>
        <ModalBody>
          <ModalBodyLine>
            운동 진행중 페이지에서 벗어나 타이머에 오차가 발생할 수 있습니다.{' '}
            <span style={{ color: '#6d86cb' }}>운동을 종료해주세요</span>
          </ModalBodyLine>
        </ModalBody>
        <ModalBtnContainer>
          <DoneBtn onClick={handleWarningClose}>확인</DoneBtn>
        </ModalBtnContainer>
      </Modal>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
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

const ModalBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const DoneBtn = styled.div`
  padding: 5px;
  color: #6d86cb;
  cursor: pointer;
`

const ModalBody = styled.div`
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
`

const ModalBodyLine = styled.div`
  color: #5d5d5d;
  margin-top: 5px;
  font-size: 15px;
  line-height: 1.6;
`

export default Footer
