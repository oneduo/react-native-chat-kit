import type { MenuItemIconProps } from 'zeego/lib/typescript/menu/types'

export interface Message {
  id: number | string
  text: string
  user: User
  createdAt: Date
  deliveredAt?: Date
  seenAt?: Date
  reaction?: string
}

export interface User {
  id: number | string
  name: string
  avatar?: string
}

export interface Settings {
  showRightAvatar: boolean
  showLeftAvatar: boolean
  showAvatarWhenChained: boolean
}

export interface ContextualOptions {
  label?: string
  options: ContextualOption[]
  horizontal?: boolean
}

export interface ContextualOption {
  key: string
  label: string
  onPress: (message: Message) => void
  icon?: Partial<Pick<MenuItemIconProps, 'ios' | 'androidIconName'>>
}

export type Position = 'right' | 'left'
