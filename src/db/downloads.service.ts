import { createClient } from '@/db/supabase/client'

type SaveDownloadRecordType = {
  userId: string
  url: string
  filename: string
}

export const saveDownloadRecord = async ({ userId, url, filename }: SaveDownloadRecordType) => {
  const supabase = createClient()

  const { error: updateError } = await supabase.from('downloads').insert({
    user_id: userId,
    space_url: url,
    public_url: filename,
  })
  if (updateError) throw updateError
}
