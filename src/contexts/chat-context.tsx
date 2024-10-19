import React, { createContext, type ReactNode, useContext, useState } from 'react'
import type { ContextualOptions, Message, Position, Settings, User } from '../types'

export interface ChatContextProps {
  currentUser: User
  setUser: (user: User) => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  updateMessage: (id: number | string, newMessage: Partial<Message>) => void
  deleteMessage: (id: number | string) => void
  getPosition: (message: Message) => {
    position: Position
    isLeft: boolean
    isRight: boolean
  }
  isFromSameUser: (a: Message, b?: Message) => boolean
  getPreviousMessage: (message: Message) => Message | undefined
  getNextMessage: (message: Message) => Message | undefined
  getMessageIndex: (message: Message) => number
  selectedMessage?: Message
  selectMessage: (message?: Message) => void
  settings: Settings
  setSettings: (settings: Settings) => void
  contextMenu?: ContextualOptions[]
  setContextMenu: (options?: ContextualOptions[]) => void
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }

  return context
}

export interface ChatProviderProps {
  messages: Message[]
  currentUser: User
  settings?: Settings
  children: ReactNode
}

const defaultSettings: Settings = {
  showRightAvatar: true,
  showLeftAvatar: true,
  showAvatarWhenChained: false,
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, ...props }) => {
  const [messages, setMessages] = useState<Message[]>(props.messages)

  const [selectedMessage, selectMessage] = useState<Message | undefined>()

  const [currentUser, setUser] = useState<User>(props.currentUser)

  const [settings, setSettings] = useState<Settings>(props.settings ?? defaultSettings)

  const [contextMenu, setContextMenu] = useState<ContextualOptions[] | undefined>([
    {
      label: 'Quick Actions',
      options: [
        {
          key: 'reply',
          label: 'Reply',
          onPress: (message) => selectMessage(message),
          icon: { ios: { name: 'arrowshape.turn.up.left.fill' } },
        },
      ],
    },
  ])

  const getPosition = (message: Message) => {
    const position: Position = message.user.id === currentUser?.id ? 'right' : 'left'

    return {
      position,
      isLeft: position === 'left',
      isRight: position === 'right',
    }
  }

  const addMessage = (message: Message) => {
    setMessages((previous) => [message, ...previous])
  }

  const updateMessage = (id: number | string, newMessage: Partial<Message>) => {
    setMessages((previous) =>
      previous.map((message) => (message.id === id ? { ...message, ...newMessage } : message)),
    )
  }

  const deleteMessage = (id: number | string) => {
    setMessages((previous) => previous.filter((message) => message.id !== id))
  }

  const isFromSameUser = (a: Message, b?: Message) => {
    return a.user.id === b?.user.id
  }

  const getMessageIndex = (message: Message) => {
    return messages.findIndex((m) => m.id === message.id)
  }

  const getPreviousMessage = (message: Message) => {
    const messageIndex = getMessageIndex(message)

    return messages.at(messageIndex - 1)
  }

  const getNextMessage = (message: Message) => {
    const messageIndex = getMessageIndex(message)

    return messages.at(messageIndex + 1)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        selectedMessage,
        settings,
        currentUser,
        setMessages,
        addMessage,
        updateMessage,
        deleteMessage,
        isFromSameUser,
        getMessageIndex,
        getPreviousMessage,
        getNextMessage,
        getPosition,
        selectMessage,
        setUser,
        setSettings,
        contextMenu,
        setContextMenu,
      }}>
      {children}
    </ChatContext.Provider>
  )
}
