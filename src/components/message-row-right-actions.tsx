import { View } from 'react-native'
import Reanimated, { type SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Undo } from './icons'

const width = 50

export const MessageRowRightAction = (
  _progress: SharedValue<number>,
  drag: SharedValue<number>,
) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + width }],
    }
  })

  return (
    <Reanimated.View style={[styleAnimation]}>
      <View className="h-full items-center justify-center" style={{ width }}>
        <View className="bg-muted/50 rounded-full p-2">
          <Undo className="text-secondary-foreground" size={18} strokeWidth={3} />
        </View>
      </View>
    </Reanimated.View>
  )
}
