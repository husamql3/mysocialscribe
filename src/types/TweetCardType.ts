import { type EnrichedTweet } from 'react-tweet'

export type TweetCardType = {
  tweet: EnrichedTweet | undefined
  filename: string | undefined
  downloadId: string
}

export type TweetPlayBtnType = {
  tweetUrl: string
  filename: string | undefined
}
