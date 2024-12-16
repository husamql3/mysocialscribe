import { type EnrichedTweet } from 'react-tweet'
import { User } from '@supabase/auth-js'

export type TweetCardType = {
  tweet: EnrichedTweet | undefined
  filename: string | undefined
  downloadId: string
  createdAt: string | undefined
  downloadAtdAt: string
  likes: number | undefined
  user: User
}

export type TweetPlayBtnType = {
  filename: string | undefined
}
