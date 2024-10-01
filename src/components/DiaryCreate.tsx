import styled from "@emotion/styled"

interface DiaryCreateProps {
    newDiary: string;
    setNewDiary: (value: string) => void;
    onSubmit: () => void;
}

const DiaryCreate: React.FC<DiaryCreateProps> = ({ newDiary, setNewDiary, onSubmit }) => {


  return (
    <Wrapper>
        <TitleContainer>
            <Title>홈트 일기</Title>
            <CreateButton onClick={onSubmit}>작성 완료</CreateButton>
        </TitleContainer>
        <TextArea value={newDiary} onChange={(e) => setNewDiary(e.target.value)} placeholder="일기를 작성하세요" />
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
    padding: 10px 5px 7px 5px;
    margin-bottom: 10px;
`

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
`

const CreateButton = styled.div`
    background-color: #86A1E9;
    color: #ffffff;
    padding: 5px 7px;
    font-size: 13px;
    border-radius: 5px;
    cursor: pointer;
`

const TextArea = styled.textarea`
    width: 99%;
    border: 2px solid #B5C3E9;
    border-radius: 10px;
    outline: none;
    resize: none;
    box-sizing: border-box;
    padding: 15px;
    height: 120px;
`

export default DiaryCreate