import { TouchableOpacity, View, Text } from 'react-native'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'
import { CircleX } from './icons'
import type { Message } from '../types'

export interface ReplyPreviewProps {
  message: Message
  onDismiss?: () => void
}

export const MessageReplyPreview = ({ message, onDismiss }: ReplyPreviewProps) => {
  return (
    <Animated.View className="flex-row gap-2" entering={SlideInRight} exiting={SlideOutLeft}>
      <View className="bg-primary h-full w-1 rounded-sm" />
      <View className="flex-1 gap-0.5">
        <Text className="text-sm font-bold">{message.user.name}</Text>
        <Text className="text-xs" numberOfLines={1}>
          {message.text}
        </Text>
      </View>
      <TouchableOpacity className="items-center justify-center" onPress={onDismiss}>
        <CircleX size={14} className="text-foreground" />
      </TouchableOpacity>
    </Animated.View>
  )
}
