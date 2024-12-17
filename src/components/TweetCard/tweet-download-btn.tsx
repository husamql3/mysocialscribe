'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { HiDownload } from 'react-icons/hi'
import { History } from 'lucide-react'

import { TweetDownloadBtnProps } from '@/types/TweetCardType'
import { useDownload } from '@/hooks/use-download'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Confetti, ConfettiRef } from '@/components/ui/confetti'
import { Dialog, DialogContent, DialogDescription } from '@/components/ui/dialog'

const TweetDownloadBtn = ({ filename, tweetUrl, user, isDeleted }: TweetDownloadBtnProps) => {
  const { downloadTwitterSpaces } = useDownload()
  const confettiRef = useRef<ConfettiRef>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // if the file is on the server, download it
  const handleDownload = async () => {
    if (!filename) return

    const response = await fetch(`/downloads/${filename}`)
    if (!response.ok) console.warn('File not found')

    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(link.href)
  }

  // if the file is not on the server, download it again
  const handleDownloadAgain = async () => {
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
      {filename ? (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 bg-indigo-500 text-stone-50 hover:!bg-indigo-700"
          onClick={handleDownload}
        >
          <HiDownload className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDownloadAgain}
          className={cn('h-7', isDeleted ? 'w-7' : 'w-auto')}
        >
          {isDeleted ? <History /> : 'Download Again'}
        </Button>
      )}

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
// // Dependencies: pnpm install lucide-react
//
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
//
// export default function ButtonDemo() {
//   return (
//     <Button variant="secondary">
//       <X className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
//       Button
//     </Button>
//   );
// }
