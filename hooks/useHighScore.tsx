import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import * as SecureStore from 'expo-secure-store'

type ContextValue = undefined | {
  points: MutableRefObject<number>;
  update: {
    (val: number): void;
  };
}
const HighScoreContext = React.createContext<ContextValue>(undefined);

const KEY = 'high-score-com.canlin.snake'

export const HighScoreProvider = ({ children }: { children: ReactNode }) => {
  const highScore = useRef(0)

  useEffect(() => {
    (async () => {
      const points = await SecureStore.getItemAsync(KEY)
      if (!points) return
      const val = parseInt(points, 10)
      console.log('loaded high score', val)
      highScore.current = val || 0
    })()
  }, [])

  const handleUpdatePoints = useCallback(async (val) => {
    if (val > highScore.current) {
      await SecureStore.setItemAsync(KEY, `${val}`)
      highScore.current = val
      console.log('NEW HIGH SCORE', val)
    }
  }, [])

  return (
    <HighScoreContext.Provider value={{
      points: highScore,
      update: handleUpdatePoints,
    }}>
      {children}
    </HighScoreContext.Provider>
  )
};

export const useHighScore = () => {
  const data = React.useContext(HighScoreContext)
  if (data === undefined)
    throw new Error('Unable to find HighScoreProvider')
  return data
};

export default useHighScore;
