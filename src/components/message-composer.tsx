import { useState } from 'react'
import Animated from 'react-native-reanimated'
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native'
import { useChat } from '../contexts/chat-context'
import { MessageReplyPreview } from './message-reply-preview'
import type { Message } from '../types'

export interface MessageComposerProps {
  onSubmit: (message: Message) => void
}

export const MessageComposer = (props: MessageComposerProps) => {
  const { selectMessage, selectedMessage, addMessage, currentUser } = useChat()
  const [input, setInput] = useState('')

  const onSubmit = () => {
    if (input && currentUser) {
      const message: Message = {
        id: new Date().getTime(),
        text: input,
        user: currentUser,
        createdAt: new Date(),
      }

      addMessage(message)

      setInput('')

      props.onSubmit(message)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={110}>
      <Animated.View className="gap-4 px-4">
        {selectedMessage ? (
          <MessageReplyPreview
            message={selectedMessage}
            onDismiss={() => selectMessage(undefined)}
          />
        ) : null}
        <View className="border-border relative rounded-full border p-4">
          <TextInput
            placeholder="Type a message"
            className="text-foreground placeholder:text-muted-foreground"
            onChangeText={setInput}
            value={input}
            returnKeyType="send"
            onSubmitEditing={onSubmit}
          />
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}
