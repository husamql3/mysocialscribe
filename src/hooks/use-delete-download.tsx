'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const useDeleteDownload = () => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteDowload = async (formData: FormData) => {
    const filename = formData.get('filename') as string
    const downloadId = formData.get('downloadId') as string

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/twitter/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          downloadId,
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error('Deletion failed')
      }
    } catch (error) {
      console.error('Deletion error:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    deleteDowload,
    isDeleting,
  }
}

export default useDeleteDownload
