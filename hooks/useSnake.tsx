import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef } from "react";
import Constants from "../logic/constants";
import { calculateNewPosition, checkDotCollision, chooseDotPosition } from "../logic/position";
import { Direction, Snake } from "../logic/types";
import useAudio from "./useAudio";
import useHighScore from "./useHighScore";
import useLayoutData from "./useLayoutData";

type ContextValue = undefined | {
  state: MutableRefObject<Snake>;
  listen: {
    (callback: VoidFunction): number;
  };
  cancelSubscription: {
    (index: number): void;
  };
  handleDirectionPressed: {
    (direction: Direction): void;
  };
  reset: VoidFunction;
}
const SnakeContext = React.createContext<ContextValue>(undefined);

export const SnakeProvider = ({ children }: { children: ReactNode }) => {
  const layout = useLayoutData()
  const audio = useAudio()
  const highScore = useHighScore()
  const snake = useRef<Snake>({
    segments: [{ x: 1, y: 0, id: Math.random() }, { x: 0, y: 0, id: Math.random() }],
    direction: 'right',
    lost: false,
    dot: undefined,
    started: false,
    points: 0,
  })

  const loop = useRef<ReturnType<typeof setInterval> | undefined>()
  const listeners = useRef<(null | VoidFunction)[]>([])

  const gameLoop = useCallback(() => {
    const l = layout.current ?? { width: 0, height: 0, xCount: 0, yCount: 0 }
    try {
      if (!snake.current.lost) {
        if (!snake.current.started) {
          snake.current.started = true
          snake.current.dot = chooseDotPosition(snake.current, l)
        } else {
          const [newSnake, oldTail] = calculateNewPosition(snake.current, l)
          snake.current = newSnake
          if (checkDotCollision(snake.current)) {
            snake.current.dot = undefined
            snake.current.segments.push(oldTail)
            snake.current.points += 10
            audio.playDotSound()
          }
          if (!snake.current.dot)
            snake.current.dot = chooseDotPosition(snake.current, l)
        }
      }
    } catch (err) {
      console.log(err)
      console.log('LOST')
      audio.playLoseSound()
      snake.current = {
        ...snake.current,
        lost: true,
      }
      highScore.update(snake.current.points)
    }
    for (const listener of listeners.current)
      listener?.()
  }, [])

  useEffect(() => {
    clearInterval(loop.current)
    loop.current = setInterval(gameLoop, Constants.LOOP_INTERVAL_TIME)
  }, [layout.current])

  const listen = useCallback((callback) => {
    const index = listeners.current.length
    listeners.current.push(callback)
    return index
  }, [])

  const cancelSubscription = useCallback((index) => {
    listeners.current[index] = null
  }, [])

  const handleDirectionPressed = useCallback((direction: Direction) => {
    snake.current.direction = direction
    // TODO handle collision here
  }, [])

  const reset = useCallback(() => {
    snake.current = {
      segments: [{ x: 1, y: 0, id: Math.random() }, { x: 0, y: 0, id: Math.random() }],
      direction: 'right',
      lost: false,
      dot: undefined,
      started: false,
      points: 0,
    }
    for (const listener of listeners.current)
      listener?.()
  }, [])

  return (
    <SnakeContext.Provider value={{ state: snake, listen, cancelSubscription, handleDirectionPressed, reset }}>
      {children}
    </SnakeContext.Provider>
  )
};

export const useSnake = () => {
  const data = React.useContext(SnakeContext)
  if (data === undefined)
    throw new Error('Unable to find SnakeProvider')
  return data
}

export default useSnake;
