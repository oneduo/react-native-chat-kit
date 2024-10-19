import { useRef } from 'react'
import { Text, View } from 'react-native'
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import * as ContextMenu from 'zeego/context-menu'

import { CheckCheck } from './icons'
import { cn } from '../utils/cn'
import { useChat } from '../contexts/chat-context'
import type { Message } from '../types'
import { MessageRowRightAction } from './message-row-right-actions'
import { MessageRowAvatar } from './message-row-avatar'

export interface MessageRowProps {
  message: Message
  onSwipe: (message: Message) => void
}

export const MessageRow = ({ message, onSwipe }: MessageRowProps) => {
  const { getPosition, isFromSameUser, getNextMessage, settings, contextMenu } = useChat()
  const ref = useRef<SwipeableMethods>(null)

  const messagePosition = getPosition(message)
  const position = messagePosition.position
  const isLeft = messagePosition.isLeft
  const isRight = messagePosition.isRight

  const isChained = isFromSameUser(message, getNextMessage(message))

  const shouldShowAvatar =
    (isLeft && settings.showLeftAvatar) || (isRight && settings.showRightAvatar)

  const onOpen = () => {
    onSwipe(message)

    ref.current?.close()
  }

  const renderRow = () => (
    <View
      className={cn(
        'relative w-full flex-row items-start gap-4 px-4 py-2',
        isLeft && 'flex-row',
        isRight && 'flex-row-reverse',
      )}>
      {shouldShowAvatar ? (
        <View className="size-10">
          {!settings.showAvatarWhenChained && isChained ? null : (
            <MessageRowAvatar user={message.user} position={position} />
          )}
        </View>
      ) : null}

      <View
        className={cn(
          'relative flex-1 rounded-xl p-4',
          isLeft && 'bg-secondary',
          isRight && 'bg-primary',
        )}>
        <View className="flex-row items-center justify-between">
          <Text
            className={cn(
              'text-sm font-semibold',
              isLeft && 'text-secondary-foreground',
              isRight && 'text-primary-foreground',
            )}>
            {message.user.name}
          </Text>
          <View className="flex-row items-center gap-1">
            {isRight && message.deliveredAt ? (
              <CheckCheck
                size={14}
                className={cn('text-muted', message.seenAt && 'text-blue-500')}
              />
            ) : null}
            <Text className={cn('text-muted-foreground text-sm font-normal')}>
              {message.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        </View>
        <Text
          className={cn(
            'py-2 text-sm font-normal',
            isLeft && 'text-secondary-foreground',
            isRight && 'text-primary-foreground',
          )}>
          {message.text}
        </Text>
        {message.reaction ? (
          <View
            className={cn(
              'border-hairline border-muted absolute -bottom-2 items-center justify-center rounded-full p-[0.3rem] shadow-sm',
              isLeft && 'bg-secondary right-3',
              isRight && 'bg-primary left-3',
            )}>
            <Text className="text-center text-xs">{message.reaction}</Text>
          </View>
        ) : null}
      </View>
    </View>
  )

  if (!contextMenu) {
    return (
      <ReanimatedSwipeable
        friction={3}
        rightThreshold={70}
        renderRightActions={MessageRowRightAction}
        ref={ref}
        onSwipeableWillOpen={onOpen}>
        {renderRow()}
      </ReanimatedSwipeable>
    )
  }

  return (
    <ReanimatedSwipeable
      friction={3}
      rightThreshold={70}
      renderRightActions={MessageRowRightAction}
      ref={ref}
      onSwipeableWillOpen={onOpen}>
      <ContextMenu.Root>
        <ContextMenu.Trigger>{renderRow()}</ContextMenu.Trigger>
        <ContextMenu.Content>
          {contextMenu.map((group, groupIndex) => (
            <>
              {/* @ts-ignore */}
              <ContextMenu.Group key={String(groupIndex)} horizontal={group.horizontal}>
                {group.label ? <ContextMenu.Label>{group.label}</ContextMenu.Label> : null}
                {group.options.map((option, index) => (
                  <>
                    {/* @ts-ignore */}
                    <ContextMenu.Item key={String(index)} onSelect={() => option.onPress(message)}>
                      {option.icon ? <ContextMenu.ItemIcon {...option.icon} /> : null}
                      <ContextMenu.ItemTitle>{option.label}</ContextMenu.ItemTitle>
                    </ContextMenu.Item>
                  </>
                ))}
              </ContextMenu.Group>
            </>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Root>
    </ReanimatedSwipeable>
  )
}
