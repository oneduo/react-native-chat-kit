import { cn } from '../utils/cn'
import type { Position, User } from '../types'
import { Image, Text, View } from 'react-native'

export interface MessageAvatarProps {
  user: User
  position: Position
}

export const MessageRowAvatar = ({ user, position }: MessageAvatarProps) => {
  const isLeft = position === 'left'
  const isRight = position === 'right'

  if (user.avatar) {
    return <Image className="size-10 rounded-full" source={{ uri: user.avatar }} />
  }

  return (
    <View
      className={cn(
        'size-10 items-center justify-center rounded-full',
        isLeft && 'bg-secondary',
        isRight && 'bg-primary',
      )}>
      <Text
        className={cn(isLeft && 'text-secondary-foreground', isRight && 'text-primary-foreground')}>
        {user.name.slice(0, 1)}
      </Text>
    </View>
  )
}
