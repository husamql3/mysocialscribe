import { HistoryViewTypes } from '@/types/HistoryViewTypes'

import TweetCard from '@/components/TweetCard/tweet-card'

const HistoryView = ({ downloadTweets, user }: HistoryViewTypes) => {
  if (downloadTweets.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center gap-3 px-4 py-6 md:px-0">
        <p className="text-center text-lg text-stone-50">No downloads yet!</p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 py-6 md:px-0">
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
        />
      ))}
    </main>
  )
}

export default HistoryView
