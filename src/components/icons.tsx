import { CheckCheck, CircleX, Undo } from 'lucide-react-native'

import { iconWithClassName } from '../utils/icon-classname'

const stock = {
  Undo,
  CheckCheck,
  CircleX,
}

Object.entries(stock).map(([, Icon]) => iconWithClassName(Icon))

export { Undo, CheckCheck, CircleX }
