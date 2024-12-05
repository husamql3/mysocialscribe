'use client'

import { useState } from 'react'

import { UseDownloadType } from '@/types/UseDownloadType'

export const useDownload = (): UseDownloadType => {
  const [downloading, setDownloading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const downloadTwitterSpaces = async (url: string): Promise<void> => {
    try {
      setDownloading(true)
      setDownloadUrl(null)
      setError(null)

      const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/(status|spaces)\/\d+/
      if (!twitterSpacesRegex.test(url)) {
        throw new Error('Invalid Twitter Spaces or Tweet URL')
      }

      const response = await fetch('/api/download/twitter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Download failed')
      }

      const data = await response.json()
      setDownloadUrl(data.downloadUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setDownloading(false)
    }
  }

  return { downloading, downloadUrl, error, downloadTwitterSpaces }
}
