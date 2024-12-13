'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useLoginDialog } from '@/providers/login-dialog-provider'
import { DownloadTwitterSpacesType, UseDownloadType } from '@/types/UseDownloadType'

export const useDownload = (): UseDownloadType => {
  const { openLoginDialog } = useLoginDialog()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const downloadTwitterSpaces = async ({
    url,
    userId,
    email,
  }: DownloadTwitterSpacesType): Promise<void> => {
    try {
      const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/(status|spaces)\/\d+/
      if (!twitterSpacesRegex.test(url)) {
        setError('Invalid Twitter Spaces or Tweet URL')
        throw new Error('Invalid Twitter Spaces or Tweet URL')
      }

      router.push('/success')

      const response = await fetch('/api/download/twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, userId, email }),
      })
      if (!response.ok && response.status === 500) {
        setError('Download failed, please recheck the URL')
        throw new Error('Download failed, please recheck the URL')
        // todo: fix use `resend`
        // await sendErrorEmail({ to: email })
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.warn(errorMessage)

      if (typeof err === 'object' && err !== null && 'message' in err) {
        const message = (err as { message: string }).message
        if (message === 'User must be logged in') {
          openLoginDialog('login')
          return
        }
      }
    }
  }

  return { error, downloadTwitterSpaces }
}
