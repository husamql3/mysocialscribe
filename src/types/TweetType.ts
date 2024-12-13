import { type Tweet } from 'react-tweet/api'
import { type EnrichedTweet } from 'react-tweet'
import { UserDownload } from '@/types/DownlodsType'

export type TweetType = Tweet | undefined

export type UserDownloadTweet = {
  download: UserDownload
  tweet: EnrichedTweet | undefined
}
