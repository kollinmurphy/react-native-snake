import { StyleSheet, View } from "react-native"
import Palette from "../styles/palette"
import Spacing from "../styles/spacing";


const SnakeSegmentView = ({ width, height, x, y }: { x: number, y: number, width: number, height: number }) => {
  return (
    <View style={[styles.container, {
      width: width - (Spacing.snakeSegmentMargin * 2),
      height: height - (Spacing.snakeSegmentMargin * 2),
      top: y * height + Spacing.snakeSegmentMargin - 1,
      left: x * width + Spacing.snakeSegmentMargin - 1,
    }]}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Palette.secondaryBackground,
    borderRadius: 1,
  },
})

export default SnakeSegmentView
