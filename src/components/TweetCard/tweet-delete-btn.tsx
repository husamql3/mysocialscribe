'use client'

import { AiOutlineDelete } from 'react-icons/ai'
import { useEffect } from 'react'

import { toast } from '@/hooks/use-toast'
import { TweetDelBtnType } from '@/types/TweetCardType'

import { Button } from '@/components/ui/button'
import useDeleteDownload from '@/hooks/use-delete-download'
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

const TweetDelBtn = ({ downloadId, filename }: TweetDelBtnType) => {
  const { hardDeleteDownload, isDeleting, deleteError } = useDeleteDownload()

  useEffect(() => {
    if (deleteError) {
      toast({
        description: deleteError,
        variant: 'destructive',
      })
    }
  }, [deleteError])

  const handleDelete = (downloadId: string, filename?: string) => {
    hardDeleteDownload(downloadId, filename)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 w-7"
          disabled={isDeleting}
        >
          <AiOutlineDelete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete your space.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(downloadId, filename!)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default TweetDelBtn
