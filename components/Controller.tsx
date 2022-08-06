import { StyleSheet, View } from "react-native"
import Palette from "../styles/palette"
import Spacing from "../styles/spacing"
import ControllerButton from "./ControllerButton"

const Controller = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ControllerButton type='up' />
      </View>
      <View style={styles.row}>
        <ControllerButton type='left' />
        <ControllerButton type='right' />
      </View>
      <View style={styles.row}>
        <ControllerButton type='down' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.secondaryBackground,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.baseSpacing,
  },
})

export default Controller
