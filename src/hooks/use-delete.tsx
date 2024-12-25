'use client'

import { useState } from 'react'

export const useDeleteDownload = () => {
  const [isSoftDeleting, setIsSoftDeleting] = useState(false)
  const [isHardDeleting, setIsHardDeleting] = useState(false)

  const softDelete = async (id: string) => {
    setIsSoftDeleting(true)

    try {
      await fetch(`/api/twitter/soft-delete?id=${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSoftDeleting(false)
      window.location.reload()
    }
  }

  const hardDelete = async (id: string) => {
    setIsHardDeleting(true)

    try {
      await fetch(`/api/twitter/hard-delete?id=${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsHardDeleting(false)
      window.location.reload()
    }
  }

  return { isSoftDeleting, softDelete, isHardDeleting, hardDelete }
}
