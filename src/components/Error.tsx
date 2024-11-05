import styled from '@emotion/styled'

interface ErrorProps {
  name: string
}

const Error = ({ name }: ErrorProps) => {
  return (
    <ErrorWrapper>
      <ErrorText>{name} 데이터 불러오기에 실패했습니다</ErrorText>
      <ErrorSubText>다시 시도해주세요!</ErrorSubText>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 55px);
`

const ErrorText = styled.div`
  font-size: 18px;
`

const ErrorSubText = styled.div`
  margin-top: 8px;
`

export default Error
