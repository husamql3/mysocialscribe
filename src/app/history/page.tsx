import { enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

import { getUser } from '@/db/supabase/services/auth.service'
import { getUserDeletedDownloads, getUserDownloads } from '@/db/downloads.service'
import { extractTweetId } from '@/utils/extractTweetId'
import { UserDownloadTweet } from '@/types/TweetType'

import HistoryView from '@/components/views/history-view'

const Page = async () => {
  const { user } = await getUser()
  const userDownloads = (await getUserDownloads(user?.id || '')) || []
  const userDeletedDownloads = (await getUserDeletedDownloads(user?.id || '')) || []

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

  const deletedDownloads: UserDownloadTweet[] = await Promise.all(
    userDeletedDownloads.map(async (dl) => {
      const tweetId: string | null = extractTweetId(dl.space_url)
      const tw = tweetId ? await getTweet(tweetId) : undefined

      return {
        download: dl,
        tweet: tw ? enrichTweet(tw) : undefined,
      }
    })
  )

  return (
    <HistoryView
      downloadTweets={downloadTweets}
      deletedDownloads={deletedDownloads}
      user={user!}
    />
  )
}

export default Page
