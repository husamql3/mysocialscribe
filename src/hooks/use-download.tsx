'use client'

import { useState } from 'react'

import { useLoginDialog } from '@/providers/login-dialog-provider'
import {
  CheckIfDownloadExistsParamsType,
  DownloadTwitterSpacesParamsType,
  UseDownloadType,
} from '@/types/UseDownloadType'
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
        const errorData = await response.json()
        throw new Error(errorData.error)
      }

      window.location.reload()
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
      // window.location.reload()
    }
  }

  const checkIfDownloadExists = async (params: CheckIfDownloadExistsParamsType) => {
    try {
      const normalizedUrl = params.url.replace(/^https?:\/\/twitter\.com/, 'https://x.com')
      const response = await fetch('/api/twitter/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space_url: normalizedUrl,
          user_id: params.userId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        switch (response.status) {
          case 401:
            if (errorData.error === 'User must be logged in') {
              openLoginDialog('login')
              return false
            }
            break

          case 400:
            if (errorData.error === 'Download already exists') {
              setError('You have already downloaded this Space')
              return true
            }
            setError(errorData.error || 'Invalid request. Please check your input.')
            return false

          case 500:
            setError('Server error. Please try again later.')
            return false

          default:
            setError(errorData.error || 'Something went wrong. Please try again.')
            return false
        }
      }

      setError(null)
      return false
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'

      if (message === 'User must be logged in') {
        openLoginDialog('login')
        setError('Please log in to continue')
        return false
      }

      if (message.includes('Failed to fetch') || message.includes('Network')) {
        setError('Network error. Please check your internet connection.')
      } else {
        setError('Unable to check download status. Please try again.')
      }

      return false
    }
  }

  return { error, downloadTwitterSpaces, checkIfDownloadExists }
}
