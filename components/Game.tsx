import { useEffect, useState } from "react"
import { Button, Modal, StyleSheet, Text, View } from "react-native"
import useSnake from "../hooks/useSnake"
import Palette from "../styles/palette"
import Controller from "./Controller"
import SnakeContainer from "./SnakeContainer"

const Game = () => {
  const snake = useSnake()
  const [lost, setLost] = useState<boolean>(false)

  useEffect(() => {
    const index = snake.listen(() => {
      setLost(snake.state.current.lost)
    })
    return () => {
      snake.cancelSubscription(index)
    }
  }, [])

  return (
    <View style={styles.container}>
      <SnakeContainer />
      <View style={styles.controller}>
        <Controller />
      </View>
      <Modal
        animationType='slide'
        visible={lost}
        transparent={true}
        onRequestClose={() => {
          setLost(true)
          snake.reset()
        }}
      >
        <View style={styles.modalView}>
          <Text>You lost</Text>
          <Button onPress={snake.reset} title='Play again' />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  controller: {
    width: '100%',
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Palette.lost,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Game
