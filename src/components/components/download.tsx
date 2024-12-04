'use client'

import { LoaderCircle } from 'lucide-react'
import { User } from '@supabase/auth-js'

import { useDownload } from '@/hooks/useDownload'
import { useLoginDialog } from '@/providers/login-dialog-provider'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const Download = ({ user }: { user: User | null }) => {
  const { downloading, downloadTwitterSpaces, error, progress } = useDownload()
  const { openLoginDialog } = useLoginDialog()

  const handleDownload = (url: string) => {
    if (user === null) {
      openLoginDialog('login')
      return
    }

    downloadTwitterSpaces(url)
  }

  const isIndeterminateProgress = progress > 100

  return (
    <div className="z-50 flex w-full max-w-md flex-col gap-1 space-y-1 px-4 pb-10 md:px-0">
      <div className="flex h-full w-full flex-col items-center gap-2 md:flex-row">
        <Input
          className="h-10 w-full rounded-xl bg-stone-50 text-base opacity-100 dark:bg-zinc-950 md:h-12 md:w-96 md:text-lg"
          placeholder="input your twitter space link"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleDownload(e.currentTarget.value)
          }}
        />

        <div className="flex w-full items-center space-x-2 md:w-fit">
          <Button
            className="h-10 w-full min-w-12 rounded-xl text-sm md:h-12 md:w-fit"
            size="sm"
            disabled={downloading}
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement
              handleDownload(input.value)
            }}
          >
            {downloading ? (
              <>
                <span className="block md:hidden">Downloading...</span>
                <LoaderCircle className="animate-spin text-white duration-700 dark:text-black" />
              </>
            ) : (
              <span>Download</span>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          Invalid Twitter Spaces or Tweet URL
        </p>
      )}

      {downloading && (
        <div className="flex w-full items-center space-x-2">
          <Progress
            value={isIndeterminateProgress ? undefined : progress}
            className="w-full"
          />
          {!isIndeterminateProgress && <span className="text-sm text-gray-500">{progress}%</span>}
        </div>
      )}
    </div>
  )
}

export default Download
