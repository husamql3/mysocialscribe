import { type EnrichedTweet } from 'react-tweet'

export type TweetCardType = {
  tweet: EnrichedTweet | undefined
  filename: string | undefined
  downloadId: string
  createdAt: string | undefined
  downloadAtdAt: string
  likes: number | undefined
}

export type TweetPlayBtnType = {
  tweetUrl: string
  filename: string | undefined
}
