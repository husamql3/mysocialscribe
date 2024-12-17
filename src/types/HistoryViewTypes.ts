import { User } from '@supabase/auth-js'

import { UserDownloadTweet } from '@/types/TweetType'

export type HistoryViewTypes = {
  downloadTweets: UserDownloadTweet[]
  deletedDownloads: UserDownloadTweet[]
  user: User
}
