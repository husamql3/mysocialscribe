'use client'

import { useEffect, useRef, useState } from 'react'
import { CiPause1, CiPlay1 } from 'react-icons/ci'
import { TbVolume, TbVolume3 } from 'react-icons/tb'

import { cn } from '@/lib/utils'
import useAudioPlayer from '@/hooks/use-audio-player'

import { Slider } from '@/components/ui/slider'
import { IoClose } from 'react-icons/io5'

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [src, setSrc] = useState<string | undefined>(undefined)

  const { isVisible, spaceSrc, toggle, setSpaceSrc } = useAudioPlayer()
  useEffect(() => {
    if (spaceSrc) {
      setSrc(`${process.env.NEXT_PUBLIC_BASE_URL}/downloads/${spaceSrc}`)
    } else {
      setSrc(undefined)
    }
  }, [spaceSrc])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setProgress((audioRef.current.currentTime / duration) * 100)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value[0] / 100) * duration
      setProgress(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0]
      setVolume(value[0])
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Pause and reset audio when component is hidden
  useEffect(() => {
    if (!isVisible && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }
  }, [isVisible])

  return (
    <div
      className={cn(
        'sticky bottom-0 z-50 flex w-full items-center gap-4 border-t border-y-stone-800 px-4 py-2 text-white dark:bg-neutral-950',
        isVisible ? 'flex' : 'hidden'
      )}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <button
        className="rounded-full p-2 transition hover:bg-white/10"
        onClick={() => {
          toggle()
          setSpaceSrc('')
        }}
      >
        <IoClose className="h-5 w-5" />
      </button>

      <button
        className="rounded-full p-2 transition hover:bg-white/10"
        onClick={togglePlayPause}
      >
        {playing ? <CiPause1 className="h-5 w-5" /> : <CiPlay1 className="h-5 w-5" />}
      </button>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-12 text-left text-xs tabular-nums text-zinc-400">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            className="w-full"
            onValueChange={handleProgressChange}
          />
          <span className="w-12 text-xs tabular-nums text-zinc-400">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {audioRef?.current?.volume === 0 ? (
          <TbVolume3 className="h-5 w-5" />
        ) : (
          <TbVolume className="h-5 w-5" />
        )}

        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          className="w-20"
          onValueChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
