'use client'

import { useState } from 'react'

import { toast } from '@/hooks/use-toast'
import { useLoginDialog } from '@/providers/login-dialog-provider'
import {
  DownloadTwitterSpacesParamsType,
  DownloadTwitterSpacesReturnType,
  UseDownloadType,
} from '@/types/UseDownloadType'
import useLoadingStore from '@/store/useStore'

export const useDownload = (): UseDownloadType => {
  const { openLoginDialog } = useLoginDialog()
  const [error, setError] = useState<string | null>(null)
  const setLoading = useLoadingStore((state) => state.setLoading)
  const setNotLoading = useLoadingStore((state) => state.setNotLoading)

  const downloadTwitterSpaces = async (
    params: DownloadTwitterSpacesParamsType
  ): Promise<DownloadTwitterSpacesReturnType> => {
    setError(null)
    setLoading()

    try {
      const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/(status|spaces)\/\d+/
      if (!twitterSpacesRegex.test(params.url)) {
        toast({
          title: 'Invalid Twitter Spaces or Tweet URL',
          description: 'Please enter a valid Twitter Spaces or Tweet URL',
          variant: 'destructive',
        })
        return {
          success: false,
          error: 'Invalid Twitter Spaces or Tweet URL',
        }
      }

      // Replace 'https://twitter.com' with 'https://x.com'
      const normalizedUrl = params.url.replace(/^https?:\/\/twitter\.com/, 'https://x.com')

      const response = await fetch('/api/twitter/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: normalizedUrl,
          userId: params.userId,
          email: params.email,
        }),
      })

      if (!response.ok && response.status === 500) {
        setError('Download failed, please recheck the URL')
        return {
          success: false,
          error: 'Download failed, please recheck the URL',
        }
      }

      // todo: fix use `resend`
      // await sendErrorEmail({ to: email })

      return {
        success: true,
        error: null,
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      console.warn(errorMessage)

      if (typeof err === 'object' && err !== null && 'message' in err) {
        const message = (err as { message: string }).message
        if (message === 'User must be logged in') {
          openLoginDialog('login')
          return {
            success: false,
            error: 'User must be logged in',
          }
        }

        // Set error state for other errors
        setError(message)
        return {
          success: false,
          error: message,
        }
      }

      // Handle any other types of errors
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setNotLoading()

      // Reload the page after the download is complete
      window.location.reload()
    }
  }

  return { error, downloadTwitterSpaces }
}
