'use client'

import { HiDownload } from 'react-icons/hi'

import { Button } from '@/components/ui/button'

const TweetDownloadBtn = ({ filename }: { filename: string }) => {
  const handleDownload = async () => {
    if (!filename) return

    const response = await fetch(`/downloads/${filename}`)
    if (!response.ok) console.warn('File not found')

    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(link.href)
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      className="h-7 w-7 bg-indigo-500 text-stone-50 hover:!bg-indigo-700"
      onClick={handleDownload}
      type="button"
    >
      <HiDownload className="h-5 w-5" />
    </Button>
  )
}

export default TweetDownloadBtn
