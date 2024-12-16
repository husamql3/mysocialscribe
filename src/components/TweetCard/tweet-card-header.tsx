import Image from 'next/image'
import { type EnrichedTweet } from 'react-tweet'

import { truncate } from '@/utils/truncate'

import Verified from '@/components/TweetCard/verified'
import Twitter from '@/components/TweetCard/twitter'

const TweetCardHeader = ({ tweet }: { tweet: EnrichedTweet }) => {
  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-row items-center gap-3">
        {/* Profile picture */}
        <a href={tweet.user.url}>
          <Image
            title={`Profile picture of ${tweet.user.name}`}
            src={tweet.user.profile_image_url_https}
            alt="Profile picture"
            width={40}
            height={40}
            className="overflow-hidden rounded-full border border-transparent object-cover object-center"
          />
        </a>

        <div className="flex flex-col items-start">
          {/* Username */}
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center whitespace-nowrap font-semibold"
          >
            {truncate(tweet.user.name, 20)}
            {tweet.user.verified || (tweet.user.is_blue_verified && <Verified />)}
          </a>

          {/* User handle */}
          <a
            href={tweet.user.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-gray-500 transition-all duration-75"
          >
            @{truncate(tweet.user.screen_name, 16)}
          </a>
        </div>
      </div>

      {/* Tweet url */}
      <a
        href={tweet.url}
        target="_blank"
        rel="noreferrer"
        className="size-fit"
      >
        <span className="sr-only">Link to tweet</span>
        <Twitter />
      </a>
    </div>
  )
}

export default TweetCardHeader
