import { HistoryViewTypes } from '@/types/HistoryViewTypes'

import TweetCard from '@/components/tweet-card/tweet-card'
import Hr from '@/components/components/hr'

const HistoryView = ({ downloadTweets, deletedDownloads, user }: HistoryViewTypes) => {
  const hasActiveDownloads = downloadTweets.length > 0
  const hasDeletedDownloads = deletedDownloads.length > 0

  if (!hasActiveDownloads && !hasDeletedDownloads) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center gap-3 px-4 py-6 md:px-0">
        <p className="text-center text-lg text-stone-50">No downloads yet!</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-6 md:px-0">
      {/* Active downloads */}
      <div className="flex flex-col gap-3">
        <p className="dark-fit mx-auto text-center text-lg text-stone-50">
          Downloads <span className="text-xs">(Expires After 24 Hours)</span>
        </p>
        {downloadTweets.map(({ download, tweet }, index) => (
          <TweetCard
            key={index}
            tweet={tweet}
            filename={download.filename}
            downloadId={download.id}
            downloadAtdAt={download.created_at}
            likes={tweet?.favorite_count}
            createdAt={tweet?.created_at}
            user={user}
            isDeleted={download.is_deleted || !download.filename}
          />
        ))}
      </div>

      {/* Deleted downloads */}
      {deletedDownloads.length > 0 && (
        <>
          {hasActiveDownloads && <Hr className="mt-4" />}

          <div className="flex flex-col gap-3">
            <p className="dark-fit mx-auto text-center text-lg text-stone-50">Expired Downloads</p>

            {deletedDownloads.map(({ download, tweet }, index) => (
              <TweetCard
                key={index}
                tweet={tweet}
                filename={download.filename}
                downloadId={download.id}
                downloadAtdAt={download.created_at}
                likes={tweet?.favorite_count}
                createdAt={tweet?.created_at}
                user={user}
                isDeleted={download.is_deleted || !download.filename}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default HistoryView
