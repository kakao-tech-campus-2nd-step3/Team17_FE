import styled from '@emotion/styled';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import KAKAO_LOGO from '../assets/kakao_logo.svg';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [queryParams] = useSearchParams();

  const handleConfirm = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return null; // Ensure all paths return something
    }

    const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
    window.location.replace(redirectUrl);
    return null;
  };

  return (
    <Wrapper>
      <Logo src={KAKAO_LOGO} alt="카카오 CI" />
      <FormWrapper>
        <UnderlineTextField placeholder="이름" value={id} onChange={(e) => setId(e.target.value)} />
        <Spacing />
        <UnderlineTextField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Spacing />
        <Button onClick={handleConfirm}>로그인</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 88px;
  color: #333;
`;

const FormWrapper = styled.article`
  width: 100%;
  max-width: 580px;
  padding: 16px;

  @media screen and (min-width: 400px) {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 60px 52px;
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 200ms;
  box-shadow: 0 0 0 1px #ccc inset;
  color: #111;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const UnderlineTextField = styled.input`
  width: 100%;
  box-sizing: border-box;
  color: #191919;
  transition: border-color 200ms;
  border-style: solid;
  &:focus {
    outline: none;
    border-color: #252525;
  }
  &:disabled {
    color: #7d7d7d;
    cursor: not-allowed;
  }
  &::placeholder {
    color: #7d7d7d;
  }
`;

const Spacing = styled.div`
  width: 100%;
  height: 16px;
`;
