import { type EnrichedTweet } from 'react-tweet'
import { Database } from '@/types/supabase'

export type DlType = {
  id: string
  created_at: string
  user_id: string | null
  filename: string | null
  space_url: string
  is_deleted: boolean
  status: 'pending' | 'completed' | 'failed'
  is_archived: boolean
}

export type DownloadsType = {
  download: DlType
  tweet: EnrichedTweet | undefined
}

export type DownloadParams = {
  space_url: string
  user_id: string
  download_id?: string
}

export type DownloadResult = {
  dl: Database['public']['Tables']['downloads']['Row']
  startDownloading: boolean
}

export type CheckIfDownloadExistsType = {
  user_id: string
  space_url: string
}
