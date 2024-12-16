'use client'

import { User } from '@supabase/auth-js'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { useDownload } from '@/hooks/useDownload'
import { useLoginDialog } from '@/providers/login-dialog-provider'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Download = ({ user }: { user: User | null }) => {
  const searchParams = useSearchParams()
  const { downloadTwitterSpaces } = useDownload()
  const { openLoginDialog } = useLoginDialog()
  const [storedSpaceUrl, setStoredSpaceUrl] = useLocalStorage('spaceUrl', '')
  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    const urlFromParams = searchParams.get('spaceUrl')
    if (urlFromParams) {
      setInputUrl(urlFromParams)
    } else if (storedSpaceUrl) {
      setInputUrl(storedSpaceUrl)
    }
  }, [searchParams, storedSpaceUrl])

  const handleDownload = async () => {
    if (user === null) {
      setStoredSpaceUrl(inputUrl)
      openLoginDialog('login')
      return
    }

    downloadTwitterSpaces({
      url: inputUrl,
      userId: user.id,
      email: user.email!,
      redirect: true,
    })

    setStoredSpaceUrl('')
    setInputUrl('')
  }

  return (
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
  )
}

export default Download
