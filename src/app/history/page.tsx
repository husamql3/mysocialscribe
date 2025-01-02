import { getUser } from '@/db/supabase/services/auth.service'
import { enrichTweet } from 'react-tweet'
import { getTweet } from 'react-tweet/api'
import { getDownloads } from '@/db/supabase/services/downloads.service'
import { DlType } from '@/types/DownlodsType'
import { extractTweetId } from '@/utils/historyHelpers'
import HistoryView from '@/components/views/history-view'

const Page = async () => {
  const { user } = await getUser()
  if (!user) return null

  const downloads: DlType[] = await getDownloads({ userId: user.id })

  // Group downloads by status first to avoid multiple iterations
  const grouped = downloads.reduce(
    (acc, dl) => {
      if (dl.status === 'pending') {
        acc.downloading.push(dl)
      } else if (dl.status === 'completed' && !dl.is_deleted) {
        acc.downloaded.push(dl)
      } else if (dl.is_deleted) {
        acc.deleted.push(dl)
      }
      return acc
    },
    {
      downloading: [] as DlType[],
      downloaded: [] as DlType[],
      deleted: [] as DlType[],
    }
  )

  // Process each group individually
  const processGroup = async (downloads: DlType[]) => {
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

  // Process each group
  const [downloadingRecords, downloadedRecords, deletedRecords] = await Promise.all([
    processGroup(grouped.downloading),
    processGroup(grouped.downloaded),
    processGroup(grouped.deleted),
  ])

  return (
    <HistoryView
      downloadingRecords={downloadingRecords}
      downloadedRecords={downloadedRecords}
      deletedRecords={deletedRecords}
      user={user!}
    />
  )
}

export default Page
