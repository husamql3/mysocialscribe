'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { HiDownload } from 'react-icons/hi'

import { cn } from '@/lib/utils'
import { TweetDownloadBtnProps } from '@/types/TweetCardType'

import { Button } from '@/components/ui/button'
import { Confetti, ConfettiRef } from '@/components/ui/confetti'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'
import { useDownload } from '@/hooks/useDownload'

const TweetDownloadBtn = ({ filename, tweetUrl, user }: TweetDownloadBtnProps) => {
  const { downloadTwitterSpaces } = useDownload()
  const confettiRef = useRef<ConfettiRef>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownload = async () => {
    setIsModalOpen(true)

    await downloadTwitterSpaces({
      url: tweetUrl,
      userId: user.id,
      email: user.email!,
      redirect: false,
    })
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className={cn(filename ? 'h-7 w-7' : '')}
        onClick={handleDownload}
      >
        {filename ? <HiDownload className="h-5 w-5" /> : 'Download Again'}
      </Button>

      {/* Success Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      >
        <DialogContent className="flex w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-lg px-6 pb-4 pt-8 dark:bg-zinc-950">
          <Confetti
            ref={confettiRef}
            className="absolute z-0 size-full"
            onMouseEnter={() => {
              confettiRef.current?.fire({})
            }}
          />

          <Image
            src="/sent.png"
            alt="Success"
            className="pb-5"
            width={80}
            height={80}
            quality={80}
            loading="eager"
          />

          <DialogDescription className="w-full pb-5 text-center font-semibold dark:text-stone-50">
            Your download is starting now. We&#39;ll send you an email as soon as it&#39;s ready!
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TweetDownloadBtn
