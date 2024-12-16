'use client'

import { AiOutlineDelete } from 'react-icons/ai'

import useDeleteDownload from '@/hooks/use-delete-download'

import { Button } from '@/components/ui/button'

const TweetDelBtn = ({ downloadId, filename }: { downloadId: string; filename?: string }) => {
  const { deleteDowload, isDeleting } = useDeleteDownload()

  return (
    <form action={deleteDowload}>
      <input
        type="hidden"
        name="downloadId"
        value={downloadId}
        readOnly
      />

      {filename && (
        <input
          type="hidden"
          name="filename"
          value={filename}
          readOnly
        />
      )}

      <Button
        variant="destructive"
        type="submit"
        size="sm"
        className="h-7 w-7"
        disabled={isDeleting}
      >
        <AiOutlineDelete />
      </Button>
    </form>
  )
}

export default TweetDelBtn
