'use client'

import { useEffect } from 'react'
import { IoClose, IoPlay } from 'react-icons/io5'

import useAudioPlayer from '@/hooks/use-audio-player'
import { TweetPlayBtnType } from '@/types/TweetCardType'

import { Button } from '@/components/ui/button'

const TweetPlayBtn = ({ filename }: TweetPlayBtnType) => {
  const { toggle, isVisible, setSpaceSrc, spaceSrc } = useAudioPlayer()

  // Set the space source when the filename changes
  useEffect(() => {
    if (filename) setSpaceSrc(filename)
  }, [filename, setSpaceSrc])

  // Toggle the audio player when the button is clicked and the filename is available
  const handleClick = () => {
    if (filename) {
      if (isVisible) setSpaceSrc('')
      else setSpaceSrc(filename)

      toggle()
    }
  }

  return (
    <Button
      size="sm"
      variant="default"
      className="h-7 w-7"
      onClick={handleClick}
    >
      {isVisible && spaceSrc === filename ? (
        <IoClose className="h-5 w-5" />
      ) : (
        <IoPlay className="h-5 w-5" />
      )}
    </Button>
  )
}

export default TweetPlayBtn
