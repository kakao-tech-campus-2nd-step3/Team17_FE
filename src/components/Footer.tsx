import styled from '@emotion/styled'
import React from 'react'

const Footer = () => {
  return (
    <Wrapper>
        <Container>
            <NavBtn>
                <NavIcon className='material-symbols-outlined'>
                    home
                </NavIcon>
                <NavText>홈</NavText>
            </NavBtn>
            <NavBtn>
                <NavIcon className='material-symbols-outlined'>
                    group
                </NavIcon>
                <NavText>나의 그룹</NavText>
            </NavBtn>
            <NavBtn>
                <NavIcon className='material-symbols-outlined'>
                    data_loss_prevention
                </NavIcon>
                <NavText>그룹 탐색</NavText>
            </NavBtn>
            <NavBtn>
                <NavIcon className='material-symbols-outlined'>
                    storefront
                </NavIcon>
                <NavText>마켓</NavText>
            </NavBtn>
            <NavBtn>
                <NavIcon className='material-symbols-outlined'>
                    person
                </NavIcon>
                <NavText>마이페이지</NavText>
            </NavBtn>
        </Container>    
    </Wrapper>
  )
}

const Wrapper = styled.div`
    background-color: #FFFFFF;
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
`

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const NavBtn = styled.div`

`

const NavIcon = styled.div`
    margin-bottom: 7px;
    font-size: 24px;
`

const NavText = styled.div`
    font-size: 14px;
`

export default Footer