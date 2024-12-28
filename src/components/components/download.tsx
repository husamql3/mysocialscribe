'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { User } from '@supabase/auth-js'
import { IoArrowForward } from 'react-icons/io5'

import { toast } from '@/hooks/use-toast'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useDownload } from '@/hooks/use-download'
import { useLoginDialog } from '@/providers/login-dialog-provider'
import { useModalStore } from '@/store/useStore'

import { Confetti, ConfettiRef } from '@/components/ui/confetti'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

const Download = ({ user }: { user: User | null }) => {
  const searchParams = useSearchParams()
  const { downloadTwitterSpaces } = useDownload()
  const { openLoginDialog } = useLoginDialog()
  const [storedSpaceUrl, setStoredSpaceUrl] = useLocalStorage('spaceUrl', '')
  const [inputUrl, setInputUrl] = useState('')
  const confettiRef = useRef<ConfettiRef>(null)
  const { isModalOpen, toggleModal } = useModalStore()

  useEffect(() => {
    const urlFromParams = searchParams.get('spaceUrl')
    if (urlFromParams) {
      setInputUrl(urlFromParams)
    } else if (storedSpaceUrl) {
      setInputUrl(storedSpaceUrl)
    }
  }, [searchParams, storedSpaceUrl])

  const handleDownload = async () => {
    // if the user is not logged in, open the login dialog and return
    if (!user) {
      setStoredSpaceUrl(inputUrl)
      openLoginDialog('login')
      return
    }

    // if the input is empty, show a toast and return
    if (!inputUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a URL',
        variant: 'destructive',
      })
      return
    }

    // if the input is not a valid Twitter space link, show a error toast and return
    const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/status\/\d+$/
    if (!twitterSpacesRegex.test(inputUrl)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid Tweet URL',
        variant: 'destructive',
      })
      return
    }

    // close the modal and start the download
    toggleModal()

    try {
      await downloadTwitterSpaces({
        url: inputUrl,
        userId: user.id,
        email: user.email!,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  const handleCloseModal = () => {
    toggleModal()
  }

  return (
    <>
      <div className="z-50 flex w-full max-w-md flex-col gap-1 space-y-1 px-4 pb-10 md:px-0">
        <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row">
          <Input
            className="h-10 w-full rounded-xl bg-stone-50 text-base opacity-100 dark:bg-zinc-950 md:h-12 md:w-96 md:text-lg"
            placeholder="Input your Twitter space link"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleDownload()
            }}
          />

          <div className="flex w-full items-center space-x-2 md:w-fit">
            <Button
              className="h-10 w-full min-w-12 rounded-xl text-sm md:h-12 md:w-fit"
              size="sm"
              onClick={handleDownload}
            >
              <span>Download</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={handleCloseModal}
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

          <DialogTitle className="sr-only">Success</DialogTitle>

          <DialogDescription className="w-full pb-5 text-center font-semibold dark:text-stone-50">
            Your download is starting now. We&#39;ll send you an email as soon as it&#39;s ready!
          </DialogDescription>

          <DialogFooter>
            <Link
              href="/history"
              className="z-50 flex items-center gap-1 text-sm text-blue-500 transition duration-200 hover:underline"
              onClick={handleCloseModal}
            >
              View My Spaces
              <IoArrowForward />
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Download
