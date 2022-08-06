import React, { ReactNode, useCallback, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'

type ContextValue = undefined | {
  points: number;
  update: {
    (val: number): void;
  };
}
const HighScoreContext = React.createContext<ContextValue>(undefined);

const KEY = 'high-score-com.canlin.snake'

export const HighScoreProvider = ({ children }: { children: ReactNode }) => {
  const [highScore, setHighScore] = useState<number>(0)

  useEffect(() => {
    (async () => {
      const points = await SecureStore.getItemAsync(KEY)
      if (!points) return
      const val = parseInt(points, 10)
      console.log('old high score', val)
      setHighScore(val || 0)
    })()
  }, [])

  const handleUpdatePoints = useCallback(async (val) => {
    if (val > highScore) {
      await SecureStore.setItemAsync(KEY, `${val}`)
      setHighScore(val)
      console.log('NEW HIGH SCORE', val)
    }
  }, [highScore])

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
