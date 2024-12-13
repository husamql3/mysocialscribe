'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { HiDownload } from 'react-icons/hi'
import { IoClose, IoPlay } from 'react-icons/io5'

import useAudioPlayer from '@/hooks/use-audio-player'
import { TweetPlayBtnType } from '@/types/TweetCardType'

import { Button } from '@/components/ui/button'

const TweetPlayBtn = ({ filename, tweetUrl }: TweetPlayBtnType) => {
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
      variant="ghost"
      className="h-7 w-7 rounded-full"
      onClick={handleClick}
    >
      {filename ? (
        isVisible && spaceSrc === filename ? (
          <IoClose className="h-5 w-5" />
        ) : (
          <IoPlay className="h-5 w-5" />
        )
      ) : (
        <Link
          href={process.env.NEXT_PUBLIC_BASE_URL + '?spaceUrl=' + tweetUrl}
          target="_blank"
        >
          <HiDownload className="h-5 w-5" />
        </Link>
      )}
    </Button>
  )
}

export default TweetPlayBtn
