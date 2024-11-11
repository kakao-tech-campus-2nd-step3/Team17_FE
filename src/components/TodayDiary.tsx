import styled from '@emotion/styled'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useEffect, useRef, useState } from 'react'
import deleteDiaryApi from '../api/deleteDiaryApi'

interface DiaryData {
  id: number
  createdAt: string
  memo: string
}

interface TodayDiaryProps {
  diaryData: DiaryData[]
  // setDiaryData: React.Dispatch<React.SetStateAction<{ time: string; memo: string; }[]>>;
}

const TodayDiary: React.FC<TodayDiaryProps> = ({ diaryData }) => {
  const queryClient = useQueryClient()
  const diaryMenuRef = useRef<HTMLDivElement>(null)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        diaryMenuRef.current &&
        !diaryMenuRef.current.contains(event.target as Node)
      ) {
        setActiveMenuId(null)
      }
    }

    // 메뉴가 활성화되어 있을 때만 이벤트 리스너 추가
    if (activeMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeMenuId])

  const deleteDiary = useMutation({
    mutationFn: deleteDiaryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diary'] })
    },
  })

  const handleDeleteClick = (diaryId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    deleteDiary.mutate(diaryId)
  }

  const handleListMenuClick =
    (diaryId: number) => (event: React.MouseEvent) => {
      event?.stopPropagation()

      if (activeMenuId !== diaryId) {
        setActiveMenuId(diaryId)
      } else {
        setActiveMenuId(null)
      }
    }

  return (
    <TodayDiaryWrapper>
      <TitleContainer>
        <Title>오늘의 일기</Title>
      </TitleContainer>
      {Array.isArray(diaryData) && diaryData.length > 0 ? (
        diaryData.map((diary) => (
          <DiaryContainer key={diary.id}>
            <DiaryHeader>
              <DiaryTime>
                {DateTime.fromISO(diary.createdAt, { zone: 'utc' }).toFormat(
                  'HH:mm'
                )}
              </DiaryTime>
              <DiaryMenu
                className="material-symbols-outlined"
                onClick={handleListMenuClick(diary.id)}
              >
                more_vert
              </DiaryMenu>
              {activeMenuId === diary.id && (
                <MenuContainer>
                  <DeleteBtn
                    className="deleteBtn"
                    ref={diaryMenuRef}
                    onClick={(event) => handleDeleteClick(diary.id, event)}
                  >
                    일기 삭제하기
                  </DeleteBtn>
                </MenuContainer>
              )}
            </DiaryHeader>
            <DiaryContent>{diary.memo}</DiaryContent>
          </DiaryContainer>
        ))
      ) : (
        <NoDiaryMessage>오늘의 일기가 없습니다</NoDiaryMessage>
      )}
      {}
    </TodayDiaryWrapper>
  )
}

const TodayDiaryWrapper = styled.div``

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px 7px 5px;
  margin-bottom: 10px;
  margin-top: 3px;
  margin-left: 2px;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const DiaryContainer = styled.div`
  padding: 0 5px;
  margin: 15px 0 30px 0;

  &:last-child {
    margin-bottom: 18px;
  }
`

const DiaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`

const DiaryTime = styled.div`
    position: relative;
    display: inline:block;
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 12px;
    color: #626262;
    font-weight: 500;

    &::after {
        content: '';
        position: absolute;
        top: 52%;
        width: 225px;
        height: 1px;
        margin-left: 15px;
        background-color: #B5C3E9;
        vertical-align: middle;
    }
`

const DiaryMenu = styled.div`
  justify-content: flex-end;
  color: #5275d5;
  font-weight: 300;
  margin-left: 235px;
  cursor: pointer;
`

const MenuContainer = styled.div`
  border: 2px solid #a1b6e8;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0px;
  bottom: 3px;
  background-color: #f2f7ff;
  z-index: 10;
  cursor: pointer;
`

const DeleteBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #868686;
`

const DiaryContent = styled.div`
  border: 1.5px solid #b5c3e9;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  font-size: 14px;
  color: #555454;
`

const NoDiaryMessage = styled.div`
  text-align: center;
  color: #888888;
  font-size: 14px;
  margin-top: 25px;
  margin-bottom: 30px;
`

export default TodayDiary
