import { type EnrichedTweet } from 'react-tweet'

export type DlType = {
  id: string
  created_at: string
  user_id: string | null
  filename: string | null
  space_url: string
  is_deleted: boolean
  status: 'pending' | 'completed' | 'failed'
  is_hidden: boolean
}

export type DownloadsType = {
  download: DlType
  tweet: EnrichedTweet | undefined
}

export type CreateDlType = {
  user_id: string
  space_url: string
}

export type UpdateDlType = {
  id: string
  filename: string
}

export type SaveDownloadRecord = {
  userId: string
  url: string
  filename: string
}

export type UserDownload = {
  id: string
  created_at: string
  user_id: string
  filename: string
  space_url: string
  is_deleted: boolean
}
