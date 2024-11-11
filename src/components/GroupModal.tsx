import styled from '@emotion/styled'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import Modal from './Modal'
import { Team, verifyGroupPassword } from '../api/getGroup'
import { joinGroup } from '../api/postGroup'

interface GroupModalProps {
  modalType: string
  selectedGroup?: Team
  password: string
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onPasswordVerified: () => void
  onPasswordIncorrect: () => void
  refreshGroups: () => void
}

const GroupModal: React.FC<GroupModalProps> = ({
  modalType,
  selectedGroup,
  password,
  onPasswordChange,
  onClose,
  onPasswordVerified,
  onPasswordIncorrect,
  refreshGroups,
}) => {
  const joinMutation = useMutation({
    mutationFn: () => joinGroup(selectedGroup!),
    onSuccess: () => {
      onClose()
      refreshGroups()
    },
    onError: () => {
      onPasswordIncorrect()
    },
  })

  const handleJoinGroup = () => {
    joinMutation.mutate()
  }

  const { mutate: verifyPassword } = useMutation({
    mutationFn: () => verifyGroupPassword(selectedGroup!.id, password),
    onSuccess: (isValid) => {
      if (isValid) {
        onPasswordVerified()
      } else {
        onPasswordIncorrect()
      }
    },
    onError: () => {
      onPasswordIncorrect()
    },
  })

  const renderModalContent = () => {
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
              <DoneBtn onClick={() => verifyPassword()}>확인</DoneBtn>
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

      case 'max':
        return (
          <Modal isOpen onClose={onClose}>
            <ModalTitle>그룹 가입</ModalTitle>
            <ModalText>정원이 모두 찼습니다.</ModalText>
            <ModalBtnContainer>
              <CancelBtn onClick={onClose}>확인</CancelBtn>
            </ModalBtnContainer>
          </Modal>
        )

      case 'info':
        return (
          <Modal isOpen onClose={onClose}>
            <ModalHeader>
              <ModalTitle>{selectedGroup?.teamName}</ModalTitle>
              <ModalParticipantCount>
                {selectedGroup?.currentParticipants}/
                {selectedGroup?.maxParticipants}명
                {selectedGroup?.hasPassword && (
                  <LockIcon className="material-symbols-outlined">
                    lock
                  </LockIcon>
                )}
              </ModalParticipantCount>
            </ModalHeader>
            <ModalContent>
              <ModalText>
                <ModalBold>그룹장 : </ModalBold>
                {selectedGroup?.leaderNickname}
              </ModalText>
              <ModalText>
                <ModalBold>태그 : </ModalBold>#
                {selectedGroup?.tagList
                  .map((tag) => tag.teamTagName)
                  .join(' #')}
              </ModalText>
              <ModalText>
                <ModalBold>그룹소개 : </ModalBold>
                {selectedGroup?.teamDescription}
              </ModalText>
              <ModalBtnContainer>
                <CancelBtn onClick={onClose}>취소</CancelBtn>
                <DoneBtn onClick={handleJoinGroup}>그룹참여</DoneBtn>
              </ModalBtnContainer>
            </ModalContent>
          </Modal>
        )

      default:
        return null
    }
  }
  return renderModalContent()
}

GroupModal.defaultProps = {
  selectedGroup: undefined,
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
const ModalHeader = styled.div`
  position: relative;
  width: 100%;
`

const ModalParticipantCount = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  padding: 10px;
  margin: 6px 0 0 0;
`

const ModalContent = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const ModalBold = styled.div`
  font-size: 12px;
  color: #707070;
  font-weight: 500;
  position: inline-block;
  width: 20%;
  float: left;
`

const LockIcon = styled.span`
  color: #828282;
  position: absolute;
  font-size: 14px;
  margin-left: 5px;
`

export default GroupModal
