import Link from 'next/link'
import { HiDownload } from 'react-icons/hi'
import { IoPlay } from 'react-icons/io5'

import { TweetCardType } from '@/types/TweetCardType'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import TweetCardHeader from '@/components/TweetCard/tweet-card-header'
import TweetCardContent from '@/components/TweetCard/tweet-card-content'
import TweetShare from '@/components/TweetCard/tweet-share'
import { Button } from '@/components/ui/button'

const TweetCard = ({ tweet, filename }: TweetCardType) => {
  if (!tweet) {
    return (
      <Card className="z-50 flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
        <CardHeader className="flex flex-row items-center justify-center gap-3 p-3">
          This tweet may have been deleted
        </CardHeader>
      </Card>
    )
  }

  console.log('TweetCard', filename)

  return (
    <Card className="z-50 flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
      <CardHeader className="flex flex-row justify-between gap-3 p-3">
        <TweetCardHeader tweet={tweet} />
      </CardHeader>

      <CardContent className="px-3 py-1">
        <TweetCardContent entities={tweet.entities} />
      </CardContent>

      <CardFooter className="justify-end gap-2 px-3 pb-3 pt-3">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 rounded-full"
        >
          {filename ? (
            <IoPlay className="h-5 w-5" />
          ) : (
            <Link
              href={process.env.NEXT_PUBLIC_BASE_URL + '?spaceUrl=' + tweet.url}
              target="_blank"
            >
              <HiDownload className="h-5 w-5" />
            </Link>
          )}
        </Button>

        <TweetShare spaceUrl={tweet.url} />
      </CardFooter>
    </Card>
  )
}

export default TweetCard
