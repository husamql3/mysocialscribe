import { enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

import { type TweetType } from '@/types/TweetType'
import { extractTweetId } from '@/utils/extractTweetId'
import { UserDownload } from '@/types/DownlodsType'

import TweetCard from '@/components/TweetCard/tweet-card'

const HistoryView = async ({ userDownloads }: { userDownloads: UserDownload[] }) => {
  if (userDownloads.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center gap-3 px-4 py-6 md:px-0">
        <p className="text-center text-lg text-stone-50">No downloads yet!</p>
      </main>
    )
  }

  const downloadTweets = await Promise.all(
    userDownloads.map(async (dl) => {
      const tweetId: string | null = extractTweetId(dl.space_url)
      const tw: TweetType = tweetId ? await getTweet(tweetId) : undefined
      return {
        download: dl,
        tweet: tw ? enrichTweet(tw) : undefined,
      }
    })
  )

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-6 md:px-0">
      {downloadTweets.map(({ download, tweet }, index) => (
        <TweetCard
          key={index}
          tweet={tweet}
          filename={download.filename}
        />
      ))}
    </main>
  )
}

export default HistoryView
