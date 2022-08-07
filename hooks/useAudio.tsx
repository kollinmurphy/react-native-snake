import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av'
import { Sound } from "expo-av/build/Audio";
const pongWav = require('../assets/pong.wav')
const loseWav = require('../assets/lose.wav')

interface AudioControls {
  playDotSound: VoidFunction;
  playLoseSound: VoidFunction;
}

type ContextValue = undefined | AudioControls
const AudioContext = React.createContext<ContextValue>(undefined);

interface AudioLibrary {
  dot: Sound;
  lose: Sound;
}

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const library = useRef<undefined | AudioLibrary>()
  
  useEffect(() => {
    (async () => {
      console.log('loading sounds...')
      const [dot, lose] = await Promise.all([
        Audio.Sound.createAsync(pongWav, { shouldPlay: false, isMuted: true }),
        Audio.Sound.createAsync(loseWav, { shouldPlay: false, isMuted: true }),
      ])
      console.log('loaded sounds...')
      await lose.sound.playAsync()
      await dot.sound.playAsync()
      await lose.sound.setVolumeAsync(0.2)
      await dot.sound.setVolumeAsync(1)
      setTimeout(async () => {
        await lose.sound.setIsMutedAsync(false)
        await dot.sound.setIsMutedAsync(false)
      }, 1000)
      library.current = {
        dot: dot.sound,
        lose: lose.sound,
      }
      console.log('library set')
    })()
  }, [])

  const createPlayHandler = useCallback((key: 'dot' | 'lose') => async () => {
    console.log(`Playing sound ${key}`)
    if (!library.current) return console.log('audio miss')
    const s = library.current[key]
    await s.replayAsync()
  }, [])

  return (
    <AudioContext.Provider value={{
      playDotSound: createPlayHandler('dot'),
      playLoseSound: createPlayHandler('lose'),
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
