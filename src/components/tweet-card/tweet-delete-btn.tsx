'use client'

import { AiOutlineDelete } from 'react-icons/ai'

import { useLoadingStore } from '@/store/useStore'
import { useDeleteDownload } from '@/hooks/use-delete'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const TweetDelBtn = ({ downloadId }: { downloadId: string }) => {
  const isDownloading = useLoadingStore((state) => state.isLoading)
  const { isHardDeleting, softDelete } = useDeleteDownload()

  const handleDelete = async (downloadId: string) => {
    await softDelete(downloadId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isDownloading}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 text-neutral-600"
          disabled={isDownloading || isHardDeleting}
        >
          <AiOutlineDelete className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete your space.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(downloadId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TweetDelBtn
