import { enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

import { getUser } from '@/db/auth.service'
import { getUserDownloads } from '@/db/downloads.service'
import { extractTweetId } from '@/utils/extractTweetId'
import { UserDownloadTweet } from '@/types/TweetType'

import HistoryView from '@/components/views/history-view'

const Page = async () => {
  const { user } = await getUser()
  const userDownloads = (await getUserDownloads(user?.id || '')) || []

  const downloadTweets: UserDownloadTweet[] = await Promise.all(
    userDownloads.map(async (dl) => {
      const tweetId: string | null = extractTweetId(dl.space_url)
      const tw = tweetId ? await getTweet(tweetId) : undefined

      return {
        download: dl,
        tweet: tw ? enrichTweet(tw) : undefined,
      }
    })
  )

  return <HistoryView downloadTweets={downloadTweets} />
}

export default Page
