import { FlatList, type FlatListProps, type ListRenderItem } from 'react-native'
import type { Message } from '../types'
import { useChat } from '../contexts/chat-context'
import { MessageRow } from './message-row'

export interface MessageListProps extends Partial<FlatListProps<Message>> {}

export const MessageList = (props: MessageListProps) => {
  const { messages, selectMessage } = useChat()

  const renderItem: ListRenderItem<Message> = (parameters) => {
    if (props.renderItem) {
      return props.renderItem(parameters)
    }

    return <MessageRow message={parameters.item} onSwipe={(message) => selectMessage(message)} />
  }

  return (
    <FlatList
      data={messages}
      inverted
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      {...props}
    />
  )
}
