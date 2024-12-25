import { HistoryViewTypes } from '@/types/HistoryViewTypes'

import TweetCard from '@/components/tweet-card/tweet-card'
import Hr from '@/components/components/hr'

const HistoryView = ({
  downloadingRecords,
  downloadedRecords,
  deletedRecords,
  user,
}: HistoryViewTypes) => {
  const hasActiveDownloadings = downloadingRecords.length > 0
  const hasActiveDownloads = downloadedRecords.length > 0
  const hasDeletedDownloads = deletedRecords.length > 0

  if (!hasActiveDownloadings && !hasActiveDownloads && !hasDeletedDownloads) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center gap-3 px-4 py-6 md:px-0">
        <p className="text-center text-lg text-stone-50">No downloads yet!</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-6 md:px-0">
      {/* Downloading records */}
      {hasActiveDownloadings && (
        <div className="flex flex-col gap-3">
          <p className="dark-fit mx-auto text-center text-lg text-stone-50">Downloadings</p>
          {downloadingRecords.map((dl) => (
            <TweetCard
              tweet={dl.tweet}
              download={dl.download}
              key={dl.download.id}
              email={user.email!}
            />
          ))}
        </div>
      )}

      {/* Separator between downloading and active downloads */}
      {hasActiveDownloadings && hasActiveDownloads && <Hr className="mt-4" />}

      {/* Active downloads */}
      {hasActiveDownloads && (
        <div className="flex flex-col gap-3">
          <p className="dark-fit mx-auto text-center text-lg text-stone-50">
            Downloads <span className="text-xs">(Expires After 24 Hours)</span>
          </p>
          {downloadedRecords.map((dl) => (
            <TweetCard
              tweet={dl.tweet}
              download={dl.download}
              key={dl.download.id}
              email={user.email!}
            />
          ))}
        </div>
      )}

      {/* Separator between active downloads and deleted downloads */}
      {hasDeletedDownloads && (hasActiveDownloadings || hasActiveDownloads) && (
        <Hr className="mt-4" />
      )}

      {/* Deleted downloads */}
      {hasDeletedDownloads && (
        <div className="flex flex-col gap-3">
          <p className="dark-fit mx-auto text-center text-lg text-stone-50">Expired Downloads</p>
          {deletedRecords.map((dl) => (
            <TweetCard
              tweet={dl.tweet}
              download={dl.download}
              key={dl.download.id}
              email={user.email!}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default HistoryView
