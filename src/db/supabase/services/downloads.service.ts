'use server'

import { createClient } from '@/db/supabase/client'
import {
  CheckIfDownloadExistsType,
  DlType,
  DownloadParams,
  DownloadResult,
} from '@/types/DownlodsType'
import { Database } from '@/types/supabase'

const supabase = createClient()

/**
 * Get a download record by space url
 **/

/**
 * Update or insert a download record based on download_id
 **/
export async function updateOrInsertDownload(
  data: Partial<Database['public']['Tables']['downloads']['Insert']>,
  download_id?: string
): Promise<DownloadResult['dl']> {
  const { data: result, error } = download_id
    ? await supabase.from('downloads').update(data).eq('id', download_id).select().single()
    : await supabase.from('downloads').insert(data).select().single()

  if (error) {
    console.error('Error updating/inserting download record:', error)
    throw error
  }

  return result
}

/**
 * Download a space and return the download record
 **/
export const download = async ({
  space_url,
  user_id,
  download_id,
}: DownloadParams): Promise<DownloadResult> => {
  const existingDownload = await findDlBySpaceUrl(space_url)

  if (existingDownload?.filename) {
    const data = {
      user_id: user_id,
      filename: existingDownload.filename,
      space_url,
      status: 'completed' as const,
      is_deleted: false,
      is_archived: false,
    }

    const dl = await updateOrInsertDownload(data, download_id)
    return { dl, startDownloading: false }
  }

  if (download_id) {
    const dl = await updateOrInsertDownload(
      {
        status: 'pending',
        is_deleted: false,
        is_archived: false,
      },
      download_id
    )
    return { dl, startDownloading: true }
  }

  const dl = await updateOrInsertDownload({
    user_id,
    space_url,
    status: 'pending',
    is_deleted: false,
    is_archived: false,
  })
  return { dl, startDownloading: true }
}

/**
 * Check if a download record exists
 */
export const checkIfDownloadExists = async ({
  space_url,
  user_id,
}: CheckIfDownloadExistsType): Promise<boolean> => {
  const { data, error } = await supabase
    .from('downloads')
    .select('*')
    .eq('user_id', user_id)
    .eq('space_url', space_url)
    .eq('is_archived', false)
    .select()

  if (error) {
    console.error('Error checking if download exists:', error)
    throw error
  }

  return data?.length > 0
}

export const findDlBySpaceUrl = async (space_url: string): Promise<DlType | undefined> => {
  const { data: record } = await supabase
    .from('downloads')
    .select('*')
    .eq('space_url', space_url)
    .select()

  if (record) return record[0] ? record[0] : null
}

/**
 * Get all download records for a user
 */
export const getDownloads = async ({ userId }: { userId: string }): Promise<DlType[]> => {
  const { data, error } = await supabase
    .from('downloads')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error getting downloads:', error)
    throw error
  }

  return data as DlType[]
}

/**
 * Get all recent download records
 */
export const getRecentDownloads = async (): Promise<DlType[]> => {
  const { data, error } = await supabase.rpc('get_recent_downloads')

  if (error) {
    console.error('Error getting recent downloads:', error)
    throw error
  }

  return data as DlType[]
}

/**
 * Get a download record by id
 */
export const getDownloadById = async ({ id }: { id: string }): Promise<DlType> => {
  const { data, error } = await supabase.from('downloads').select('*').eq('id', id)

  if (error) {
    console.error('Error getting download by id:', error)
    throw error
  }

  return data[0] as DlType
}

/**
 * delete a download record (soft delete)
 */
export const softDeleteDownload = async (id: string) => {
  const { error } = await supabase
    .from('downloads')
    .update({
      is_deleted: true,
      filename: null,
      status: 'pending',
    })
    .eq('id', id)

  if (error) {
    console.error('Error soft deleting download:', error)
    throw error
  }
}

/**
 * delete a download record (hard delete)
 */
export const hardDeleteDownload = async (id: string) => {
  const { error } = await supabase
    .from('downloads')
    .update({
      is_archived: true,
      is_deleted: true,
      filename: null,
      status: 'pending',
    })
    .eq('id', id)

  if (error) {
    console.error('Error hard deleting download:', error)
    throw error
  }
}

/**
 * delete cached download from the server
 */
export const removeCachedDownload = async (id: string) => {
  await supabase
    .from('downloads')
    .update({
      filename: null,
      is_deleted: true,
    })
    .eq('id', id)
}

/**
 * ONLY USED FOR TESTING
 **/
export const deleteAllFilenames = async () => {
  const { error } = await supabase
    .from('downloads')
    .update({ filename: null, is_deleted: true })
    .neq('filename', null)

  if (error) {
    console.error('Error deleting all filenames:', error)
    throw error
  }
}
