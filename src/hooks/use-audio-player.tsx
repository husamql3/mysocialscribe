'use client'

import { useQueryState } from 'nuqs'

const useAudioPlayer = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useQueryState('audioPlayer')
  const [spaceSrc, setSpaceSrc] = useQueryState('spaceSrc')

  const isVisible = showAudioPlayer === 'true'
  const toggle = () => setShowAudioPlayer((prev) => (prev === 'true' ? 'false' : 'true'))

  return { isVisible, toggle, setSpaceSrc, spaceSrc }
}

export default useAudioPlayer
