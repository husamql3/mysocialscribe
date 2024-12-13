import React, { createContext, ReactNode, useContext, useState } from 'react'

type AudioPlayerContextType = {
  isVisible: boolean
  src?: string
  toggle: () => void
  setSrc: (src: string) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [src, setSrc] = useState<string | undefined>(undefined)

  const toggle = () => {
    setIsVisible((prev) => !prev)
  }

  const contextValue = {
    isVisible,
    src,
    toggle,
    setSrc: (newSrc: string) => {
      setSrc(newSrc)
      setIsVisible(true)
    },
  }

  return <AudioPlayerContext.Provider value={contextValue}>{children}</AudioPlayerContext.Provider>
}

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }

  return context
}
