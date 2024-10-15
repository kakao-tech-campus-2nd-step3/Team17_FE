/* eslint-disable no-console */
import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import axios from 'axios'

export interface ChatMessage {
  nickname: string
  message: string
  createAt: string
}
interface MessageProps {
  isOwn: boolean
}

const Chatting = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const currentUser = { nickname: 'GuestUser' }
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      nickname: '박길동',
      message:
        '저희 방은 유산소를 합니다.\n사이클, 런닝머신, 복합운동 등 종류는 자율입니다. 😄',
      createAt: new Date().toISOString(),
    },
    {
      nickname: '김길동',
      message: '환영합니다.',
      createAt: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const stompClient = useRef<Client | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const handlePrev = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chat/${roomId}/messages`
        )
        setMessages(response.data.content)
      } catch (error) {
        console.error('Failed to fetch chat messages', error)
      }
    }

    const connect = () => {
      const client = new Client({
        brokerURL: 'ws://localhost:3000/ws-stomp',
        onConnect: () => {
          console.log('Connected!')
          stompClient.current?.subscribe(
            `/sub/cache/${roomId}`,
            (message: IMessage) => {
              const newMessage = JSON.parse(message.body) as ChatMessage
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  ...newMessage,
                  createAt: new Date(newMessage.createAt).toLocaleString(),
                },
              ])
              scrollToBottom()
            }
          )
        },
      })
      stompClient.current = client
      stompClient.current.activate()
    }

    fetchMessages()
    connect()
    return () => {
      stompClient.current?.deactivate()
    }
  }, [roomId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // eslint-disable-next-line
  // 메시지 발송
  const sendMessage = () => {
    /*
      if (stompClient.current && inputMessage) {
        stompClient.current.publish({
          destination: `/pub/cache`,
          body: JSON.stringify({
            nickname: currentUser.nickname,
            message: inputMessage,
            createdAt: new Date().toISOString()
          })
        });
        setInputMessage("");
      }
      */
    if (inputMessage) {
      // 모의 데이터를 생성하여 메시지 목록에 추가
      const newMessage = {
        nickname: currentUser.nickname,
        message: inputMessage,
        createAt: new Date().toISOString(),
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInputMessage('')
    }
  }

  return (
    <PageWrapper>
      <PageContainer>
        <HeaderContainer>
          <Prev onClick={handlePrev}>{'<'}</Prev>
          <PageTitle>매일 운동 도전</PageTitle>
        </HeaderContainer>
        <div className="messages" style={{ flex: 1, overflow: 'auto' }}>
          {messages.map((msg) => (
            <MessageContainer
              key={msg.nickname + msg.createAt}
              isOwn={msg.nickname === currentUser.nickname}
            >
              <MessageInfo isOwn={msg.nickname === currentUser.nickname}>
                {msg.nickname}
              </MessageInfo>
              <MessageContentContainer
                isOwn={msg.nickname === currentUser.nickname}
              >
                <MessageBubble isOwn={msg.nickname === currentUser.nickname}>
                  {msg.message}
                </MessageBubble>
                <TimeStamp isOwn={msg.nickname === currentUser.nickname}>
                  {new Date(msg.createAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TimeStamp>
              </MessageContentContainer>
            </MessageContainer>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </PageContainer>
      <InputContainer>
        <StyledInput
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              sendMessage()
              e.preventDefault()
            }
          }}
          placeholder="your message..."
        />
        <StyledButton onClick={sendMessage}>&gt;</StyledButton>
      </InputContainer>
    </PageWrapper>
  )
}

export default Chatting

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
  height: 75%;
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
  color: #5673c1;
`

/* Chat */
const MessageContainer = styled.div<MessageProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`

const MessageContentContainer = styled.div<MessageProps>`
  display: flex;
  flex-direction: ${(props) => (props.isOwn ? 'row-reverse' : 'row')};
  align-items: center;
`

const MessageBubble = styled.div<MessageProps>`
  max-width: 70%;
  padding: 7px 10px;
  border-radius: 10px;
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.4;

  /* Align the message to the right if it's the currentUser's message */
  background-color: ${(props) => (props.isOwn ? '#EDF1FA' : '#F3F2F2')};
  margin: ${(props) => (props.isOwn ? '0 20px 0 5px' : '0 5px 0 20px')};
`

const MessageInfo = styled.div<MessageProps>`
  font-size: 10px;
  color: #4a4a4a;
  text-align: ${(props) => (props.isOwn ? 'right' : 'left')};
  margin: ${(props) => (props.isOwn ? '0px' : '0px 0px 5px 23px')};
  display: ${(props) => (props.isOwn ? 'none' : 'block')};
`

const TimeStamp = styled.span<MessageProps>`
  font-size: 9px;
  color: #4a4a4a;
  align-self: ${(props) => (props.isOwn ? 'flex-end' : 'flex-start')};
`

/* Input bar */
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  background-color: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
`

const StyledInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  background-color: #f5f5f5;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #999;
  }
`

const StyledButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 50%;
  color: gray;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: gray;
    color: white;
  }
`
