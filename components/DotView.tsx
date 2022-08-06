import { StyleSheet, View } from "react-native"
import Palette from "../styles/palette"

const SIZE = 8

const DotView = ({ width, height, x, y }: { x: number, y: number, width: number, height: number }) => {
  return (
    <View style={[styles.container, {
      width: width / 2,
      height: height / 2,
      top: (y + 0.5) * height - (SIZE / 2),
      left: (x + 0.5) * width - (SIZE / 2),
    }]}>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: Palette.secondaryBackground,
    borderRadius: 16,
  },
})

export default DotView
