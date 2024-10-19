import React from 'react'
import type { FlatListProps, ListRenderItem } from 'react-native'
import type { Message, User } from '../types'
import { ChatProvider } from '../contexts/chat-context'
import { MessageList } from './message-list'
import { MessageComposer, type MessageComposerProps } from './message-composer'

export interface ChatProps {
  messages: Message[]
  currentUser: User
  onSubmit: (message: Message) => void
  composerComponent?: React.FC<MessageComposerProps>
  listProps?: Partial<FlatListProps<Message>>
  composerProps?: MessageComposerProps
  children?: ListRenderItem<Message>
}

export const Chat = ({
  messages,
  currentUser,
  composerComponent,
  composerProps,
  listProps,
  onSubmit,
  children,
}: ChatProps) => {
  const MessageComposerComponent = composerComponent || MessageComposer

  return (
    <ChatProvider currentUser={currentUser} messages={messages}>
      <MessageList {...(children ? { renderItem: children } : {})} {...listProps} />
      <MessageComposerComponent onSubmit={onSubmit} {...composerProps} />
    </ChatProvider>
  )
}
