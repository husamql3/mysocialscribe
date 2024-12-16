import { createClient } from '@/db/supabase/client'
import { SaveDownloadRecord, UserDownload } from '@/types/DownlodsType'

const supabase = createClient()

/**
 * Saves a download record to the "downloads" table in the database.
 *
 * @param {Object} params - The parameters for saving the download record.
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.url - The URL of the downloaded space.
 * @param {string} params.filename - The name of the downloaded file.
 *
 * @throws Will throw an error if the upsert operation fails.
 */
export const saveDownloadRecord = async ({ userId, url, filename }: SaveDownloadRecord) => {
  const { error } = await supabase.from('downloads').upsert(
    {
      user_id: userId,
      space_url: url,
      filename,
    },
    {
      onConflict: 'space_url',
      ignoreDuplicates: false,
    }
  )
  if (error) throw error
  console.log('Download record saved successfully', url, filename)
}

/**
 * Gets the recent downloads for all users.
 *
 * @throws Will throw an error if the database query fails.
 * @returns An array of recent downloads.
 */
export async function getRecentDownloads() {
  const { data: oldDownloads, error } = await supabase.rpc('get_recent_downloads')
  if (error) throw error

  return oldDownloads as UserDownload[]
}

/**
 * Updates the filename of a download.
 *
 * @param {string} id - The ID of the download to update.
 *
 * @throws Will throw an error if the database query fails.
 * @returns The updated download.
 */
export async function updateDownloadFilename(id: string) {
  return supabase.from('downloads').update({ filename: null }).eq('id', id)
}

/**
 * Gets the downloads for a specific user.
 *
 * @param {string} userId - The ID of the user to get the downloads for.
 *
 * @throws Will throw an error if the database query fails.
 * @returns An array of downloads for the user.
 */
export async function getUserDownloads(userId: string) {
  if (!userId) return []

  const { data: userDownloads, error } = await supabase
    .from('downloads')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error

  return userDownloads as UserDownload[]
}

/**
 * Deletes a download record from the database.
 *
 * @param {string} id - The ID of the download to delete.
 * @throws Will throw an error if the database query fails.
 */
export async function deleteDownload(id: string) {
  const { error } = await supabase.from('downloads').delete().eq('id', id)
  if (error) throw error
}
