import { TweetCardType } from '@/types/TweetCardType'
import { formatDate, formatNumber } from '@/utils/format'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import TweetCardHeader from '@/components/TweetCard/tweet-card-header'
import TweetCardContent from '@/components/TweetCard/tweet-card-content'
import TweetShare from '@/components/TweetCard/tweet-share'
import TweetPlayBtn from '@/components/TweetCard/tweet-play-btn'
import TweetDelBtn from '@/components/TweetCard/tweet-delete-btn'
import { IoHeartOutline } from 'react-icons/io5'

const TweetCard = ({ tweet, filename, downloadId, downloadAtdAt,createdAt }: TweetCardType) => {
  if (!tweet) {
    return (
      <Card className="z-50 flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
        <CardHeader className="flex flex-row items-center justify-center gap-3 p-3">
          This tweet may have been deleted
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="z-50 space-y-1">
      <p className="text-sm">Downloaded at {formatDate(downloadAtdAt)}</p>

      <Card className="flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
        <CardHeader className="flex flex-row justify-between gap-3 p-3">
          <TweetCardHeader tweet={tweet} />
        </CardHeader>

        <CardContent className="px-3 py-1">
          <TweetCardContent entities={tweet.entities} />
        </CardContent>

        <CardFooter className="justify-between px-3 pb-3 pt-3">
          <div className="flex gap-1 text-xs text-stone-400">
            <p>{formatDate(createdAt!, false)}</p>
            <p>·</p>
            <p className="flex items-center gap-0.5">
              {formatNumber(tweet?.favorite_count)}
              <IoHeartOutline />
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <TweetPlayBtn
              tweetUrl={tweet.url}
              filename={filename}
            />

            <TweetDelBtn
              downloadId={downloadId}
              filename={filename}
            />

            <TweetShare spaceUrl={tweet.url} />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TweetCard
