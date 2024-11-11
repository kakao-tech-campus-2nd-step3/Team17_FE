import styled from '@emotion/styled'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import postGroup from '../api/postGroup'
import Modal from '../components/Modal'
import TagFilter from '../components/TagFilter'

const AddGroup = () => {
  const [activeFilters, setActiveFilters] = useState<number[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [inputs, setInputs] = useState({
    teamname: '',
    password: '',
    participant: '',
    comment: '',
  })

  const navigate = useNavigate()

  const closeModal = () => {
    setModalOpen(false)
    if (submissionSuccess) {
      navigate(-1)
    }
  }

  const toggleFilter = (tagId: number | null | undefined) => {
    if (tagId !== null && tagId !== undefined) {
      setActiveFilters(
        activeFilters.includes(tagId)
          ? activeFilters.filter((id) => id !== tagId)
          : [...activeFilters, tagId]
      )
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!inputs.teamname) {
      setModalMessage('그룹명을 입력해주세요.')
      setModalOpen(true)
      return
    }
    if (!inputs.participant || Number.isNaN(Number(inputs.participant))) {
      setModalMessage('모집인원을 올바르게 입력해주세요.')
      setModalOpen(true)
      return
    }
    if (inputs.participant && Number(inputs.participant) > 30) {
      setModalMessage('모집인원은 30명 이하로 작성해주세요.')
      setModalOpen(true)
      return
    }
    if (
      inputs.password &&
      (inputs.password.length < 4 || inputs.password.length > 16)
    ) {
      setModalMessage('비밀번호는 4자리에서 16자리 사이로 설정해주세요.')
      setModalOpen(true)
      return
    }
    if (!inputs.comment) {
      setModalMessage('그룹 설명을 입력해주세요.')
      setModalOpen(true)
      return
    }

    const groupData = {
      teamName: inputs.teamname,
      teamDescription: inputs.comment,
      maxParticipants: Number(inputs.participant),
      password: inputs.password ? inputs.password : null,
      tagIdList: activeFilters,
    }
    postGroup(groupData)
      .then(() => {
        setSubmissionSuccess(true)
        navigate('/searchgroup')
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setModalMessage('해당 그룹 이름은 이미 존재하는 그룹 이름입니다.')
        } else {
          setModalMessage('그룹 생성에 실패했습니다. 다시 시도해주세요.')
        }
        setSubmissionSuccess(false)
        setModalOpen(true)
      })
  }

  return (
    <PageWrapper>
      <PageContainer>
        <HeaderContainer>
          <Prev onClick={handlePrev}>{'<'}</Prev>
          <PageTitle>그룹 만들기</PageTitle>
        </HeaderContainer>
        <FormContainer onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="teamname"
            placeholder="그룹명을 적어주세요"
            value={inputs.teamname}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="password"
            placeholder="비밀번호 (선택사항)"
            value={inputs.password}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="participant"
            placeholder="모집인원"
            value={inputs.participant}
            onChange={handleChange}
          />
          <FieldName>그룹 설명</FieldName>
          <TextArea
            name="comment"
            placeholder="그룹에 대한 자세한 설명을 작성하세요"
            rows={4}
            value={inputs.comment}
            onChange={handleChange}
          />
          <FieldName>태그</FieldName>
          <TagFilter
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
          />
          <SubmitButton type="submit" onClick={handleSubmit}>
            생성하기
          </SubmitButton>
        </FormContainer>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalTitle>그룹 생성하기</ModalTitle>
            <ModalText placeholder={modalMessage} />
            <ModalBtnContainer>
              <CancelBtn onClick={closeModal}>닫기</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        )}
      </PageContainer>
    </PageWrapper>
  )
}

export default AddGroup

/* Page */
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f2f6;
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 55px);
  overflow-y: auto;
  overflow-x: hidden;
`

const PageContainer = styled.div`
  padding: 10px 0px 20px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px 0px;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px 0px;
  width: 90%;
`

const Prev = styled.div`
  font-size: 24px;
  cursor: pointer;
  font-weight: 500;
  position: absolute;
  left: 0;
  padding-left: 10px;
  margin-top: 5px;
`

const PageTitle = styled.p`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`

/* Form */
const FormContainer = styled.div`
  flex-direction: column;
  padding: 0 14px;
`

const FieldName = styled.div`
  font-size: 14px;
  padding: 5px;
  font-weight: 500;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`

const InputField = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 2px solid #b5c3e9;
  border-radius: 4px;
  width: 90%;
  color: #8e8e8e;
  border-radius: 6px;
`

const TextArea = styled.textarea`
  padding: 10px;
  border: 2px solid #b5c3e9;
  border-radius: 4px;
  width: 90%;
  color: #8e8e8e;
  resize: none;
`

const SubmitButton = styled.button`
  padding: 10px 0;
  background-color: #b5c3e9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  &:hover {
    background-color: #7a98e8;
  }
`

/* Modal */
const ModalTitle = styled.div`
  font-size: 20px;
  width: 100%;
  text-align: left;
  padding: 10px;
  box-sizing: border-box;
`

const ModalText = styled.input`
  width: 96%;
  font-size: 12px;
  padding: 0px 6px;
  margin: 10px 0px;
  box-sizing: border-box;
  border: none;
  outline: none;
`

const ModalBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

const CancelBtn = styled.div`
  padding: 5px 15px;
  color: #969393;
  cursor: pointer;
`
