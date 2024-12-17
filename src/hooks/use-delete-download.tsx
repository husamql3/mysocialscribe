'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type DeleteOptions = {
  endpoint: string
  body: Record<string, string>
}

type DeleteParams = {
  downloadId: string
  filename?: string
}

const useDeleteDownload = () => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const performDelete = async (deleteType: 'soft' | 'hard', params: DeleteParams) => {
    const deleteOptions: Record<'soft' | 'hard', DeleteOptions> = {
      soft: {
        endpoint: '/api/twitter/soft-delete',
        body: {
          downloadId: params.downloadId,
          filename: params.filename || '',
        },
      },
      hard: {
        endpoint: '/api/twitter/hard-delete',
        body: {
          downloadId: params.downloadId,
          filename: params.filename || '',
        },
      },
    }

    const { endpoint, body } = deleteOptions[deleteType]

    setIsDeleting(true)
    setDeleteError(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Deletion failed')
      }

      router.refresh()
    } catch (error) {
      setDeleteError(`Deletion failed: ${error instanceof Error ? error.message : error}`)
    } finally {
      setIsDeleting(false)
    }
  }

  const softDeleteDownload = (downloadId: string, filename: string) => {
    performDelete('soft', { downloadId, filename })
  }

  const hardDeleteDownload = (downloadId: string, filename?: string) => {
    performDelete('hard', { downloadId, filename })
  }

  return {
    hardDeleteDownload,
    softDeleteDownload,
    isDeleting,
    deleteError,
  }
}

export default useDeleteDownload
