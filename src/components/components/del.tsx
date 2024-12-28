import { deleteAllFilenames } from '@/db/supabase/services/downloads.service'
import { revalidatePath } from 'next/cache'
import { Button } from '@/components/ui/button'

export const Del = () => {
  const handleDelete = async () => {
    'use server'
    try {
      await deleteAllFilenames()
    } catch (error) {
      console.error('Error deleting all filenames:', error)
    } finally {
      revalidatePath('/history', 'layout')
      console.log('All filenames deleted')
    }
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
    >
      DEL
    </Button>
  )
}
