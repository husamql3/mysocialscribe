import { User } from '@supabase/auth-js'

import { DownloadsType } from '@/types/DownlodsType'

export type HistoryViewTypes = {
  downloadingRecords: DownloadsType[]
  downloadedRecords: DownloadsType[]
  deletedRecords: DownloadsType[]
  user: User
}
