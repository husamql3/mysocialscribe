import { type EnrichedTweet } from 'react-tweet'
import { DlType } from '@/types/DownlodsType'

type TweetEntity = EnrichedTweet['entities'][number]

export type TweetCardType = {
  tweet: EnrichedTweet | undefined
  download: DlType
  email: string
}

export type TweetInfoType = {
  favorite_count: number
  created_at: string
  is_deleted: boolean
}

export type TweetCardHeaderType = {
  tweet: EnrichedTweet
  isDeleted: boolean
}

export type TweetCardContentProps = {
  entities: TweetEntity[]
  isDeleted: boolean
}

export type TweetDelBtnType = {
  downloadId: string
  filename: string | null
}

export type TweetPlayBtnType = {
  filename: string | undefined
}

export type TweetDownloadBtnProps = {
  filename?: string
  tweetUrl: string
  email: string
  user_id: string
  isDeleted: boolean
}

export type DeleteOptions = {
  endpoint: string
  body: Record<string, string>
}

export type DeleteParams = {
  downloadId: string
  filename?: string
}
