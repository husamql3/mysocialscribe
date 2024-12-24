import { DlType } from '@/types/DownlodsType'
import { enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

export function extractTweetId(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

    // Handle standard tweet URL
    if (pathParts[1] === 'status' && pathParts[2]) {
      return pathParts[2]
    }

    // Handle Spaces URL
    if (pathParts[0] === 'i' && pathParts[1] === 'spaces' && pathParts[2]) {
      return pathParts[2]
    }

    return null
  } catch {
    console.error('Invalid URL:', url)
    return null
  }
}

export const processGroup = async (downloads: DlType[]) => {
  return Promise.all(
    downloads.map(async (dl) => {
      const tweetId = extractTweetId(dl.space_url)
      const tweet = tweetId ? await getTweet(tweetId) : undefined
      return {
        download: dl,
        tweet: tweet ? enrichTweet(tweet) : undefined,
      }
    })
  )
}
