'use client'

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
        size="sm"
        variant="destructive"
        type="submit"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  )
}

export default TweetDelBtn
