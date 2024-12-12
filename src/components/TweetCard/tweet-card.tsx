import { type EnrichedTweet } from 'react-tweet'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import TweetCardHeader from '@/components/TweetCard/tweet-card-header'
import TweetCardContent from '@/components/TweetCard/tweet-card-content'
import TweetShare from '@/components/TweetCard/tweet-share'

const TweetCard = ({ tweet }: { tweet: EnrichedTweet }) => {
  return (
    <Card className="z-50 flex h-fit w-full flex-col overflow-auto rounded-lg shadow-xl dark:bg-zinc-950">
      <CardHeader className="flex flex-row justify-between gap-3 p-3">
        <TweetCardHeader tweet={tweet} />
      </CardHeader>

      <CardContent className="px-3 py-1">
        <TweetCardContent entities={tweet.entities} />
      </CardContent>

      <CardFooter className="justify-end px-3 pb-3 pt-3">
        <TweetShare spaceUrl={tweet.url} />
      </CardFooter>
    </Card>
  )
}

export default TweetCard
