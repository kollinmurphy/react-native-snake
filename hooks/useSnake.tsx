import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Constants from "../logic/constants";
import { calculateNewPosition, checkDotCollision, checkInternalCollision, chooseDotPosition } from "../logic/position";
import { Direction, Snake } from "../logic/types";
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
  const snake = useRef<Snake>({
    segments: [{ x: 0, y: 0, id: Math.random() }],
    direction: 'right',
    lost: false,
    dot: undefined,
    started: false,
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
          }
          if (!snake.current.dot)
            snake.current.dot = chooseDotPosition(snake.current, l)
        }
      }
    } catch (err) {
      console.error(err)
      console.log('LOST')
      snake.current = {
        ...snake.current,
        lost: true,
      }
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
      segments: [{ x: 0, y: 0, id: Math.random() }],
      direction: 'right',
      lost: false,
      dot: undefined,
      started: false,
    }
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
