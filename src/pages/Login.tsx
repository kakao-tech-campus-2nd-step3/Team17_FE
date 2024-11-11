import styled from '@emotion/styled'
import LOGO from '../assets/logo.png'
import KAKAO_LOGIN from '../assets/kakao.png'

const Login = () => {
  // 카카오 OAuth 설정
  const APP_KEY = '831c88c18690d9ffa567b4a7da7f8c0e'
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL

  // OAuth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  return (
    <LoginWrapper>
      <Title>누구나 집에서 쉽게 즐기는 홈트</Title>
      <SubTitle>홈트라이</SubTitle>
      <img src={LOGO} alt="로그인 로고" />
      <KakaoButton onClick={handleLogin}>
        <img src={KAKAO_LOGIN} alt="카카오 로그인" />
      </KakaoButton>
      <Describe>
        카카오 로그인을 통해 &lsquo;홈트라이&rsquo;를 즐겨보세요
      </Describe>
    </LoginWrapper>
  )
}

export default Login

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #f2f2f6;
  padding: 50px 15px 20px 15px;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 18px;
  color: #7e88a2;
`

const SubTitle = styled.h2`
  font-size: 32px;
  color: #5a80e2;
  margin-top: 10px;
  margin-bottom: 40px;
`

const KakaoButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 50px;
`

const Describe = styled.p`
  font-size: 12px;
  color: #888888;
  margin-top: 5px;
`
