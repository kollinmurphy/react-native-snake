import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import useHighScore from "../hooks/useHighScore"
import useSnake from "../hooks/useSnake"
import Palette from "../styles/palette"
import Spacing from "../styles/spacing"
import ControllerButton from "./ControllerButton"

const Controller = () => {
  const snake = useSnake()
  const [points, setPoints] = useState(0)
  const highScore = useHighScore()

  useEffect(() => {
    const index = snake.listen(() => {
      setPoints(snake.state.current.points)
    })
    return () => {
      snake.cancelSubscription(index)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>POINTS: {points}</Text>
        {highScore?.points ? (
          <Text style={styles.pointsText}>HIGH SCORE: {highScore.points}</Text>
        ) : null}
      </View>
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
    paddingHorizontal: 32,
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.baseSpacing,
  },
  pointsContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
  },
  pointsText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
})

export default Controller
