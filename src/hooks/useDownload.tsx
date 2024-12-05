'use client'

import { useState } from 'react'

import { DownloadTwitterSpacesType, UseDownloadType } from '@/types/UseDownloadType'
import { createClient } from '@/db/supabase/client'

export const useDownload = (): UseDownloadType => {
  const supabase = createClient()

  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadTwitterSpaces = async ({
    url,
    userId,
  }: DownloadTwitterSpacesType): Promise<void> => {
    try {
      setDownloading(true)
      setError(null)

      const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/(status|spaces)\/\d+/
      if (!twitterSpacesRegex.test(url)) throw new Error('Invalid Twitter Spaces or Tweet URL')

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
      const publicUrl: string = data.downloadUrl

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = publicUrl
      link.target = '_blank'
      link.download = 'twitter_space.mp3'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      const { error } = await supabase.from('downloads').insert({
        user_id: userId,
        public_url: publicUrl,
      })
      if (error) throw new Error(error.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setDownloading(false)
    }
  }

  return { downloading, error, downloadTwitterSpaces }
}
