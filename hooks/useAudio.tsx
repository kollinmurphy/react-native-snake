import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av'
const pong = require('../assets/pong.wav')
const lose = require('../assets/lose.wav')

interface AudioControls {
  playDotSound: VoidFunction;
  playLoseSound: VoidFunction;
}

type ContextValue = undefined | AudioControls
const AudioContext = React.createContext<ContextValue>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const playDotSound = useCallback(async () => {
    const { sound: s } = await Audio.Sound.createAsync(pong)
    await s.playAsync()
  }, [])

  const playLoseSound = useCallback(async () => {
    const { sound: s } = await Audio.Sound.createAsync(lose)
    await s.setVolumeAsync(0.2)
    await s.playAsync()
  }, [])

  return (
    <AudioContext.Provider value={{
      playDotSound,
      playLoseSound,
    }}>
      {children}
    </AudioContext.Provider>
  )
};

export const useAudio = () => {
  const data = React.useContext(AudioContext)
  if (data === undefined)
    throw new Error('Unable to find AudioProvider')
  return data
};

export default useAudio;
