import { type EnrichedTweet } from 'react-tweet'
import { User } from '@supabase/auth-js'

type TweetEntity = EnrichedTweet['entities'][number]

export type TweetCardType = {
  tweet: EnrichedTweet | undefined
  filename: string | undefined
  downloadId: string
  createdAt: string | undefined
  downloadAtdAt: string
  likes: number | undefined
  user: User
  isDeleted: boolean
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
  filename?: string
  isDeleted: boolean
}

export type TweetPlayBtnType = {
  filename: string | undefined
}

export type TweetDownloadBtnProps = {
  filename?: string
  tweetUrl: string
  user: User
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
