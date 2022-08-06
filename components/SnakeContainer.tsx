import { useCallback, useEffect, useRef, useState } from "react"
import { LayoutChangeEvent, StyleSheet, View } from "react-native"
import useLayoutData from "../hooks/useLayoutData"
import useSnake from "../hooks/useSnake"
import { calculateSegmentData } from "../logic/sizing"
import Palette from "../styles/palette"
import DotView from "./DotView"
import SnakeSegmentView from "./SnakeSegmentView"

const SnakeContainer = () => {
  const layoutData = useLayoutData()
  const snake = useSnake()
  const [frame, setFrame] = useState<number>(0)

  useEffect(() => {
    const index = snake.listen(() => setFrame(f => f + 1))
    return () => {
      snake.cancelSubscription(index)
    }
  }, [])

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    if (layoutData.current)
      return
    const { width, height } = event.nativeEvent.layout
    layoutData.current = calculateSegmentData({ width: width - 2, height: height - 2 })
    setFrame(f => f + 1)
  }, [layoutData.current])

  return (
    <View onLayout={handleLayout} style={styles.container}>
      {layoutData && snake.state.current.started ? (
        <>
          {snake.state.current.segments.map(s => (
            <SnakeSegmentView
              key={s.id}
              width={layoutData.current?.width ?? 0}
              height={layoutData.current?.height ?? 0}
              x={s.x}
              y={s.y}
            />
          ))}
          {snake.state.current.dot ? (
            <DotView
              width={layoutData.current?.width ?? 0}
              height={layoutData.current?.height ?? 0}
              x={snake.state.current.dot.x}
              y={snake.state.current.dot.y}
            />
          ) : null}
        </>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Palette.secondaryBackground,
    width: '100%',
    backgroundColor: Palette.primaryBackground,
    flex: 2,
  },
})

export default SnakeContainer
