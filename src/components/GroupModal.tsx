import styled from '@emotion/styled'
import React from 'react'
import Modal from './Modal'
import { Team } from '../mocks/GroupMock'

interface GroupModalProps {
  modalType: string
  selectedGroup?: Team
  password: string
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onVerifyPassword: () => void
  onClose: () => void
  onJoinGroup?: (group: Team) => void
}

const GroupModal: React.FC<GroupModalProps> = ({
  modalType,
  selectedGroup,
  password,
  onPasswordChange,
  onVerifyPassword,
  onClose,
  onJoinGroup = () => {},
}) => {
  const modalContent = () => {
    switch (modalType) {
      case 'password':
        return (
          <Modal isOpen onClose={onClose}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={onPasswordChange}
            />
            <ModalBtnContainer>
              <CancelBtn onClick={onClose}>취소</CancelBtn>
              <DoneBtn onClick={onVerifyPassword}>확인</DoneBtn>
            </ModalBtnContainer>
          </Modal>
        )
      case 'error':
        return (
          <Modal isOpen onClose={onClose}>
            <ModalTitle>비공개 그룹</ModalTitle>
            <ModalText>비밀번호가 일치하지 않습니다.</ModalText>
            <ModalBtnContainer>
              <CancelBtn onClick={onClose}>확인</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        )
      case 'info':
        return (
          <Modal isOpen onClose={onClose}>
            <ModalTitle>{selectedGroup?.teamName}</ModalTitle>
            <ModalText>
              참여 인원: {selectedGroup?.currentParticipants}/
              {selectedGroup?.maxParticipants}
            </ModalText>
            <ModalBtnContainer>
              <DoneBtn
                onClick={() => selectedGroup && onJoinGroup(selectedGroup)}
              >
                그룹참여
              </DoneBtn>
              <CancelBtn onClick={onClose}>취소</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        )
      default:
        return null
    }
  }

  return modalContent()
}

const ModalTitle = styled.div`
  font-size: 20px;
  padding: 10px;
  text-align: left;
  float: left;
`

const ModalText = styled.p`
  font-size: 12px;
  color: #8e8e8e;
  margin: 10px;
`

const Input = styled.input`
  border: transparent;
  border-bottom: 1px solid #b5c3e9;
  width: 96%;
  padding: 6px 7px;
  margin: 10px 0px;
  box-sizing: border-box;
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

const DoneBtn = styled.div`
  padding: 5px;
  color: #6d86cb;
  cursor: pointer;
`

export default GroupModal
