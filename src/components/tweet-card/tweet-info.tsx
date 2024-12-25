import { IoHeartOutline } from 'react-icons/io5'

import { cn } from '@/lib/utils'
import { formatDate, formatNumber } from '@/utils/format'
import { TweetInfoType } from '@/types/TweetCardType'

const TweetInfo = ({ favorite_count, created_at, is_deleted }: TweetInfoType) => {
  return (
    <div className={cn('flex gap-1 text-xs text-zinc-400', is_deleted && 'text-zinc-600')}>
      <p>{formatDate(created_at!, false)}</p>
      <p>·</p>
      <p className="flex items-center gap-0.5">
        {formatNumber(favorite_count)}
        <IoHeartOutline />
      </p>
    </div>
  )
}

export default TweetInfo
