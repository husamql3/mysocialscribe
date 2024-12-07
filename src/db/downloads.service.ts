import { createClient } from '@/db/supabase/client'
import { OldDownload, SaveDownloadRecord } from '@/types/DownlodsType'

export const saveDownloadRecord = async ({ userId, url, filename }: SaveDownloadRecord) => {
  const supabase = createClient()

  const { error: updateError } = await supabase.from('downloads').insert({
    user_id: userId,
    space_url: url,
    filename,
  })
  if (updateError) throw updateError
  console.log('Download record saved successfully', url, filename)
}

export const findOldDownloads = async (): Promise<OldDownload[]> => {
  const supabase = createClient()
  // const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const minuteAgo = new Date(Date.now() - 60 * 1000)

  const { data: oldDownloads, error } = await supabase
    .from('downloads')
    .select('*')
    .lt('created_at', minuteAgo.toISOString())
  if (error) throw error

  return oldDownloads as OldDownload[]
}

export const deleteOldDownloads = async ({ id }: { id: string }) => {
  const supabase = createClient()

  await supabase.from('downloads').update({ filename: null }).eq('id', id)
}
