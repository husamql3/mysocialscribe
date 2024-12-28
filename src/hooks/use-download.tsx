'use client'

import { useState } from 'react'

import { useLoginDialog } from '@/providers/login-dialog-provider'
import { DownloadTwitterSpacesParamsType, UseDownloadType } from '@/types/UseDownloadType'
import { useLoadingStore } from '@/store/useStore'

export const useDownload = (): UseDownloadType => {
  const { openLoginDialog } = useLoginDialog()
  const [error, setError] = useState<string | null>(null)
  const setLoading = useLoadingStore((state) => state.setLoading)
  const setNotLoading = useLoadingStore((state) => state.setNotLoading)

  const downloadTwitterSpaces = async (params: DownloadTwitterSpacesParamsType) => {
    setError(null)
    setLoading()

    try {
      const normalizedUrl = params.url.replace(/^https?:\/\/twitter\.com/, 'https://x.com')
      const response = await fetch('/api/twitter/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space_url: normalizedUrl,
          user_id: params.userId,
          email: params.email,
          download_id: params.downloadId,
        }),
      })
      if (!response.ok) {
        throw new Error('Server error occurred. Please try again later.')
      }
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      if (message === 'User must be logged in') {
        openLoginDialog('login')
        return false
      }
      throw new Error(message)
    } finally {
      setNotLoading()
      window.location.reload()
    }
  }

  return { error, downloadTwitterSpaces }
}
