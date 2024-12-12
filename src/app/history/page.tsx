import { enrichTweet } from 'react-tweet'
import { getTweet, type Tweet } from 'react-tweet/api'
import { getUser } from '@/db/auth.service'
import { extractTweetId } from '@/utils/extractTweetId'
import { TweetType } from '@/types/TweetType'
import TweetCard from '@/components/TweetCard/tweet-card'

const Page = async () => {
  const { user } = await getUser()
  // const userDownloads = (await getUserDownloads(user?.id || '')) || []
  const userDownloads = []

  if (userDownloads.length === 0) { // todo: update style
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 grid-cols-3 flex-col gap-3 px-4 py-6 md:px-0">
        No downloads yet
      </main>
    )
  }

  // return (
  //   <>
  //     {userDownloads.map(async (download:) => (
  //
  //     )}
  //   </>
  // )

  // const tweets = await Promise.all(
  //   userDownloads?.map(async (download) => {
  //     const tweetId = extractTweetId(download.space_url)
  //     const tweet: TweetType = await getTweet(tweetId || '')
  //     return enrichTweet(tweet as Tweet)
  //   })
  // )
  //
  // return (
  //   <main className="mx-auto flex w-full max-w-lg flex-1 grid-cols-3 flex-col gap-3 px-4 py-6 md:px-0">
  //     {tweets?.map((tweet) => (
  //       <TweetCard
  //         key={tweet.id_str}
  //         tweet={tweet}
  //       />
  //     ))}
  //   </main>
  // )
}

export default Page
